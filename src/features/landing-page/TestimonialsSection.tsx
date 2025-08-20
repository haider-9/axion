'use client';

import Image from 'next/image';
import { ArrowLeft, ArrowRight,  Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Sophia Martinez',
    title: 'Interior Designer',
    rating: 5,
    text: 'Axion Lighting completely transformed my living space. The quality of the lamps is unmatched — the finishes feel luxurious, and the light is warm and inviting. I especially love their solar range, which blends beautifully with my outdoor setup and saves on energy costs.',
    image: '/prodcut-1.jpg'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Architect',
    rating: 5,
    text: 'The attention to detail in Axion\'s lighting fixtures is remarkable. Each piece feels like a work of art that perfectly complements any interior design. Their customer service is exceptional too.',
    image: '/prodcut-2.jpg'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    title: 'Homeowner',
    rating: 5,
    text: 'I was amazed by the quality and design of my new outdoor lighting. The solar-powered options are not only beautiful but incredibly energy-efficient. My garden has never looked better!',
    image: '/prodcut-3.jpg'
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-[var(--color-background)]">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">
            What Our <span className="text-[var(--color-primary-accent)]">Customer</span> Say
          </h2>
          <p className="text-md text-[var(--color-secondary-text)]">
            Trusted by thousands of lighting lovers worldwide.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          {/* Mobile: arrows below card, Desktop: arrows on sides */}
          <div className="hidden md:block">
            <Button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg"
            >
              <ArrowRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl md:pl-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Testimonial Content */}
              <div className="space-y-6 p-0 sm:p-10">
                <div className="text-xl text-semibold text-black ">
                  Client Feedback
                </div>
                
                <blockquote className="text-lg md:text-xl text-[var(--color-secondary-text)] leading-relaxed italic">
                {`"${currentTestimonial.text}"`}
                </blockquote>

                {/* Reviewer Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--color-secondary)] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-main-text)]">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-[var(--color-secondary-text)]">
                      {currentTestimonial.title}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[var(--color-golden)] text-[var(--color-golden)]" />
                  ))}
                </div>
              </div>

              {/* Right Side - Product Image */}
              <div className="h-64 w-full md:h-full flex items-center justify-center">
                <Image
                  src={currentTestimonial.image}
                  alt="Lighting fixture"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover rounded-2xl md:rounded-r-2xl"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Pagination Dots & Mobile Arrows */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[var(--color-primary)] w-4 h-4'
                      : 'bg-[var(--color-border)] hover:bg-[var(--color-primary-light)]'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-4 md:hidden">
              <Button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
