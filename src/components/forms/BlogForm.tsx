'use client';

import { useState } from 'react';
import { FileText, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import BaseForm, { FormField, FileUploadField } from './BaseForm';

interface BlogFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function BlogForm({ onSuccess, className = '' }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author: '',
    tags: '',
    published: false,
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

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';

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
          if (key === 'tags') {
            const tags = String(value)
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0);
            tags.forEach((tag) => formDataParam.append('tags', tag));
          } else {
            formDataParam.append(key, String(value));
          }
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
      const response = await fetch('/api/blogs', {
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
          title: '',
          slug: '',
          content: '',
          excerpt: '',
          author: '',
          tags: '',
          published: false,
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
      title="Add New Blog Post"
      description="Create engaging content for your audience"
      icon={<FileText className="w-5 h-5" />}
      color="bg-orange-500"
      onSubmit={handleSubmit}
      onSuccess={onSuccess}
      triggerText="Add Blog Post"
      className={className}
    >
      <FormField
        name="title"
        label="Title"
        type="text"
        required
        placeholder="Catchy blog post title"
        value={formData.title}
        onChange={handleInputChange}
        error={errors.title}
      />

      <FormField
        name="slug"
        label="Slug"
        type="text"
        required
        placeholder="blog-post-url-slug"
        value={formData.slug}
        onChange={handleInputChange}
        error={errors.slug}
      />

      <FormField
        name="content"
        label="Content"
        type="textarea"
        required
        placeholder="Write your blog content here..."
        value={formData.content}
        onChange={handleInputChange}
        error={errors.content}
      />

      <FormField
        name="excerpt"
        label="Excerpt"
        type="textarea"
        placeholder="Short summary of your blog post..."
        value={formData.excerpt}
        onChange={handleInputChange}
        error={errors.excerpt}
      />

      <FormField
        name="author"
        label="Author"
        type="text"
        placeholder="Author name"
        value={formData.author}
        onChange={handleInputChange}
        error={errors.author}
      />

      <FormField
        name="tags"
        label="Tags"
        type="text"
        placeholder="technology, design, business"
        value={formData.tags}
        onChange={handleInputChange}
        error={errors.tags}
      />

      <FormField
        name="published"
        label="Published"
        type="checkbox"
        value={formData.published}
        onChange={handleInputChange}
        error={errors.published}
      />

      <FileUploadField
        name="image"
        label="Featured Image"
        icon={<ImageIcon className="w-4 h-4" />}
        onFileChange={handleFileChange}
        uploadedImages={uploadedImages}
        onRemoveImage={removeImage}
      />
    </BaseForm>
  );
}
