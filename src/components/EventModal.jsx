import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, MapPin, ExternalLink, Video } from 'lucide-react';

export default function EventModal({ event, onClose }) {
    if (!event) return null;

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{ backgroundColor: '#0F172A', border: '1px solid #334155', borderRadius: '20px', padding: '2rem', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', color: '#FFF' }}
            >
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
                    <X size={22} />
                </button>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{event.title}</h2>
                <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>{event.fullDetails}</p>

                {/* Video Embed */}
                {event.videoUrl && (
                    <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', backgroundColor: '#020617', fontSize: '0.8rem', color: '#A5B4FC' }}>
                            <Video size={14} /> Event Preview / Session Recording
                        </div>
                        <iframe
                            src={event.videoUrl}
                            title={event.title}
                            style={{ width: '100%', height: '220px', border: 'none' }}
                            allowFullScreen
                        />
                    </div>
                )}

                {/* Schedule & Venue Info */}
                <div style={{ backgroundColor: '#1E293B', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                        <Calendar size={16} color="#818CF8" /> <span>{event.date} • {event.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={16} color="#EC4899" /> <span>{event.location}</span>
                    </div>
                </div>

                {/* Registration CTA */}
                <a
                    href={event.registerUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '12px', backgroundColor: '#4F46E5', color: '#FFF', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}
                >
                    Register for Event <ExternalLink size={16} />
                </a>
            </motion.div>
        </div>
    );
}