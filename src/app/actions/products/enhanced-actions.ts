'use server';

import dbConnect from '@/lib/db';
import Product from '@/models/Products';
import { revalidatePath } from 'next/cache';

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  inStock?: boolean;
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export async function searchProducts(filters: ProductFilters) {
  try {
    await dbConnect();
    
    const query: any = {};
    
    // Category filter
    if (filters.category) {
      query.category = filters.category;
    }
    
    // Price range filter
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }
    
    // Featured filter
    if (filters.featured !== undefined) {
      query.featured = filters.featured;
    }
    
    // Stock filter
    if (filters.inStock) {
      query.stock = { $gt: 0 };
    }
    
    // Search filter
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const skip = (page - 1) * limit;
    
    // Sorting
    const sortOptions: any = {};
    if (filters.sortBy) {
      sortOptions[filters.sortBy] = filters.sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1; // Default sort by newest
    }
    
    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('category')
        .sort(sortOptions)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query)
    ]);
    
    const totalPages = Math.ceil(total / limit);
    
    return {
      success: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    };
  } catch (error) {
    return { success: false, error: 'Failed to search products' };
  }
}

export async function getFeaturedProducts(limit: number = 8) {
  try {
    await dbConnect();
    const products = await Product.find({ featured: true })
      .populate('category')
      .limit(limit)
      .sort({ createdAt: -1 });
    
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: 'Failed to fetch featured products' };
  }
}

export async function getProductsByCategory(categorySlug: string, limit: number = 12) {
  try {
    await dbConnect();
    const products = await Product.find({ 'category.slug': categorySlug })
      .populate('category')
      .limit(limit)
      .sort({ createdAt: -1 });
    
    return { success: true, data: products };
  } catch (error) {
    return { success: false, error: 'Failed to fetch products by category' };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    await dbConnect();
    const product = await Product.findOne({ slug }).populate('category');
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    
    return { success: true, data: product };
  } catch (error) {
    return { success: false, error: 'Failed to fetch product' };
  }
}

export async function updateProductStock(productId: string, quantity: number, operation: 'add' | 'subtract') {
  try {
    await dbConnect();
    
    const updateOperation = operation === 'add' 
      ? { $inc: { stock: quantity } }
      : { $inc: { stock: -quantity } };
    
    const product = await Product.findByIdAndUpdate(
      productId,
      updateOperation,
      { new: true }
    );
    
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    
    if (product.stock < 0) {
      // Revert the operation if stock would go negative
      await Product.findByIdAndUpdate(
        productId,
        { $inc: { stock: quantity } }
      );
      return { success: false, error: 'Insufficient stock' };
    }
    
    revalidatePath('/admin/products');
    revalidatePath(`/product/${product.slug}`);
    
    return { success: true, data: product };
  } catch (error) {
    return { success: false, error: 'Failed to update product stock' };
  }
}

export async function getProductRecommendations(productId: string, limit: number = 4) {
  try {
    await dbConnect();
    const currentProduct = await Product.findById(productId);
    
    if (!currentProduct) {
      return { success: false, error: 'Product not found' };
    }
    
    // Get products from the same category, excluding current product
    const recommendations = await Product.find({
      category: currentProduct.category,
      _id: { $ne: productId }
    })
      .populate('category')
      .limit(limit)
      .sort({ rating: -1, numReviews: -1 });
    
    return { success: true, data: recommendations };
  } catch (error) {
    return { success: false, error: 'Failed to fetch product recommendations' };
  }
}
