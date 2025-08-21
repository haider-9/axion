import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Product description is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Invalid image URL'),
  inStock: z.boolean(),
});

export const createProductSchema = productSchema.omit({ id: true });

export type Product = z.infer<typeof productSchema>;
export type CreateProduct = z.infer<typeof createProductSchema>;
