import PageHeader from '@/components/PageHeader';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader
        title="Our"
        titleHighlight="Projects"
        subtitle="Explore our portfolio of successful lighting installations and transformations."
      />

      {/* Projects Content */}
      <section className="py-20">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--color-main-text)] mb-8">
              Showcasing Excellence
            </h2>
            <p className="text-lg text-[var(--color-secondary-text)] max-w-4xl mx-auto leading-relaxed">
              Discover how we&apos;ve helped clients transform their spaces with innovative lighting solutions. 
              From residential projects to commercial installations, each project tells a unique story.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}