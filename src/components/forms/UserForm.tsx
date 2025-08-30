'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import { toast } from 'sonner';
import BaseForm, { FormField } from './BaseForm';

interface UserFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function UserForm({ onSuccess, className = '' }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

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

      // Submit to API
      const response = await fetch('/api/users', {
        method: 'POST',
        body: formDataParam,
      });

      const result = await response.json();

      if (result.success) {
        setFormData({
          name: '',
          email: '',
          password: '',
          isAdmin: false,
        });
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
      title="Add New User"
      description="Create a new user account with appropriate permissions"
      icon={<User className="w-5 h-5" />}
      color="bg-pink-500"
      onSubmit={handleSubmit}
      onSuccess={onSuccess}
      triggerText="Add User"
      className={className}
    >
      <FormField
        name="name"
        label="Full Name"
        type="text"
        required
        placeholder="John Doe"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
      />

      <FormField
        name="email"
        label="Email"
        type="email"
        required
        placeholder="user@example.com"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
      />

      <FormField
        name="password"
        label="Password"
        type="password"
        required
        placeholder="Create a secure password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
      />

      <FormField
        name="isAdmin"
        label="Administrator Account"
        type="checkbox"
        value={formData.isAdmin}
        onChange={handleInputChange}
        error={errors.isAdmin}
      />
    </BaseForm>
  );
}
