import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { MapSection } from '@/components/landing/map-section';
import { DestinationsSection } from '@/components/landing/destinations-section';
import { PartnersSection } from '@/components/landing/partners-section';
import { ProverbSection } from '@/components/landing/proverb-section';
import { EventsSection } from '@/components/landing/events-section';
import { CTASection } from '@/components/landing/cta-section';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProverbSection />
      <PartnersSection />
      <FeaturesSection />
      <MapSection />
      <DestinationsSection />
      <EventsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
