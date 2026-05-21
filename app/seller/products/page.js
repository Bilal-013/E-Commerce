'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

export default function SellerProductsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) {
      router.replace('/');
      return;
    }

    const fetchProducts = async () => {
      if (user && user.uid) {
        try {
          const q = query(
            collection(db, 'products'), 
            where('sellerId', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const productsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          // Sort client-side if a compound index is not yet built in Firestore
          productsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setProducts(productsList);
        } catch (err) {
          console.error('Error fetching products:', err);
        } finally {
          setFetching(false);
        }
      }
    };

    if (user && user.role === 'seller') {
      fetchProducts();
    }
  }, [user, loading, router]);

  if (loading || fetching) {
    return <div className="min-h-[80vh] flex justify-center items-center">Loading Data...</div>;
  }

  return (
    <div className="min-h-[80vh] pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">My Uploaded Products</h1>
        <Link 
          href="/seller/new-product"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#5e3b2e] hover:bg-[#4a2e24]"
        >
          + Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
          <p className="text-gray-500 mb-4">You haven't uploaded any products yet.</p>
          <Link 
            href="/seller/new-product"
            className="text-[var(--color-primary)] font-medium hover:underline"
          >
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-100 flex flex-col">
              <div className="relative h-48 w-full bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <span className="text-xs text-[var(--color-primary)] uppercase font-semibold mb-1">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate" title={product.name}>
                  {product.name}
                </h3>
                <p className="text-gray-600 font-medium mb-4">${parseFloat(product.price).toFixed(2)}</p>
                <div className="mt-auto">
                  <p className="text-xs text-gray-400">
                    Added: {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
