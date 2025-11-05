import React from 'react';

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  linkedinUrl?: string;
  email?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  bio,
  linkedinUrl,
  email,
}) => {
  return (
    <div className="ws-card text-center">
      {/* Photo placeholder */}
      <div className="w-24 h-24 lg:w-32 lg:h-32 bg-background-alt rounded-full mx-auto mb-4 flex items-center justify-center">
        <span className="text-text-muted text-2xl lg:text-4xl font-bold">
          {name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>

      {/* Name and Role */}
      <h3 className="ws-text-xl font-bold mb-1">{name}</h3>
      <p className="text-brand-primary font-semibold mb-3 ws-text-sm lg:ws-text-base">{role}</p>

      {/* Bio */}
      <p className="ws-color-muted ws-text-sm mb-4 leading-relaxed">{bio}</p>

      {/* Contact Links */}
      <div className="flex justify-center space-x-3 lg:space-x-4">
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-primary hover:text-brand-primary/80 transition-colors"
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-brand-primary hover:text-brand-primary/80 transition-colors"
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;