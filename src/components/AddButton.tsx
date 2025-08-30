'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Loader2,
  X,
  Image as ImageIcon,
  DollarSign,
  Tag,
  FileText,
  Folder,
  User,
  Briefcase,
  Upload,
  Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type FieldType = 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'multiselect' | 'file';

interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
  icon?: React.ReactNode;
}

interface TypeConfig {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  fields: FormField[];
}

interface AddButtonProps {
  type: 'product' | 'category' | 'blog' | 'user' | 'project';
  onAdd: (data: Record<string, unknown>) => Promise<void>;
  className?: string;
}

export default function AddButton({ type, onAdd, className }: AddButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Only show for admins
  if (!user?.isAdmin) {
    return null;
  }

  const getTypeConfig = (): TypeConfig => {
    const baseConfig = {
      icon: <Plus className="w-5 h-5" />,
      color: 'bg-blue-500'
    };

    switch (type) {
      case 'product':
        return {
          ...baseConfig,
          title: 'Add New Product',
          description: 'Fill in the details to add a new product to your catalog',
          icon: <Tag className="w-5 h-5" />,
          color: 'bg-purple-500',
          fields: [
            {
              name: 'name',
              label: 'Product Name',
              type: 'text',
              required: true,
              placeholder: 'e.g., Premium Headphones',
              icon: <Tag className="w-4 h-4" />
            },
            {
              name: 'slug',
              label: 'Slug',
              type: 'text',
              required: true,
              placeholder: 'e.g., premium-headphones'
            },
            {
              name: 'price',
              label: 'Price',
              type: 'number',
              required: true,
              placeholder: '0.00',
              icon: <DollarSign className="w-4 h-4" />
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              placeholder: 'Describe the product features and benefits...'
            },
            {
              name: 'images',
              label: 'Product Images',
              type: 'file',
              required: true,
              icon: <ImageIcon className="w-4 h-4" />
            },
            {
              name: 'category',
              label: 'Category',
              type: 'select',
              options: ['Electronics', 'Furniture', 'Clothing', 'Books', 'Sports'],
              placeholder: 'Select a category'
            },
            {
              name: 'stock',
              label: 'Stock Quantity',
              type: 'number',
              placeholder: '0'
            },
            {
              name: 'featured',
              label: 'Featured Product',
              type: 'checkbox'
            },
          ],
        };
      case 'category':
        return {
          ...baseConfig,
          title: 'Add New Category',
          description: 'Create a new product category for better organization',
          icon: <Folder className="w-5 h-5" />,
          color: 'bg-green-500',
          fields: [
            {
              name: 'name',
              label: 'Category Name',
              type: 'text',
              required: true,
              placeholder: 'e.g., Electronics'
            },
            {
              name: 'slug',
              label: 'Slug',
              type: 'text',
              required: true,
              placeholder: 'e.g., electronics'
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              placeholder: 'Describe this category...'
            },
            {
              name: 'image',
              label: 'Image URL',
              type: 'text',
              placeholder: 'https://example.com/category-image.jpg',
              icon: <ImageIcon className="w-4 h-4" />
            },
          ],
        };
      case 'blog':
        return {
          ...baseConfig,
          title: 'Add New Blog Post',
          description: 'Create engaging content for your audience',
          icon: <FileText className="w-5 h-5" />,
          color: 'bg-orange-500',
          fields: [
            {
              name: 'title',
              label: 'Title',
              type: 'text',
              required: true,
              placeholder: 'Catchy blog post title'
            },
            {
              name: 'slug',
              label: 'Slug',
              type: 'text',
              required: true,
              placeholder: 'blog-post-url-slug'
            },
            {
              name: 'content',
              label: 'Content',
              type: 'textarea',
              required: true,
              placeholder: 'Write your blog content here...'
            },
            {
              name: 'excerpt',
              label: 'Excerpt',
              type: 'textarea',
              placeholder: 'Short summary of your blog post...'
            },
            {
              name: 'image',
              label: 'Featured Image URL',
              type: 'text',
              placeholder: 'https://example.com/featured-image.jpg',
              icon: <ImageIcon className="w-4 h-4" />
            },
            {
              name: 'author',
              label: 'Author',
              type: 'text',
              placeholder: 'Author name'
            },
            {
              name: 'tags',
              label: 'Tags',
              type: 'text',
              placeholder: 'technology, design, business'
            },
          ],
        };
      case 'project':
        return {
          ...baseConfig,
          title: 'Add New Project',
          description: 'Showcase your work in your portfolio',
          icon: <Briefcase className="w-5 h-5" />,
          color: 'bg-indigo-500',
          fields: [
            {
              name: 'title',
              label: 'Project Title',
              type: 'text',
              required: true,
              placeholder: 'e.g., E-commerce Website Redesign'
            },
            {
              name: 'slug',
              label: 'Slug',
              type: 'text',
              required: true,
              placeholder: 'e-commerce-redesign'
            },
            {
              name: 'summary',
              label: 'Short Summary',
              type: 'textarea',
              required: true,
              placeholder: 'Brief description of the project...'
            },
            {
              name: 'description',
              label: 'Detailed Description',
              type: 'textarea',
              placeholder: 'Complete project details, challenges, solutions...'
            },
            {
              name: 'image',
              label: 'Hero Image URL',
              type: 'text',
              placeholder: 'https://example.com/hero-image.jpg',
              icon: <ImageIcon className="w-4 h-4" />
            },
            {
              name: 'gallery',
              label: 'Gallery Images',
              type: 'text',
              placeholder: 'https://example.com/image1.jpg, https://example.com/image2.jpg',
              icon: <ImageIcon className="w-4 h-4" />
            },
            {
              name: 'category',
              label: 'Category',
              type: 'text',
              placeholder: 'Web Design, Development, etc.'
            },
            {
              name: 'status',
              label: 'Project Status',
              type: 'select',
              options: ['Planning', 'In Progress', 'Completed', 'On Hold'],
              placeholder: 'Select project status'
            },
            {
              name: 'technologies',
              label: 'Technologies Used',
              type: 'text',
              placeholder: 'React, Node.js, MongoDB'
            },
            {
              name: 'client',
              label: 'Client',
              type: 'text',
              placeholder: 'Client name or company'
            },
            {
              name: 'projectUrl',
              label: 'Project URL',
              type: 'text',
              placeholder: 'https://example-project.com'
            },
            {
              name: 'githubUrl',
              label: 'GitHub Repository',
              type: 'text',
              placeholder: 'https://github.com/username/project'
            },
            {
              name: 'featured',
              label: 'Featured Project',
              type: 'checkbox'
            },
          ],
        };
      case 'user':
        return {
          ...baseConfig,
          title: 'Add New User',
          description: 'Create a new user account with appropriate permissions',
          icon: <User className="w-5 h-5" />,
          color: 'bg-pink-500',
          fields: [
            {
              name: 'name',
              label: 'Full Name',
              type: 'text',
              required: true,
              placeholder: 'John Doe'
            },
            {
              name: 'email',
              label: 'Email',
              type: 'email',
              required: true,
              placeholder: 'user@example.com'
            },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              required: true,
              placeholder: 'Create a secure password'
            },
            {
              name: 'isAdmin',
              label: 'Administrator Account',
              type: 'checkbox'
            },
          ],
        };
      default:
        return {
          ...baseConfig,
          title: 'Add New Item',
          description: 'Add a new item to the system',
          fields: [],
        };
    }
  };

  const config = getTypeConfig();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const uploadPromises = Array.from(files).map(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset
        
        return fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(data => data.secure_url);
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setPreviewImages(prev => [...prev, ...uploadedUrls]);
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images as string[] || []), ...uploadedUrls]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...previewImages];
    newImages.splice(index, 1);
    setPreviewImages(newImages);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) {
      toast.warning('Please wait for images to finish uploading');
      return;
    }
    
    setLoading(true);
    try {
      await onAdd(formData);
      setFormData({});
      setPreviewImages([]);
      setOpen(false);
      toast.success('Item added successfully');
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: string, value: unknown) => {
    setFormData((prev: Record<string, unknown>) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderField = (field: FormField) => {
    const { name, label, type, required, options, placeholder, icon } = field;

    switch (type) {
      case 'textarea':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="flex items-center gap-1">
              {icon}
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={name}
              value={String(formData[name] ?? '')}
              onChange={(e) => handleInputChange(name, e.target.value)}
              required={required}
              placeholder={placeholder}
              className="min-h-[100px]"
            />
          </div>
        );

      case 'select':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="flex items-center gap-1">
              {icon}
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={String(formData[name] ?? '')}
              onValueChange={(value) => handleInputChange(name, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'checkbox':
        return (
          <div key={name} className="flex items-center space-x-2 p-2 border rounded-md">
            <input
              type="checkbox"
              id={name}
              checked={Boolean(formData[name])}
              onChange={(e) => handleInputChange(name, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor={name} className="cursor-pointer">{label}</Label>
          </div>
        );

      case 'file':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="flex items-center gap-1">
              {icon}
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div 
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {uploading ? 'Uploading...' : 'Click or drag images to upload'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports JPG, PNG up to 5MB
                </p>
              </div>
            </div>
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="flex items-center gap-1">
              {icon}
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={name}
              type={type}
              value={String(formData[name] ?? '')}
              onChange={(e) => handleInputChange(name, e.target.value)}
              required={required}
              placeholder={placeholder}
            />
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={`flex items-center gap-2 ${className}`}>
          <Plus className="w-4 h-4" />
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
        <div className={`${config.color} h-2 w-full`}></div>
        <div className="p-6">
          <DialogHeader className="flex flex-row items-start gap-4 pb-4">
            <div className={`p-2 rounded-md ${config.color} text-white`}>
              {config.icon}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{config.title}</DialogTitle>
              <DialogDescription>{config.description}</DialogDescription>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 py-2">
              {config.fields.map(renderField)}
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 sm:flex-none gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add {type.charAt(0).toUpperCase() + type.slice(1)}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}