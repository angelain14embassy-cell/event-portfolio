import React from 'react';
import { Code2 } from 'lucide-react';
import logo from '../logo.jpeg'; // Adjust extension (.png or .jpeg) based on your file

export default function Navbar() {
  return (
    <nav style={{ borderBottom: '1px solid #1E293B', padding: '1rem 2rem', backgroundColor: '#0F172A' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Brand Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={logo}
            alt="ACM Logo"
            style={{ height: '44px', width: 'auto', borderRadius: '8px', objectFit: 'contain' }}
          />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#818CF8', display: 'flex', alignItems: 'center', gap: '8px' }}>
              BANASTHALI VIDYAPITH
              <span style={{ fontSize: '0.7rem', backgroundColor: '#1E1B4B', color: '#A5B4FC', padding: '2px 8px', borderRadius: '12px', border: '1px solid #312E81' }}>
                ACM Chapter
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>DSA & Competitive Programming Arena</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => window.open('https://forms.google.com', '_blank')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#4F46E5', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          <Code2 size={16} /> Join Chapter
        </button>

      </div>
    </nav>
  );
}