'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Cancorde Ceiling Lamp',
    description: 'Upgrade your interior with our Cancorde Ceiling Lamp',
    price: 'Rs. 49,999',
    oldPrice: 'Rs. 59,000',
    discount: '15% OFF',
    img: '/prodcut-4.jpg', // replace with actual image path
  },
  {
    id: 2,
    name: 'Outdoor Garden Lamp',
    description: 'Eco-friendly garden lamp that will lighten up your garden with vibe',
    price: 'Rs. 2,599',
    oldPrice: 'Rs. 3,240',
    discount: '12% OFF',
    img: '/prodcut-1.jpg',
  },
  {
    id: 3,
    name: 'Strip Chandelier',
    description: 'Upgrade your interior with our Cancorde Ceiling Lamp',
    price: 'Rs. 44,999',
    oldPrice: 'Rs. 49,000',
    discount: '09% OFF',
    img: '/prodcut-7.jpg',
  },
];

const SaleSection = () => {
  const [timeLeft, setTimeLeft] = useState('22:13:49');

  // Countdown timer simulation
  useEffect(() => {
    const targetTime = new Date().getTime() + 22 * 60 * 60 * 1000 + 13 * 60 * 1000 + 49 * 1000;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft('00:00:00');
        return;
      }

      const hours = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const minutes = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((distance / 1000) % 60)).padStart(2, '0');

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 px-5 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold text-blue-600">
        On Sale <span className="text-black">Now</span>
      </h2>
      <p className="text-gray-600 mt-1">
        Limited-time deals on our best lights, don&apos;t miss out.
      </p>

      <div className="mt-3 text-red-600 font-semibold flex items-center justify-center gap-2">
        <span>⏰ Sale Ends in</span>
        <span className="text-red-700 font-bold">{timeLeft}</span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {products.map((product) => (
          <Link
            key={product.id}
            href="#"
            className="bg-white shadow-md rounded-xl overflow-hidden relative flex flex-col hover:shadow-lg transition-shadow duration-300"
          >
            {/* Discount Badge */}
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
              {product.discount}
            </div>
            <Image
              src={product.img}
              alt={product.name}
              width={400}
              height={250}
              className="w-full h-64 object-top object-cover"
            />
            <div className="p-5 text-left flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="mt-3">
                  <span className="text-[var(--color-primary)] font-bold">{product.price}</span>
                  <span className="line-through text-gray-400 text-sm ml-2">
                    {product.oldPrice}
                  </span>
                </div>
              </div>
              <span className="border border-primary w-full text-primary px-4 py-2 rounded-lg mt-4 block text-center bg-white transition-colors duration-300 hover:bg-primary hover:text-white font-medium cursor-pointer">
                Shop Now
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="#"
        className="inline-flex mt-6 items-center bg-[var(--color-logo)] text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors group"
      >
        Explore Sale
        <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </section>
  );
};

export default SaleSection;
