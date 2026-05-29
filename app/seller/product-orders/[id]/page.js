'use client';

import { useState, useEffect, use } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function ProductOrdersPage({ params }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Unwrap params using React 19's use()
  const { id: productId } = use(params);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) {
      router.replace('/');
      return;
    }

    const fetchData = async () => {
      if (user && user.uid && productId) {
        try {
          // Fetch Product Details
          const productRef = doc(db, 'products', productId);
          const productSnap = await getDoc(productRef);
          if (productSnap.exists()) {
             setProduct({ _id: productSnap.id, ...productSnap.data() });
          }

          // Fetch Orders that contain this Product
          const q = query(
            collection(db, 'orders'),
            where('involvedSellers', 'array-contains', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const relevantOrders = [];
          
          querySnapshot.docs.forEach(docSnap => {
            const orderData = { id: docSnap.id, ...docSnap.data() };
            // Check if this specific product is in the order
            const itemInOrder = orderData.products.find(p => (p.productId || p._id) === productId);
            if (itemInOrder) {
              relevantOrders.push({
                ...orderData,
                purchasedItem: itemInOrder
              });
            }
          });
          
          relevantOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(relevantOrders);
        } catch (err) {
          console.error('Error fetching product orders:', err);
        } finally {
          setFetching(false);
        }
      }
    };

    fetchData();
  }, [user, loading, router, productId]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  if (loading || fetching) {
    return <div className="min-h-[80vh] flex justify-center items-center">Loading Data...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/seller" className="text-sm text-gray-500 hover:underline mb-6 inline-flex items-center">
          &larr; Back to Dashboard
        </Link>
        
        {product && (
          <div className="mb-8 flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            {product.imageUrl && <img src={product.imageUrl} className="h-16 w-16 object-cover rounded" alt={product.title} />}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Orders for: {product.title}</h1>
              <p className="text-gray-500 text-sm">Listing Price: PKR {product.price}</p>
            </div>
          </div>
        )}

        <h2 className="text-xl font-heading font-bold text-gray-900 mb-6">Buyer Details</h2>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">No one has ordered this product yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between border-b border-gray-200">
                  <div className="mb-4 sm:mb-0">
                    <p className="text-sm font-medium text-gray-500">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-500 mt-1">Placed: {new Date(order.createdAt).toLocaleString()}</p>
                    <div className="mt-2 text-sm font-medium">
                      Status: <span className="uppercase text-[var(--color-primary)]">{order.status || 'Pending'}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-medium text-gray-500">Buyer Information:</p>
                    <p className="text-base text-gray-900 font-bold">{order.shippingAddress.fullName}</p>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Contact Details</h3>
                      <p className="text-gray-900 font-medium">{order.shippingAddress.phone}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Delivery Address</h3>
                      <p className="text-gray-700">{order.shippingAddress.street}</p>
                      <p className="text-gray-700">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center bg-amber-50 p-4 rounded-md">
                    <div>
                      <span className="font-semibold text-gray-900 block">Quantity Ordered: {order.purchasedItem.quantity}</span>
                      <span className="text-sm text-gray-600 block">Price at purchase: PKR {order.purchasedItem.priceAtPurchase}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg text-[var(--color-primary)] block">
                        Total: PKR {order.purchasedItem.priceAtPurchase * order.purchasedItem.quantity}
                      </span>
                    </div>
                  </div>

                  {(order.status === 'Pending' || !order.status) && (
                    <div className="mt-6 flex justify-end gap-3">
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'order placed')}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm font-bold"
                      >
                        Accept Order
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(order.id, 'not proceeded')}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm font-bold"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}