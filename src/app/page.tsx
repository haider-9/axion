// Landing page components
import {
  BlogSection,
  CollectionSection as Collections,
  ExploreSection,
  FeaturedProducts as Featured,
  HeroSection,
  HowItWorksSection,
  NewsletterSection,
  OnSale as SaleSection,
  TeamSection,
  TestimonialsSection,
} from '@/features/landing-page';

export default function App() {
  return (
    <>
      <HeroSection />
      <div className=" max-w-[85rem] mx-auto">
        <ExploreSection />
        <Collections />
      </div>
      <Featured />
      <div className="max-w-[85rem] mx-auto">
        <SaleSection />
      </div>
      <TestimonialsSection />
      <HowItWorksSection />
      <BlogSection />
      <TeamSection />
      <div className="max-w-[85rem] mx-auto">
        <NewsletterSection />
      </div>
    </>
  );
}
