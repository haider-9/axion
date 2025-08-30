import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: projects.map((project) => project.toObject()),
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const formData = await request.formData();

    const projectData = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      category: formData.get('category'),
      style: formData.get('style'),
      overview: formData.get('overview'),
      features: formData.getAll('features'),
      specs: {
        type: formData.get('specs.type'),
        location: formData.get('specs.location'),
        completion: formData.get('specs.completion'),
        duration: formData.get('specs.duration'),
        team: formData.get('specs.team'),
      },
      testimonial: {
        text: formData.get('testimonial.text'),
        author: formData.get('testimonial.author'),
      },
      location: formData.get('location'),
      date: formData.get('date'),
      featured: formData.get('featured') === 'true',
      images: formData.getAll('images'),
      image: formData.get('image'),
    };

    const project = await Project.create(projectData);

    return NextResponse.json({
      success: true,
      data: project.toObject(),
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 },
    );
  }
}
