import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Test the connection by listing all collections
    const collections = await db.listCollections().toArray();
    
    return NextResponse.json({ 
      status: 'success', 
      collections: collections.map((c: { name: string }) => c.name),
      dbStats: await db.stats()
    });
  } catch (error: unknown) {
    console.error('MongoDB connection error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to connect to MongoDB', 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}
