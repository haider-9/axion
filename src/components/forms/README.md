# Form Components

This directory contains modular form components for different entity types in the application. Each form component uses API routes and simple validation with a professional UI using shadcn/ui components.

## Structure

```
forms/
├── BaseForm.tsx          # Base form component with shared functionality
├── ProductForm.tsx       # Product creation form
├── CategoryForm.tsx      # Category creation form
├── BlogForm.tsx          # Blog post creation form
├── ProjectForm.tsx       # Project creation form
├── UserForm.tsx          # User creation form
├── index.ts             # Export all form components
└── README.md            # This documentation
```

## Components

### BaseForm

The base form component that provides:

- Dialog structure with header, content, and footer
- Form submission handling
- Loading states
- File upload functionality
- Error handling

### Individual Form Components

Each form component provides:

- Simple form data handling
- Basic validation
- Field-specific logic
- Professional UI with shadcn/ui components
- API route integration

## Usage

### Using AddButton (Recommended)

The `AddButton` component is the main entry point that automatically renders the appropriate form based on the `type` prop:

```tsx
import { AddButton } from '@/components';

<AddButton
  type="product"
  onSuccess={() => {
    // Handle success
  }}
/>;
```

### Using Individual Forms

You can also use individual form components directly:

```tsx
import { ProductForm } from '@/components/forms';

<ProductForm
  onSuccess={() => {
    // Handle success
  }}
/>;
```

## API Routes

All forms submit to their respective API routes:

### POST Endpoints (Create)

- `/api/products` - Product creation
- `/api/categories` - Category creation
- `/api/blogs` - Blog post creation
- `/api/projects` - Project creation
- `/api/users` - User creation
- `/api/upload` - File upload

### GET Endpoints (Fetch)

- `/api/products` - Fetch all products (with populated categories)
- `/api/categories` - Fetch all categories
- `/api/blogs` - Fetch all blogs
- `/api/projects` - Fetch all projects
- `/api/users` - Fetch all users (passwords excluded)

### Example API Usage

```tsx
// Fetch products
const response = await fetch('/api/products');
const result = await response.json();
if (result.success) {
  console.log('Products:', result.data);
}

// Create a product
const formData = new FormData();
formData.append('name', 'New Product');
formData.append('price', '99.99');
// ... other fields

const response = await fetch('/api/products', {
  method: 'POST',
  body: formData,
});
const result = await response.json();
```

## Features

### Form Validation

- Simple client-side validation
- Error messages displayed below fields
- Validation before form submission

### File Upload

- Drag and drop image upload
- Multiple image support for products and projects
- Image preview with remove functionality
- Automatic upload on form submission

### Professional UI

- Consistent design using shadcn/ui components
- Responsive grid layout
- Loading states and progress indicators
- Color-coded headers for different entity types

## Form Types

### ProductForm

- Product name, slug, price, description
- Category selection with "Create New Category" option
- Stock quantity and featured status
- Multiple product images

### CategoryForm

- Category name, slug, description
- Single category image

### BlogForm

- Title, slug, content, excerpt
- Author and tags
- Featured image
- Published status

### ProjectForm

- Title, slug, category, style
- Overview and features
- Detailed specifications (type, location, completion, duration, team)
- Client testimonial
- Multiple gallery images
- Featured status

### UserForm

- Name, email, password
- Administrator status

## Styling

All forms use Tailwind CSS classes and shadcn/ui components for consistent styling. The forms are responsive and work well on both desktop and mobile devices.
