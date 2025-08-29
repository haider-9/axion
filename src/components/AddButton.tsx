'use client';

import { useState, useEffect } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface AddButtonProps {
  type: 'product' | 'category' | 'blog' | 'user';
  onAdd: (data: any) => Promise<void>;
  className?: string;
}

export default function AddButton({ type, onAdd, className }: AddButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [userData, setUserData] = useState<any>(null);

  // Get user data from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, []);

  // Only show for admins
  if (!userData?.isAdmin) {
    return null;
  }

  const getTypeConfig = () => {
    switch (type) {
      case 'product':
        return {
          title: 'Add New Product',
          description: 'Add a new product to your catalog',
          fields: [
            { name: 'name', label: 'Product Name', type: 'text', required: true },
            { name: 'slug', label: 'Slug', type: 'text', required: true },
            { name: 'price', label: 'Price', type: 'number', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'images', label: 'Image URLs (comma-separated)', type: 'text' },
            { name: 'category', label: 'Category', type: 'select', options: ['Electronics', 'Furniture', 'Clothing'] },
            { name: 'stock', label: 'Stock Quantity', type: 'number' },
            { name: 'featured', label: 'Featured', type: 'checkbox' },
          ]
        };
      case 'category':
        return {
          title: 'Add New Category',
          description: 'Add a new product category',
          fields: [
            { name: 'name', label: 'Category Name', type: 'text', required: true },
            { name: 'slug', label: 'Slug', type: 'text', required: true },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'Image URL', type: 'text' },
          ]
        };
      case 'blog':
        return {
          title: 'Add New Blog Post',
          description: 'Add a new blog post to your website',
          fields: [
            { name: 'title', label: 'Title', type: 'text', required: true },
            { name: 'slug', label: 'Slug', type: 'text', required: true },
            { name: 'content', label: 'Content', type: 'textarea', required: true },
            { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
            { name: 'image', label: 'Featured Image URL', type: 'text' },
            { name: 'author', label: 'Author', type: 'text' },
            { name: 'tags', label: 'Tags (comma-separated)', type: 'text' },
          ]
        };
      case 'user':
        return {
          title: 'Add New User',
          description: 'Add a new user account',
          fields: [
            { name: 'name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'password', label: 'Password', type: 'password', required: true },
            { name: 'isAdmin', label: 'Admin Role', type: 'checkbox' },
          ]
        };
      default:
        return {
          title: 'Add New Item',
          description: 'Add a new item',
          fields: []
        };
    }
  };

  const config = getTypeConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onAdd(formData);
      setOpen(false);
      setFormData({});
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderField = (field: any) => {
    const { name, label, type, required, options } = field;

    switch (type) {
      case 'textarea':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={name}
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              required={required}
            />
          </div>
        );
      
      case 'select':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Select value={formData[name] || ''} onValueChange={(value) => handleInputChange(name, value)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
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
          <div key={name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={name}
              checked={formData[name] || false}
              onChange={(e) => handleInputChange(name, e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor={name}>{label}</Label>
          </div>
        );
      
      default:
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={name}
              type={type}
              value={formData[name] || ''}
              onChange={(e) => handleInputChange(name, e.target.value)}
              required={required}
            />
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>
          <Plus className="w-4 h-4 mr-2" />
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {config.fields.map(renderField)}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
