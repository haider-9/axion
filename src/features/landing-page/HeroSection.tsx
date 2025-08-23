'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative flex flex-col border-0 sm:border-8 border-accent-foreground md:flex-row items-center justify-center bg-[var(--color-primary-dark)] text-[var(--color-warm-white)] min-h-screen">
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
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center md:justify-between items-center max-w-7xl z-10 h-full py-12 sm:py-16 md:py-20">
        {/* Left side text - optimized for mobile */}
        <div className="max-w-xl w-full space-y-4 sm:space-y-6 md:space-y-8 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold">
            Illuminate Your World with <span className="text-[var(--color-primary)]">Axion</span>
          </h1>
          <p className="text-[var(--color-secondary-text)] text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
            Smart lighting redefined, blending elegance, efficiency, and innovation to brighten your
            world.
          </p>
          {/* CTA Button */}
          <div className="flex justify-center md:justify-start">
            <Link
              href="#"
              className="inline-flex items-center bg-[var(--color-logo)] text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg font-medium shadow-md transition-colors group text-sm sm:text-base"
            >
              Explore Our Story
              <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right side lamp + table - hidden on small screens */}
        <div className="hidden lg:flex flex-col w-auto mt-8 lg:mt-0">
          {/* Lamp + Table wrapper */}
          <div className="relative flex flex-col items-center">
            {/* Pulse Glow Above Lamp */}
            <div className="absolute left-1/2 -translate-x-1/2 translate-y-10 w-20 lg:w-24 xl:w-32 h-20 lg:h-24 xl:h-32 rounded-full bg-[var(--color-golden)] opacity-40 blur-3xl animate-pulse"></div>

            {/* Lamp */}
            <Image
              src="/lamp.png"
              alt="Lamp"
              width={180}
              height={180}
              className="drop-shadow-2xl relative z-10 lg:w-[250px] lg:h-[320px] xl:w-[300px] xl:h-[400px]"
            />

            {/* Table directly below lamp */}
            <Image
              src="/table.png"
              alt="Table"
              width={180}
              height={90}
              className="drop-shadow-lg brightness-30 lg:w-[230px] lg:h-[160px] xl:w-[280px] xl:h-[200px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
