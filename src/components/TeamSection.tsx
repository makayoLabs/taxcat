import React from 'react'
import TeamMemberCard from './TeamMemberCard'
import { ArrowRight } from 'lucide-react'

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Lead Tax Advisor',
      credentials: 'CPA, CMA',
      bio: 'Over 12 years of experience in personal and corporate tax planning. Specializes in small business taxation and cross-border tax issues.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      email: 'sarah@taxcat.ca',
      linkedin: 'https://linkedin.com/in/sarahchen'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'Senior Tax Consultant',
      credentials: 'CPA, CFP',
      bio: 'Passionate about helping individuals and families optimize their tax strategies. Expert in retirement planning and estate taxation.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      email: 'michael@taxcat.ca',
      linkedin: 'https://linkedin.com/in/michaelrodriguez'
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Business Tax Specialist',
      credentials: 'CPA, MBA',
      bio: 'Focuses on corporate tax planning and compliance for small to medium-sized businesses. Former Big 4 experience.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      email: 'emily@taxcat.ca',
      linkedin: 'https://linkedin.com/in/emilywatson'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Tax Technology Lead',
      credentials: 'CPA, CIS',
      bio: 'Combines traditional tax expertise with cutting-edge technology to streamline processes and enhance client experience.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      email: 'david@taxcat.ca',
      linkedin: 'https://linkedin.com/in/davidkim'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      title: 'Client Relations Manager',
      credentials: 'CPA, PMP',
      bio: 'Ensures every client receives exceptional service and support throughout their tax journey. 8+ years in client services.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      email: 'lisa@taxcat.ca',
      linkedin: 'https://linkedin.com/in/lisathompson'
    },
    {
      id: 6,
      name: 'James Wilson',
      title: 'Senior Tax Advisor',
      credentials: 'CPA, CA',
      bio: 'Specializes in complex tax situations including international taxation and high-net-worth individuals.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      email: 'james@taxcat.ca',
      linkedin: 'https://linkedin.com/in/jameswilson'
    }
  ]

  return (
    <section id="team" className="section-padding bg-background-light">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-dark mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Our certified professionals bring decades of combined experience to ensure 
            your tax needs are handled with expertise and care.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="btn-primary flex items-center gap-2 mx-auto">
            Meet the Full Team
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Team Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-navy mb-2">25+</div>
            <div className="text-sm text-text-light">Years Combined Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-navy mb-2">1000+</div>
            <div className="text-sm text-text-light">Tax Returns Filed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-navy mb-2">100%</div>
            <div className="text-sm text-text-light">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-navy mb-2">6</div>
            <div className="text-sm text-text-light">CPA Certified Professionals</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection 