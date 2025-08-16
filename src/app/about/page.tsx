import PageHeader from '@/components/PageHeader';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader
        title="About"
        titleHighlight="Us"
        subtitle="Discover the story behind Axion Lighting Solutions and our commitment to illuminating your world."
      />

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--color-main-text)] mb-8">
              Welcome to Axion Lighting Solutions
            </h2>
            <p className="text-lg text-[var(--color-secondary-text)] max-w-4xl mx-auto leading-relaxed">
              We are passionate about creating exceptional lighting experiences that transform spaces 
              and enhance lives. With years of expertise in lighting design and technology, we bring 
              innovative solutions that combine aesthetics, functionality, and sustainability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}