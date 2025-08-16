import PageHeader from '@/components/PageHeader';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <PageHeader
        title="Contact"
        titleHighlight="Us"
        subtitle="Get in touch with our team for personalized lighting solutions and expert advice."
      />

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[var(--color-main-text)] mb-8">
              Let&apos;s Start a Conversation
            </h2>
            <p className="text-lg text-[var(--color-secondary-text)] max-w-4xl mx-auto leading-relaxed">
              Ready to transform your space with exceptional lighting? Our team is here to help 
              you find the perfect solution for your needs. Reach out to us today.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}