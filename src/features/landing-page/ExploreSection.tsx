'use client';

import Image from 'next/image';
import { PenTool, Leaf, Globe2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="relative py-16 bg-white">
      <div className="container  min-h-[300px] h-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Image Card */}
        <div className="relative rounded-2xl min-h-[500px] h-full overflow-hidden shadow-lg flex items-center justify-center">
          <Image
            src="/about-image.jpg"
            alt="Lighting innovation"
            fill
            className="object-top object-cover rounded-2xl"
          />
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug">
            <div className="text-black">Lighting Innovation for</div>
            <span className="text-[var(--color-primary)]"> Modern Living</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            At Axion, we blend cutting-edge lighting technology with timeless design aesthetics. Our
            products illuminate spaces while enhancing comfort, sustainability, and style.
          </p>

          {/* Feature List */}
          <ul className="space-y-4 text-gray-700 text-base">
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

export default AboutSection;
