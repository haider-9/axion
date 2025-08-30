'use client';

import { ProductForm, CategoryForm, BlogForm, ProjectForm, UserForm } from './forms';

interface AddButtonProps {
  type: 'product' | 'category' | 'blog' | 'user' | 'project';
  className?: string;
  onSuccess?: () => void;
}

export default function AddButton({ type, className = '', onSuccess }: AddButtonProps) {
  switch (type) {
    case 'product':
      return <ProductForm onSuccess={onSuccess} className={className} />;
    case 'category':
      return <CategoryForm onSuccess={onSuccess} className={className} />;
    case 'blog':
      return <BlogForm onSuccess={onSuccess} className={className} />;
    case 'project':
      return <ProjectForm onSuccess={onSuccess} className={className} />;
    case 'user':
      return <UserForm onSuccess={onSuccess} className={className} />;
    default:
      return null;
  }
}
