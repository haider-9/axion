'use client';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';
import Image from 'next/image';
import React, { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    image: '/prodcut-4.jpg',
    category: 'INTERIOR DESIGN',
    title: 'Choosing the Perfect Warm Lighting for Your Living Room',
    date: 'March 14, 2026',
    author: 'By Michael Brown',
  },
  {
    id: 2,
    image: '/prodcut-5.jpg',
    category: 'LIGHTING TIPS',
    title: '5 Ways to Brighten Your Home Without Raising Your Energy Bill',
    date: 'April 5, 2025',
    author: 'By Sarah Johnson',
  },
  {
    id: 3,
    image: '/prodcut-6.jpg',
    category: 'INSPIRATION',
    title: 'Transforming Your Backyard With our Solar Lights',
    date: 'June 29, 2025',
    author: 'By Emily Harris',
  },
  {
    id: 4,
    image: '/prodcut-1.jpg',
    category: 'DESIGN',
    title: 'Modern Lighting Trends for 2025',
    date: 'May 10, 2025',
    author: 'By Alex Lee',
  },
  {
    id: 5,
    image: '/prodcut-2.jpg',
    category: 'TIPS',
    title: 'How to Save Energy with Smart Lighting',
    date: 'May 20, 2025',
    author: 'By Priya Singh',
  },
  {
    id: 6,
    image: '/prodcut-3.jpg',
    category: 'INSPIRATION',
    title: 'Creative Outdoor Lighting Ideas',
    date: 'June 1, 2025',
    author: 'By John Doe',
  },
  {
    id: 7,
    image: '/prodcut-7.jpg',
    category: 'INTERIOR DESIGN',
    title: 'Lighting for Small Spaces',
    date: 'June 15, 2025',
    author: 'By Jane Smith',
  },
  {
    id: 8,
    image: '/prodcut-8.jpg',
    category: 'LIGHTING TIPS',
    title: 'Best Bulbs for Cozy Bedrooms',
    date: 'July 1, 2025',
    author: 'By Omar Farooq',
  },
  {
    id: 9,
    image: '/prodcut-5.jpg',
    category: 'INSPIRATION',
    title: 'Solar Lighting for Gardens',
    date: 'July 10, 2025',
    author: 'By Emily Harris',
  },
];

const itemsPerPage = 6;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = blogPosts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader
        title="Our"
        titleHighlight="Blog"
        subtitle="Insights, tips, and inspiration for lighting up your world."
      />

      {/* Blog Content */}
      <section className="py-20">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            {currentItems.map((post) => (
              <article key={post.id} className="bg-white rounded-xl overflow-hidden">
                {/* Blog Post Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Blog Post Content */}
                <div className="p-6">
                  {/* Category Tag */}
                  <div className="inline-block bg-[var(--color-logo)] text-white px-3 py-1 rounded text-xs font-semibold mb-4">
                    {post.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[var(--color-logo)] mb-4 leading-tight">
                    {post.title}
                  </h3>

                  {/* Meta Information */}
                  <div className="text-sm text-[var(--color-secondary-text)] space-y-1">
                    <p>{post.date}</p>
                    <p>{post.author}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </div>
  );
}
