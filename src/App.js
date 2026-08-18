
import React, { useState, useMemo } from 'react';

// ==========================================
// MOCK DATA - General Events
// We keep it abstract, suitable for various events
// ==========================================
const sampleEvents = [
    {
        id: 1,
        title: 'Neon Odyssey: Tech Art Showcase',
        category: 'Competitions',
        status: 'Upcoming',
        date: 'Dec 15, 2026',
        time: '6:00 PM',
        location: 'Cyber Arena, Sector 7',
        tagline: 'Witness the future where art meets innovation.',
        description: 'A visual festival showcasing generative art, light installations, and immersive VR experiences created by students.',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&h=400&auto=format&fit=crop', // Abstract purple/tech
        color: '#D4BFFF' // Lavender Pastel
    },
    {
        id: 2,
        title: 'Sustainable Cities Symposium',
        category: 'Workshops',
        status: 'Upcoming',
        date: 'Oct 02, 2026',
        time: '10:00 AM',
        location: 'EcoCenter Auditorium',
        tagline: 'Designing tomorrow’s resilient urban landscapes.',
        description: 'A hands-on workshop with leading architects discussing green infrastructure, circular economy, and smart mobility solutions.',
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&h=400&auto=format&fit=crop', // Dynamic workshop feel
        color: '#C0EFEF' // Cyan/Mint Pastel
    },
    {
        id: 3,
        title: 'CodeSprint: 48hr Hackathon',
        category: 'Competitions',
        status: 'Past',
        date: 'Jan 10, 2026',
        time: '48 Hours',
        location: 'Innovation Lab',
        tagline: 'Build. Pitch. Win. The ultimate coding challenge.',
        description: 'Teams developed mobile solutions for accessible education. Over 200 participants and 3 notable projects incubated.',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&h=400&auto=format&fit=crop', // Code/laptop focused
        color: '#FFDBA4' // Peach Pastel
    },
    {
        id: 4,
        title: 'Visual Flow: Design Systems Seminar',
        category: 'Workshops',
        status: 'Past',
        date: 'May 20, 2026',
        time: '2:00 PM',
        location: 'Design Studio B',
        tagline: 'Creating scalable design systems for modern UI.',
        description: 'A semantic deep dive into component libraries, atomic design, and maintaining visual consistency across platforms.',
        imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=600&h=400&auto=format&fit=crop', // Abstract design system
        color: '#B2E2A2' // Light Green Pastel
    },
    {
        id: 5,
        title: 'The Great Debate: AI Ethics',
        category: 'Keynotes',
        status: 'Live',
        date: 'AUG 18, 2026',
        time: '11:00 AM - NOW',
        location: 'Main Hall',
        tagline: 'Bias, automation, and responsibility in the age of AI.',
        description: 'Two leading ethicists and two tech developers clash in a structured debate about the future implications of artificial intelligence.',
        imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&h=400&auto=format&fit=crop', // Abstract Robot/Person
        color: '#FFC4C4' // Soft Red Pastel
    }
];

const categories = ['All', 'Workshops', 'Competitions', 'Keynotes'];

