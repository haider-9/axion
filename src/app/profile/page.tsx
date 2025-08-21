'use client';

import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import {
  Edit3,
} from 'lucide-react';

// Mock user data
const userData = {
  id: '1',
  name: 'Sarah Williams',
  email: 'sarahwilliams@example.com',
  address: 'House No. 0/0, Street No. 00, Sector G-7, Islamabad',
  avatar: '/about-image.jpg',
};

// Mock order history
const orderHistory = [
  {
    id: '12234',
    name: 'Concorde Lamp',
    status: 'Delivered',
    image: '/collection-1.jpg',
  },
  {
    id: '12579',
    name: 'Golden Glow Lamp',
    status: 'In Progress',
    image: '/collection-2.jpg',
  },
  {
    id: '13032',
    name: 'Strip Chandelier',
    status: 'Shipped',
    image: '/product-1.jpg',
  },
];

// Mock wishlist
const wishlistImages = [
  '/product-1.jpg',
  '/product-2.jpg',
  '/collection-1.jpg',
  '/collection-2.jpg',
  '/about-image.jpg',
];

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="My"
        titleHighlight="Profile"
        subtitle="Manage your account details, orders, and preferences"
      />

      <div className="max-w-[85rem] mx-auto px-4 py-8">
        {/* Main Profile Card */}
        <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 bg-blue-50/30">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={userData.avatar}
                  alt={userData.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/profile/edit">
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </Button>
              </Link>
              <Button className="bg-(--color-logo) hover:bg-gray-900 text-white">
                Logout
              </Button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Name</Label>
                    <p className="text-gray-900">{userData.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                    <p className="text-gray-900">{userData.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Address</Label>
                    <p className="text-gray-900">{userData.address}</p>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h3>
                <div className="space-y-3">
                  <Link href="#" className="block text-blue-600 hover:text-blue-700 hover:underline">
                    Change Password
                  </Link>
                  <Link href="#" className="block text-blue-600 hover:text-blue-700 hover:underline">
                    Manage Notifications
                  </Link>
                  <Link href="#" className="block text-blue-600 hover:text-blue-700 hover:underline">
                    Privacy Settings
                  </Link>
                </div>
              </div>

              {/* Help Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need help? Visit</h3>
                <Link href="#" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
                  Read More →
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Order History */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Order History</h3>
                  <Link href="/profile/orders" className="text-blue-600 hover:text-blue-700 hover:underline text-sm">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={order.image}
                          alt={order.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">Order #{order.id}</p>
                        <p className="text-sm text-gray-600 truncate">{order.name}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wishlist */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Wishlist</h3>
                  <Link href="/profile/wishlist" className="text-blue-600 hover:text-blue-700 hover:underline text-sm">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {wishlistImages.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Wishlist item ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
