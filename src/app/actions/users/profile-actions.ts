'use server';

import dbConnect from '@/lib/db';
import {User} from '@/models/User';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export async function updateUserProfile(userId: string, formData: FormData) {
  try {
    await dbConnect();
    const updateData: any = {
      name: formData.get('name'),
      address: {
        street: formData.get('street'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country'),
      },
    };

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    revalidatePath('/profile');
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: 'Failed to update profile' };
  }
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  try {
    await dbConnect();
    const user = await User.findById(userId);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return { success: false, error: 'Current password is incorrect' };
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });
    
    return { success: true, message: 'Password updated successfully' };
  } catch (error) {
    return { success: false, error: 'Failed to change password' };
  }
}

export async function getUserProfile(userId: string) {
  try {
    await dbConnect();
    const user = await User.findById(userId).select('-password');
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error: 'Failed to fetch user profile' };
  }
}

export async function addToWishlist(userId: string, productId: string) {
  try {
    await dbConnect();
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: productId } },
      { new: true }
    ).populate('wishlist');
    
    revalidatePath('/profile');
    return { success: true, data: user.wishlist };
  } catch (error) {
    return { success: false, error: 'Failed to add to wishlist' };
  }
}

export async function removeFromWishlist(userId: string, productId: string) {
  try {
    await dbConnect();
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } },
      { new: true }
    ).populate('wishlist');
    
    revalidatePath('/profile');
    return { success: true, data: user.wishlist };
  } catch (error) {
    return { success: false, error: 'Failed to remove from wishlist' };
  }
}

export async function getWishlist(userId: string) {
  try {
    await dbConnect();
    const user = await User.findById(userId).populate('wishlist');
    return { success: true, data: user?.wishlist || [] };
  } catch (error) {
    return { success: false, error: 'Failed to fetch wishlist' };
  }
}
