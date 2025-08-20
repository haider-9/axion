// app/projects/[slug]/page.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

// Dummy project data
const projects = [
  {
    slug: 'luxury-villa-lighting',
    title: 'Luxury Villa Lighting Project',
    overview:
      "This Luxury Villa project was designed to create an atmosphere of sophistication, comfort, and modern elegance. Our team at Axion Lighting combined premium fixtures with innovative design solutions to highlight the villa's unique architecture and interior spaces.",
    features: [
      'Customized chandelier installations for the main living space',
      'Ambient LED lighting for bedrooms to enhance relaxation',
      "Smart outdoor lighting for the villa's garden and pool area",
      'Energy-efficient solutions without compromising luxury aesthetics',
    ],
    specs: {
      type: 'Residential Luxury Villa',
      location: 'Islamabad, Pakistan',
      completion: 'July 2025',
      duration: '6 Months',
      team: '5 Lighting Designers, 3 Engineers',
    },
    testimonial: {
      text: 'Axion Lighting truly transformed our home into a masterpiece. The attention to detail and commitment to quality exceeded our expectations. Every corner feels luxurious, modern, and alive.',
      author: 'Mr. Ahmed Khan, Villa Owner',
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&q=80',
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&q=80',
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80',
    ],
  },
];

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <div className="p-10 text-center text-gray-500">Project not found</div>;
  }

  return (
    <>
      <div className=" max-w-[85rem] mx-auto mb-10 *:text-black">
        <PageHeader title="" />
        {/* Title + Hero */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {project.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-[#0077B6]">{project.title.split(' ').slice(-1)}</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Experience elegance redefined with a bespoke lighting design that blends luxury and
              functionality.
            </p>

            {/* Project Overview */}
            <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
            <p className="text-gray-700 mb-6">{project.overview}</p>

            {/* Key Features */}
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              {project.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            {/* Technical Specifications */}
            <h2 className="text-xl font-semibold mb-2">Technical Specifications</h2>
            <ul className="text-gray-700 space-y-1 mb-6">
              <li>
                <b>Project Type:</b> {project.specs.type}
              </li>
              <li>
                <b>Location:</b> {project.specs.location}
              </li>
              <li>
                <b>Completion Date:</b> {project.specs.completion}
              </li>
              <li>
                <b>Duration:</b> {project.specs.duration}
              </li>
              <li>
                <b>Team:</b> {project.specs.team}
              </li>
            </ul>
          </div>

          {/* Right Side Images */}
          <div>
            <Image
              src={project.images[0]}
              alt="Project Main"
              width={600}
              height={400}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <div className="grid grid-cols-3 gap-3">
              {project.images.slice(1).map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={`Project ${i}`}
                  width={200}
                  height={150}
                  className="w-full h-28 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="text-center my-16">
          <h2 className="text-3xl text-black font-semibold mb-4">
            What Our <span className="text-[#0077B6]">Client</span> Says
          </h2>
          <p className="text-gray-700 italic max-w-2xl mx-auto mb-4">{project.testimonial.text}</p>
          <p className="font-medium">{project.testimonial.author}</p>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80"
            alt="CTA Background"
            width={1200}
            height={300}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
            <h2 className="text-2xl font-bold mb-2">Want a Similar Project?</h2>
            <p className="mb-4">
              Ready to transform your home or commercial space with premium lighting solutions?
            </p>
            <Button className="bg-[#0d3361] text-white px-6 py-3 rounded-lg shadow-md transition">
              Start Your Project{' '}
              <span>
                <ArrowRight />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailPage;
