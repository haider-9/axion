'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AddButton from '@/components/AddButton';
import { useActions } from '@/hooks/useActions';

const FeaturedProducts = () => {
  const { product } = useActions();
  const products = [
    {
      name: 'Outdoor Garden Lamp',
      description: 'Eco-friendly garden lamp that will lighten up your garden with vibe',
      price: 'Rs. 3,249',
      image: '/prodcut-1.jpg',
    },
    {
      name: 'Solar Fairy String',
      description: 'Festive, weatherproof lights for patios and gatherings.',
      price: 'Rs. 4,250',
      image: '/prodcut-2.jpg',
    },
    {
      name: 'Neom Chandelier',
      description: 'Neom Chandelier is artistic piece of fixture that signifies quality',
      price: 'Rs. 29,999',
      image: '/prodcut-3.jpg',
    },
    {
      name: 'Cancorde Ceiling Lamp',
      description: 'Upgrade your interior with our Cancorde Ceiling Lamp',
      price: 'Rs. 59,999',
      image: '/prodcut-4.jpg',
    },
    {
      name: 'Solar Energy Ball',
      description: 'Decorate your gardens with something which is wireless',
      price: 'Rs. 2,999',
      image: '/prodcut-5.jpg',
    },
    {
      name: 'Flame Bollard Lights',
      description: 'Adds cozy flickering glow of a flame style lantern.',
      price: 'Rs. 13,999 (Set of 4)',
      image: '/prodcut-6.jpg',
    },
  ];

  return (
    <div className=" bg-[#050B1B] px-4 sm:px-5 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 max-w-[85rem] mx-auto px-4">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">
            <span className="text-2xl sm:text-3xl text-white">Featured</span> Products
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl sm:max-w-2xl">
            Discover our best-selling lighting solutions, crafted for every space.
          </p>
        </div>
        <AddButton 
          type="product" 
          onAdd={async (data) => {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
              formData.append(key, value as string);
            });
            await product.create(formData);
          }}
          className="bg-[var(--color-logo)] hover:bg-[var(--color-logo)]/90 text-white"
        />
      </div>

      <div className="grid grid-cols-1 max-w-[85rem] mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-[var(--color-primary-dark)] rounded-lg overflow-hidden group"
          >
            {/* Product Image */}
            <div className="relative w-full h-48 sm:h-56 md:h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="rounded-t-lg object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Content */}
            <div className="p-4 sm:p-5 flex flex-col items-center text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white">{product.name}</h3>
              <p className="text-sm sm:text-base text-gray-100 my-2 sm:my-3">{product.description}</p>
              <div className="text-base sm:text-lg font-bold text-white my-3 sm:my-4">{product.price}</div>

              <Link
                href="#"
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
          href="#"
          className="inline-flex items-center bg-[var(--color-logo)] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium shadow-md transition-colors group text-sm sm:text-base"
        >
          Explore Our Story
          <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
