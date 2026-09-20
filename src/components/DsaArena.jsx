import React, { useEffect, useState } from "react";
import {
    ArrowRight,
    X,
    LockKeyhole,
    CalendarDays,
    MapPin,
    BookOpen,
    Code2,
    Target,
    Users,
    Trophy,
    Sparkles,
} from "lucide-react";

import "./DsaArena.css";

const sessions = [
    {
        id: 1,
        level: 1,
        title: "ORIENTATION SESSION",
        shortTitle: "ORIENTATION SESSION",
        unlocked: true,
        date: "22 September 2026",
        venue: "To be announced",
        description:
            "An orientation session introducing students to the DSA Series and explaining how the complete learning journey will move forward.",
        topics: [
            {
                icon: <BookOpen size={17} />,
                title: "DSA Series Overview",
                text: "Understand how the complete DSA learning series will be structured.",
            },
            {
                icon: <Target size={17} />,
                title: "DSA Roadmap",
                text: "Get an overview of the topics and progression that will be followed throughout the series.",
            },
            {
                icon: <Code2 size={17} />,
                title: "Resources",
                text: "Discover useful resources that can support your DSA preparation and practice.",
            },
            {
                icon: <Users size={17} />,
                title: "Guidance",
                text: "Learn how to approach DSA consistently and make progress throughout the series.",
            },
            {
                icon: <Trophy size={17} />,
                title: "Contests & Opportunities",
                text: "Understand how contests and problem-solving activities will be incorporated into the journey.",
            },
        ],
    },

    {
        id: 2,
        level: 2,
        title: "DSA SESSION 1",
        shortTitle: "DSA SESSION 1",
        unlocked: false,
    },

    {
        id: 3,
        level: 3,
        title: "DSA SESSION 2",
        shortTitle: "DSA SESSION 2",
        unlocked: false,
    },

    {
        id: 4,
        level: 4,
        title: "DSA SESSION 3",
        shortTitle: "DSA SESSION 3",
        unlocked: false,
    },

    {
        id: 5,
        level: 5,
        title: "DSA SESSION 4",
        shortTitle: "DSA SESSION 4",
        unlocked: false,
    },

    {
        id: 6,
        level: 6,
        title: "DSA SESSION 5",
        shortTitle: "DSA SESSION 5",
        unlocked: false,
    },
];

