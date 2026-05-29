import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  
  const docRef = doc(db, 'products', productId);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    notFound();
  }

  const product = { _id: docSnap.id, ...docSnap.data() };

  return (
    <div className="min-h-screen bg-white pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Image */}
          <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl font-heading">
              {product.title}
            </h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl font-bold text-[#5e3b2e]">PKR {product.price}</p>
            </div>

            <div className="mt-6">
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-500 mr-4">Category:</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ebdcd1] text-[#4a2e24]">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            </div>

            <div className="mt-10 flex sm:flex-col1">
              <AddToCartButton product={JSON.parse(JSON.stringify(product))} />
            </div>

            <section aria-labelledby="details-heading" className="mt-12 pt-10 border-t border-gray-200">
              <h2 id="details-heading" className="text-lg font-bold text-gray-900 mb-4">
                Shipping & Returns
              </h2>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li>Free shipping on all orders across India.</li>
                <li>Handcrafted items may take 5-7 business days to process.</li>
                <li>Secure packaging to protect delicate Pashmina and Embroidery.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
