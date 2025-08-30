'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AddButton from '@/components/AddButton';
import { useActions } from '@/hooks/useActions';
import { getFeaturedProducts } from '@/app/actions/products/enhanced-actions';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  slug: string;
  featured?: boolean;
}

const FeaturedProducts = () => {
  const { product } = useActions();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const result = await getFeaturedProducts(6);
        
        if (result.success && result.data) {
          setProducts(result.data as Product[]);
        } else {
          console.error('Failed to fetch featured products:', result.error);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddProduct = async (data: Record<string, unknown>) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'images' && Array.isArray(value)) {
          // Handle multiple images
          value.forEach((imageUrl: string) => {
            formData.append('images', imageUrl);
          });
        } else if (typeof value === 'boolean') {
          formData.append(key, value ? 'true' : 'false');
        } else {
          formData.append(key, value as string);
        }
      });
      
      await product.create(formData);
      
      // Refresh the products list after adding a new one
      const result = await getFeaturedProducts(6);
      if (result.success && result.data) {
        setProducts(result.data as Product[]);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="bg-[#050B1B] px-4 sm:px-5 py-6 sm:py-8">
        <div className="max-w-[85rem] mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
              Featured Products
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Loading featured products...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-[var(--color-primary-dark)] rounded-lg overflow-hidden animate-pulse">
                <div className="w-full h-64 bg-gray-700"></div>
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050B1B] px-4 sm:px-5 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 max-w-[85rem] mx-auto px-4">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-white">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl sm:max-w-2xl">
            Discover our best-selling lighting solutions, crafted for every space.
          </p>
        </div>
        <AddButton 
          type="product" 
          onAdd={handleAddProduct}
          className="bg-[var(--color-logo)] hover:bg-[var(--color-logo)]/90 text-white"
        />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 max-w-[85rem] mx-auto">
          <div className="bg-[var(--color-primary-dark)] rounded-lg p-8">
            <h3 className="text-xl font-semibold text-white mb-4">No Featured Products Yet</h3>
            <p className="text-gray-400 mb-6">
              Get started by adding your first featured product to showcase on the homepage.
            </p>
           
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 max-w-[85rem] mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[var(--color-primary-dark)] rounded-lg overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative w-full h-48 sm:h-56 md:h-64">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="rounded-t-lg object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>

                {/* Product Content */}
                <div className="p-4 sm:p-5 flex flex-col items-center text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">{product.name}</h3>
                  <p className="text-sm sm:text-base text-gray-100 my-2 sm:my-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="text-base sm:text-lg font-bold text-white my-3 sm:my-4">
                    Rs. {product.price.toLocaleString()}
                  </div>

                  <Link
                    href={`/product/${product.slug}`}
                    className="border border-primary w-full text-primary px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors duration-300 hover:bg-primary hover:text-white text-sm sm:text-base"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center bg-[var(--color-logo)] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium shadow-md transition-colors group text-sm sm:text-base"
            >
              View All Products
              <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedProducts;