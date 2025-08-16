'use client';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Collections() {
  return (
    <section className="py-12">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">
            <span className='text-black'>

          Explore Our Lightning 
            </span>
          <span className="text-[var(--color-primary)]"> Collections</span>
        </h2>
        <p className="text-gray-600 mt-2">
          From modern neon art to eco-friendly outdoor illumination
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto px-4">
        {/* Indoor Lighting */}
        <div className="relative rounded-xl overflow-hidden">
          <Image
            src="/collection-1.jpg"
            alt="Indoor Lighting"
            width={600}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-white text-2xl font-bold">INDOOR LIGHTING</h3>
              <p className="text-white mt-1">Illuminate every corner with elegance.</p>

              {/* Button on Top */}
              <Link
                href="#"
                className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full  mt-4 w-fit h-8 backdrop-blur-sm transition hover:bg-white/30 group"
              >
                Explore
                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Solar Lighting */}
        <div className="relative rounded-xl overflow-hidden">
          <Image
            src="/collection-2.jpg"
            alt="Solar Lighting"
            width={600}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-white text-2xl font-bold">SOLAR LIGHTING</h3>
              <p className="text-white mt-1">Light powered by the sun.</p>

              {/* Button on Top */}
            <Link
                href="#"
                className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full  mt-4 w-fit h-8 backdrop-blur-sm transition hover:bg-white/30 group"
              >
                Explore
                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Outdoor Lighting - Full Width */}
        <div className="relative rounded-xl overflow-hidden md:col-span-2">
          <Image
            src="/collection-3.jpg"
            alt="Outdoor Lighting"
            width={1200}
            height={400}
            className="w-full h-72 object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-white text-2xl font-bold">OUTDOOR LIGHTING</h3>
              <p className="text-white mt-1">Bold lighting for open spaces.</p>

              {/* Button on Top */}
             <Link
                href="#"
                className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full  mt-4 w-fit h-8 backdrop-blur-sm transition hover:bg-white/30 group"
              >
                Explore
                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
          <div className='flex items-center justify-center p-6'>
             <Link
            href="#"
            className="inline-flex items-center bg-[var(--color-logo)] text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors group"
          >
            Explore Collection
            <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          </div>
    </section>
  );
}