// ==========================================
// CSS STYLES (Plain CSS defined in JS for portability)
// ==========================================
const styles = {
    container: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        color: '#333',
        backgroundColor: '#F9FAFB', // Lightest backdrop
        minHeight: '100vh',
    },
    titleArea: {
        textAlign: 'center',
        marginBottom: '3rem',
    },
    mainTitle: {
        fontSize: '2.8rem',
        fontWeight: 800,
        background: 'linear-gradient(135deg, #f0ff99 0%, #ffca99 100%)', // Fun Pastel Gradient
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: '0 0 0.5rem 0',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#666',
        fontWeight: 400,
    },

    // -- Control Bar (Filters + Search) --
    controlBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2.5rem',
        gap: '1rem',
        flexWrap: 'wrap',
    },
    filterGroup: {
        display: 'flex',
        gap: '0.6rem',
    },
    filterButton: {
        padding: '0.6rem 1.4rem',
        borderRadius: '25px',
        border: '2px solid transparent',
        fontSize: '0.95rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    searchContainer: {
        position: 'relative',
        maxWidth: '300px',
        flex: '1 1 100%',
    },
    searchInput: {
        width: '100%',
        padding: '0.7rem 1rem 0.7rem 2.8rem',
        borderRadius: '25px',
        border: '2px solid transparent',
        fontSize: '0.95rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        transition: 'border-color 0.2s ease',
    },

    // -- The Event Grid --
    eventGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
    },

    // -- Event Card --
    eventCard: {
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: '#fff',
        boxShadow: '0 8px 15px rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.04)',
    },
    cardImage: {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
    },
    cardContent: {
        padding: '1.5rem',
        position: 'relative',
    },
    cardDateTag: {
        position: 'absolute',
        top: '-30px',
        right: '1.5rem',
        backgroundColor: '#fff',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontWeight: 700,
        fontSize: '0.9rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    },
    cardStatus: {
        fontSize: '0.8rem',
        fontWeight: 800,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '0.5rem',
        display: 'block',
    },
    cardTitle: {
        fontSize: '1.35rem',
        fontWeight: 700,
        margin: '0 0 0.5rem 0',
        lineHeight: '1.25',
        color: '#222',
    },
    cardTagline: {
        fontSize: '0.95rem',
        color: '#555',
        margin: 0,
        lineHeight: '1.4',
    },

    // -- Modal --
    modalOverlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        opacity: 0,
        animation: 'fadeIn 0.3s forwards',
    },
    modalContent: {
        background: '#fff',
        borderRadius: '20px',
        maxWidth: '650px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 40px rgba(0,0,0,0.2)',
        border: '2px solid #EEE',
        animation: 'slideUp 0.3s forwards',
    },
    modalImage: {
        width: '100%',
        height: '280px',
        objectFit: 'cover',
    },
    modalBody: {
        padding: '2rem 2rem 2.5rem 2rem',
    },
    closeButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'rgba(255,255,255,0.8)',
        border: 'none',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        zIndex: 10,
    },
    modalMeta: {
        display: 'flex',
        gap: '1rem',
        color: '#777',
        fontSize: '0.95rem',
        marginBottom: '1rem',
        fontWeight: 500,
        alignItems: 'center',
    },
    statusBadge: {
        padding: '0.3rem 0.8rem',
        borderRadius: '15px',
        color: '#fff',
        fontSize: '0.8rem',
        fontWeight: 700,
    }
};

