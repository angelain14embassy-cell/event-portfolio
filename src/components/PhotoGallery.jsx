import React, { useState, useRef, useEffect } from 'react';
import { galleryData } from '../data/galleryData';
import './photogallery.css';

export default function PhotoGallery() {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const reqIdRef = useRef(null);

  const count = galleryData.length || 1;
  const cardSpacing = 320; // Horizontal pixel spacing between cards

  // Continuous auto-rotation / gliding loop
  useEffect(() => {
    const loop = () => {
      if (!isPaused && !isDragging) {
        setOffset((prev) => prev - 0.7);
      }
      reqIdRef.current = requestAnimationFrame(loop);
    };

    reqIdRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqIdRef.current);
  }, [isPaused, isDragging]);

  // Drag controls
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startOffsetRef.current = offset;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    setOffset(startOffsetRef.current + deltaX * 1.2);
  };

  const handleMouseUp = () => setIsDragging(false);

  // Wheel controls
  const handleWheel = (e) => {
    setOffset((prev) => prev - e.deltaY * 0.6);
  };

  const handlePrev = () => setOffset((prev) => prev + cardSpacing);
  const handleNext = () => setOffset((prev) => prev - cardSpacing);

  return (
    <section className="arcade-gallery-wrapper">
      <div 
        className="arcade-console"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          setIsPaused(false);
        }}
        onWheel={handleWheel}
        onMouseEnter={() => setIsPaused(true)}
      >
        <div className="crt-scanlines" />
        <div className="crt-vignette" />

        {/* Top Arcade HUD */}
        <header className="arcade-hud">
          <div className="hud-metric">
            <span className="hud-label">STAGE</span>
            <span className="hud-val text-magenta">03 // GALLERY</span>
          </div>
          <div className="hud-title-wrap">
            <h2 className="arcade-glitch-title">MEMORY_ARCHIVE.EXE</h2>
            <span className="arcade-sub">&lt;&lt; DRAG OR SCROLL TO NAVIGATE &gt;&gt;</span>
          </div>
          <div className="hud-metric hud-right">
            <span className="hud-label">RADAR</span>
            <span className="hud-val text-cyan">{count} TARGETS</span>
          </div>
        </header>

        {/* Nav Buttons */}
        <button 
          className="arcade-btn-arrow btn-prev" 
          onClick={handlePrev} 
          aria-label="Previous"
        >
          &#x25C0; PREV
        </button>
        <button 
          className="arcade-btn-arrow btn-next" 
          onClick={handleNext} 
          aria-label="Next"
        >
          NEXT &#x25B6;
        </button>

        {/* 3D Arc Viewport */}
        <div className="arcade-3d-viewport">
          <div className="arcade-cards-track">
            {galleryData.map((item, index) => {
              // Wrap cards infinitely around the center
              const totalWidth = count * cardSpacing;
              let xPos = ((index * cardSpacing + offset) % totalWidth);
              if (xPos < -cardSpacing * 2) xPos += totalWidth;
              if (xPos > totalWidth - cardSpacing * 2) xPos -= totalWidth;

              // Arc math: cards further from center push back (Z) and tilt slightly (Y)
              const distFromCenter = xPos;
              const rotY = Math.max(-35, Math.min(35, -distFromCenter * 0.045));
              const transZ = Math.max(-350, -Math.abs(distFromCenter) * 0.45);
              const opacity = Math.max(0.2, 1 - Math.abs(distFromCenter) / 900);

              return (
                <article
                  key={item.id}
                  className="arcade-card-holo"
                  style={{
                    transform: `translateX(${xPos}px) translateZ(${transZ}px) rotateY(${rotY}deg)`,
                    opacity: opacity,
                    zIndex: Math.round(1000 - Math.abs(distFromCenter))
                  }}
                >
                  <div className="holo-frame-corner top-l" />
                  <div className="holo-frame-corner top-r" />
                  <div className="holo-frame-corner bot-l" />
                  <div className="holo-frame-corner bot-r" />

                  <div className="holo-tag">ITEM #{index + 1}</div>

                  <div className="card-media">
                    <img src={item.image} alt={item.title} draggable="false" />
                  </div>

                  <div className="card-hud-info">
                    <h3 className="card-item-title">{item.title}</h3>
                    <p className="card-item-desc">{item.description}</p>
                    <div className="card-meta-bar">
                      <span className="badge-cat">{item.category || 'EVENT'}</span>
                      <span className="badge-status">SYNCED</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom Orbit Track Scrubber */}
        <footer className="arcade-footer-scrubber">
          <span className="cyber-track-label">ORBIT_TRACK</span>
          <input
            type="range"
            min="0"
            max={count * cardSpacing}
            step="1"
            value={Math.abs(offset) % (count * cardSpacing)}
            onChange={(e) => setOffset(-Number(e.target.value))}
            className="arcade-slider"
          />
          <span className="cyber-coord">
            {Math.round(((Math.abs(offset) % (count * cardSpacing)) / (count * cardSpacing)) * 360)}°
          </span>
        </footer>
      </div>
    </section>
  );
}