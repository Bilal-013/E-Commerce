'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export default function SellerOrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) {
      router.replace('/');
      return;
    }

    const fetchOrders = async () => {
      if (user && user.uid) {
        try {
          const q = query(
            collection(db, 'orders'),
            where('involvedSellers', 'array-contains', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const ordersList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          // Sort client-side
          ordersList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setOrders(ordersList);
        } catch (err) {
          console.error('Error fetching orders:', err);
        } finally {
          setFetching(false);
        }
      }
    };

    if (user && user.role === 'seller') {
      fetchOrders();
    }
  }, [user, loading, router]);

  if (loading || fetching) {
    return <div className="min-h-[80vh] pt-32 flex justify-center items-center">Loading Orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">Customer Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">No orders found.</p>
            <p className="text-gray-400 mt-2">When buyers purchase your products, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => {
              // Filter products to only show THIS seller's items
              const myItems = order.products.filter(item => item.sellerId === user.uid);
              const orderTotal = myItems.reduce((acc, curr) => acc + (curr.priceAtPurchase * curr.quantity), 0);

              return (
                <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between border-b border-gray-200">
                    <div className="mb-4 sm:mb-0">
                      <p className="text-sm font-medium text-gray-500">Order ID: {order.id}</p>
                      <p className="text-sm text-gray-500 mt-1">Placed: {new Date(order.createdAt).toLocaleString()}</p>
                      <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Payment: Cash on Delivery - Collect on Arrival
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-medium text-gray-500">Customer Details:</p>
                      <p className="text-sm text-gray-900 font-semibold">{order.shippingAddress.fullName}</p>
                      <p className="text-sm text-gray-700">{order.shippingAddress.phone}</p>
                      <p className="text-sm text-gray-700">
                        {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Items to Pack ({myItems.length})</h3>
                    <ul className="divide-y divide-gray-200">
                      {myItems.map((item, index) => (
                        <li key={index} className="py-2 flex justify-between items-center text-sm">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{item.title}</span>
                            <span className="text-gray-500">Qty: {item.quantity}</span>
                          </div>
                          <div className="font-medium text-gray-900">
                            PKR {(item.priceAtPurchase * item.quantity).toFixed(2)}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                      <span className="font-semibold text-gray-900">Your Earning</span>
                      <span className="font-bold text-lg text-[var(--color-primary)]">
                        PKR {orderTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
