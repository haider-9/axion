import Collections from '@/features/landing-page/CollectionSection';
import AboutSection from '@/features/landing-page/ExploreSection';
import Featured from '@/features/landing-page/FeaturedProducts';
import HeroSection from '@/features/landing-page/HeroSection';
import SaleSection from '@/features/landing-page/OnSale';
import TestimonialsSection from '@/features/landing-page/TestimonialsSection';
import HowItWorksSection from '@/features/landing-page/HowItWorksSection';
import BlogSection from '@/features/landing-page/BlogSection';
import TeamSection from '@/features/landing-page/TeamSection';
import NewsletterSection from '@/features/landing-page/NewsletterSection';

export default function app() {
  return (
    <>
      <HeroSection />
      <div className=" max-w-[85rem] mx-auto">
        <AboutSection />
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
