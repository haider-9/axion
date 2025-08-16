import PageHeader from '@/components/PageHeader';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader
        title="Our"
        titleHighlight="Blog"
        subtitle="Insights, tips, and inspiration for lighting up your world."
      />

      {/* Blog Content */}
      <section className="py-20">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--color-main-text)] mb-8">
              Latest Articles & Insights
            </h2>
            <p className="text-lg text-[var(--color-secondary-text)] max-w-4xl mx-auto leading-relaxed">
              Stay updated with the latest trends, installation tips, and creative ideas 
              to transform your space with the perfect lighting solutions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}