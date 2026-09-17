import React, { useState, useRef, useEffect } from 'react';
import { galleryData } from '../data/galleryData';
import './photogallery.css';

export default function PhotoGallery() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const startXRef = useRef(0);
  const startRotRef = useRef(0);
  const reqIdRef = useRef(null);

  // Spacing & Arc Geometry
  const count = galleryData.length;
  const angleStep = 360 / count;
  const cardWidth = 300;
  const gap = 30;
  const radius = Math.round(((cardWidth + gap) * count) / (2 * Math.PI));

  // Continuous auto-rotation loop
  useEffect(() => {
    const autoRotate = () => {
      if (!isPaused && !isDragging) {
        // Adjust speed here (0.08 is smooth and slow)
        setRotation((prev) => (prev - 0.08) % 360);
      }
      reqIdRef.current = requestAnimationFrame(autoRotate);
    };

    reqIdRef.current = requestAnimationFrame(autoRotate);
    return () => cancelAnimationFrame(reqIdRef.current);
  }, [isPaused, isDragging]);

  // Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startRotRef.current = rotation;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    setRotation(startRotRef.current + deltaX * 0.25);
  };

  const handleMouseUp = () => setIsDragging(false);

  // Mouse wheel
  const handleWheel = (e) => {
    setRotation((prev) => prev - e.deltaY * 0.08);
  };

  // Manual buttons
  const rotatePrev = () => setRotation((prev) => prev + angleStep);
  const rotateNext = () => setRotation((prev) => prev - angleStep);

  return (
    <section 
      className="circular-gallery-stage"
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
      <div className="gallery-center-title">
        <h2>ACM DSA Series Gallery</h2>
        <p>Auto-playing • Drag or scroll to navigate</p>
      </div>

      <button className="stage-arrow arrow-left" onClick={rotatePrev} aria-label="Previous">
        ‹
      </button>
      <button className="stage-arrow arrow-right" onClick={rotateNext} aria-label="Next">
        ›
      </button>

      {/* 3D Arc Viewport */}
      <div className="arc-viewport">
        <div 
          className="arc-ring"
          style={{
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`
          }}
        >
          {galleryData.map((item, index) => {
            const cardAngle = index * angleStep;
            return (
              <div
                key={item.id}
                className="arc-card"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`
                }}
              >
                <img src={item.image} alt={item.title} draggable="false" />
                <div className="arc-card-overlay" />
                <div className="arc-card-text">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Track bar synchronised with rotation */}
      <div className="scrollbar-container">
        <input
          type="range"
          min="0"
          max="360"
          step="0.1"
          value={((rotation % 360) + 360) % 360}
          onChange={(e) => setRotation(Number(e.target.value))}
          className="horizontal-scroll-bar"
        />
      </div>
    </section>
  );
}
