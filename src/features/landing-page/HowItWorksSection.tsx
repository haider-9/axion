'use client';

import { Search, Brush, Truck, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Browse Our Collection',
    description:
      'Discover our wide range of indoor, outdoor, and solar lighting — crafted to suit every space.',
  },
  {
    id: 2,
    icon: Brush,
    title: 'Customize & Order',
    description:
      'Choose the perfect size, finish, or style. Place your order securely in just a few clicks.',
  },
  {
    id: 3,
    icon: Truck,
    title: 'Fast & Secure Delivery',
    description:
      'We ensure quick, safe delivery straight to your doorstep, ready for installation.',
  },
  {
    id: 4,
    icon: Lightbulb,
    title: 'Enjoy the Glow',
    description: 'Switch it on, and let the perfect ambiance transform your space instantly.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-#F4F6F8">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">
            How it <span className="text-[var(--color-primary-accent)]">Works</span>
          </h2>
          <p className="text-md text-[var(--color-secondary-text)]">
            From browsing to brightening your space, here&apos;s our simple process.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="text-center group">
                {/* Step Icon */}
                <div className="relative mb-6">
                  <div className="size-20 mx-auto  rounded-full flex items-center justify-center ">
                    <IconComponent className="size-full text-[var(--color-logo)]" />
                  </div>
                  {/* Step Number */}
                </div>
                  <div>
                   Step {step.id.toString().padStart(2, '0')}
                  </div>

                {/* Step Content */}
                <h3 className="text-xl font-semibold text-[var(--color-logo)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--color-logo)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center p-6">
          {/* Call to Action */}
          <Link
            href="#"
            className="inline-flex items-center bg-[var(--color-logo)] text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors group"
          >
           Shop Now
            <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
