'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { FiEdit, FiTrash2, FiPlus, FiImage } from 'react-icons/fi';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function SellerDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Shawls');
  const [inStock, setInStock] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fileInputRef = useRef(null);

  const fetchProducts = async () => {
    try {
      setFetching(true);
      const q = query(collection(db, 'products'), where('sellerId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
      setProducts(productsData);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) {
      router.push('/');
    } else if (user && user.role === 'seller') {
      fetchProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (!imageFile) {
        throw new Error('Please select an image for your product.');
      }

      // 1. Upload image to Firebase Storage
      const imageRef = storageRef(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      // 2. Create Product in Firestore
      await addDoc(collection(db, 'products'), {
        title,
        description,
        price: Number(price),
        category,
        imageUrl,
        inStock,
        sellerId: user.uid,
        createdAt: new Date().toISOString()
      });

      setSuccessMsg('Product added successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('Shawls');
      setInStock(true);
      setImageFile(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      // Refresh list
      fetchProducts();
    } catch (error) {
      console.error("FIREBASE UPLOAD ERROR:", error);
      setErrorMsg(error.message || 'An error occurred during upload. Please check the console.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error(error);
      alert('Error deleting product');
    }
  };

  const handleToggleStock = async (product) => {
    try {
      const productRef = doc(db, 'products', product._id);
      await updateDoc(productRef, {
        inStock: !product.inStock
      });
      setProducts(products.map(p => p._id === product._id ? { ...p, inStock: !p.inStock } : p));
    } catch (error) {
      console.error(error);
      alert('Error updating stock status');
    }
  };

  if (loading || !user || user.role !== 'seller') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Seller Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FiPlus className="mr-2" /> Add New Product
            </h2>
            
            {errorMsg && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">{errorMsg}</div>}
            {successMsg && <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-md">{successMsg}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  placeholder="E.g. Handwoven Pashmina Shawl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Describe the product details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (PKR )</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    placeholder="2500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="Shawls">Shawls</option>
                    <option value="Hats">Karakul Hats</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Embroidery">Embroidery</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative group">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="mb-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Preview" className="mx-auto h-32 object-contain" />
                      </div>
                    ) : (
                      <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, up to 5MB</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="inStock"
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="inStock" className="ml-2 block text-sm text-gray-900">
                  Currently in stock
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                {submitting ? 'Adding...' : 'Add Product'}
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Your Products</h2>
            
            {fetching ? (
              <p className="text-gray-500">Loading products...</p>
            ) : products.length === 0 ? (
              <div className="bg-white p-8 text-center rounded-lg border border-gray-100 shadow-sm text-gray-500">
                You haven&apos;t added any products yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="h-48 bg-gray-200 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                      {!product.inStock && (
                        <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-bold">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.title}</h3>
                          <p className="text-sm text-amber-600 font-medium">{product.category}</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">PKR {product.price}</p>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-grow">{product.description}</p>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <button
                          onClick={() => handleToggleStock(product)}
                          className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                            product.inStock 
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                        </button>
                        
                        <div className="flex space-x-2">
                          <button onClick={() => handleDelete(product._id)} className="text-gray-400 hover:text-red-500 transition-colors p-1.5 bg-gray-50 rounded-md hover:bg-red-50">
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
