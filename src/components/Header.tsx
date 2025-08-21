'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Handbag,
  UserRound,
  Clock,
  Star,
  Trash2,
  Plus,
  Minus,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Header = () => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide header when scrolling from top
  useEffect(() => {
    const handleScroll = () => {
      // Hide header when scrolling away from top (scrollY > 0)
      if (window.scrollY > 0) {
        setHideOnScroll(true);
      } else {
        setHideOnScroll(false);
      }

      // Navbar color change logic
      if (window.scrollY > 150) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/category' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];


  const recentSearches = [
    'LED Strip Lights',
    'Smart Bulbs',
    'Industrial Fixtures',
    'Outdoor Lighting',
  ];

  const popularProducts = [
    { name: 'LED Panel Light 60W', category: 'LED Lights' },
    { name: 'Smart WiFi Bulb', category: 'Smart Lighting' },
    { name: 'Industrial High Bay', category: 'Industrial' },
  ];

  const cartItems = [
    { id: 1, name: 'LED Panel Light 60W', price: 89.99, quantity: 2, image: '/next.svg' },
    { id: 2, name: 'Smart WiFi Bulb Set', price: 45.99, quantity: 1, image: '/next.svg' },
    { id: 3, name: 'Industrial High Bay 150W', price: 199.99, quantity: 1, image: '/next.svg' },
  ];

  const pillTarget = hovered ?? pathname;

  return (
    <header
      className={cn(
        `fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-4 px-2 sm:px-6 mx-auto bg-transparent transition-transform duration-300`,
        [hideOnScroll ? '-translate-y-full' : 'translate-y-0'],
      )}
    >
      {/* Logo */}
      <div className={cn("size-16 flex items-center transition-colors duration-300", {
        "border rounded-xl bg-black/30": scrolled
      })}>
        <Image
          src="/Logo.png"
          alt="Axion Lighting Solutions Logo"
          width={100}
          height={50}
          className="brightness-200"
        />
      </div>

      {/* Desktop Navigation */}
      <nav className={cn("relative hidden lg:block py-1 px-1 rounded-full shadow-lg backdrop-blur-md bg-gray-300/30", {
        "bg-black/50": scrolled,
      })}>
        <ul className="flex items-center justify-between relative z-10">
          {navLinks.map((link) => {
            const isTarget = pillTarget === link.href;

            return (
              <li
                key={link.name}
                className="relative"
                onMouseEnter={() => setHovered(link.href)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Animated pill background */}
                {isTarget && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-y-0 left-0 right-0 bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <Link
                  href={link.href}
                  className={`relative z-10 rounded-full px-5 py-2 block transition-colors ${isTarget ? 'text-black' : 'text-white'
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden">
        <button className={cn("p-2 rounded-xl transition-all duration-300 hover:bg-white/20", {
          "bg-black/50": scrolled,
        })}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Icons */}
      <div className={cn("flex items-center bg-gray-300/50 backdrop-blur-xl rounded-full p-2 shadow-2xl border border-white/20", {
        "bg-black/50": scrolled,
      })}>
        <div className="flex items-center space-x-1">
          {/* Search Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="group relative p-1 rounded-xl transition-all duration-300 hover:bg-white/20 hover:shadow-lg ">
                <Search
                  size={20}
                  className="text-white/80 group-hover:text-[#2CA6A4] transition-colors duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#2CA6A4]/0 to-[#E1B857]/0 group-hover:from-[#2CA6A4]/10 group-hover:to-[#E1B857]/10 transition-all duration-300"></div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2" style={{ color: '#0C1E33' }}>
                  <Search size={24} style={{ color: '#2CA6A4' }} />
                  Search Products
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    size={20}
                    style={{ color: '#2CA6A4' }}
                  />
                  <input
                    type="text"
                    placeholder="Search for lighting products, categories, or brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 focus:outline-none focus:border-[#2CA6A4] transition-colors"
                    style={{ borderColor: '#E1B857', backgroundColor: 'white', color: '#0C1E33' }}
                    autoFocus
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3
                      className="flex items-center gap-2 font-medium mb-3"
                      style={{ color: '#0C1E33' }}
                    >
                      <Clock size={16} style={{ color: '#2CA6A4' }} />
                      Recent Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 rounded-full text-sm transition-colors"
                          style={{ backgroundColor: 'rgba(225, 184, 87, 0.2)', color: '#0C1E33' }}
                          onClick={() => setSearchQuery(search)}
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3
                      className="flex items-center gap-2 font-medium mb-3"
                      style={{ color: '#0C1E33' }}
                    >
                      <Star size={16} style={{ color: '#E1B857' }} />
                      Popular Products
                    </h3>
                    <div className="space-y-2">
                      {popularProducts.map((product, index) => (
                        <button
                          key={index}
                          className="w-full text-left p-3 rounded-lg hover:bg-[#2CA6A4]/10 transition-colors"
                          onClick={() => setSearchQuery(product.name)}
                        >
                          <div className="font-medium" style={{ color: '#0C1E33' }}>
                            {product.name}
                          </div>
                          <div className="text-sm" style={{ color: '#2CA6A4' }}>
                            {product.category}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Cart Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group relative py-2 px-2 rounded-xl transition-all duration-300 hover:bg-white/20 hover:shadow-lg ">
                <Handbag
                  size={20}
                  className="text-white/80 group-hover:text-[#E1B857] transition-colors duration-300"
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold bg-white text-black ">
                    {cartItems.length}
                  </span>
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E1B857]/0 to-[#2CA6A4]/0 group-hover:from-[#E1B857]/10 group-hover:to-[#2CA6A4]/10 transition-all duration-300"></div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-80 p-4"
              style={{ backgroundColor: '#F5F3EB', borderColor: '#E1B857' }}
              align="end"
            >
              <DropdownMenuLabel style={{ color: '#0C1E33' }}>Shopping Cart</DropdownMenuLabel>
              <DropdownMenuSeparator style={{ backgroundColor: '#E1B857' }} />

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#2CA6A4]/10"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm" style={{ color: '#0C1E33' }}>
                        {item.name}
                      </h4>
                      <p className="text-xs" style={{ color: '#2CA6A4' }}>
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#E1B857' }}
                      >
                        <Minus size={12} style={{ color: '#0C1E33' }} />
                      </button>
                      <span className="text-sm" style={{ color: '#0C1E33' }}>
                        {item.quantity}
                      </span>
                      <button
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#E1B857' }}
                      >
                        <Plus size={12} style={{ color: '#0C1E33' }} />
                      </button>
                    </div>
                    <button className="p-1 hover:bg-red-100 rounded">
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                ))}
              </div>

              <DropdownMenuSeparator style={{ backgroundColor: '#E1B857' }} />
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold" style={{ color: '#0C1E33' }}>
                    Total:
                  </span>
                  <span className="font-bold text-lg" style={{ color: '#2CA6A4' }}>
                    $
                    {cartItems
                      .reduce((sum, item) => sum + item.price * item.quantity, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/cart"
                  className="w-full py-2 px-4 rounded-lg text-center block transition-colors duration-200"
                  style={{ backgroundColor: '#2CA6A4', color: 'white' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#238a88')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2CA6A4')}
                >
                  View Cart & Checkout
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Icon */}
          <Link
            href="/profile"
            className="group relative  rounded-xl transition-all duration-300 hover:bg-white/20 hover:shadow-lg p-2"
          >
            <UserRound
              size={20}
              className="text-white/80 group-hover:text-[#F5F3EB] transition-colors duration-300"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#F5F3EB]/0 to-[#2CA6A4]/0 group-hover:from-[#F5F3EB]/10 group-hover:to-[#2CA6A4]/10 transition-all duration-300"></div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
