import { Hero } from '@/components/sections/Hero';
import { CompanyOverview } from '@/components/sections/CompanyOverview';
import { StatsBand } from '@/components/sections/StatsBand';
import { WhyLoremed } from '@/components/sections/WhyLoremed';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { Manufacturing } from '@/components/sections/Manufacturing';
import { Research } from '@/components/sections/Research';
import { QualityAssurance } from '@/components/sections/QualityAssurance';
import { Certifications } from '@/components/sections/Certifications';
import { Partnerships } from '@/components/sections/Partnerships';
import { Professionals } from '@/components/sections/Professionals';
import { News } from '@/components/sections/News';
import { Testimonials } from '@/components/sections/Testimonials';
import { ContactCTA } from '@/components/sections/ContactCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CompanyOverview />
      <StatsBand />
      <WhyLoremed />
      <Manufacturing />
      <Research />
      <QualityAssurance />
      <Certifications />
      <Partnerships />
      <Professionals />
      <News />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
