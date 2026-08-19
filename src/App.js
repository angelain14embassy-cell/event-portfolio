import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';
import { acmDsaEvents, categories } from './data/eventsData';

export default function App() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedEvent, setSelectedEvent] = useState(null);

    const filteredEvents = acmDsaEvents.filter(
        (e) => activeCategory === 'All' || e.category === activeCategory
    );

    return (
        <div style={{ backgroundColor: '#090D16', minHeight: '100vh', color: '#F1F5F9', fontFamily: 'system-ui, sans-serif' }}>

            {/* Navbar */}
            <Navbar />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
                {/* 3D Canvas Section */}
                <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', borderRadius: '24px', border: '1px solid #334155', padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
                    <Hero3D />

                </div>

                {/* Filter Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '2rem' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '10px',
                                border: 'none',
                                backgroundColor: activeCategory === cat ? '#4F46E5' : '#1E293B',
                                color: activeCategory === cat ? '#FFF' : '#94A3B8',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Event Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                    {filteredEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onClick={() => setSelectedEvent(event)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Popup */}
            <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />

        </div>
    );
}