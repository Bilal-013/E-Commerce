'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export default function BuyerDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role === 'admin')) {
      // Actually buyers and sellers can be buyers but let's restrict to authenticated users
      if (!user) {
        router.push('/login');
      }
    } else if (user) {
      fetchOrders();
    }
  }, [user, loading, router]);

  const fetchOrders = async () => {
    try {
      setFetching(true);
      const q = query(
        collection(db, 'orders'), 
        where('buyerId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
      }));
      // Sort in JS instead of compound query to omit manual Firebase indexing
      fetchedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setFetching(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-indigo-100 text-indigo-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 font-heading">My Orders</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {fetching ? (
            <div className="p-10 flex justify-center text-gray-500">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center flex flex-col items-center">
              <p className="text-gray-500 text-lg mb-6">You haven&apos;t placed any orders yet.</p>
              <Link href="/shop" className="bg-[#5e3b2e] text-white px-6 py-2 rounded shadow hover:bg-[#4a2e24]">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order._id} className="p-6 sm:p-8 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Order <span className="font-mono text-gray-900">#{order._id.slice(-8)}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="mt-2 font-bold text-gray-900 text-lg">
                        Total: PKR {order.totalAmount}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border border-gray-200 rounded-md overflow-hidden divide-y divide-gray-100">
                    {order.products.map((item, idx) => (
                      <div key={item.productId || idx} className="p-4 flex bg-white">
                        <div className="h-16 w-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          {item.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.imageUrl} alt={item.title || "Product"} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">No Image</div>
                          )}
                        </div>
                        <div className="ml-4 flex-1 flex justify-between">
                          <div>
                            <p className="font-bold text-gray-900">{item.title || 'Product removed'}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity} × PKR {item.priceAtPurchase}</p>
                          </div>
                          <p className="font-bold text-gray-900">PKR {item.quantity * item.priceAtPurchase}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-gray-50 p-4 rounded text-sm text-gray-600">
                    <p className="font-bold text-gray-900 mb-1">Shipping To:</p>
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
                    <p>{order.shippingAddress.state} - {order.shippingAddress.zipCode}</p>
                    <p className="mt-2"><span className="font-medium">Payment:</span> {order.paymentMethod}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
