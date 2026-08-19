import React from 'react';
import { ChevronRight, Calendar, Video } from 'lucide-react';

export default function EventCard({ event, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: '#0F172A',
                borderRadius: '16px',
                border: '1px solid #1E293B',
                padding: '1.5rem',
                cursor: 'pointer',
                borderTop: `4px solid ${event.color}`,
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0px)')}
        >
            <div>
                {/* Category & Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94A3B8', backgroundColor: '#1E293B', padding: '3px 10px', borderRadius: '6px' }}>
                        {event.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: event.status === 'Upcoming' ? '#10B981' : '#64748B', fontWeight: 'bold' }}>
                        ● {event.status}
                    </span>
                </div>

                {/* Title & Description */}
                <h3 style={{ fontSize: '1.15rem', margin: '0 0 0.5rem 0', color: '#F8FAFC', lineHeight: 1.3 }}>
                    {event.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {event.description}
                </p>

                {/* Dynamic Topic Hashtags */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {event.topics.map((topic, index) => (
                        <span
                            key={index}
                            style={{ fontSize: '0.7rem', fontFamily: 'monospace', backgroundColor: '#1E1B4B', color: '#A5B4FC', padding: '2px 8px', borderRadius: '4px' }}
                        >
                            #{topic}
                        </span>
                    ))}
                </div>
            </div>

            {/* Card Footer */}
            <div style={{ borderTop: '1px solid #1E293B', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#64748B' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {event.date}
                </span>
                <span style={{ color: '#818CF8', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 'bold' }}>
                    {event.videoUrl && <Video size={14} style={{ marginRight: '4px' }} />}
                    Details <ChevronRight size={14} />
                </span>
            </div>
        </div>
    );
}