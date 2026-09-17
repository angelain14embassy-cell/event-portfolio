import React from 'react';
import { ChevronRight, Calendar } from 'lucide-react';

export default function EventCard({ event, onClick }) {
    const isUpcoming = event.status === 'Upcoming';

    return (
        <div
            className="dsa-session-card"
            style={{
                '--session-color': event.color
            }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            <div className="dsa-session-card-glow"></div>

            <div className="dsa-session-card-content">

                <div className="dsa-session-top">

                    <span className="dsa-session-number">
                        SESSION {event.session}
                    </span>

                    <span
                        className={
                            isUpcoming
                                ? 'dsa-session-status upcoming'
                                : 'dsa-session-status'
                        }
                    >
                        <span className="dsa-status-dot"></span>
                        {event.status}
                    </span>

                </div>

                <div className="dsa-session-main">

                    <p className="dsa-session-label">
                        ACM BV • DSA SERIES
                    </p>

                    <h3>
                        {event.title}
                    </h3>

                    <p className="dsa-session-subtitle">
                        {event.subtitle}
                    </p>

                    <p className="dsa-session-description">
                        {event.description}
                    </p>

                    <div className="dsa-session-topics">
                        {event.topics.map((topic, index) => (
                            <span key={index}>
                                #{topic}
                            </span>
                        ))}
                    </div>

                </div>

                <div className="dsa-session-footer">

                    {event.date && (
                        <div className="dsa-session-date">
                            <Calendar size={14} />
                            <span>{event.date}</span>
                        </div>
                    )}

                    <div className="dsa-session-details">
                        Details
                        <ChevronRight size={15} />
                    </div>

                </div>

            </div>

        </div>
    );
}