'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Fetch user role from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const sessionData = { uid: firebaseUser.uid, role: userData.role, email: firebaseUser.email, name: userData.name };
            setUser(sessionData);
            // Set cookie for middleware
            document.cookie = `userSession=${encodeURIComponent(JSON.stringify(sessionData))}; path=/; max-age=604800`; // 7 days
          } else {
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email, role: 'buyer' });
          }
        } else {
          setUser(null);
          // Clear cookie
          document.cookie = 'userSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      } catch (err) {
        console.error('Error fetching user data', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // We manually fetch here so we can instantly resolve and return success
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const sessionData = { uid: userCredential.user.uid, role: userData.role, email: userCredential.user.email, name: userData.name };
        document.cookie = `userSession=${encodeURIComponent(JSON.stringify(sessionData))}; path=/; max-age=604800`;
        setUser(sessionData);
        router.push('/');
        return { success: true };
      }
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (name, email, password, role, extraData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Create user document with selected role and extra data (like phone)
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        role: role,
        ...extraData,
        createdAt: new Date().toISOString()
      });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
    document.cookie = 'userSession=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
