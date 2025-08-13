'use client';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="relative h-screen flex items-center overflow-hidden pt-20">
            {/* Background Image */}
            <div className="realtive inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Modern lighting solutions showcase"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            </div>
        </section>
    );
};

export default HeroSection;