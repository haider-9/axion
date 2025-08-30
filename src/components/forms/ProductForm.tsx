'use client';

import { useState, useEffect } from 'react';
import { Tag, DollarSign, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import BaseForm, { FormField, FileUploadField } from './BaseForm';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ProductFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function ProductForm({ onSuccess, className = '' }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    description: '',
    category: '',
    stock: '',
    featured: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await fetch('/api/categories');
        const result = await response.json();
        if (result.success) {
          setCategories(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (name: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    if (name === 'category') {
      if (value === 'Create New Category...') {
        setShowNewCategoryInput(true);
        setFormData((prev) => ({ ...prev, category: '' }));
      } else {
        setShowNewCategoryInput(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => [...prev, ...newPreviews]);

    toast.success(`${newFiles.length} image${newFiles.length > 1 ? 's' : ''} selected.`);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => {
      const newPreviews = [...prev];
      const [removed] = newPreviews.splice(index, 1);
      if (removed && removed.startsWith('blob:')) {
        URL.revokeObjectURL(removed);
      }
      return newPreviews;
    });
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (uploadedImages.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (formDataParam: FormData) => {
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return { success: false, error: 'Validation failed' };
    }

    try {
      // Add form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formDataParam.append(key, String(value));
        }
      });

      // Handle file uploads
      if (selectedFiles.length > 0) {
        const uploadPromises = selectedFiles.map(async (file) => {
          const uploadFormData = new FormData();
          uploadFormData.append('file', file);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: uploadFormData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload file');
          }

          const result = await response.json();
          return result.url;
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        uploadedUrls.forEach((url) => {
          formDataParam.append('images', url);
        });
      }

      // Submit to API
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formDataParam,
      });

      const result = await response.json();

      if (result.success) {
        // Cleanup
        uploadedImages.forEach((url) => {
          if (typeof url === 'string' && url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        });

        setFormData({
          name: '',
          slug: '',
          price: '',
          description: '',
          category: '',
          stock: '',
          featured: false,
        });
        setUploadedImages([]);
        setSelectedFiles([]);
        setErrors({});
      }

      return result;
    } catch (error) {
      console.error('Error in form submission:', error);
      return { success: false, error: 'Form submission failed' };
    }
  };

  const categoryOptions = [...categories.map((cat) => cat.name), 'Create New Category...'];

  return (
    <BaseForm
      title="Add New Product"
      description="Fill in the details to add a new product to your catalog"
      icon={<Tag className="w-5 h-5" />}
      color="bg-purple-500"
      onSubmit={handleSubmit}
      onSuccess={onSuccess}
      triggerText="Add Product"
      className={className}
    >
      <FormField
        name="name"
        label="Product Name"
        type="text"
        required
        placeholder="e.g., Premium Headphones"
        icon={<Tag className="w-4 h-4" />}
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
      />

      <FormField
        name="slug"
        label="Slug"
        type="text"
        required
        placeholder="e.g., premium-headphones"
        value={formData.slug}
        onChange={handleInputChange}
        error={errors.slug}
      />

      <FormField
        name="price"
        label="Price"
        type="number"
        required
        placeholder="0.00"
        icon={<DollarSign className="w-4 h-4" />}
        value={formData.price}
        onChange={handleInputChange}
        error={errors.price}
      />

      <FormField
        name="description"
        label="Description"
        type="textarea"
        placeholder="Describe the product features and benefits..."
        value={formData.description}
        onChange={handleInputChange}
        error={errors.description}
      />

      <FileUploadField
        name="images"
        label="Product Images"
        required
        icon={<ImageIcon className="w-4 h-4" />}
        onFileChange={handleFileChange}
        uploadedImages={uploadedImages}
        onRemoveImage={removeImage}
      />

      {showNewCategoryInput ? (
        <FormField
          name="category"
          label="New Category Name"
          type="text"
          required
          placeholder="Enter new category name"
          value={formData.category}
          onChange={handleInputChange}
          error={errors.category}
        />
      ) : (
        <FormField
          name="category"
          label="Category"
          type="select"
          required
          options={categoryOptions}
          placeholder={categoriesLoading ? 'Loading categories...' : 'Select a category'}
          value={formData.category}
          onChange={handleInputChange}
          error={errors.category}
        />
      )}

      <FormField
        name="stock"
        label="Stock Quantity"
        type="number"
        placeholder="0"
        value={formData.stock}
        onChange={handleInputChange}
        error={errors.stock}
      />

      <FormField
        name="featured"
        label="Featured Product"
        type="checkbox"
        value={formData.featured}
        onChange={handleInputChange}
        error={errors.featured}
      />
    </BaseForm>
  );
}
