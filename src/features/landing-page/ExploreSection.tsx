'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe2, Leaf, PenTool } from 'lucide-react';

const ExploreSection = () => {
  return (
    <section className="relative py-12 sm:py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="container min-h-[200px] h-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
        {/* Left Image Card */}
        <div className="relative rounded-2xl min-h-[250px] sm:min-h-[350px] md:min-h-[500px] h-full overflow-hidden shadow-lg flex items-center justify-center">
          <Image
            src="/about-image.jpg"
            alt="Lighting innovation"
            fill
            className="object-top object-cover rounded-2xl"
          />
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            <div className="text-black">Lighting Innovation for</div>
            <span className="text-[var(--color-primary)]"> Modern Living</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            At Axion, we blend cutting-edge lighting technology with timeless design aesthetics. Our products illuminate spaces while enhancing comfort, sustainability, and style.
          </p>

          {/* Feature List */}
          <ul className="space-y-4 text-gray-700 text-sm sm:text-base">
            <li className="flex items-center gap-3">
              <PenTool className="w-5 h-5 text-gray-600" />
              <span>Precision Crafted Designs</span>
            </li>
            <li className="flex items-center gap-3">
              <Leaf className="w-5 h-5 text-gray-600" />
              <span>Eco-Friendly Materials</span>
            </li>
            <li className="flex items-center gap-3">
              <Globe2 className="w-5 h-5 text-gray-600" />
              <span>Globally Trusted Quality</span>
            </li>
          </ul>

          {/* CTA Button */}
          <Link
            href="#"
            className="inline-flex items-center bg-[var(--color-logo)] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium shadow-md transition-colors group text-sm sm:text-base"
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

export default ExploreSection;