// ==========================================
// Component Logic
// ==========================================
export default function App() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Filter events based on Category AND Search Term (using useMemo for performance)
    const displayedEvents = useMemo(() => {
        return sampleEvents
            .filter(event => selectedCategory === 'All' || event.category === selectedCategory)
            .filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [selectedCategory, searchTerm]);

    // Utility to get status color
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Upcoming': return { backgroundColor: '#FFD4DB', color: '#B03A2E' }; // Warm Pastel
            case 'Live': return { backgroundColor: '#CFFFCA', color: '#145A32', fontWeight: 900 }; // Green Pastel
            default: return { backgroundColor: '#F1F3F4', color: '#5F6368' }; // Neutral Pastal/Gray
        }
    };

    return (
        <>
            {/* 1. Global CSS Animations (Plain CSS inject) */}
            <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        #card-grid div:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0,0,0,0.08) !important;
        }
        
        #search-inputIcon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #aaaaaa;
          font-size: 1.1rem;
        }
        
        /* Modal Scrollbar */
        #modal-scroll::-webkit-scrollbar {
          width: 8px;
        }
        #modal-scroll::-webkit-scrollbar-track {
          background: #F1F1F1;
          border-radius: 20px;
        }
        #modal-scroll::-webkit-scrollbar-thumb {
          background: #CCC;
          border-radius: 20px;
        }
      `}</style>

            {/* 2. Portfolio Container */}
            <div style={styles.container}>
                <div style={styles.titleArea}>
                    <h1 style={styles.mainTitle}>ACM</h1>
                    <p style={styles.subtitle}>Explore workshops, seminars, and challenges.</p>
                </div>

                {/* 3. Controls (Filters + Search) */}
                <div style={styles.controlBar}>
                    <div style={styles.filterGroup}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    ...styles.filterButton,
                                    backgroundColor: selectedCategory === cat ? '#222' : '#fff',
                                    color: selectedCategory === cat ? '#fff' : '#222',
                                    border: `2px solid ${selectedCategory === cat ? '#222' : 'transparent'}`,
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div style={styles.searchContainer}>
                        <span id="search-inputIcon"></span>
                        <input
                            type="text"
                            placeholder="Search event title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                ...styles.searchInput,
                                borderColor: searchTerm ? '#AAA' : 'transparent',
                            }}
                        />
                    </div>
                </div>

                {/* 4. Event Grid */}
                <div id="card-grid" style={styles.eventGrid}>
                    {displayedEvents.map(event => (
                        <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            style={styles.eventCard}
                        >
                            <img src={event.imageUrl} alt={event.title} style={styles.modalImage} />
                            <div style={styles.cardContent}>
                                {/* Visual Date Tag (Fun element) */}
                                <span style={{ ...styles.cardDateTag, backgroundColor: event.color }}>
                                    {event.date.split(',')[0]}
                                </span>

                                <span style={{ ...styles.cardStatus, color: getStatusStyle(event.status).color }}>
                                    {event.status}
                                </span>
                                <h3 style={styles.cardTitle}>{event.title}</h3>
                                <p style={styles.cardTagline}>{event.tagline}</p>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {displayedEvents.length === 0 && (
                        <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '3rem', color: '#999' }}>
                            <h3>No events found matching "{searchTerm}" in {selectedCategory}.</h3>
                            <p>Try resetting the filters.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 5. Detail Modal */}
            {selectedEvent && (
                <div style={styles.modalOverlay} onClick={() => setSelectedEvent(null)}>
                    <div
                        id="modal-scroll"
                        style={styles.modalContent}
                        onClick={(e) => e.stopPropagation()} // Stop closing when clicking inside
                    >
                        <button style={styles.closeButton} onClick={() => setSelectedEvent(null)}>×</button>
                        <img src={selectedEvent.imageUrl} alt={selectedEvent.title} style={styles.modalImage} />

                        <div style={styles.modalBody}>
                            <div style={styles.modalMeta}>
                                <span style={{ ...styles.statusBadge, ...getStatusStyle(selectedEvent.status) }}>
                                    {selectedEvent.status}
                                </span>
                                <span>📅 {selectedEvent.date} @ {selectedEvent.time}</span>
                            </div>

                            <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>{selectedEvent.title}</h2>
                            <p style={{ ...styles.cardTagline, color: '#333', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: 600, borderLeft: `5px solid ${selectedEvent.color}`, paddingLeft: '1rem' }}>
                                {selectedEvent.tagline}
                            </p>

                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#444444' }}>Location</h4>
                            <p style={{ margin: '0 0 1.5rem 0', color: '#666' }}> {selectedEvent.location}</p>

                            <h4 style={{ margin: '0 0 0.5rem 0', color: '#444' }}>Event Description</h4>
                            <p style={{ lineHeight: '1.7', color: '#444', margin: 0 }}>
                                {selectedEvent.description}
                            </p>

                            <button style={{
                                marginTop: '2rem',
                                padding: '0.8rem 1.8rem',
                                backgroundColor: selectedEvent.color,
                                color: '#222',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}>
                                {selectedEvent.status === 'Upcoming' ? 'Register Now' : 'View Gallery'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}