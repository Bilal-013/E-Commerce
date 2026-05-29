'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function NewProductPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'seller')) {
      router.replace('/');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError('Please select an image file to upload.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // 1. Upload Image to Cloudinary (Unsigned)
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'ecommerce_preset'); // Remember to create this in Cloudinary
      
      const res = await fetch('https://api.cloudinary.com/v1_1/drbb32h7a/image/upload', {
        method: 'POST',
        body: formData
      });
      
      const errorData = await res.clone().json().catch(() => null);
      if (!res.ok) {
        console.error('Cloudinary Error Data:', errorData);
        throw new Error(`Image upload failed: ${errorData?.error?.message || res.statusText}`);
      }
      
      const data = await res.json();
      const imageUrl = data.secure_url;

      // 2. Save Document to Firestore
      await addDoc(collection(db, 'products'), {
        title: name,
        description,
        category,
        price: Number(price),
        imageUrl,
        sellerId: user.uid,
        inStock: true,
        createdAt: new Date().toISOString()
      });

      router.push('/seller/products');
    } catch (err) {
      console.error(err);
      setError('Failed to create product. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (loading || !user || user.role !== 'seller') {
    return <div className="min-h-[80vh] flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-[80vh] pt-32 pb-12 px-4 flex justify-center">
      <div className="max-w-xl w-full space-y-6 bg-white p-8 rounded-xl shadow-lg border border-[var(--color-primary)]/10">
        <h2 className="text-center text-3xl font-heading font-bold text-gray-900">
          Add New Product
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#5e3b2e] focus:border-[#5e3b2e] sm:text-sm"
              placeholder="Exquisite Pashmina Shawl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#5e3b2e] focus:border-[#5e3b2e] sm:text-sm"
              placeholder="Detailed description of the product..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#5e3b2e] focus:border-[#5e3b2e] sm:text-sm"
                placeholder="Shawls, Carpets, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (Fixed)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:ring-[#5e3b2e] focus:border-[#5e3b2e] sm:text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#5e3b2e]/10 file:text-[#5e3b2e] hover:file:bg-[#5e3b2e]/20"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5e3b2e] hover:bg-[#4a2e24] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5e3b2e] disabled:opacity-75"
            >
              {isSubmitting ? 'Uploading...' : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
