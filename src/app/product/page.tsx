'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const productCategories = [
  {
    id: 1,
    title: 'INDOOR LIGHTING',
    description: 'Illuminate every corner with elegance.',
    items: '45 Items',
    image: '/prodcut-1.jpg',
    href: '/product/indoor',
  },
  {
    id: 2,
    title: 'SOLAR LIGHTING',
    description: 'Light powered by the sun.',
    items: '29 Items',
    image: '/prodcut-2.jpg',
    href: '/product/solar',
  },
  {
    id: 3,
    title: 'OUTDOOR LIGHTING',
    description: 'Bold lighting for open spaces',
    items: '37 Items',
    image: '/prodcut-3.jpg',
    href: '/product/outdoor',
  },
  {
    id: 4,
    title: 'ON SALE PRODUCTS',
    description: 'Best Products currently on sale for a limited time',
    items: '13 Items',
    image: '/prodcut-4.jpg',
    href: '/product/sale',
  },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader
        title="Our"
        titleHighlight="Products"
        subtitle="Explore our premium lighting collection."
      />

      {/* Product Categories */}
      <section>
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
          {productCategories.map((product) => (
            <div
              key={product.id}
              className="relative rounded-xl mb-10 overflow-hidden md:col-span-2 group"
            >
              <Image
                src={product.image}
                alt={product.title || 'Product category'}
                width={1200}
                height={400}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>

              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-2xl font-bold drop-shadow-md">{product.title}</h3>
                  <p className="text-white/90 mt-2 max-w-lg">{product.description}</p>
                </div>

                {/* Enhanced button with better hover effects */}
                <Link
                  href={product.href}
                  className="inline-flex items-center bg-white/20 text-white px-5 py-2.5 rounded-full mt-4 w-fit backdrop-blur-sm 
                  transition-all duration-300 hover:bg-white/30 hover:px-6 hover:shadow-lg"
                  aria-label={`Explore ${product.title}`}
                >
                  <span>Explore</span>
                  <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
