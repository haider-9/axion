'use server';

import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Products';
import { revalidatePath } from 'next/cache';

export interface OrderFilters {
  status?: 'pending' | 'paid' | 'delivered' | 'cancelled';
  userId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  limit?: number;
}

export async function getAllOrders(filters: OrderFilters = {}) {
  try {
    await dbConnect();
    
    const query: any = {};
    
    // Status filter
    if (filters.status) {
      if (filters.status === 'paid') {
        query.isPaid = true;
        query.isDelivered = false;
      } else if (filters.status === 'delivered') {
        query.isPaid = true;
        query.isDelivered = true;
      } else if (filters.status === 'pending') {
        query.isPaid = false;
        query.isDelivered = false;
      } else if (filters.status === 'cancelled') {
        query.isCancelled = true;
      }
    }
    
    // User filter
    if (filters.userId) {
      query.user = filters.userId;
    }
    
    // Date range filter
    if (filters.dateFrom || filters.dateTo) {
      query.createdAt = {};
      if (filters.dateFrom) query.createdAt.$gte = filters.dateFrom;
      if (filters.dateTo) query.createdAt.$lte = filters.dateTo;
    }
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;
    
    const [orders, total] = await Promise.all([
      Order.find(query)
        .populate('user', 'name email')
        .populate('orderItems.product')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(query)
    ]);
    
    const totalPages = Math.ceil(total / limit);
    
    return {
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: page,
          totalPages,
          totalOrders: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    };
  } catch (error) {
    return { success: false, error: 'Failed to fetch orders' };
  }
}

export async function cancelOrder(orderId: string, reason: string) {
  try {
    await dbConnect();
    
    const order = await Order.findById(orderId);
    if (!order) {
      return { success: false, error: 'Order not found' };
    }
    
    if (order.isDelivered) {
      return { success: false, error: 'Cannot cancel delivered order' };
    }
    
    if (order.isCancelled) {
      return { success: false, error: 'Order is already cancelled' };
    }
    
    // Restore product stock
    for (const item of order.orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.qty } }
      );
    }
    
    // Update order status
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        isCancelled: true,
        cancelledAt: new Date(),
        cancellationReason: reason
      },
      { new: true }
    );
    
    revalidatePath('/admin/orders');
    revalidatePath(`/order/${orderId}`);
    
    return { success: true, data: updatedOrder };
  } catch (error) {
    return { success: false, error: 'Failed to cancel order' };
  }
}

export async function processRefund(orderId: string, refundAmount: number, reason: string) {
  try {
    await dbConnect();
    
    const order = await Order.findById(orderId);
    if (!order) {
      return { success: false, error: 'Order not found' };
    }
    
    if (!order.isPaid) {
      return { success: false, error: 'Order is not paid' };
    }
    
    if (refundAmount > order.totalPrice) {
      return { success: false, error: 'Refund amount cannot exceed order total' };
    }
    
    // Update order with refund information
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        refund: {
          amount: refundAmount,
          reason,
          processedAt: new Date(),
          status: 'processed'
        }
      },
      { new: true }
    );
    
    revalidatePath('/admin/orders');
    revalidatePath(`/order/${orderId}`);
    
    return { success: true, data: updatedOrder };
  } catch (error) {
    return { success: false, error: 'Failed to process refund' };
  }
}

export async function getOrderAnalytics(dateFrom: Date, dateTo: Date) {
  try {
    await dbConnect();
    
    const pipeline = [
      {
        $match: {
          createdAt: { $gte: dateFrom, $lte: dateTo },
          isCancelled: { $ne: true }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
          averageOrderValue: { $avg: '$totalPrice' }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
      }
    ];
    
    const analytics = await Order.aggregate(pipeline);
    
    // Calculate summary statistics
    const summary = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: dateFrom, $lte: dateTo },
          isCancelled: { $ne: true }
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
          averageOrderValue: { $avg: '$totalPrice' },
          totalItems: { $sum: { $size: '$orderItems' } }
        }
      }
    ]);
    
    return {
      success: true,
      data: {
        dailyAnalytics: analytics,
        summary: summary[0] || {
          totalOrders: 0,
          totalRevenue: 0,
          averageOrderValue: 0,
          totalItems: 0
        }
      }
    };
  } catch (error) {
    return { success: false, error: 'Failed to fetch order analytics' };
  }
}

export async function updateShippingTracking(orderId: string, trackingNumber: string, carrier: string) {
  try {
    await dbConnect();
    
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        shipping: {
          trackingNumber,
          carrier,
          updatedAt: new Date()
        }
      },
      { new: true }
    );
    
    if (!updatedOrder) {
      return { success: false, error: 'Order not found' };
    }
    
    revalidatePath('/admin/orders');
    revalidatePath(`/order/${orderId}`);
    
    return { success: true, data: updatedOrder };
  } catch (error) {
    return { success: false, error: 'Failed to update shipping tracking' };
  }
}

export async function getOrderById(orderId: string) {
  try {
    await dbConnect();
    
    const order = await Order.findById(orderId)
      .populate('user', 'name email')
      .populate('orderItems.product');
    
    if (!order) {
      return { success: false, error: 'Order not found' };
    }
    
    return { success: true, data: order };
  } catch (error) {
    return { success: false, error: 'Failed to fetch order' };
  }
}
