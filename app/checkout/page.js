'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CheckoutPage() {
  const { cart, subTotal, clearCart, mounted } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, loading, router]);

  if (!mounted || loading || !user) return <div className="min-h-screen pt-32 pb-12 flex items-center justify-center">Loading...</div>;

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const involvedSellers = [...new Set(cart.map(item => item.product.sellerId).filter(Boolean))];

      const orderData = {
        buyerId: user.uid,
        involvedSellers,
        products: cart.map(item => ({
          productId: item.product._id || item.product.id,
          title: item.product.title || item.product.name,
          imageUrl: item.product.imageUrl || null,
          quantity: item.quantity,
          priceAtPurchase: item.product.price,
          sellerId: item.product.sellerId
        })),
        shippingAddress: form,
        totalAmount: subTotal,
        paymentMethod: 'Cash on Delivery',
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'orders'), orderData);

      clearCart();
      router.push('/checkout/success');
    } catch (error) {
      setErrorMsg(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col-reverse lg:flex-row gap-8">
        
        {/* Checkout Form */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Details</h2>
          
          {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">{errorMsg}</div>}
          <div className="mb-6 p-4 bg-amber-50 text-amber-800 rounded-md border border-amber-200 font-medium">
            Payment Method: <span className="font-bold">Cash on Delivery (COD)</span> directly to your doorstep.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="fullName" required value={form.fullName} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md px-3 py-2 border focus:ring-[#5e3b2e] focus:border-[#5e3b2e]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              <input type="text" name="street" required value={form.street} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md px-3 py-2 border focus:ring-[#5e3b2e] focus:border-[#5e3b2e]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" name="city" required value={form.city} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md px-3 py-2 border focus:ring-[#5e3b2e] focus:border-[#5e3b2e]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State / Province</label>
                <input type="text" name="state" required value={form.state} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md px-3 py-2 border focus:ring-[#5e3b2e] focus:border-[#5e3b2e]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
                <input type="text" name="zipCode" required value={form.zipCode} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md px-3 py-2 border focus:ring-[#5e3b2e] focus:border-[#5e3b2e]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" name="phone" required value={form.phone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md px-3 py-2 border focus:ring-[#5e3b2e] focus:border-[#5e3b2e]" />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="w-full mt-6 bg-[#5e3b2e] border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-[#4a2e24] focus:outline-none disabled:opacity-50">
              {submitting ? 'Placing Order...' : 'Confirm Order (COD)'}
            </button>
          </form>
        </div>

        {/* Order Summary Summary */}
        <div className="w-full lg:w-80 h-fit bg-gray-100 p-6 rounded-lg sticky top-24">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
          <ul className="space-y-4 mb-6">
            {cart.map(item => (
              <li key={item.product._id} className="flex justify-between items-start">
                <div className="text-sm">
                  <p className="font-medium text-gray-900 line-clamp-1">{item.product.title}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-gray-900 shrink-0 ml-4">PKR {item.product.price * item.quantity}</p>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-300 pt-4 flex justify-between font-bold text-lg text-gray-900">
            <p>Total</p>
            <p>PKR {subTotal}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
