import React from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ServicesOverview from '@/components/ServicesOverview'
import AboutSection from '@/components/AboutSection'
import TeamSection from '@/components/TeamSection'
import InsightsSection from '@/components/InsightsSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesOverview />
      <AboutSection />
      <TeamSection />
      <InsightsSection />
      <Footer />
    </main>
  )
} 