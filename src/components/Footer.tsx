'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#0B1D39] text-white">
      {/* Main Footer Content */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Information */}
          <div className="space-y-6">
            <div className='size-28 overflow-hidden flex items-center justify-center'>
              <Image
              src={'/Logo.png'}
              alt={'logo'}
              width={100}
              height={100}
              className='object-cover object-center brightness-200 '
              />
            </div>
          
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/category" className="text-white/80 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/projects" className="text-white/80 hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/blog" className="text-white/80 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faqs" className="text-white/80 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/privacy" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/80 hover:text-white transition-colors">Terms & Condition</Link></li>
              <li><Link href="/return" className="text-white/80 hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link href="/shipping" className="text-white/80 hover:text-white transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[var(--color-secondary)]" />
                <span className="text-white/80">+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[var(--color-secondary)]" />
                <span className="text-white/80">info@axion.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--color-secondary)] mt-1" />
                <span className="text-white/80 text-sm">
                  123 Crescent Avenue, Blue Heights, Islamabad, Pakistan 44000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/80">
              2025 © Axion All Rights Reserved.
            </p>
            <p className="text-sm text-white/80">
              Designed & Developed by Synctom
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
