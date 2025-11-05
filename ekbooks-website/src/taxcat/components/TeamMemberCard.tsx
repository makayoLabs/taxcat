import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  image: string;
  email: string;
  linkedin?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="card p-6 group hover:shadow-xl transition-all duration-300">
      <div className="text-center">
        {/* Image */}
        <div className="relative mb-4">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-primary-navy/20 transition-all duration-300">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 mb-4">
          <h3 className="text-lg font-bold text-text-dark">{member.name}</h3>
          <p className="text-sm font-medium text-primary-navy">{member.title}</p>
          <p className="text-xs text-accent-gold font-medium">{member.credentials}</p>
        </div>

        {/* Bio */}
        <p className="text-sm text-text-light mb-6 leading-relaxed">{member.bio}</p>

        {/* Contact */}
        <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={`mailto:${member.email}`}
            className="p-2 bg-primary-navy/10 rounded-lg hover:bg-primary-navy hover:text-white transition-colors duration-200"
          >
            <Mail className="h-4 w-4" />
          </a>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary-navy/10 rounded-lg hover:bg-primary-navy hover:text-white transition-colors duration-200"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
