import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: categories.map((cat) => cat.toObject()),
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const formData = await request.formData();

    const categoryData = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      image: formData.get('image')?.toString() || null,
    };

    const category = await Category.create(categoryData);

    return NextResponse.json({
      success: true,
      data: category.toObject(),
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 },
    );
  }
}
