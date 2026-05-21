import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { staticDummyProducts } from '@/lib/dummyData';

export default async function ShopPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams?.category || 'All';
  
  // Fetch DB directly from Firestore Client SDK
  let q;
  if (category && category !== 'All') {
    q = query(collection(db, 'products'), where('category', '==', category));
  } else {
    q = collection(db, 'products');
  }

  const querySnapshot = await getDocs(q);
  const dbProducts = querySnapshot.docs.map(doc => ({
    _id: doc.id,
    ...doc.data()
  }));

  const localProducts = category === 'All' ? staticDummyProducts : staticDummyProducts.filter(p => p.category === category);
  
  const products = [...dbProducts, ...localProducts];

  const categories = ['All', 'Shawls', 'Hats', 'Accessories', 'Embroidery'];

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 sm:text-4xl text-center font-heading">
          Our Collection
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link 
                      href={`/shop${cat === 'All' ? '' : `?category=${cat}`}`}
                      className={`block px-3 py-2 rounded-md transition-colors ${
                        category === cat 
                          ? 'bg-[#5e3b2e] text-white font-medium' 
                          : 'text-gray-600 hover:bg-[#ebdcd1] hover:text-[#4a2e24]'
                      }`}
                    >
                      {cat === 'Hats' && cat !== category && category !== 'Hats' ? 'Karakul Hats' : 
                       cat === 'Hats' && category === 'Hats' ? 'Karakul Hats' : cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-100">
                <p className="text-lg text-gray-500">No products found for this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link href={`/shop/${product._id}`} key={product._id} className="group flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      {!product.inStock && (
                        <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
                          Sold Out
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <p className="text-sm text-[#5e3b2e] font-medium mb-1">{product.category}</p>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">
                        {product.title}
                      </h3>
                      <div className="mt-auto flex items-center justify-between">
                        <p className="text-lg font-bold text-gray-900">PKR {product.price}</p>
                        <span className="text-sm font-medium text-[#5e3b2e] group-hover:underline">View Details &rarr;</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
