'use client';

import { useState } from 'react';
import { Folder, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import BaseForm, { FormField, FileUploadField } from './BaseForm';

interface CategoryFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function CategoryForm({ onSuccess, className = '' }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

    if (!formData.name.trim()) newErrors.name = 'Category name is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';

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
        if (uploadedUrls.length > 0) {
          formDataParam.append('image', uploadedUrls[0]);
        }
      }

      // Submit to API
      const response = await fetch('/api/categories', {
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
          description: '',
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

  return (
    <BaseForm
      title="Add New Category"
      description="Create a new product category for better organization"
      icon={<Folder className="w-5 h-5" />}
      color="bg-green-500"
      onSubmit={handleSubmit}
      onSuccess={onSuccess}
      triggerText="Add Category"
      className={className}
    >
      <FormField
        name="name"
        label="Category Name"
        type="text"
        required
        placeholder="e.g., Electronics"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
      />

      <FormField
        name="slug"
        label="Slug"
        type="text"
        required
        placeholder="e.g., electronics"
        value={formData.slug}
        onChange={handleInputChange}
        error={errors.slug}
      />

      <FormField
        name="description"
        label="Description"
        type="textarea"
        placeholder="Describe this category..."
        value={formData.description}
        onChange={handleInputChange}
        error={errors.description}
      />

      <FileUploadField
        name="image"
        label="Category Image"
        icon={<ImageIcon className="w-4 h-4" />}
        onFileChange={handleFileChange}
        uploadedImages={uploadedImages}
        onRemoveImage={removeImage}
      />
    </BaseForm>
  );
}
