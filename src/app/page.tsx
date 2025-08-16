import Collections from '@/features/landing-page/CollectionSection';
import AboutSection from '@/features/landing-page/ExploreSection';
import Featured from '@/features/landing-page/FeaturedProducts';
import HeroSection from '@/features/landing-page/HeroSection';
import SaleSection from '@/features/OnSale';

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
    </>
  );
}
