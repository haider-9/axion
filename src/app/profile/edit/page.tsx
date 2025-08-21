'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';
import {
  Upload,
  Eye,
  EyeOff,
} from 'lucide-react';

// Mock user data
const userData = {
  id: '1',
  firstName: 'Sarah',
  lastName: 'Williams',
  email: 'sarahwilliams@example.com',
  phone: '+1 234 567 8900',
  company: 'Design Studio',
  addressLine1: '123 Main Street',
  addressLine2: 'Apt 4B',
  city: 'New York',
  state: 'NY',
  country: 'United States',
  avatar: '/about-image.jpg',
  timezone: 'EST',
  language: 'English',
  preferences: {
    phone: false,
    email: true,
    message: false,
    whatsapp: true,
    updates: true,
  }
};

export default function EditProfilePage() {
  const [formData, setFormData] = useState(userData);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Edit"
        titleHighlight="Profile"
        subtitle="Update your Details, Preferences and Password"
      />

      <div className="max-w-[85rem] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src={userData.avatar}
                      alt="Profile"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </Button>
                  <span className="text-sm text-gray-500">JPG, PNG, or GIF (MAX. 800x400px)</span>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email">Email</Label>
                      <Link href="#" className="text-sm text-blue-600 hover:underline">
                        Change Email
                      </Link>
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="addressLine1">Address Line 1</Label>
                    <Input
                      id="addressLine1"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Pakistan">Pakistan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="phone"
                      name="contact"
                      checked={formData.preferences.phone}
                      onChange={(e) => handlePreferenceChange('phone', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="phone">Phone</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="email-pref"
                      name="contact"
                      checked={formData.preferences.email}
                      onChange={(e) => handlePreferenceChange('email', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="email-pref">Email</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="message"
                      name="contact"
                      checked={formData.preferences.message}
                      onChange={(e) => handlePreferenceChange('message', e.target.checked)}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="message">Message</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="whatsapp"
                      name="contact"
                      checked={formData.preferences.whatsapp}
                      onChange={(e) => handlePreferenceChange('whatsapp', e.target.checked)}
                      className="w-4 h-4 text-green-600"
                    />
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EST">EST (UTC-5)</SelectItem>
                        <SelectItem value="PST">PST (UTC-8)</SelectItem>
                        <SelectItem value="GMT">GMT (UTC+0)</SelectItem>
                        <SelectItem value="PKT">PKT (UTC+5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Urdu">Urdu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="updates"
                    checked={formData.preferences.updates}
                    onChange={(e) => handlePreferenceChange('updates', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="updates">Send me updates & offers</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Security & Sessions */}
          <div className="space-y-8">
            {/* Security Section */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Change Password</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="border-red-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Use atleast 8 characters with a mix of upper, lower, numbers, and symbols
                      </p>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Update Password
                    </Button>
                    
                    <Link href="#" className="block text-center text-sm text-blue-600 hover:underline">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Active Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full mb-4">
                  Sign out of all devices
                </Button>
                
                <div className="pt-4 border-t">
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    This action cannot be undone
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
