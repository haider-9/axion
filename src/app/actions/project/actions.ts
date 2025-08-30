'use server';

import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
  try {
    await dbConnect();
    const projectData = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      category: formData.get('category'),
      style: formData.get('style'),
      overview: formData.get('overview'),
      features: formData
        .get('features')
        ?.toString()
        .split(',')
        .map((feature) => feature.trim()),
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
      images: formData.getAll('images').map((img) => img.toString()),
      location: formData.get('location'),
      date: formData.get('date'),
      image: formData.get('image')?.toString() || null,
      featured: formData.get('featured') === 'on',
    };

    const project = await Project.create(projectData);
    revalidatePath('/projects');
    revalidatePath('/');
    return { success: true, data: project.toObject() };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create project' };
  }
}

export async function getProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return { success: true, data: projects.map((project) => project.toObject()) };
  } catch (error) {
    return { success: false, error: 'Failed to fetch projects' };
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug });
    return { success: true, data: project ? project.toObject() : null };
  } catch (error) {
    return { success: false, error: 'Failed to fetch project' };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    await dbConnect();
    const project = await Project.findByIdAndUpdate(
      id,
      {
        title: formData.get('title'),
        slug: formData.get('slug'),
        category: formData.get('category'),
        style: formData.get('style'),
        overview: formData.get('overview'),
        features: formData
          .get('features')
          ?.toString()
          .split(',')
          .map((feature) => feature.trim()),
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
        images: formData.getAll('images').map((img) => img.toString()),
        location: formData.get('location'),
        date: formData.get('date'),
        image: formData.get('image')?.toString() || null,
        featured: formData.get('featured') === 'on',
      },
      { new: true },
    );
    revalidatePath('/projects');
    revalidatePath(`/projects/${project.slug}`);
    return { success: true, data: project ? project.toObject() : null };
  } catch (error) {
    return { success: false, error: 'Failed to update project' };
  }
}

export async function deleteProject(id: string) {
  try {
    await dbConnect();
    await Project.findByIdAndDelete(id);
    revalidatePath('/projects');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to delete project' };
  }
}
