import React from 'react';
import { motion } from 'framer-motion';
import {
    X,
    Calendar,
    MapPin
} from 'lucide-react';

export default function EventModal({ event, onClose }) {
    if (!event) return null;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '1rem'
            }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                exit={{
                    opacity: 0,
                    y: 20
                }}
                style={{
                    backgroundColor: '#0F172A',
                    border: '1px solid #334155',
                    borderRadius: '20px',
                    padding: '2rem',
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    color: '#FFF'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer'
                    }}
                    aria-label="Close event details"
                >
                    <X size={22} />
                </button>

                <h2
                    style={{
                        fontSize: '1.5rem',
                        marginBottom: '0.5rem'
                    }}
                >
                    {event.title}
                </h2>

                <p
                    style={{
                        color: '#94A3B8',
                        fontSize: '0.95rem'
                    }}
                >
                    {event.fullDetails}
                </p>

                <div
                    style={{
                        backgroundColor: '#1E293B',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginTop: '1.5rem',
                        marginBottom: '1.5rem',
                        fontSize: '0.85rem'
                    }}
                >
                    {event.date && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: event.location
                                    ? '0.5rem'
                                    : '0'
                            }}
                        >
                            <Calendar
                                size={16}
                                color="#818CF8"
                            />

                            <span>
                                {event.date}
                            </span>
                        </div>
                    )}

                    {event.location && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <MapPin
                                size={16}
                                color="#EC4899"
                            />

                            <span>
                                {event.location}
                            </span>
                        </div>
                    )}
                </div>

            </motion.div>
        </div>
    );
}