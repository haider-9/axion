'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    id: 1,
    name: 'Leslie Alexander',
    title: 'Co-Founder & CEO',
    image: '/prodcut-7.jpg',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    title: 'Head of Design',
    image: '/prodcut-1.jpg',
  },
  {
    id: 3,
    name: 'David Smith',
    title: 'Operations Manager',
    image: '/prodcut-2.jpg',
  },
  {
    id: 4,
    name: 'James Turner',
    title: 'Lead Engineer',
    image: '/prodcut-3.jpg',
  },
  {
    id: 5,
    name: 'Ethan Roberts',
    title: 'Sales Director',
    image: '/prodcut-4.jpg',
  },
  {
    id: 6,
    name: 'Daniel Lee',
    title: 'Creative Director',
    image: '/prodcut-5.jpg',
  },
  {
    id: 7,
    name: 'Emilie Carter',
    title: 'Product Designer',
    image: '/prodcut-6.jpg',
  },
  {
    id: 8,
    name: 'Olivia Martin',
    title: 'Marketing Lead',
    image: '/prodcut-7.jpg',
  },
];

const TeamSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-main-text)] mb-2 sm:mb-4">
            Meet our <span className="text-[var(--color-primary-accent)]">Team</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-secondary-text)] px-4">
            The passionate people behind your perfect lighting.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center group">
              {/* Team Member Card */}
              <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4 sm:p-5 lg:p-6 h-40 sm:h-44 lg:h-48 flex flex-col items-center justify-center">
                {/* Team Member Image */}
                <div className="relative mb-2 sm:mb-3 lg:mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={100}
                      height={100}
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 w-full h-full"
                    />
                  </div>
                </div>

                {/* Team Member Info */}
                <h3 className="font-bold text-[var(--color-main-text)] text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 leading-tight">
                  {member.name}
                </h3>
                <p className="text-[var(--color-secondary-text)] text-xs sm:text-sm leading-tight">{member.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="#"
            className="inline-flex items-center bg-[var(--color-logo)] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium shadow-md transition-colors group text-sm sm:text-base"
          >
            Join Our Team
            <span className="ml-2 inline-block transform transition-transform duration-300 group-hover:translate-x-2">
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
