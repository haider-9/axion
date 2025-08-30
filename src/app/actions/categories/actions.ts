'use server';

import dbConnect from '@/lib/db';
import Category from '@/models/Category';
import { revalidatePath } from 'next/cache';

export async function createCategory(formData: FormData) {
  try {
    await dbConnect();
    const categoryData = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      image: formData.get('image')?.toString() || null,
    };
    console.log({ categoryData });

    const category = await Category.create(categoryData);
    revalidatePath('/category');
    revalidatePath('/');
    return { success: true, data: category.toObject() };
  } catch (error) {
    console.error('Error creating category:', error);
    return { success: false, error: 'Failed to create category' };
  }
}

export async function getCategories() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 });
    return { success: true, data: categories.map((cat) => cat.toObject()) };
  } catch (error) {
    return { success: false, error: 'Failed to fetch categories' };
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    await dbConnect();
    const category = await Category.findOne({ slug });
    return { success: true, data: category ? category.toObject() : null };
  } catch (error) {
    return { success: false, error: 'Failed to fetch category' };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  try {
    await dbConnect();
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: formData.get('name'),
        slug: formData.get('slug'),
        description: formData.get('description'),
        image: formData.get('image'),
      },
      { new: true },
    );
    revalidatePath('/admin/categories');
    revalidatePath('/');
    return { success: true, data: category ? category.toObject() : null };
  } catch (error) {
    return { success: false, error: 'Failed to update category' };
  }
}

export async function deleteCategory(id: string) {
  try {
    await dbConnect();
    await Category.findByIdAndDelete(id);
    revalidatePath('/admin/categories');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete category' };
  }
}
