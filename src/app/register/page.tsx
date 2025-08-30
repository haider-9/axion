'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import PageHeader from '@/components/PageHeader';
import { UserPlus, Eye, EyeOff, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    avatar: null as File | null
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setFormData(prev => ({
      ...prev,
      avatar: file
    }));

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      avatar: null
    }));
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      await toast.promise(
        (async () => {
          let avatarUrl = '';
          
          // Upload image if exists
          if (formData.avatar) {
            const formDataToSend = new FormData();
            formDataToSend.append('file', formData.avatar);

            const uploadResponse = await fetch('/api/upload', {
              method: 'POST',
              body: formDataToSend,
            });

            if (!uploadResponse.ok) {
              const error = await uploadResponse.json();
              throw new Error(error.error || 'Failed to upload image');
            }

            const { fileUrl } = await uploadResponse.json();
            avatarUrl = fileUrl;
          }

          // Create user in the database
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password,
              isAdmin: formData.isAdmin,
              ...(avatarUrl && { avatar: { url: avatarUrl } })
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Failed to register user');
          }
          
          // Return data for success handler
          return data;
        })(),
        {
          loading: 'Creating your account...',
          success: (data) => {
            // Redirect after successful registration
            setTimeout(() => {
              router.push(formData.isAdmin ? '/admin' : '/profile');
            }, 1000);
            return 'Registration successful! Redirecting...';
          },
          error: (err) => {
            console.error('Registration error:', err);
            return err.message || 'Failed to register. Please try again.';
          }
        }
      );
      
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Register"
        titleHighlight="User"
        subtitle="Create a new user account (temporary admin registration)"
      />

      <div className="max-w-md mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Register New User
            </CardTitle>
            <CardDescription>
              Create a new user account. Check the admin box to create an admin user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Picture Upload */}
              <div className="space-y-2">
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <>
                        <Image
                          src={previewUrl}
                          alt="Profile preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <Upload className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      id="avatar-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {formData.avatar ? 'Change' : 'Upload'} Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isAdmin"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, isAdmin: Boolean(checked) }))
                  }
                />
                <label
                  htmlFor="isAdmin"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Register as Admin (This will create an admin account with full access)
                </label>
              </div>

              {message && (
                <div className={`p-3 rounded-md text-sm ${
                  message.includes('Error') 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  {message}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating User...' : 'Register User'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="font-medium text-blue-900 mb-2">Temporary Registration</h4>
              <p className="text-sm text-blue-700">
                This is a temporary registration page for testing. Users are stored in localStorage.
                In production, you should implement proper backend registration with password hashing.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
