'use client';

import { useState } from 'react';
import { Briefcase, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import BaseForm, { FormField, FileUploadField } from './BaseForm';

interface ProjectFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function ProjectForm({ onSuccess, className = '' }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    style: '',
    overview: '',
    features: '',
    specs: {
      type: '',
      location: '',
      completion: '',
      duration: '',
      team: '',
    },
    testimonial: {
      text: '',
      author: '',
    },
    location: '',
    date: '',
    featured: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleInputChange = (name: string, value: string | number | boolean) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, any>),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

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
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.style.trim()) newErrors.style = 'Style is required';
    if (!formData.overview.trim()) newErrors.overview = 'Overview is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.date.trim()) newErrors.date = 'Date is required';

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
          if (key === 'features') {
            const features = String(value)
              .split(',')
              .map((feature) => feature.trim())
              .filter((feature) => feature.length > 0);
            features.forEach((feature) => formDataParam.append('features', feature));
          } else if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
              if (nestedValue !== null && nestedValue !== undefined && nestedValue !== '') {
                formDataParam.append(`${key}.${nestedKey}`, String(nestedValue));
              }
            });
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
        uploadedUrls.forEach((url) => {
          formDataParam.append('images', url);
        });

        if (uploadedUrls.length > 0) {
          formDataParam.append('image', uploadedUrls[0]);
        }
      }

      // Submit to API
      const response = await fetch('/api/projects', {
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
          category: '',
          style: '',
          overview: '',
          features: '',
          specs: {
            type: '',
            location: '',
            completion: '',
            duration: '',
            team: '',
          },
          testimonial: {
            text: '',
            author: '',
          },
          location: '',
          date: '',
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

  return (
    <BaseForm
      title="Add New Project"
      description="Showcase your work in your portfolio"
      icon={<Briefcase className="w-5 h-5" />}
      color="bg-indigo-500"
      onSubmit={handleSubmit}
      onSuccess={onSuccess}
      triggerText="Add Project"
      className={className}
    >
      <FormField
        name="title"
        label="Project Title"
        type="text"
        required
        placeholder="e.g., E-commerce Website Redesign"
        value={formData.title}
        onChange={handleInputChange}
        error={errors.title}
      />

      <FormField
        name="slug"
        label="Slug"
        type="text"
        required
        placeholder="e-commerce-redesign"
        value={formData.slug}
        onChange={handleInputChange}
        error={errors.slug}
      />

      <FormField
        name="category"
        label="Category"
        type="select"
        required
        options={['Residential', 'Commercial', 'Outdoor']}
        placeholder="Select project category"
        value={formData.category}
        onChange={handleInputChange}
        error={errors.category}
      />

      <FormField
        name="style"
        label="Style"
        type="select"
        required
        options={['Modern', 'Classic', 'Outdoor']}
        placeholder="Select project style"
        value={formData.style}
        onChange={handleInputChange}
        error={errors.style}
      />

      <FormField
        name="overview"
        label="Project Overview"
        type="textarea"
        required
        placeholder="Brief description of the project..."
        value={formData.overview}
        onChange={handleInputChange}
        error={errors.overview}
      />

      <FormField
        name="features"
        label="Key Features"
        type="text"
        placeholder="Feature 1, Feature 2, Feature 3"
        value={formData.features}
        onChange={handleInputChange}
        error={errors.features}
      />

      <FormField
        name="specs.type"
        label="Project Type"
        type="text"
        placeholder="Residential Luxury Villa"
        value={formData.specs.type}
        onChange={handleInputChange}
        error={errors['specs.type']}
      />

      <FormField
        name="specs.location"
        label="Location"
        type="text"
        placeholder="Islamabad, Pakistan"
        value={formData.specs.location}
        onChange={handleInputChange}
        error={errors['specs.location']}
      />

      <FormField
        name="specs.completion"
        label="Completion Date"
        type="text"
        placeholder="July 2025"
        value={formData.specs.completion}
        onChange={handleInputChange}
        error={errors['specs.completion']}
      />

      <FormField
        name="specs.duration"
        label="Duration"
        type="text"
        placeholder="6 Months"
        value={formData.specs.duration}
        onChange={handleInputChange}
        error={errors['specs.duration']}
      />

      <FormField
        name="specs.team"
        label="Team"
        type="text"
        placeholder="5 Lighting Designers, 3 Engineers"
        value={formData.specs.team}
        onChange={handleInputChange}
        error={errors['specs.team']}
      />

      <FormField
        name="testimonial.text"
        label="Client Testimonial"
        type="textarea"
        placeholder="Client feedback about the project..."
        value={formData.testimonial.text}
        onChange={handleInputChange}
        error={errors['testimonial.text']}
      />

      <FormField
        name="testimonial.author"
        label="Testimonial Author"
        type="text"
        placeholder="Client name"
        value={formData.testimonial.author}
        onChange={handleInputChange}
        error={errors['testimonial.author']}
      />

      <FormField
        name="location"
        label="Location"
        type="text"
        required
        placeholder="Islamabad, Pakistan"
        value={formData.location}
        onChange={handleInputChange}
        error={errors.location}
      />

      <FormField
        name="date"
        label="Date"
        type="text"
        required
        placeholder="July 2025"
        value={formData.date}
        onChange={handleInputChange}
        error={errors.date}
      />

      <FormField
        name="featured"
        label="Featured Project"
        type="checkbox"
        value={formData.featured}
        onChange={handleInputChange}
        error={errors.featured}
      />

      <FileUploadField
        name="images"
        label="Gallery Images"
        icon={<ImageIcon className="w-4 h-4" />}
        onFileChange={handleFileChange}
        uploadedImages={uploadedImages}
        onRemoveImage={removeImage}
      />
    </BaseForm>
  );
}
