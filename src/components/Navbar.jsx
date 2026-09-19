import React, { useState, useEffect } from 'react';
import logo from '../logo.jpeg';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  const navItems = [
    {
      title: 'Home',
      subtext: 'Overview',
      id: 'home',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      )
    },
    {
      title: 'Journey',
      subtext: 'DSA Arena',
      id: 'journey',
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )
    },
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const triggerGlowAnimation = () => {
    setIsGlowing(true);
    setTimeout(() => setIsGlowing(false), 1500);
  };

  const handleNavigate = (id: string) => {
    triggerGlowAnimation();
    setIsMobileOpen(false);

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
      const navbarOffset = 80;
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
      <header className={`full-glitch-panel ${isDarkMode ? 'dark-panel' : 'light-panel'} ${isGlowing ? 'glitch-surge' : ''}`}>
        
        {/* GLITCH BORDER ELEMENTS */}
        <div className="gb-item t-1"></div>
        <div className="gb-item t-2"></div>
        <div className="gb-item t-3"></div>

        <div className="gb-item b-1"></div>
        <div className="gb-item b-2"></div>
        <div className="gb-item b-3"></div>

        <div className="gb-item l-1"></div>
        <div className="gb-item r-1"></div>

        {/* Background Grid Pattern */}
        <div className="grid-bg"></div>

        <div className="panel-inner">
          {/* Brand Logo & Title */}
          <div className="brand-badge" onClick={() => handleNavigate('home')}>
            <div className="logo-box">
              <img src={logo} alt="Logo" className="brand-logo" />
            </div>
            <div className="brand-titles">
              <span className="title-main">BANASTHALI</span>
              <span className="title-sub">
                ACM CHAPTER <span className="long-separator">||</span> DSA ARENA
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="desktop-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className="glitch-btn"
              >
                {/* Static Glitch Corner Accents */}
                <span className="btn-glitch-corner c-top-left"></span>
                <span className="btn-glitch-corner c-bottom-right"></span>

                <span className="icon">{item.icon}</span>
                <span className="label">{item.title}</span>

                <div className="glitch-tooltip">
                  <span className="t-head">{item.title}</span>
                  <span className="t-desc">&gt; {item.subtext}</span>
                </div>
              </button>
            ))}
          </nav>

          {/* Right Action Buttons with Glitch Effects */}
          <div className="actions-group">
            {/* Theme Toggle Button with Glitch */}
            <button
              onClick={() => {
                triggerGlowAnimation();
                setIsDarkMode(!isDarkMode);
              }}
              className="glitch-btn theme-btn"
              aria-label="Toggle Theme"
            >
              <span className="btn-glitch-corner c-top-left"></span>
              <span className="btn-glitch-corner c-bottom-right"></span>
              {isDarkMode ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>

            {/* Join Us Button with Glitch */}
            <button
              onClick={() => {
                triggerGlowAnimation();
                window.open('https://forms.google.com', '_blank');
              }}
              className="glitch-btn action-join-btn"
            >
              <span className="btn-glitch-corner c-top-left"></span>
              <span className="btn-glitch-corner c-bottom-right"></span>
              <span className="pulse-dot" />
              JOIN US
            </button>

            <button
              className="hamburger-btn"
              onClick={() => {
                triggerGlowAnimation();
                setIsMobileOpen(!isMobileOpen);
              }}
            >
              {isMobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className={`mobile-glitch-menu ${isDarkMode ? 'dark-m' : 'light-m'}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className="m-link"
            >
              {item.icon}
              <span>{item.title}</span>
            </button>
          ))}
          <button
            onClick={() => {
              triggerGlowAnimation();
              window.open('https://forms.google.com', '_blank');
            }}
            className="m-join-btn"
          >
            [ JOIN US NOW ]
          </button>
        </div>
      )}

      {/* CSS Styling */}
      <style>{`
        /* Full Panel Layout */
        .full-glitch-panel {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 66px; /* Navbar height reduced by 2 more units */
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          box-sizing: border-box;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: none !important;
          transition: background-color 0.3s ease;
        }

        .dark-panel {
          background-color: rgba(8, 12, 24, 0.96) !important;
        }

        /* LIGHT MODE: Whitish Soft Blueish Gradient */
        .light-panel {
          background: linear-gradient(180deg, #eef5ff 0%, #d8e8fe 100%) !important;
          box-shadow: 0 4px 20px rgba(160, 200, 255, 0.35);
        }

        .grid-bg {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px);
          background-size: 16px 16px;
          pointer-events: none;
        }

        .panel-inner {
          width: 100%;
          max-width: 1320px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        /* GLITCH BORDER PIECES */
        .gb-item {
          position: absolute;
          pointer-events: none;
          z-index: 10;
          background-color: rgba(20, 30, 70, 0.85);
          box-shadow: -2px 0 0 #00ffff, 2px 0 0 #ff00ff;
          animation: glitchMove 2.5s infinite steps(2, end) alternate;
        }

        .light-panel .gb-item {
          background-color: rgba(70, 110, 200, 0.5);
          box-shadow: -2px 0 0 #2563eb, 2px 0 0 #d946ef;
        }

        .t-1 { top: -2px; left: 10%; width: 45px; height: 4px; }
        .t-2 { top: -2px; left: 48%; width: 35px; height: 3px; }
        .t-3 { top: -2px; right: 18%; width: 50px; height: 4px; }

        .b-1 { bottom: -2px; left: 22%; width: 50px; height: 4px; }
        .b-2 { bottom: -2px; left: 55%; width: 40px; height: 3px; }
        .b-3 { bottom: -2px; right: 12%; width: 55px; height: 4px; }

        .l-1 { left: -1px; top: 18px; width: 4px; height: 22px; }
        .r-1 { right: -1px; top: 22px; width: 4px; height: 22px; }

        @keyframes glitchMove {
          0% { transform: translate(0, 0) skewX(0deg); opacity: 0.7; }
          25% { transform: translate(-2px, 1px) skewX(-3deg); opacity: 0.9; }
          50% { transform: translate(2px, -1px) skewX(3deg); opacity: 0.8; }
          75% { transform: translate(-1px, 0px); opacity: 1; }
          100% { transform: translate(1px, 1px); opacity: 0.7; }
        }

        .glitch-surge .gb-item {
          animation-duration: 0.12s;
          filter: brightness(1.4) drop-shadow(0 0 4px #ff00ff);
        }

        /* Brand Badge */
        .brand-badge { display: flex; align-items: center; gap: 12px; cursor: pointer; }
        
        .logo-box { 
          padding: 0; 
          background: transparent; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        }

        .brand-logo { 
          height: 48px;
          width: auto;
          border-radius: 6px; 
          display: block; 
          object-fit: contain; 
        }

        .brand-titles { display: flex; flex-direction: column; }
        .title-main { font-weight: 900; font-size: 0.88rem; letter-spacing: 1px; }
        .dark-panel .title-main { color: #fff; text-shadow: 0 0 8px rgba(0,240,255,0.5); }
        .light-panel .title-main { color: #0f2942; }

        .title-sub { 
          font-size: 0.54rem; 
          font-weight: 800; 
          letter-spacing: 0.6px; 
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dark-panel .title-sub { color: #00f0ff; }
        .light-panel .title-sub { color: #1e40af; }

        /* INCREASED LENGTH OF BARS/SLASHES */
        .long-separator {
          display: inline-block;
          transform: scaleY(1.4);
          font-weight: 900;
          margin: 0 2px;
        }

        /* Desktop Nav Items */
        .desktop-links { display: flex; align-items: center; gap: 8px; }

        /* UNIVERSAL GLITCH BUTTON STYLING */
        .glitch-btn {
          position: relative;
          background: transparent;
          border: 1px solid transparent;
          padding: 4px 10px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.75rem;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }

        /* STATIC CORNER ACCENTS FOR BUTTONS */
        .btn-glitch-corner {
          position: absolute;
          width: 6px;
          height: 2px;
          background: #ff00ff;
          box-shadow: -1px 0 0 #00ffff;
          pointer-events: none;
          transition: transform 0.2s ease;
        }
        .c-top-left { top: -2px; left: 3px; }
        .c-bottom-right { bottom: -2px; right: 3px; background: #00ffff; box-shadow: 1px 0 0 #ff00ff; }

        /* DARK MODE - BUTTONS */
        .dark-panel .glitch-btn {
          color: #94a3b8;
          border-color: rgba(0, 240, 255, 0.25);
          box-shadow: -1px 0 0 rgba(0, 240, 255, 0.3), 1px 0 0 rgba(255, 0, 255, 0.3);
        }

        /* DARK MODE - HOVER ONLY */
        .dark-panel .glitch-btn:hover {
          color: #00f0ff;
          border-color: #00f0ff;
          background: rgba(0, 240, 255, 0.12);
          animation: btnGlitchMove 0.45s infinite alternate;
        }
        .dark-panel .glitch-btn:hover .c-top-left {
          transform: translate(-2px, -1px);
        }
        .dark-panel .glitch-btn:hover .c-bottom-right {
          transform: translate(2px, 1px);
        }

        /* LIGHT MODE - BUTTONS */
        .light-panel .glitch-btn {
          color: #1e293b;
          border-color: rgba(30, 58, 138, 0.25);
          box-shadow: -1px 0 0 rgba(37, 99, 235, 0.35), 1px 0 0 rgba(217, 70, 239, 0.35);
        }

        /* LIGHT MODE - HOVER ONLY */
        .light-panel .glitch-btn:hover {
          color: #1e3a8a;
          border-color: #1e3a8a;
          background: rgba(255, 255, 255, 0.7);
          animation: btnGlitchMove 0.45s infinite alternate;
        }

        /* HOVER ANIMATION (SLOWER MOTION) */
        @keyframes btnGlitchMove {
          0% {
            transform: translate(0, 0);
            box-shadow: -2px 0 0 #00ffff, 2px 0 0 #ff00ff;
          }
          33% {
            transform: translate(-1px, 1px) skewX(-1.5deg);
            box-shadow: 1px -1px 0 #ff00ff, -1px 1px 0 #00ffff;
          }
          66% {
            transform: translate(1px, -1px) skewX(1.5deg);
            box-shadow: -2px 1px 0 #00ffff, 1px -1px 0 #ff00ff;
          }
          100% {
            transform: translate(1px, 0);
            box-shadow: -1px 0 0 #00ffff, 2px 0 0 #ff00ff;
          }
        }

        /* Tooltip */
        .glitch-tooltip {
          position: absolute;
          top: 38px;
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          padding: 3px 8px;
          border-radius: 4px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          white-space: nowrap;
        }

        .dark-panel .glitch-tooltip { background: #080c18; border: 1px solid #00f0ff; box-shadow: 0 0 10px rgba(0, 240, 255, 0.4); }
        .light-panel .glitch-tooltip { background: #ffffff; border: 1px solid #1e3a8a; box-shadow: 0 0 10px rgba(30, 58, 138, 0.2); }

        .glitch-btn:hover .glitch-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        .dark-panel .t-head { font-size: 0.65rem; color: #fff; font-weight: 800; }
        .light-panel .t-head { font-size: 0.65rem; color: #0f172a; font-weight: 800; }
        .t-desc { font-size: 0.55rem; color: #d946ef; }

        /* Actions Group Styling */
        .actions-group { display: flex; align-items: center; gap: 8px; }

        /* Specific styles for theme button */
        .theme-btn {
          width: 32px;
          height: 30px;
          padding: 0 !important;
          justify-content: center;
        }

        /* Specific styles for Join Us button */
        .action-join-btn {
          background: linear-gradient(135deg, #2563eb, #7c3aed) !important;
          border: none !important;
          color: #fff !important;
          padding: 5px 12px !important;
          font-weight: 800 !important;
          font-size: 0.7rem !important;
          box-shadow: 0 0 8px rgba(37, 99, 235, 0.4) !important;
        }

        .pulse-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #60a5fa;
          box-shadow: 0 0 5px #60a5fa;
        }

        .hamburger-btn { display: none; background: transparent; border: none; font-size: 1.1rem; cursor: pointer; }
        .dark-panel .hamburger-btn { color: #00f0ff; }
        .light-panel .hamburger-btn { color: #1e3a8a; }

        /* Mobile Drawer */
        .mobile-glitch-menu {
          position: fixed;
          top: 70px;
          left: 12px;
          right: 12px;
          z-index: 99998;
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          backdrop-filter: blur(20px);
        }

        .dark-m { background: rgba(8, 12, 24, 0.96); border: 1px solid #00f0ff; }
        .light-m { background: #eef5ff; border: 1px solid #1e3a8a; }

        .m-link {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid transparent;
          padding: 8px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 700;
          font-size: 0.8rem;
        }

        .dark-m .m-link { color: #94a3b8; }
        .light-m .m-link { color: #0f2942; }

        .m-join-btn {
          background: #2563eb;
          color: #fff;
          font-weight: 900;
          border: none;
          padding: 10px;
          border-radius: 6px;
          margin-top: 4px;
          font-size: 0.8rem;
        }

        @media (max-width: 820px) {
          .desktop-links { display: none; }
          .hamburger-btn { display: block; }
        }
      `}</style>
    </>
  );
}