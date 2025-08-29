'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import AddButton from '@/components/AddButton';
import { useActions } from '@/hooks/useActions';
import {
  Edit3,
  Users,
  Package,
  ShoppingCart,
  Settings,
  Plus,
  UserCheck,
  LogOut,
  ExternalLink,
} from 'lucide-react';

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
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const { product, user, category, admin } = useActions();

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        redirect('/login');
      }
    } else {
      // No user data in localStorage, redirect to login
      redirect('/login');
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    redirect('/login');
  }

  const isAdmin = userData?.isAdmin;

  const renderProfileContent = () => (
    <div className="bg-white rounded-lg border-2 border-dashed border-blue-200 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* User Profile Summary */}
          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <Image
                src={userData?.avatar || '/about-image.jpg'}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{userData?.name || 'User'}</h3>
                <p className="text-gray-600">{userData?.email || 'user@example.com'}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link className="flex items-center bg-black/20 px-2 rounded-lg" href="/profile/edit">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('userData');
                  window.location.href = '/';
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <p className="font-medium">{userData?.name || 'User'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <p className="font-medium">{userData?.email || 'user@example.com'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Address:</span>
                <p className="font-medium">
                  {userData?.address || 'House No. 0/0, Street No. 00, Sector G-7, Islamabad'}
                </p>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-blue-600 hover:text-blue-800">
                Change Password
              </Link>
              <Link href="#" className="block text-blue-600 hover:text-blue-800">
                Manage Notifications
              </Link>
              <Link href="#" className="block text-blue-600 hover:text-blue-800">
                Privacy Settings
              </Link>
            </div>
          </div>

          {/* Help/Support */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help? Visit{' '}
              <a
                href="mailto:Support@Axion.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Support@Axion.com
                <ExternalLink className="w-3 h-3 inline ml-1" />
              </a>
            </p>
          </div>
        </div>

        {/* Right Column - Only show for non-admin users */}
        {!isAdmin && (
          <div className="space-y-8">
            {/* Order History */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Order History</h3>
                <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                  View All
                </Link>
              </div>
              <div className="space-y-3">
                {orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Image
                      src={order.image}
                      alt={order.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                      <p className="font-medium">{order.name}</p>
                    </div>
                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishlist */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Wishlist</h3>
                <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {wishlistImages.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`Wishlist item ${index + 1}`}
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrdersContent = () => (
    <div className="bg-white rounded-lg border-2 border-dashed border-blue-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Orders</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          View All Orders
        </Button>
      </div>
      <div className="space-y-4">
        {orderHistory.map((order) => (
          <div key={order.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Image
              src={order.image}
              alt={order.name}
              width={60}
              height={60}
              className="rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-medium">{order.name}</h4>
              <p className="text-sm text-gray-500">Order #{order.id}</p>
            </div>
            <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
              {order.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductsContent = () => (
    <div className="bg-white rounded-lg border-2 border-dashed border-blue-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
        <AddButton
          type="product"
          onAdd={async (data) => {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
              formData.append(key, value as string);
            });
            await product.create(formData);
          }}
        />
      </div>
      <p className="text-gray-600">Manage your product inventory, categories, and pricing.</p>
    </div>
  );

  const renderUsersContent = () => (
    <div className="bg-white rounded-lg border-2 border-dashed border-blue-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <AddButton
          type="user"
          onAdd={async (data) => {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
              formData.append(key, value as string);
            });
            await user.create(formData);
          }}
        />
      </div>
      <p className="text-gray-600">
        Monitor user activity, manage roles, and handle customer support.
      </p>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileContent();
      case 'orders':
        return renderOrdersContent();
      case 'products':
        return renderProductsContent();
      case 'users':
        return renderUsersContent();
      default:
        return renderProfileContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <PageHeader title="My" titleHighlight='Profile'/>
      <div className="flex">
        {/* Admin Sidebar - Only show for admins */}
        {isAdmin && (
          <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-6">
            <div className="sticky top-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                  <UserCheck className="w-5 h-5" />
                  Admin Panel
                </h2>
                <p className="text-sm text-gray-600">Welcome back, {userData?.name}</p>
              </div>

              <nav className="space-y-2">
                <Button
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  My Profile
                </Button>
                <Button
                  variant={activeTab === 'orders' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('orders')}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  All Orders
                </Button>
                <Button
                  variant={activeTab === 'products' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('products')}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Products
                </Button>
                <Button
                  variant={activeTab === 'users' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Users
                </Button>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 ${isAdmin ? 'ml-0' : ''}`}>
          <div className="max-w-6xl mx-auto">
            

            {/* Content */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