function PixelCloud({ className = "" }) {
    return (
        <div className={`pixel-cloud ${className}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

function FloatingStar({ className = "" }) {
    return (
        <div className={`floating-star ${className}`}>
            ✦
        </div>
    );
}

function GameDecorations() {
    return (
        <>
            <div className="game-moon"></div>

            <PixelCloud className="cloud-one" />
            <PixelCloud className="cloud-two" />
            <PixelCloud className="cloud-three" />

            <FloatingStar className="star-one" />
            <FloatingStar className="star-two" />
            <FloatingStar className="star-three" />
            <FloatingStar className="star-four" />
            <FloatingStar className="star-five" />

            <div className="pixel-sign sign-left">
                <span>SMALL</span>
                <span>STEPS</span>
                <span>BIG</span>
                <span>SKILLS</span>
            </div>

            <div className="pixel-sign sign-right">
                <span>SOLVE</span>
                <span>LEARN</span>
                <span>LEVEL UP</span>
                <span>REPEAT</span>
            </div>

            <div className="floating-console console-left">
                <span>DSA</span>
            </div>
        </>
    );
}

function LevelPlatform({ session }) {
    return (
        <div
            className={`level-platform ${session.unlocked
                    ? "unlocked-platform"
                    : "locked-platform"
                }`}
        >
            <div className="platform-top">
                {session.unlocked ? (
                    <div className="level-crystal">
                        <Sparkles size={25} />
                    </div>
                ) : (
                    <div className="level-lock">
                        <LockKeyhole size={28} />
                    </div>
                )}
            </div>

            <div className="platform-grass">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="platform-rock platform-rock-one"></div>
            <div className="platform-rock platform-rock-two"></div>
            <div className="platform-rock platform-rock-three"></div>

            <div className="platform-label">
                LEVEL {session.level}
            </div>
        </div>
    );
}

function LevelCard({ session, onClick }) {
    return (
        <button
            type="button"
            className={`level-info-card ${session.unlocked
                    ? "level-info-unlocked"
                    : "level-info-locked"
                }`}
            onClick={onClick}
        >
            <div className="level-card-top">
                <span className="level-card-number">
                    LEVEL {session.level}
                </span>

                <span
                    className={`level-status ${session.unlocked
                            ? "status-unlocked"
                            : "status-locked"
                        }`}
                >
                    {session.unlocked
                        ? "UNLOCKED"
                        : "LOCKED"}
                </span>
            </div>

            <div className="level-card-title">
                {session.shortTitle}
            </div>

            {session.unlocked ? (
                <>
                    <div className="level-card-subtitle">
                        DSA SERIES ORIENTATION
                    </div>

                    <div className="level-card-date">
                        <CalendarDays size={14} />
                        <span>
                            {session.date}
                        </span>
                    </div>
                </>
            ) : (
                <>
                    <div className="level-card-subtitle">
                        TO BE ANNOUNCED
                    </div>

                    <div className="level-card-locked-line">
                        <LockKeyhole size={13} />
                        <span>
                            STAY TUNED
                        </span>
                    </div>
                </>
            )}

            <div className="level-card-arrow">
                <ArrowRight size={18} />
            </div>
        </button>
    );
}

function SessionPopup({ session, onClose }) {
    const isUnlocked = session.unlocked;

    return (
        <div
            className="session-popup-overlay"
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose();
                }
            }}
        >
            <div className="session-popup">
                <div className="popup-top-bar">
                    <div className="popup-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <span className="popup-terminal">
                        DSA_TERMINAL.EXE
                    </span>

                    <span className="popup-level">
                        LEVEL {session.level} / 6
                    </span>

                    <button
                        type="button"
                        className="popup-close"
                        onClick={onClose}
                        aria-label="Close session"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="popup-screen">
                    {isUnlocked ? (
                        <>
                            <div className="popup-title-badge">
                                {session.title}
                            </div>

                            <div className="popup-subtitle">
                                DSA SERIES ORIENTATION
                            </div>

                            <div className="popup-meta">
                                <div className="popup-meta-box">
                                    <CalendarDays size={18} />

                                    <div>
                                        <small>
                                            DATE
                                        </small>

                                        <strong>
                                            {session.date}
                                        </strong>
                                    </div>
                                </div>

                                <div className="popup-meta-box">
                                    <MapPin size={20} />

                                    <div>
                                        <small>
                                            VENUE
                                        </small>

                                        <strong>
                                            {session.venue || "To be announced"}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <p className="popup-description">
                                {session.description}
                            </p>

                            <div className="popup-section-title">
                                <span>
                                    WHAT YOU'LL EXPLORE
                                </span>

                                <div></div>
                            </div>

                            <div className="popup-topics">
                                {session.topics.map(
                                    (topic, index) => (
                                        <div
                                            className="popup-topic"
                                            key={index}
                                        >
                                            <div className="popup-topic-icon">
                                                {topic.icon}
                                            </div>

                                            <div>
                                                <h3>
                                                    {topic.title}
                                                </h3>

                                                <p>
                                                    {topic.text}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="popup-message">
                                <span>
                                    &gt;
                                </span>

                                SAME LOGIC. HIGHER YOU.

                                <span className="popup-heart">
                                    ♥
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="locked-popup">
                            <div className="locked-popup-icon">
                                <LockKeyhole size={50} />
                            </div>

                            <div className="locked-popup-level">
                                LEVEL {session.level}
                            </div>

                            <h2>
                                {session.title}
                            </h2>

                            <div className="locked-popup-label">
                                TO BE ANNOUNCED...
                            </div>

                            <p>
                                This session is currently
                                locked. Details will be
                                revealed as the DSA Series
                                progresses.
                            </p>

                            <div className="locked-popup-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="locked-popup-footer">
                                STAY TUNED FOR THE NEXT LEVEL
                            </div>
                        </div>
                    )}
                </div>

                <div className="popup-control-panel">
                    <div className="popup-joystick">
                        <span></span>
                    </div>

                    <div className="popup-buttons">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className="popup-control-text">
                        {isUnlocked
                            ? "ORIENTATION"
                            : "LOCKED"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DsaArena() {
    const [selectedSession, setSelectedSession] =
        useState(null);

    useEffect(() => {
        if (selectedSession) {
            document.body.style.overflow =
                "hidden";
        } else {
            document.body.style.overflow =
                "";
        }

        return () => {
            document.body.style.overflow =
                "";
        };
    }, [selectedSession]);

    return (
        <section
            id="dsa-arena-section"
            className="dsa-arena-container"
        >
            <GameDecorations />

            <div className="arena-header">
                <div className="arena-terminal-label">
                    &lt; DSA_SERIES /&gt;
                </div>

                <div className="arena-title-area">
                    <span className="arena-eyebrow">
                        ACM BV • DSA SERIES
                    </span>

                    <h2 className="arena-title">
                        DSA SESSIONS
                        <br />
                        &amp; EVENTS
                    </h2>

                    <p>
                        A journey of logic,
                        learning and growth.
                    </p>
                </div>
            </div>

            <div className="arena-instruction">
                <span>&gt;</span>
                SELECT YOUR LEVEL TO CONTINUE
                <span>&lt;</span>
            </div>

            <div className="level-map">
                <div className="map-path"></div>

                {sessions.map(
                    (session, index) => (
                        <div
                            className={`level-row ${index % 2 === 0
                                    ? "level-row-left"
                                    : "level-row-right"
                                }`}
                            key={session.id}
                        >
                            <div className="level-card-side">
                                {index % 2 === 0 && (
                                    <LevelCard
                                        session={session}
                                        onClick={() =>
                                            setSelectedSession(
                                                session
                                            )
                                        }
                                    />
                                )}
                            </div>

                            <button
                                type="button"
                                className="level-node-button"
                                onClick={() =>
                                    setSelectedSession(
                                        session
                                    )
                                }
                                aria-label={`Open ${session.title}`}
                            >
                                <LevelPlatform
                                    session={session}
                                />
                            </button>

                            <div className="level-card-side">
                                {index % 2 !== 0 && (
                                    <LevelCard
                                        session={session}
                                        onClick={() =>
                                            setSelectedSession(
                                                session
                                            )
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>

            <div className="arena-footer">
                <div className="footer-line"></div>

                <div className="footer-text">
                    <span>
                        SMALL STEPS
                    </span>

                    <span>
                        BIG ALGORITHMS
                    </span>

                    <span>
                        BRIGHTER FUTURE
                    </span>
                </div>
            </div>

            {selectedSession && (
                <SessionPopup
                    session={selectedSession}
                    onClose={() =>
                        setSelectedSession(null)
                    }
                />
            )}
        </section>
    );
}