import React, { useState } from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './TeamSection.css'; // Optional separate CSS file for team styles

const teamMembers = [
  {
    id: 1,
    name: "Shivam",
    role: "Chair",
    domain: "Leadership",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: 2,
    name: "Sheelendra",
    role: "Vice Chair",
    domain: "Leadership",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: 3,
    name: "Arsh Ahmad",
    role: "Secretary",
    domain: "Management",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    id: 4,
    name: "Abhijith KS",
    role: "Web Master",
    domain: "Technical",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  }
];

const domains = ["All", "Leadership", "Technical", "Management"];

const TeamSection = () => {
  const { theme } = useTheme();
  const [activeDomain, setActiveDomain] = useState("All");

  const filteredMembers = activeDomain === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.domain === activeDomain);

  return (
    <section className={`team-section ${theme}`}>
      <div className="team-header">
        <span className="section-badge">THE PEOPLE</span>
        <h2>Our <span>Leadership & Team</span></h2>
        <p>Meet the passionate minds driving innovation and building our ACM community.</p>
        
        {/* Domain Filter Buttons */}
        <div className="filter-buttons">
          {domains.map((domain) => (
            <button
              key={domain}
              className={`filter-btn ${activeDomain === domain ? 'active' : ''}`}
              onClick={() => setActiveDomain(domain)}
            >
              {domain}
            </button>
          ))}
        </div>
      </div>

      {/* Team Cards Grid */}
      <div className="team-grid">
        {filteredMembers.map((member) => (
          <div key={member.id} className="team-card">
            <div className="avatar-wrapper">
              <img src={member.image} alt={member.name} />
              <div className="social-overlay">
                <a href={member.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={18} />
                </a>
                <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href={member.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
            <div className="member-info">
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <span className="domain-tag">{member.domain}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;