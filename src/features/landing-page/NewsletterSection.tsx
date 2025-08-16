'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

const NewsletterSection = () => {


  return (
    <section className="relative  py-20 rounded-lg mb-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/collection-3.jpg"
          alt="Newsletter background"
          fill
          className="object-cover brightness-90"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6">
          Subscribe to our Newsletter
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Subscribe to our news letter & stay updated with the latest blinds trends & offers.
        </p>
        {/* Newsletter Form */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center border-4 border-white bg-white rounded-full shadow overflow-hidden w-[500px] focus-within:border-white">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-1 px-4 py-3 text-gray-600 rounded-l-full
            border-none focus:outline-none focus:ring-0 focus:border-none"
              aria-label="Email address"
            />
            <Button
              className="bg-[#0a2b57] text-white p-6 rounded-full font-medium
            hover:bg-[#0c3566] transition-colors
            focus:outline-none focus:ring-0"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
