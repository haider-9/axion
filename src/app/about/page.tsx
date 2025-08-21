import PageHeader from '@/components/PageHeader';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Lightbulb, Zap, Star, TrendingUp, Eye } from 'lucide-react';

const teamMembers = [
  {
    name: 'Leslie Anderson',
    title: 'Studio Director',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Sarah Williams',
    title: 'Creative Director',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'David Smith',
    title: 'Product Designer',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    name: 'James Turner',
    title: 'Lead Engineer',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    name: 'Ethan Roberts',
    title: 'Senior Designer',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    name: 'Daniel Lee',
    title: 'Creative Director',
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    name: 'Emilia Carter',
    title: 'Product Designer',
    image: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    name: 'Olivia Martin',
    title: 'Marketing Lead',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Bilal Hussain',
    title: 'UX Designer',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    name: 'Fatima Chaudhry',
    title: 'Project Manager',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
  {
    name: 'Ayesha Malik',
    title: 'Junior Designer',
    image: 'https://randomuser.me/api/portraits/women/11.jpg',
  },
  {
    name: 'Hassan Younis',
    title: 'Senior Engineer',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    name: 'Iman Sheikh',
    title: 'Lead Support',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    name: 'Zainab Ahmed',
    title: 'Product Manager',
    image: 'https://randomuser.me/api/portraits/women/13.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="About"
        titleHighlight="Axion"
        subtitle="A team of experts crafting lighting solutions that elevate your experience"
      />
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
      <section className="py-12 sm:py-20">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Story & Text */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[black] mb-6">Our Story</h2>
            <p className="text-base sm:text-lg text-[var(--color-secondary-text)] mb-8 leading-relaxed">
              Axion began with a vision to revolutionize lighting. Our journey is fueled by a
              passion for innovation, a commitment to quality, and a dedication to customer
              satisfaction. From humble beginnings to a leader in the industry, we have always
              believed that great lighting transforms spaces and lives. Our team of experts blends
              creativity and technology to deliver solutions that are not only beautiful but also
              sustainable and energy-efficient.
            </p>
            {/* Mission, Vision, Values Cards */}
          </div>

          {/* Team Photo */}
          <div className="flex justify-center items-center">
            <Image
              src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Axion Team"
              width={500}
              height={350}
              className="rounded-2xl object-cover shadow-xl w-full h-auto max-w-lg"
              priority
            />
          </div>
        </div>
      </section>
      <h3 className="text-center text-black text-3xl font-semibold">Mission, Vision and Values</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center">
          <TrendingUp className="w-10 h-10 text-[var(--color-logo)] mb-3" />
          <h3 className="text-lg font-semibold text-[var(--color-logo)] mb-2">Mission</h3>
          <p className="text-sm text-[var(--color-secondary-text)]">
            To create innovative, energy-efficient lighting solutions that enhance everyday living.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center">
          <Eye className="w-10 h-10 text-[var(--color-logo)] mb-3" />
          <h3 className="text-lg font-semibold text-[var(--color-logo)] mb-2">Vision</h3>
          <p className="text-sm text-[var(--color-secondary-text)]">
            To lead in designing and implementing cutting-edge lighting technology.
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 flex flex-col items-center text-center">
          <Leaf className="w-10 h-10 text-[var(--color-logo)] mb-3" />
          <h3 className="text-lg font-semibold text-[var(--color-logo)] mb-2">Values</h3>
          <p className="text-sm text-[var(--color-secondary-text)]">
            Innovation, Quality, Sustainability, Customer Focus{' '}
          </p>
        </div>
      </div>

      {/* Our Team Section */}
      <section className="py-12 sm:py-20 bg-[var(--color-background)]">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-logo)] mb-2">
              Our Team
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-secondary-text)]">
              A passionate group of designers and engineers working together to bring light into
              your life
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-10">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-sm font-semibold text-[var(--color-main-text)] text-center">
                  {member.name}
                </div>
                <div className="text-xs text-[var(--color-secondary-text)] text-center">
                  {member.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-logo)] mb-2">
              Why Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl ">
              <Leaf className="w-10 h-10 text-[var(--color-logo)] mb-3" />
              <h3 className="font-bold mb-2">Tailored Designs</h3>
              <p className="text-sm text-[var(--color-secondary-text)]">
                Customized lighting solutions for every need.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl ">
              <Lightbulb className="w-10 h-10 text-[var(--color-logo)] mb-3" />
              <h3 className="font-bold mb-2">Modern Aesthetics</h3>
              <p className="text-sm text-[var(--color-secondary-text)]">
                Sleek, contemporary designs for stylish spaces.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl ">
              <Zap className="w-10 h-10 text-[var(--color-logo)] mb-3" />
              <h3 className="font-bold mb-2">Energy Efficient</h3>
              <p className="text-sm text-[var(--color-secondary-text)]">
                Smart solutions that save energy and reduce costs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl ">
              <Star className="w-10 h-10 text-[var(--color-logo)] mb-3" />
              <h3 className="font-bold mb-2">Proven Expertise</h3>
              <p className="text-sm text-[var(--color-secondary-text)]">
                A track record of excellence and client satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section with Image & Overlay */}
      <section className="relative py-20 rounded-lg mb-10 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/collection-3.jpg"
            alt="Lighting inspiration"
            fill
            className="object-cover brightness-90"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        {/* Content Overlay */}
        <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase mb-6">
            Ready to Brighten Your Space?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover how Axion can transform your environment with innovative lighting solutions
            tailored to your needs.
          </p>
          <Link
            href="/contact"
            className="bg-[#0a2b57] text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-[#0c3566] transition"
          >
            Start Your Project
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
}
