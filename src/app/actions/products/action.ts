'use server';

import dbConnect from '@/lib/db';
import Product from '@/models/Products';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  try {
    await dbConnect();
    const product = await Product.create({
      name: formData.get('name'),
      slug: formData.get('slug'),
      price: Number(formData.get('price')),
      description: formData.get('description'),
      images: formData.get('images')?.toString().split(','),
      category: formData.get('category'),
      stock: Number(formData.get('stock')) || 0,
      featured: formData.get('featured') === 'on',
    });
    revalidatePath('/admin/products');
    return { success: true, data: product };
  } catch (error) {
    return { success: false, error: 'Failed to create product' };
  }
}

export async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find({}).populate('category');
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: 'Failed to fetch products' };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    await dbConnect();
    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: formData.get('name'),
        slug: formData.get('slug'),
        price: Number(formData.get('price')),
        description: formData.get('description'),
        images: formData.get('images')?.toString().split(','),
        category: formData.get('category'),
        stock: Number(formData.get('stock')) || 0,
        featured: formData.get('featured') === 'on',
      },
      { new: true }
    );
    revalidatePath('/admin/products');
    revalidatePath(`/product/${product.slug}`);
    return { success: true, data: product };
  } catch (error) {
    return { success: false, error: 'Failed to update product' };
  }
}

export async function deleteProduct(id: string) {
  try {
    await dbConnect();
    await Product.findByIdAndDelete(id);
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete product' };
  }
}