"use client"
import { useState } from 'react';
import { toast } from 'sonner'; // You can use any toast library

// Import all actions
import {
  // User actions
  createUser,
  authenticateUser,
  updateUserProfile,
  changePassword,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  
  // Product actions
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductBySlug,
  updateProductStock,
  getProductRecommendations,
  
  // Order actions
  createOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
  cancelOrder,
  processRefund,
  getOrderAnalytics,
  updateShippingTracking,
  getOrderById,
  
  // Category actions
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  
  // Admin actions
  getAllUsers,
  updateUserRole,
  deleteUser,
  getDashboardStats,
  getProductAnalytics,
  updateSystemSettings,
  bulkUpdateProductStock,
  exportData,
} from '@/app/actions';

export function useActions() {
  const [loading, setLoading] = useState(false);

  const handleAction = async <T>(
    action: () => Promise<T>,
    successMessage?: string,
    errorMessage?: string
  ): Promise<T | null> => {
    setLoading(true);
    try {
      const result = await action();
      if (successMessage) {
        toast.success(successMessage);
      }
      return result;
    } catch (error) {
      const message = errorMessage || 'An error occurred';
      toast.error(message);
      console.error('Action error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // User actions
  const userActions = {
    create: (formData: FormData) =>
      handleAction(
        () => createUser(formData),
        'User created successfully',
        'Failed to create user'
      ),
    authenticate: (email: string, password: string) =>
      handleAction(
        () => authenticateUser(email, password),
        'Authentication successful',
        'Authentication failed'
      ),
    updateProfile: (userId: string, formData: FormData) =>
      handleAction(
        () => updateUserProfile(userId, formData),
        'Profile updated successfully',
        'Failed to update profile'
      ),
    changePassword: (userId: string, currentPassword: string, newPassword: string) =>
      handleAction(
        () => changePassword(userId, currentPassword, newPassword),
        'Password changed successfully',
        'Failed to change password'
      ),
    addToWishlist: (userId: string, productId: string) =>
      handleAction(
        () => addToWishlist(userId, productId),
        'Added to wishlist',
        'Failed to add to wishlist'
      ),
    removeFromWishlist: (userId: string, productId: string) =>
      handleAction(
        () => removeFromWishlist(userId, productId),
        'Removed from wishlist',
        'Failed to remove from wishlist'
      ),
    getWishlist: (userId: string) =>
      handleAction(() => getWishlist(userId)),
  };

  // Product actions
  const productActions = {
    create: (formData: FormData) =>
      handleAction(
        () => createProduct(formData),
        'Product created successfully',
        'Failed to create product'
      ),
    getAll: () => handleAction(() => getProducts()),
    update: (id: string, formData: FormData) =>
      handleAction(
        () => updateProduct(id, formData),
        'Product updated successfully',
        'Failed to update product'
      ),
    delete: (id: string) =>
      handleAction(
        () => deleteProduct(id),
        'Product deleted successfully',
        'Failed to delete product'
      ),
    search: (filters: any) => handleAction(() => searchProducts(filters)),
    getFeatured: (limit?: number) => handleAction(() => getFeaturedProducts(limit)),
    getByCategory: (categorySlug: string, limit?: number) =>
      handleAction(() => getProductsByCategory(categorySlug, limit)),
    getBySlug: (slug: string) => handleAction(() => getProductBySlug(slug)),
    updateStock: (productId: string, quantity: number, operation: 'add' | 'subtract') =>
      handleAction(
        () => updateProductStock(productId, quantity, operation),
        'Stock updated successfully',
        'Failed to update stock'
      ),
    getRecommendations: (productId: string, limit?: number) =>
      handleAction(() => getProductRecommendations(productId, limit)),
  };

  // Order actions
  const orderActions = {
    create: (orderData: any) =>
      handleAction(
        () => createOrder(orderData),
        'Order created successfully',
        'Failed to create order'
      ),
    getUserOrders: (userId: string) => handleAction(() => getUserOrders(userId)),
    updateStatus: (orderId: string, status: 'paid' | 'delivered') =>
      handleAction(
        () => updateOrderStatus(orderId, status),
        'Order status updated',
        'Failed to update order status'
      ),
    getAll: (filters?: any) => handleAction(() => getAllOrders(filters)),
    cancel: (orderId: string, reason: string) =>
      handleAction(
        () => cancelOrder(orderId, reason),
        'Order cancelled successfully',
        'Failed to cancel order'
      ),
    processRefund: (orderId: string, refundAmount: number, reason: string) =>
      handleAction(
        () => processRefund(orderId, refundAmount, reason),
        'Refund processed successfully',
        'Failed to process refund'
      ),
    getAnalytics: (dateFrom: Date, dateTo: Date) =>
      handleAction(() => getOrderAnalytics(dateFrom, dateTo)),
    updateShipping: (orderId: string, trackingNumber: string, carrier: string) =>
      handleAction(
        () => updateShippingTracking(orderId, trackingNumber, carrier),
        'Shipping updated successfully',
        'Failed to update shipping'
      ),
    getById: (orderId: string) => handleAction(() => getOrderById(orderId)),
  };

  // Category actions
  const categoryActions = {
    create: (formData: FormData) =>
      handleAction(
        () => createCategory(formData),
        'Category created successfully',
        'Failed to create category'
      ),
    getAll: () => handleAction(() => getCategories()),
    getBySlug: (slug: string) => handleAction(() => getCategoryBySlug(slug)),
    update: (id: string, formData: FormData) =>
      handleAction(
        () => updateCategory(id, formData),
        'Category updated successfully',
        'Failed to update category'
      ),
    delete: (id: string) =>
      handleAction(
        () => deleteCategory(id),
        'Category deleted successfully',
        'Failed to delete category'
      ),
  };

  // Admin actions
  const adminActions = {
    getAllUsers: (page?: number, limit?: number) =>
      handleAction(() => getAllUsers(page, limit)),
    updateUserRole: (userId: string, isAdmin: boolean) =>
      handleAction(
        () => updateUserRole(userId, isAdmin),
        'User role updated successfully',
        'Failed to update user role'
      ),
    deleteUser: (userId: string) =>
      handleAction(
        () => deleteUser(userId),
        'User deleted successfully',
        'Failed to delete user'
      ),
    getDashboardStats: () => handleAction(() => getDashboardStats()),
    getProductAnalytics: () => handleAction(() => getProductAnalytics()),
    updateSystemSettings: (settings: any) =>
      handleAction(
        () => updateSystemSettings(settings),
        'Settings updated successfully',
        'Failed to update settings'
      ),
    bulkUpdateStock: (updates: Array<{ productId: string; newStock: number }>) =>
      handleAction(
        () => bulkUpdateProductStock(updates),
        'Stock updated successfully',
        'Failed to update stock'
      ),
    exportData: (dataType: 'users' | 'products' | 'orders', format: 'csv' | 'json') =>
      handleAction(() => exportData(dataType, format)),
  };

  return {
    loading,
    user: userActions,
    product: productActions,
    order: orderActions,
    category: categoryActions,
    admin: adminActions,
  };
}
