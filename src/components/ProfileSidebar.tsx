'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, User, ShoppingBag, Heart, Settings } from 'lucide-react';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink = ({ href, icon, label, isActive }: SidebarLinkProps) => (
  <Link
    href={href}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
    }`}
  >
    <span className="flex-shrink-0">{icon}</span>
    <span className="font-medium">{label}</span>
  </Link>
);

export default function ProfileSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/profile', icon: <User className="w-5 h-5" />, label: 'My Profile' },
    { href: '/orders', icon: <ShoppingBag className="w-5 h-5" />, label: 'My Orders' },
    { href: '/wishlist', icon: <Heart className="w-5 h-5" />, label: 'Wishlist' },
    { href: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 p-4 flex flex-col">
      <div className="flex items-center space-x-3 p-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">My Account</p>
          <p className="text-sm text-gray-500">Manage your profile</p>
        </div>
      </div>
      
      <div className="flex-1 space-y-1">
        {links.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isActive={pathname === link.href}
          />
        ))}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            localStorage.removeItem('userData');
            window.location.href = '/';
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
