import React, { useState, useEffect } from 'react';
import logo from '../logo.jpeg';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isInitialLoaded, setIsInitialLoaded] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  // Nav Items Setup
  const navItems = [
    {
      title: 'Home',
      subtext: 'Overview',
      id: 'home',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      title: 'Events',
      subtext: 'Activities',
      id: 'events',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      title: 'Memories',
      subtext: 'Gallery',
      id: 'memories',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      )
    },
    {
      title: 'Journey',
      subtext: 'DSA Learning',
      id: 'journey',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    },
  ];

  // Initial Floating animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoaded(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Theme Sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Glow Animation Handler
  const triggerGlowAnimation = () => {
    setIsGlowing(true);
    setTimeout(() => {
      setIsGlowing(false);
    }, 5000);
  };

  // Fixed Navigation & Smooth Scroll Handler
  const handleNavigate = (id) => {
    triggerGlowAnimation();
    setIsMobileOpen(false);
    setActiveSection(id);

    if (id === 'home') {
      const homeElement = document.getElementById('home') || document.getElementById('hero');
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    let targetElement = document.getElementById(id);

    if (!targetElement && id === 'journey') {
      targetElement =
        document.getElementById('dsa') ||
        document.getElementById('dsa-journey') ||
        document.querySelector('[data-section="journey"]') ||
        document.querySelector('[data-section="dsa"]');

      if (!targetElement) {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, section, div'));
        targetElement = headings.find((el) => {
          const text = (el.textContent || '').toLowerCase();
          return text.includes('dsa journey') || text.includes('dsa introductory session');
        });
      }
    }

    if (!targetElement) {
      targetElement =
        document.querySelector(`[data-section="${id}"]`) ||
        document.querySelector(`.${id}-section`);

      if (!targetElement) {
        const elements = Array.from(document.querySelectorAll('h1, h2, h3, section'));
        targetElement = elements.find((el) =>
          (el.textContent || '').toLowerCase().includes(id.toLowerCase())
        );
      }
    }

    if (targetElement) {
      const navbarOffset = 60;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header className={`fixed-navbar-wrapper ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <div
          className={`nav-glass-container ${!isInitialLoaded ? 'initial-compact' : 'expanded'} ${isGlowing ? 'active-5s-glow' : ''}`}
        >
          {/* Brand Identity */}
          <div className="brand-badge" onClick={() => handleNavigate('home')}>
            <div className="brand-logo-wrapper">
              <img src={logo} alt="ACM Logo" className="brand-logo" />
            </div>
            <div className="brand-details">
              <span className="brand-title">BANASTHALI</span>
              <span className="brand-sub">ACM Chapter</span>
            </div>
          </div>

          <div className="nav-divider" />

          {/* Desktop Nav Items */}
          <nav className="desktop-nav-items">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`nav-single-btn ${isActive ? 'active' : ''}`}
                  aria-label={item.title}
                >
                  <span className="icon-box">{item.icon}</span>
                  <span className="nav-text-label">{item.title}</span>

                  <div className="tooltip-box">
                    <span className="tooltip-main">{item.title}</span>
                    <span className="tooltip-sub">{item.subtext}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="nav-divider" />

          {/* Actions */}
          <div className="nav-actions">
            <button
              onClick={() => {
                triggerGlowAnimation();
                setIsDarkMode(!isDarkMode);
              }}
              className="theme-toggle-btn"
              title="Toggle Light/Dark Mode"
            >
              {isDarkMode ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>

            <button
              onClick={() => {
                triggerGlowAnimation();
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSciDgYoQdDBqsCNYXIujrsB6GZavjms8tqdXX37IqTCENCs5w/viewform?usp=dialog', '_blank');
              }}
              className="join-tier-btn"
            >
              <span>Join Us</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>

            <button
              className="mobile-hamburger"
              onClick={() => {
                triggerGlowAnimation();
                setIsMobileOpen(!isMobileOpen);
              }}
            >
              {isMobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className={`mobile-drawer ${isDarkMode ? 'dark-drawer' : 'light-drawer'}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`mobile-link ${activeSection === item.id ? 'active' : ''}`}
            >
              <span className="m-icon">{item.icon}</span>
              <div className="m-text-group">
                <span className="m-main">{item.title}</span>
                <span className="m-sub">{item.subtext}</span>
              </div>
            </button>
          ))}
          <button
            onClick={() => {
              triggerGlowAnimation();
              window.open('https://docs.google.com/forms/d/e/1FAIpQLSciDgYoQdDBqsCNYXIujrsB6GZavjms8tqdXX37IqTCENCs5w/viewform?usp=dialog', '_blank');
            }}
            className="mobile-join-btn"
          >
            Join Us
          </button>
        </div>
      )}

      {/* Embedded Dynamic CSS */}
      <style>{`
        .fixed-navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999999;
          display: flex;
          width: 100vw;
          padding: 0;
          pointer-events: none;
        }

        .nav-glass-container {
          position: relative;
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 6px 32px;
          border-radius: 0 0 14px 14px;
          overflow: visible;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                      opacity 0.4s ease;
        }

        .nav-glass-container.initial-compact {
          transform: translateY(-8px);
          opacity: 0.8;
        }

        .nav-glass-container.expanded {
          transform: translateY(0);
          opacity: 1;
        }

        .nav-glass-container.active-5s-glow::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 0 0 16px 16px;
          background: linear-gradient(90deg, #60a5fa, #3b82f6, #93c5fd, #ffffff, #2563eb, #60a5fa);
          background-size: 300% 300%;
          z-index: -1;
          animation: glowGradientRun 5s ease-in-out forwards;
          filter: blur(6px);
          opacity: 0.85;
        }

        @keyframes glowGradientRun {
          0% { background-position: 0% 50%; opacity: 0.2; }
          20% { opacity: 1; }
          80% { opacity: 0.9; }
          100% { background-position: 100% 50%; opacity: 0; }
        }

        .dark-theme .nav-glass-container {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(129, 140, 248, 0.25);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .light-theme .nav-glass-container {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(239, 246, 255, 0.95) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(191, 219, 254, 0.9);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.12);
        }

        .brand-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }

        /* Fixed outer white box without changing size */
        .brand-logo-wrapper {
          width: 70px;
          height: 38px;
          padding: 0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          flex-shrink: 0;
          overflow: hidden;
        }

        /* Inner logo occupies complete box area with bold/thick effect */
        .brand-logo {
          width: 100%;
          height: 100%;
          object-fit: fill;
          transform: scale(1.12);
          filter: contrast(135%) saturate(120%) drop-shadow(0.3px 0.3px 0px rgba(0, 51, 102, 0.8)) drop-shadow(-0.3px -0.3px 0px rgba(0, 51, 102, 0.8));
          transition: transform 0.25s ease, filter 0.25s ease;
        }

        .brand-badge:hover .brand-logo {
          transform: scale(1.18);
        }

        .brand-details {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }

        .dark-theme .brand-title { color: #ffffff; font-weight: 800; font-size: 0.8rem; letter-spacing: 0.5px; }
        .light-theme .brand-title { color: #1e3a8a; font-weight: 800; font-size: 0.8rem; letter-spacing: 0.5px; }
        .dark-theme .brand-sub { color: #818cf8; font-size: 0.62rem; font-weight: 700; }
        .light-theme .brand-sub { color: #3b82f6; font-size: 0.62rem; font-weight: 700; }

        .nav-divider { width: 1px; height: 22px; }
        .dark-theme .nav-divider { background: rgba(255, 255, 255, 0.15); }
        .light-theme .nav-divider { background: rgba(191, 219, 254, 0.8); }

        .desktop-nav-items { display: flex; align-items: center; gap: 6px; }

        .nav-single-btn {
          position: relative;
          background: transparent;
          border: none;
          padding: 4px 10px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }

        .nav-text-label {
          font-size: 0.75rem;
          font-weight: 700;
        }

        .dark-theme .nav-single-btn { color: #94a3b8; }
        .light-theme .nav-single-btn { color: #64748b; }

        .nav-single-btn:hover { transform: translateY(-1px); z-index: 10; }
        .dark-theme .nav-single-btn:hover { background: rgba(99, 102, 241, 0.15); color: #ffffff; }
        .light-theme .nav-single-btn:hover { background: rgba(37, 99, 235, 0.1); color: #1e3a8a; }

        .dark-theme .nav-single-btn.active { background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); color: #ffffff; box-shadow: 0 2px 8px rgba(79, 70, 229, 0.4); }
        .light-theme .nav-single-btn.active { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3); }

        .tooltip-box {
          position: absolute;
          top: 36px;
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4px 8px;
          border-radius: 6px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
          z-index: 100;
        }

        .dark-theme .tooltip-box { background: #0f172a; border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 6px 16px rgba(0,0,0,0.5); }
        .light-theme .tooltip-box { background: #ffffff; border: 1px solid rgba(191, 219, 254, 0.9); box-shadow: 0 6px 16px rgba(37, 99, 235, 0.15); }

        .nav-single-btn:hover .tooltip-box { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }

        .tooltip-main { font-size: 0.65rem; font-weight: 700; display: block; }
        .dark-theme .tooltip-main { color: #ffffff; }
        .light-theme .tooltip-main { color: #1e293b; }

        .tooltip-sub { font-size: 0.55rem; font-weight: 600; }
        .dark-theme .tooltip-sub { color: #818cf8; }
        .light-theme .tooltip-sub { color: #2563eb; }

        .nav-actions { display: flex; align-items: center; gap: 8px; }

        .theme-toggle-btn {
          background: transparent;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .dark-theme .theme-toggle-btn { color: #f1f5f9; }
        .light-theme .theme-toggle-btn { color: #1e293b; }

        .dark-theme .theme-toggle-btn:hover { background: rgba(255,255,255,0.1); }
        .light-theme .theme-toggle-btn:hover { background: rgba(0,0,0,0.06); }

        .join-tier-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          border: none;
          padding: 5px 12px;
          border-radius: 16px;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .dark-theme .join-tier-btn { background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); color: #ffffff; box-shadow: 0 2px 8px rgba(99, 102, 241, 0.35); }
        .light-theme .join-tier-btn { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35); }

        .join-tier-btn:hover { transform: translateY(-1px); }

        .mobile-hamburger { display: none; background: transparent; border: none; cursor: pointer; }
        .dark-theme .mobile-hamburger { color: #ffffff; }
        .light-theme .mobile-hamburger { color: #0f172a; }

        .mobile-drawer {
          position: fixed;
          top: 50px;
          left: 16px;
          right: 16px;
          z-index: 999998;
          border-radius: 16px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dark-drawer { background: rgba(15, 23, 42, 0.98); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.6); }
        .light-drawer { background: rgba(255, 255, 255, 0.98); border: 1px solid rgba(191, 219, 254, 0.9); box-shadow: 0 15px 35px rgba(37, 99, 235, 0.15); }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
          text-align: left;
        }

        .m-text-group { display: flex; flex-direction: column; }
        .m-main { font-size: 0.8rem; font-weight: 700; }
        .m-sub { font-size: 0.58rem; font-weight: 600; opacity: 0.7; }

        .dark-drawer .mobile-link { color: #cbd5e1; }
        .light-drawer .mobile-link { color: #1e293b; }

        .dark-drawer .mobile-link.active { background: rgba(79, 70, 229, 0.25); color: #818cf8; }
        .light-drawer .mobile-link.active { background: rgba(219, 234, 254, 0.8); color: #2563eb; }

        .mobile-join-btn {
          margin-top: 4px;
          background: #4f46e5;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .desktop-nav-items, .nav-divider { display: none; }
          .mobile-hamburger { display: flex; }
          .nav-glass-container { padding: 5px 16px; }
        }
      `}</style>
    </>
  );
}