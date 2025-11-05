import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesOverview from '../components/ServicesOverview';
import PricingSection from '../components/PricingSection';
import TrustIndicators from '../components/TrustIndicators';
import Testimonials from '../components/Testimonials';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import TeamSection from '../components/TeamSection';

export default function Home() {
  return (
    <main className="theme-ekbooks">
      <HeroSection />
      <ServicesOverview />
      <PricingSection />
      <TrustIndicators />
      <TeamSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </main>
  );
}
