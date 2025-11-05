import React from 'react';
import TeamMemberCard from './TeamMemberCard';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Lead Accountant',
      bio: 'With over 15 years of experience in Canadian tax law, Sarah leads our team with a focus on personalized client relationships and innovative financial solutions.',
      linkedinUrl: 'https://linkedin.com/in/sarah-johnson-ekbooks',
      email: 'sarah@ekbooks.ca',
    },
    {
      name: 'Michael Chen',
      role: 'Senior Bookkeeper',
      bio: 'Michael specializes in corporate accounting and has helped numerous Canadian businesses optimize their financial operations and compliance.',
      linkedinUrl: 'https://linkedin.com/in/michael-chen-ekbooks',
      email: 'michael@ekbooks.ca',
    },
    {
      name: 'Emma Thompson',
      role: 'Tax Specialist',
      bio: 'Emma brings expertise in personal and small business taxation, ensuring our clients maximize their tax benefits while staying compliant with CRA regulations.',
      linkedinUrl: 'https://linkedin.com/in/emma-thompson-ekbooks',
      email: 'emma@ekbooks.ca',
    },
    {
      name: 'David Rodriguez',
      role: 'Client Relations Manager',
      bio: 'David ensures every client receives exceptional service, combining his accounting knowledge with strong relationship-building skills.',
      linkedinUrl: 'https://linkedin.com/in/david-rodriguez-ekbooks',
      email: 'david@ekbooks.ca',
    },
  ];

  return (
    <section className="ws-section ws-section-alt">
      <div className="ws-container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="ws-display-md ws-balance mb-4">Meet Our Team</h2>
          <p className="ws-text-xl ws-color-muted max-w-3xl mx-auto">
            Our experienced professionals are dedicated to providing exceptional accounting services
            with the trust and expertise you deserve.
          </p>
        </div>

        <div className="ws-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="ws-col-12 md:ws-col-6 lg:ws-col-3">
              <TeamMemberCard
                name={member.name}
                role={member.role}
                bio={member.bio}
                linkedinUrl={member.linkedinUrl}
                email={member.email}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;