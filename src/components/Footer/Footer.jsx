import React, { useEffect, useRef, useState } from 'react';
import { footerData } from './footerData';
import './Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showSubtext, setShowSubtext] = useState(false);

  const targetText = "NAVIGATE OUR JOURNEY";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✦#$@&%";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isNavVisible) {
          setIsNavVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [isNavVisible]);

  useEffect(() => {
    if (!isNavVisible) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration) return targetText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) {
        clearInterval(interval);
        setShowSubtext(true);
      }
      iteration += 1 / 2;
    }, 45);

    return () => clearInterval(interval);
  }, [isNavVisible]);

  const handleSmoothScroll = (e, targetId, labelText) => {
    // External links ke liye smooth scroll bypass karenge
    if (!targetId || targetId.startsWith('http')) return;

    e.preventDefault();

    if (targetId === '#home' || labelText.toLowerCase().includes('home')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const directElement = document.querySelector(targetId);
    if (directElement) {
      directElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    let targetPhrase = "";
    if (labelText.toLowerCase().includes("event")) {
      targetPhrase = "ACM-W Sessions & Events";
    } else if (labelText.toLowerCase().includes("memorie")) {
      targetPhrase = "Moments That Matter";
    } else if (labelText.toLowerCase().includes("journey")) {
      targetPhrase = "DSA Journey";
    }

    if (!targetPhrase) return;

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    let targetContainer = null;

    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.toLowerCase().includes(targetPhrase.toLowerCase())) {
        targetContainer = node.parentElement;
        break;
      }
    }

    if (targetContainer) {
      const rect = targetContainer.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - 80;

      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
    }
  };

  const subtextItems = ["Empower", "Connect", "Learn", "Lead"];

  return (
    <footer ref={footerRef} className={`full-footer-container ${isNavVisible ? 'animate-in' : ''}`}>
      <div className={`sky-header-overlay ${isNavVisible ? 'visible' : ''}`}>
        <div className="title-wrapper">
          <span className="pixel-decor-left">⎯⎯✈ </span>
          <h1 className="banner-title">
            {displayText}
            <span className="typing-cursor">█</span>
          </h1>
          <span className="pixel-decor-right"> ✈⎯⎯</span>
        </div>

        <p className={`banner-subtext ${showSubtext ? 'fade-in' : ''}`}>
          {subtextItems.map((word, index) => (
            <React.Fragment key={word}>
              <span className="ghosty-word">{word}</span>
              {index < subtextItems.length - 1 && <span className="subtext-star"> ✦ </span>}
            </React.Fragment>
          ))}
        </p>
      </div>

      <div className="card-content-overlay">
        {/* EXPLORE COLUMN */}
        <div className="overlay-col reveal-1">
          <h4>EXPLORE</h4>
          <ul className="nav-list">
            {footerData.explore.map((item, index) => (
              <li key={index} className="nav-item">
                <span className="arrow">&gt;</span>
                <span className="nav-icon">{item.icon}</span>
                <a
                  href={item.href}
                  className={`nav-link ${item.isButton ? 'query-btn-highlight' : ''}`}
                  target={item.isExternal ? "_blank" : "_self"}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (!item.isExternal) {
                      handleSmoothScroll(e, item.href, item.label);
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT COLUMN */}
        <div className="overlay-col reveal-2">
          <h4>{footerData.contact.title}</h4>
          <p className="query-text">{footerData.contact.queryText}</p>
          <a
            href={footerData.contact.contactLinkHref}
            className="contact-cta"
            target={footerData.contact.isExternal ? "_blank" : "_self"}
            rel={footerData.contact.isExternal ? "noopener noreferrer" : undefined}
          >
            → {footerData.contact.contactLinkText}
          </a>

          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div className="info-details">
                <strong>{footerData.contact.location}</strong>
                <span className="sub">Location</span>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div className="info-details">
                <a href={`mailto:${footerData.contact.email}`} className="email-link">
                  {footerData.contact.email}
                </a>
                <span className="sub">Email</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;