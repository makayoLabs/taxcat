import React from 'react';
import { ArrowRight } from 'lucide-react';

const TeamSection = (): JSX.Element => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Lead Tax Advisor',
      credentials: 'CPA, CMA',
      bio: 'Over 12 years of experience in personal and corporate tax planning. Specializes in small business taxation and cross-border tax issues.',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b5c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'Senior Tax Consultant',
      credentials: 'CPA, CFP',
      bio: 'Passionate about helping individuals and families optimize their tax strategies. Expert in retirement planning and estate taxation.',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Business Tax Specialist',
      credentials: 'CPA, MBA',
      bio: 'Focuses on corporate tax planning and compliance for small to medium-sized businesses. Former Big 4 experience.',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Tax Technology Lead',
      credentials: 'CPA, CIS',
      bio: 'Combines traditional tax expertise with cutting-edge technology to streamline processes and enhance client experience.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Connect with our team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have tax-related questions? Our certified professionals are here to support you 
            with expert guidance and personalized service.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member) => (
            <div key={member.id} className="text-center">
              <div className="mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-2">{member.title}</p>
                <p className="text-xs text-gray-500 mb-3">{member.credentials}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gray-50 p-12 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Work with a dedicated advisor
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our full-service tax management is designed for individuals and families who want 
            personalized attention and comprehensive tax planning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center gap-2 transition-colors">
              Schedule consultation
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors">
              Meet the full team
            </button>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">25+</div>
            <div className="text-sm text-gray-600">Years combined experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">3,000+</div>
            <div className="text-sm text-gray-600">Tax returns filed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
            <div className="text-sm text-gray-600">Client satisfaction rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">6</div>
            <div className="text-sm text-gray-600">CPA certified professionals</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
