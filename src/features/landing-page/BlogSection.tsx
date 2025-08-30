'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AddButton from '@/components/AddButton';
import { useActions } from '@/hooks/useActions';
import { toast } from 'sonner';

const blogPosts = [
  {
    id: 1,
    image: '/prodcut-4.jpg',
    category: 'INTERIOR DESIGN',
    title: 'Choosing the Perfect Warm Lighting for Your Living Room',
    date: 'March 14, 2026',
    author: 'By Michael Brown'
  },
  {
    id: 2,
    image: '/prodcut-5.jpg',
    category: 'LIGHTING TIPS',
    title: '5 Ways to Brighten Your Home Without Raising Your Energy Bill',
    date: 'April 5, 2025',
    author: 'By Sarah Johnson'
  },
  {
    id: 3,
    image: '/prodcut-6.jpg',
    category: 'INSPIRATION',
    title: 'Transforming Your Backyard With our Solar Lights',
    date: 'June 29, 2025',
    author: 'By Emily Harris'
  }
];

const BlogSection = () => {
  const { product } = useActions();
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 lg:mb-16">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-main-text)] mb-2 sm:mb-4">
              From our <span className="text-[var(--color-primary-accent)]">Blog</span>
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-secondary-text)] px-4">
              Insights, tips, and inspiration for lighting up your world.
            </p>
          </div>
          <AddButton 
            type="blog" 
            onAdd={async (data) => {
              // For blog posts, you might want to create a separate action
              console.log('Adding blog post:', data);
              
            }}
            className="bg-[var(--color-logo)] hover:bg-[var(--color-logo)]/90 text-white"
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              {/* Blog Post Image */}
              <div className="relative h-40 sm:h-44 lg:h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Blog Post Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                {/* Category Tag */}
                <div className="inline-block bg-[var(--color-logo)] text-white px-2 py-1 sm:px-3 sm:py-1 rounded text-xs font-semibold mb-3 sm:mb-4">
                  {post.category}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[var(--color-logo)] mb-3 sm:mb-4 leading-tight">
                  {post.title}
                </h3>

                {/* Meta Information */}
                <div className="text-xs sm:text-sm text-[var(--color-secondary-text)] space-y-1">
                  <p>{post.date}</p>
                  <p>{post.author}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
        <Link
            href="#"
            className="inline-flex items-center bg-[var(--color-logo)] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium shadow-md transition-colors group text-sm sm:text-base"
          >
            Read More Articles
            <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
