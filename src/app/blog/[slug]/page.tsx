import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import { ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Dummy blog post data
const blogPosts = [
  {
    slug: 'the-future-of-smart-lighting-in-modern-homes',
    title: 'The Future of Smart Lighting in Modern Homes',
    image: '/prodcut-4.jpg',
    author: 'Michael Brown',
    date: 'March 14, 2026',
    category: 'INTERIOR DESIGN',
    content: (
      <>
        <h2 className="text-2xl font-bold mb-6 mt-10 text-black">Introduction</h2>
        <p className="mb-6 text-lg text-gray-700">
          Smart lighting is revolutionizing the way we illuminate our homes, offering unprecedented
          control, efficiency, and ambiance. In this article, we explore why smart lighting is the
          future, its key benefits, latest trends, and real-life applications.
        </p>

        <h2 className="text-2xl font-bold mb-6 mt-10 text-black">
          Why Smart Lighting is the Future
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          With the rise of IoT and home automation, smart lighting systems are becoming more
          accessible and affordable. They offer features such as remote control, scheduling, and
          integration with other smart devices.
        </p>

        <h3 className="text-xl font-semibold mb-4 mt-8 text-blue-900">
          Key Benefits of Smart Lighting
        </h3>
        <ul className="list-disc pl-6 mb-6 text-gray-700">
          <li>Energy efficiency and cost savings</li>
          <li>Customizable ambiance for every room</li>
          <li>Remote access and automation</li>
          <li>Integration with voice assistants</li>
          <li>Enhanced security features</li>
        </ul>

        <h3 className="text-xl font-semibold mb-4 mt-8 text-blue-900">
          Latest Trends in Smart Lighting
        </h3>
        <ol className="list-decimal pl-6 mb-6 text-gray-700">
          <li>Color-changing LED bulbs</li>
          <li>Motion-sensing lights</li>
          <li>App-based control and scheduling</li>
          <li>Integration with smart home ecosystems</li>
        </ol>

        <h3 className="text-xl font-semibold mb-4 mt-8 text-blue-900">Real-Life Applications</h3>
        <p className="mb-6 text-lg text-gray-700">
          Homeowners are using smart lighting to create dynamic living spaces, improve energy
          efficiency, and enhance security. From automated outdoor lights to mood-setting indoor
          fixtures, the possibilities are endless.
        </p>

        <h2 className="text-2xl font-bold mb-6 mt-10 text-black">Conclusion</h2>
        <p className="mb-6 text-lg text-gray-700">
          Smart lighting is not just a trend—it&apos;s a transformative technology that is shaping
          the future of modern homes. Now is the perfect time to upgrade and experience the benefits
          firsthand.
        </p>
      </>
    ),
  },
];

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="max-w-[85rem] mx-auto px-4">
      {/* Header Section with PageHeader */}
      <PageHeader
        title="The Future of"
        titleHighlight="Smart Lighting"
        subtitle="in Modern Homes"
      />
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 mb-8">
        <span>{post.author}</span>
        <span className="w-1 h-1 bg-gray-400 rounded-full mx-2"></span>
        <span>{post.date}</span>
        <span className="w-1 h-1 bg-gray-400 rounded-full mx-2"></span>
        <span>{post.category}</span>
      </div>

      {/* Hero Image Section */}
      <div className="mb-10 flex justify-center">
        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={500}
          className="rounded-2xl object-cover w-full h-96 md:h-[40rem]"
        />
      </div>

      {/* Content Section */}
      <article className="prose prose-lg prose-headings:text-(--color-logo) prose-h3:text-primary  text-black">
        {post.content}
      </article>

      {/* Call-to-Action Section */}
      <div className="my-16 text-center">
        <h2 className="text-(--color-logo) text-2xl font-bold mb-4">
          Ready to Upgrade Your Home with Smart Lighting?
        </h2>
        <p className="text-gray-600 mb-6">
          Contact us today to start your journey toward a smarter, brighter home.
        </p>
        <Button className="bg-(--color-logo) hover:bg-(--color-logo)/80 rounded-xl group">
          Start Your Project{' '}
          <ArrowRight className="group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
