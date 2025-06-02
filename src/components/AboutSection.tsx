import React from 'react'
import { CheckCircle, Users, Award, Clock } from 'lucide-react'

const AboutSection = () => {
  const features = [
    {
      icon: CheckCircle,
      title: 'Transparent Process',
      description: 'Clear communication every step of the way with no hidden fees or surprises.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'CPA-certified professionals with years of experience in Canadian tax law.'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Consistently maximizing refunds and minimizing tax burden for our clients.'
    },
    {
      icon: Clock,
      title: 'Year-Round Support',
      description: 'Available throughout the year for tax questions and planning advice.'
    }
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-6">
                Our Trusted Process
              </h2>
              <p className="text-lg text-text-light mb-8">
                At TaxCat, we believe tax filing should be transparent, educational, and stress-free. 
                Our client-first approach combines deep expertise with friendly, accessible service 
                to ensure you feel confident about your tax situation year-round.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-navy/10 rounded-lg">
                      <feature.icon className="h-5 w-5 text-primary-navy" />
                    </div>
                    <h3 className="font-semibold text-text-dark">{feature.title}</h3>
                  </div>
                  <p className="text-text-light text-sm pl-11">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-6">
              <button className="btn-primary">
                Learn About Our Process
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Professional team meeting"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/30 to-transparent"></div>
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg card">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-navy mb-1">15+</div>
                <div className="text-sm text-text-light">Years Combined Experience</div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 bg-white p-6 rounded-xl shadow-lg card">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-gold mb-1">$2M+</div>
                <div className="text-sm text-text-light">Client Refunds Secured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold text-text-dark mb-8">Why TaxCat Works for You</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-5xl">🎯</div>
              <h4 className="font-semibold text-text-dark">Precision & Accuracy</h4>
              <p className="text-text-light">
                Meticulous attention to detail ensures maximum accuracy and compliance 
                with all tax regulations.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl">🤝</div>
              <h4 className="font-semibold text-text-dark">Personal Approach</h4>
              <p className="text-text-light">
                We take time to understand your unique situation and provide 
                personalized tax strategies.
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-5xl">🔒</div>
              <h4 className="font-semibold text-text-dark">Privacy & Security</h4>
              <p className="text-text-light">
                Your financial information is protected with bank-level security 
                and strict confidentiality protocols.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection 