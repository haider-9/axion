'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const projects = [
  {
    id: 1,
    slug: 'luxury-villa-lighting',
    category: 'Residential',
    style: 'Modern',
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
      'https://images.unsplash.com/photo-1600585154154-59e4f4f7a3c2?w=800&q=80',
      'https://images.unsplash.com/photo-1616486886892-ff366943d45f?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
      'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&q=80',
    ],
    location: 'Islamabad, Pakistan',
    date: 'July 2025',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    id: 2,
    slug: 'solar-pathway-hotel',
    category: 'Commercial',
    style: 'Outdoor',
    title: 'Solar Pathway for Boutique Hotel Courtyard',
    location: 'Lahore, Pakistan',
    date: 'June 2025',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
  },
  {
    id: 3,
    slug: 'dining-room-statement',
    category: 'Residential',
    style: 'Classic',
    title: 'Dining Room Statement with Other Hanging Ceiling Lights',
    location: 'Karachi, Pakistan',
    date: 'May 2025',
    image: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?w=800&q=80',
  },
  {
    id: 4,
    slug: 'minimalist-living-room',
    category: 'Residential',
    style: 'Modern',
    title: 'Minimalist Living Room with Recessed Lighting',
    location: 'Lahore, Pakistan',
    date: 'April 2025',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80',
  },
];

const categories = ['All', 'Residential', 'Commercial'];
const styles = ['Modern', 'Classic', 'Outdoor'];

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter || p.style === activeFilter);

  return (
    <div className="max-w-[85rem] my-10 px-10 sm:p-0 mx-auto">
      {/* PageHeader for consistent header */}
      <PageHeader
        title="Our"
        titleHighlight="Projects"
        subtitle="Showcasing our finest lighting installations and creative solutions."
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {['All', ...categories.slice(1), ...styles].map((cat) => (
          <Button
            key={cat}
            variant={activeFilter === cat ? 'default' : 'outline'}
            onClick={() => setActiveFilter(cat)}
            className={cn(
              `rounded-lg text-black hover:bg-[var(--color-logo)] px-5 py-2 text-sm font-medium`,
              activeFilter === cat ? 'bg-[var(--color-logo)] text-white' : 'bg-white text-black',
            )}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[400px] md:h-[420px]"
          >
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-2/3 object-cover"
            />
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  {project.category} - {project.style}
                </p>
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600">
                  {project.location} - {project.date}
                </p>
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" className="w-full">
                  <a href={`/projects/${project.id}`}>View Project</a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
