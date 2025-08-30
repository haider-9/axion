'use server';

import dbConnect from '@/lib/db';
import { User } from '@/models/User';
import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';

export async function createUser(formData: FormData) {
  try {
    await dbConnect();
    const hashedPassword = await bcrypt.hash(formData.get('password') as string, 10);
    const user = await User.create({
      name: formData.get('name'),
      email: formData.get('email'),
      password: hashedPassword,
      isAdmin: formData.get('isAdmin') === 'on',
    });
    return { success: true, data: user.toObject() };
  } catch (error) {
    return { success: false, error: 'Failed to create user' };
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    await dbConnect();
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: 'Invalid credentials' };
    }
    return { success: true, data: user.toObject() };
  } catch (error) {
    return { success: false, error: 'Authentication failed' };
  }
}
