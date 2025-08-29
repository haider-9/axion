'use server';

import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { revalidatePath } from 'next/cache';

export async function createOrder(orderData: any) {
  try {
    await dbConnect();
    const order = await Order.create(orderData);
    revalidatePath('/admin/orders');
    return { success: true, data: order };
  } catch (error) {
    return { success: false, error: 'Failed to create order' };
  }
}

export async function getUserOrders(userId: string) {
  try {
    await dbConnect();
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    return { success: true, data: orders };
  } catch (error) {
    return { success: false, error: 'Failed to fetch orders' };
  }
}

export async function updateOrderStatus(orderId: string, status: 'paid' | 'delivered') {
  try {
    await dbConnect();
    const update: any = {};
    if (status === 'paid') {
      update.isPaid = true;
      update.paidAt = Date.now();
    } else if (status === 'delivered') {
      update.isDelivered = true;
      update.deliveredAt = Date.now();
    }
    const order = await Order.findByIdAndUpdate(orderId, update, { new: true });
    revalidatePath('/admin/orders');
    revalidatePath(`/order/${orderId}`);
    return { success: true, data: order };
  } catch (error) {
    return { success: false, error: 'Failed to update order status' };
  }
}