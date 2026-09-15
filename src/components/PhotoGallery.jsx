import React from 'react';
import { galleryData } from '../data/galleryData';

export default function PhotoGallery() {
  return (
    <section className="club-gallery-section">
      <div className="gallery-header">
        <span className="eyebrow">GROUP 3 COLLECTION</span>
        <h2>ACM Session & Event Memories</h2>
      </div>
      <div className="gallery-3d-grid">
        {galleryData.map((item) => (
          <div className="card-3d-wrapper" key={item.id}>
            <div className="card-3d-inner">
              <div className="card-image-container">
                <img src={item.image} alt={item.title} />
                <span className="card-tag">{item.category}</span>
              </div>
              <div className="card-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

