'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    id: 1,
    name: 'Leslie Alexander',
    title: 'Co-Founder & CEO',
    image: '/prodcut-7.jpg'
  },
  {
    id: 2,
    name: 'Sarah Williams',
    title: 'Head of Design',
    image: '/prodcut-1.jpg'
  },
  {
    id: 3,
    name: 'David Smith',
    title: 'Operations Manager',
    image: '/prodcut-2.jpg'
  },
  {
    id: 4,
    name: 'James Turner',
    title: 'Lead Engineer',
    image: '/prodcut-3.jpg'
  },
  {
    id: 5,
    name: 'Ethan Roberts',
    title: 'Sales Director',
    image: '/prodcut-4.jpg'
  },
  {
    id: 6,
    name: 'Daniel Lee',
    title: 'Creative Director',
    image: '/prodcut-5.jpg'
  },
  {
    id: 7,
    name: 'Emilie Carter',
    title: 'Product Designer',
    image: '/prodcut-6.jpg'
  },
  {
    id: 8,
    name: 'Olivia Martin',
    title: 'Marketing Lead',
    image: '/prodcut-7.jpg'
  }
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-#F4F6F8">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl  font-bold text-[var(--color-main-text)] mb-4">
            Meet our <span className="text-[var(--color-primary-accent)]">Team</span>
          </h2>
          <p className="text-md text-[var(--color-secondary-text)]">
            The passionate people behind your perfect lighting.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center group">
              {/* Team Member Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 h-48 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                {/* Team Member Image */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Team Member Info */}
                <h3 className="font-bold text-[var(--color-main-text)] text-lg mb-2">
                  {member.name}
                </h3>
                <p className="text-[var(--color-secondary-text)] text-sm">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
        <Link
            href="#"
            className="inline-flex items-center bg-[var(--color-logo)] text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors group"
          >
            Explore Our Story
            <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
