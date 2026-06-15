'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AddToCartButton({ product }) {
  const [added, setAdded] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const { addToCart } = useCart();
  const { user, loading } = useAuth();

  const handleAddToCart = () => {
    if (loading) return;
    if (!user) {
      setShowPrompt(true);
      return;
    }
    if (user.role === 'seller') return;

    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (user?.role === 'seller') {
    return (
      <button
        disabled
        className="w-full bg-gray-300 dark:bg-gray-700 border border-transparent rounded-xl py-3 px-8 flex items-center justify-center text-base font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed"
      >
        Sellers Cannot Purchase
      </button>
    );
  }

  if (!product.inStock) {
    return (
      <button
        disabled
        className="w-full bg-gray-300 dark:bg-gray-700 border border-transparent rounded-xl py-3 px-8 flex items-center justify-center text-base font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        className={`w-full border border-transparent rounded-xl py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
          added 
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
            : 'bg-[#5e3b2e] hover:bg-[#4a2e24] focus:ring-[#5e3b2e]'
        }`}
      >
        {added ? 'Added to Cart!' : 'Add to Cart'}
      </button>

      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-[#2d2218] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-100 dark:border-[#f5a623]/10 animate-fade-up">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-[#fdfaf5] mb-4 font-display">Please Login</h3>
            <p className="text-gray-600 dark:text-[#faf4e8]/80 mb-8">
              Please login to proceed with your shopping. Create an account to save your cart and access exclusive handcrafted products.
            </p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowPrompt(false)} 
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-[#faf4e8] font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <Link 
                href="/login" 
                className="flex-1 text-center px-4 py-3 rounded-xl bg-saffron-gradient text-[#1a1410] font-bold shadow-md hover:shadow-lg transition-all"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}