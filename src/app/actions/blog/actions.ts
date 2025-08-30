'use server';

import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { revalidatePath } from 'next/cache';

export async function createBlog(formData: FormData) {
  try {
    await dbConnect();
    const blogData = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      content: formData.get('content'),
      excerpt: formData.get('excerpt'),
      image: formData.get('image')?.toString() || null,
      author: formData.get('author'),
      tags: formData
        .get('tags')
        ?.toString()
        .split(',')
        .map((tag) => tag.trim()),
      published: formData.get('published') === 'on',
    };

    const blog = await Blog.create(blogData);
    revalidatePath('/blog');
    revalidatePath('/');
    return { success: true, data: blog.toObject() };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create blog post' };
  }
}

export async function getBlogs() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return { success: true, data: blogs.map((blog) => blog.toObject()) };
  } catch (error) {
    return { success: false, error: 'Failed to fetch blogs' };
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug });
    return { success: true, data: blog ? blog.toObject() : null };
  } catch (error) {
    return { success: false, error: 'Failed to fetch blog' };
  }
}

export async function updateBlog(id: string, formData: FormData) {
  try {
    await dbConnect();
    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title: formData.get('title'),
        slug: formData.get('slug'),
        content: formData.get('content'),
        excerpt: formData.get('excerpt'),
        image: formData.get('image')?.toString() || null,
        author: formData.get('author'),
        tags: formData
          .get('tags')
          ?.toString()
          .split(',')
          .map((tag) => tag.trim()),
        published: formData.get('published') === 'on',
      },
      { new: true },
    );
    revalidatePath('/blog');
    revalidatePath(`/blog/${blog.slug}`);
    return { success: true, data: blog ? blog.toObject() : null };
  } catch (error) {
    return { success: false, error: 'Failed to update blog' };
  }
}

export async function deleteBlog(id: string) {
  try {
    await dbConnect();
    await Blog.findByIdAndDelete(id);
    revalidatePath('/blog');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete blog' };
  }
}
