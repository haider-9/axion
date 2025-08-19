'use client';

import Image from 'next/image';
import Link from 'next/link';
import {ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative flex flex-col border-8 border-accent-foreground md:flex-row items-center justify-between bg-[var(--color-primary-dark)] text-[var(--color-warm-white)] pb-10 min-h-[80vh] md:min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-image.jpg"
          alt="Smart lighting background"
          fill
          priority
          className="object-cover brightness-30"
        />
        {/* Overlay */}
        <div className="absolute inset-0"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between max-w-7xl z-10 ">
        {/* Left side text */}
        <div className="max-w-xl w-full space-y-6 mt-0 md:mt-10 order-1 md:order-none">
          <h1 className="text-4xl md:text-6xl leading-snug">
            Illuminate Your World with <span className="text-[var(--color-primary)]">Axion</span>
          </h1>
          <p className="text-[var(--color-secondary-text)] text-base md:text-xl leading-relaxed">
            Smart lighting redefined, blending elegance, efficiency, and innovation to brighten your
            world.
          </p>
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

        {/* Right side lamp + table anchored to bottom */}
        <div className="flex flex-col w-full md:w-auto mt-10 md:mt-0">
          {/* Lamp + Table wrapper */}
          <div className="relative flex flex-col items-center">
            {/* Pulse Glow Above Lamp */}
            <div className="absolute left-1/2 -translate-x-1/2 translate-y-10 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-[var(--color-golden)] opacity-40 blur-3xl animate-pulse"></div>

            {/* Lamp */}
            <Image
              src="/lamp.png"
              alt="Lamp"
              width={180}
              height={180}
              className="drop-shadow-2xl relative z-10 sm:w-[300px] sm:h-[400px]"
            />

            {/* Table directly below lamp */}
            <Image
              src="/table.png"
              alt="Table"
              width={180}
              height={90}
              className="drop-shadow-lg brightness-30 sm:w-[280px] sm:h-[200px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
