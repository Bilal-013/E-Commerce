'use client';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';

export default function CartPage() {
  const { cart, mounted, removeFromCart, updateQuantity, subTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  if (!mounted) return <div className="min-h-screen pt-32 pb-12 flex items-center justify-center">Loading...</div>;

  const handleProceedToCheckout = () => {
    if (!user) {
      router.push('/login?redirect=/checkout');
    } else {
      router.push('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-32 pb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">Discover beautiful Kashmiri crafts to add to your cart.</p>
        <Link 
          href="/shop" 
          className="bg-[#5e3b2e] text-white px-6 py-3 rounded-md hover:bg-[#4a2e24] transition-colors"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 font-heading">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.product._id} className="p-6 flex flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-md overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{item.product.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                    </div>
                    <p className="text-lg font-bold text-[#5e3b2e]">PKR {item.product.price}</p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flexItems text-gray-700 bg-gray-100 rounded-md p-1 items-center flex">
                      <button 
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                    >
                      <FiTrash2 className="mr-1"/> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
              <p>Subtotal</p>
              <p>PKR {subTotal}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 mb-6 flex justify-between">
              <span>Shipping & taxes calculated at checkout.</span>
            </p>
            
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#5e3b2e] border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-[#4a2e24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-[#5e3b2e]"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
