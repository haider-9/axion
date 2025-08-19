'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Handbag,
  UserRound,
  ChevronDown,
  Clock,
  Star,
  Trash2,
  Plus,
  Minus,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const Header = () => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showBlogDropdown, setShowBlogDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hideOnScroll, setHideOnScroll] = useState(false);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setHideOnScroll(true);
      } else {
        setHideOnScroll(false);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/category', hasDropdown: true, dropdownType: 'products' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog', hasDropdown: true, dropdownType: 'blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const productCategories = [
    {
      name: 'LED Lights',
      href: '/products/led-lights',
      image: '/next.svg',
      description: 'Energy efficient LED solutions',
    },
    {
      name: 'Smart Lighting',
      href: '/products/smart-lighting',
      image: '/next.svg',
      description: 'IoT enabled lighting systems',
    },
    {
      name: 'Industrial Lighting',
      href: '/products/industrial',
      image: '/next.svg',
      description: 'Heavy-duty lighting solutions',
    },
    {
      name: 'Outdoor Lighting',
      href: '/products/outdoor',
      image: '/next.svg',
      description: 'Weather-resistant outdoor lights',
    },
  ];

  const blogCategories = [
    {
      name: 'Industry News',
      href: '/blog/industry-news',
      image: '/next.svg',
      description: 'Latest updates in lighting technology',
    },
    {
      name: 'Installation Tips',
      href: '/blog/installation-tips',
      image: '/next.svg',
      description: 'Expert installation guides',
    },
    {
      name: 'Case Studies',
      href: '/blog/case-studies',
      image: '/next.svg',
      description: 'Real-world project examples',
    },
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
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-around py-4 mx-auto bg-transparent transition-transform duration-300 ${hideOnScroll ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {/* Logo */}
      <div className="size-16 flex items-center">
        <Image
          src="/Logo.png"
          alt="Axion Lighting Solutions Logo"
          width={100}
          height={50}
          className="brightness-200"
        />
      </div>

      {/* Navbar with pill animation */}
      <div className="relative py-1 px-1 rounded-full shadow-lg backdrop-blur-md bg-gray-300/30">
        <ul className="flex items-center justify-between relative z-10">
          {navLinks.map((link) => {
            const isTarget = pillTarget === link.href;

            return (
              <h3
                key={link.name}
                className="relative"
                onMouseEnter={() => {
                  setHovered(link.href);
                  if (link.hasDropdown) {
                    if (link.dropdownType === 'products') {
                      setShowProductsDropdown(true);
                    } else if (link.dropdownType === 'blog') {
                      setShowBlogDropdown(true);
                    }
                  }
                }}
                onMouseLeave={() => {
                  setHovered(null);
                  if (link.hasDropdown) {
                    if (link.dropdownType === 'products') {
                      setShowProductsDropdown(false);
                    } else if (link.dropdownType === 'blog') {
                      setShowBlogDropdown(false);
                    }
                  }
                }}
              >
                {/* Bigger white pill - centered vertically */}
                {isTarget && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-y-0 left-0 right-0 bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <Link
                  href={link.href}
                  className={`relative z-10 rounded-full px-5 py-2 flex items-center gap-1 ${
                    isTarget ? 'text-black' : 'text-white'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        (link.dropdownType === 'products' && showProductsDropdown) ||
                        (link.dropdownType === 'blog' && showBlogDropdown)
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Products Dropdown */}
                {link.hasDropdown && link.dropdownType === 'products' && (
                  <AnimatePresence>
                    {showProductsDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 p-6 z-50"
                        onMouseEnter={() => setShowProductsDropdown(true)}
                        onMouseLeave={() => setShowProductsDropdown(false)}
                      >
                        <div className="space-y-4">
                          {/* Featured/Main Product - Bigger */}
                          <Link
                            href={productCategories[0].href}
                            className="group block p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <Image
                                  src={productCategories[0].image}
                                  alt={productCategories[0].name}
                                  width={40}
                                  height={40}
                                  className="opacity-60"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 text-lg">
                                  {productCategories[0].name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {productCategories[0].description}
                                </p>
                              </div>
                            </div>
                          </Link>

                          {/* Secondary Products - Smaller, side by side */}
                          <div className="grid grid-cols-2 gap-3">
                            {productCategories.slice(1, 3).map((category) => (
                              <Link
                                key={category.name}
                                href={category.href}
                                className="group p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                              >
                                <div className="flex flex-col items-center text-center space-y-2">
                                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                    <Image
                                      src={category.image}
                                      alt={category.name}
                                      width={24}
                                      height={24}
                                      className="opacity-60"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900 text-xs">
                                      {category.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {category.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {/* Blog Dropdown */}
                {link.hasDropdown && link.dropdownType === 'blog' && (
                  <AnimatePresence>
                    {showBlogDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 p-6 z-50"
                        onMouseEnter={() => setShowBlogDropdown(true)}
                        onMouseLeave={() => setShowBlogDropdown(false)}
                      >
                        <div className="space-y-4">
                          {/* Featured/Main Blog - Bigger */}
                          <Link
                            href={blogCategories[0].href}
                            className="group block p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <Image
                                  src={blogCategories[0].image}
                                  alt={blogCategories[0].name}
                                  width={40}
                                  height={40}
                                  className="opacity-60"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 text-lg">
                                  {blogCategories[0].name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  {blogCategories[0].description}
                                </p>
                              </div>
                            </div>
                          </Link>

                          {/* Secondary Blog Categories - Smaller, side by side */}
                          <div className="grid grid-cols-2 gap-3">
                            {blogCategories.slice(1, 3).map((category) => (
                              <Link
                                key={category.name}
                                href={category.href}
                                className="group p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                              >
                                <div className="flex flex-col items-center text-center space-y-2">
                                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                    <Image
                                      src={category.image}
                                      alt={category.name}
                                      width={24}
                                      height={24}
                                      className="opacity-60"
                                    />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-gray-900 text-xs">
                                      {category.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {category.description}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </h3>
            );
          })}
        </ul>
      </div>

      {/* Icons */}
      <div className="flex items-center bg-gray-300/50 backdrop-blur-xl rounded-full p-2 shadow-2xl border border-white/20">
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
