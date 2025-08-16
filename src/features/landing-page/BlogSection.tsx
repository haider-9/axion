'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <section className="py-20">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[var(--color-main-text)] mb-4">
            From our <span className="text-[var(--color-primary-accent)]">Blog</span>
          </h2>
          <p className="text-md text-[var(--color-secondary-text)]">
            Insights, tips, and inspiration for lighting up your world.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl  overflow-hidden">
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

        {/* Call to Action */}
        <div className="text-center">
        <Link
            href="#"
            className="inline-flex items-center bg-[var(--color-logo)] text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors group"
          >
            Explore Our Story
            <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
