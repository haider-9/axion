'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import { ShoppingCart, X } from 'lucide-react';

// Mock wishlist data
const wishlistData = [
  {
    id: '1',
    name: 'Vanity Light',
    price: 'Rs. 14,500',
    image: '/collection-1.jpg',
  },
  {
    id: '2',
    name: 'Solar Hanging Bulb',
    price: 'Rs. 4,500',
    image: '/collection-2.jpg',
  },
  {
    id: '3',
    name: 'Solar Pathway Lights',
    price: 'Rs. 3,500',
    image: '/product-1.jpg',
  },
  {
    id: '4',
    name: 'Solar Lighting Bush',
    price: 'Rs. 5,500',
    image: '/product-2.jpg',
  },
  {
    id: '5',
    name: 'Foyer Wall Lamp',
    price: 'Rs. 5,500',
    image: '/about-image.jpg',
  },
  {
    id: '6',
    name: 'Modern Ceiling Light',
    price: 'Rs. 8,900',
    image: '/hero-image.jpg',
  },
];

export default function WishlistPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistItems, setWishlistItems] = useState(wishlistData);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);

  // Paginate wishlist items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = wishlistItems.slice(startIndex, startIndex + itemsPerPage);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (id: string) => {
    // Add to cart logic here
    console.log('Added to cart:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="My"
        titleHighlight="Wishlist"
        subtitle="Save the products you love for later"
      />

      <div className="max-w-[85rem] mx-auto px-4 py-8">
        {/* Wishlist Grid */}
        {paginatedItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedItems.map((item) => (
                <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow group">
                  <CardContent className="p-6">
                    {/* Product Image */}
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-4 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                      <p className="text-2xl font-bold text-blue-600">{item.price}</p>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => addToCart(item.id)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => removeFromWishlist(item.id)}
                          className="px-3"
                        >
                          Remove Wishlist
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {wishlistItems.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding products you love to your wishlist!</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Continue Shopping
            </Button>
          </div>
        )}

        {/* View Order History Link */}
        <div className="mt-12 text-center">
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            View Order History →
          </Button>
        </div>
      </div>
    </div>
  );
}
