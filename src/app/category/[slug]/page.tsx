'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
// import Image from 'next/image';

import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

// Dummy product data
const products = [
  {
    id: 1,
    slug: 'square-wall-lamp',
    name: 'Square Wall Lamp',
    price: 12500,
    img: '/prodcut-1.jpg',
  },
  { id: 2, slug: 'cancorde-lamp', name: 'Cancorde Lamp', price: 59999, img: '/prodcut-2.jpg' },
  { id: 3, slug: 'hanging-lights', name: 'Hanging Lights', price: 3999, img: '/prodcut-3.jpg' },
  {
    id: 4,
    slug: 'strip-chandelier',
    name: 'Strip Chandelier',
    price: 49500,
    img: '/prodcut-4.jpg',
  },
  { id: 5, slug: 'neom-chandelier', name: 'Neom Chandelier', price: 29999, img: '/prodcut-5.jpg' },
  { id: 6, slug: 'lighthouse-lamp', name: 'Lighthouse Lamp', price: 9500, img: '/prodcut-6.jpg' },
  { id: 7, slug: 'vanity-light', name: 'Vanity Light', price: 19500, img: '/prodcut-7.jpg' },
  {
    id: 8,
    slug: 'square-wall-lamp-2',
    name: 'Square Wall Lamp',
    price: 12500,
    img: '/prodcut-8.jpg',
  },
];

const CategoryPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  // Countdown Timer for Sale (HH:MM:SS style)
  const [timeLeft, setTimeLeft] = React.useState('22:13:49');
  React.useEffect(() => {
    if (slug === 'sale') {
      // Set target time to 22:13:49 from now
      const targetTime = new Date().getTime() + 22 * 60 * 60 * 1000 + 13 * 60 * 1000 + 49 * 1000;
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetTime - now;
        if (distance <= 0) {
          clearInterval(timer);
          setTimeLeft('00:00:00');
          return;
        }
        const hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, '0');
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [slug]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* Header */}
      <PageHeader
        title={slug.charAt(0).toUpperCase() + slug.slice(1)}
        titleHighlight="Lighting"
        subtitle="Illuminate every corner with elegance."
      />

      {/* Countdown Timer for Sale (styled like OnSale.tsx) */}
      {slug === 'sale' && (
        <div className="mt-3 text-red-600 font-semibold flex items-center justify-center gap-2 mb-6">
          <span>⏰ Sale Ends in</span>
          <span className="text-red-700 font-bold">{timeLeft}</span>
        </div>
      )}

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-6 mb-12 bg-gray-50 p-5 rounded-xl shadow-sm">
          {/* Category Select */}
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Indoor Lights" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Indoor Lights</SelectItem>
              <SelectItem value="wall">Wall Lamps</SelectItem>
              <SelectItem value="chandelier">Chandeliers</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Select */}
          <Select>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Rs. 3,000 - Rs. 8,000</SelectItem>
              <SelectItem value="mid">Rs. 8,000 - Rs. 20,000</SelectItem>
              <SelectItem value="high">Above Rs. 20,000</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" className="ml-auto text-gray-500 hover:text-black">
            Clear Filters
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentItems.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              img={item.img}
              href={`/product/${item.slug}`}
              onAddToCart={() => {}}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(products.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
