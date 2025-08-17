'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  { id: 1, name: 'Square Wall Lamp', price: 12500, img: '/prodcut-1.jpg' },
  { id: 2, name: 'Cancorde Lamp', price: 59999, img: '/prodcut-2.jpg' },
  { id: 3, name: 'Hanging Lights', price: 3999, img: '/prodcut-3.jpg' },
  { id: 4, name: 'Strip Chandelier', price: 49500, img: '/prodcut-4.jpg' },
  { id: 5, name: 'Neom Chandelier', price: 29999, img: '/prodcut-5.jpg' },
  { id: 6, name: 'Lighthouse Lamp', price: 9500, img: '/prodcut-6.jpg' },
  { id: 7, name: 'Vanity Light', price: 19500, img: '/prodcut-7.jpg' },
  { id: 8, name: 'Square Wall Lamp', price: 12500, img: '/prodcut-8.jpg' },
];

const CategoryPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

          {/* Colors */}
          <div className="flex gap-3 items-center">
            {['#000', '#fff', '#cfcfcf', '#e0d7c5', '#f4eee2'].map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>

          <Button variant="ghost" className="ml-auto text-gray-500 hover:text-black">
            Clear Filters
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentItems.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl overflow-hidden py-0 pb-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="relative w-full h-56">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-cover object-center size-full"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Rs. {item.price.toLocaleString()}</p>
                <Button className="w-full">Add to Cart</Button>
              </CardContent>
            </Card>
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
