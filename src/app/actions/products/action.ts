'use server';

import dbConnect from '@/lib/db';
import Product from '@/models/Products';
import Category from '@/models/Category';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  try {
    await dbConnect();

    let categoryId = null;
    const categoryName = formData.get('category') as string;

    if (categoryName) {
      let category = await Category.findOne({ name: categoryName });
      if (!category) {
        category = await Category.create({
          name: categoryName,
          slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
          description: `${categoryName} category`,
        });
      }
      categoryId = category._id;
    }

    const newProduct = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      price: Number(formData.get('price')),
      description: formData.get('description'),
      images: formData.getAll('images').map((img) => img.toString()),
      category: categoryId,
      stock: Number(formData.get('stock')) || 0,
      featured: formData.get('featured') === 'on',
    };

    const product = await Product.create(newProduct);
    revalidatePath('/admin/products');
    revalidatePath('/');
    return { success: true, data: product.toObject() };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}

export async function getProducts() {
  try {
    await dbConnect();
    const products = await Product.find({}).populate('category');
    return { success: true, data: products.map((prod) => prod.toObject()) };
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
      { new: true },
    );
    revalidatePath('/admin/products');
    revalidatePath(`/product/${product.slug}`);
    return { success: true, data: product ? product.toObject() : null };
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
