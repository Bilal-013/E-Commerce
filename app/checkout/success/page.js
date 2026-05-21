import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-xl shadow-sm border border-gray-100">
        <FiCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 font-heading">
          Order placed successfully!
        </h2>
        <p className="text-gray-600 mb-8">
          Thank you for exploring Kashmiri excellence. Your order has been placed via Cash on Delivery and is now being processed.
        </p>
        <div className="space-y-4">
          <Link
            href="/buyer"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#5e3b2e] hover:bg-[#4a2e24]"
          >
            View My Orders
          </Link>
          <Link
            href="/shop"
            className="w-full flex justify-center py-3 px-4 border border-[#5e3b2e] rounded-md shadow-sm text-base font-medium text-[#5e3b2e] bg-white hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
