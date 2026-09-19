import React, { useEffect, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    LockKeyhole,
    MapPin,
    Sparkles,
    Trophy,
    BookOpen,
    Code2,
    Target,
    Users,
} from "lucide-react";

import "./DSAEvents.css";

const sessions = [
    {
        id: 1,
        level: 1,
        title: "DSA SESSION 1",
        subtitle: "ORIENTATION SESSION",
        unlocked: true,
        date: "22 September 2026",
        mode: "Offline",
        description:
            "An orientation session introducing students to the DSA Series and helping them understand how the complete learning journey will move forward.",
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
        title: "DSA SESSION 2",
        subtitle: "LOCKED",
        unlocked: false,
    },

    {
        id: 3,
        level: 3,
        title: "DSA SESSION 3",
        subtitle: "LOCKED",
        unlocked: false,
    },

    {
        id: 4,
        level: 4,
        title: "DSA SESSION 4",
        subtitle: "LOCKED",
        unlocked: false,
    },

    {
        id: 5,
        level: 5,
        title: "DSA SESSION 5",
        subtitle: "LOCKED",
        unlocked: false,
    },

    {
        id: 6,
        level: 6,
        title: "DSA SESSION 6",
        subtitle: "LOCKED",
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

function GameDecoration() {
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
                <span>LEARN</span>
                <span>PRACTICE</span>
                <span>LEVEL UP</span>
            </div>

            <div className="pixel-sign sign-right">
                <span>SMALL STEPS</span>
                <span>BIG SKILLS</span>
            </div>

            <div className="floating-console console-left">
                <span>DSA</span>
            </div>

            <div className="floating-console console-right">
                <span>LEVEL</span>
                <strong>01 / 06</strong>
            </div>
        </>
    );
}

function LevelPlatform({ session }) {
    return (
        <div
            className={`level-platform ${session.unlocked ? "unlocked-platform" : "locked-platform"
                }`}
        >
            <div className="platform-top">
                {session.unlocked ? (
                    <div className="level-crystal">
                        <Sparkles size={25} />
                    </div>
                ) : (
                    <div className="level-lock">
                        <LockKeyhole size={29} />
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
                    className={`level-status ${session.unlocked ? "status-unlocked" : "status-locked"
                        }`}
                >
                    {session.unlocked ? "UNLOCKED" : "LOCKED"}
                </span>
            </div>

            <div className="level-card-title">
                {session.title}
            </div>

            <div className="level-card-subtitle">
                {session.unlocked
                    ? session.subtitle
                    : "TO BE ANNOUNCED"}
            </div>

            {session.unlocked ? (
                <div className="level-card-date">
                    <CalendarDays size={15} />
                    <span>{session.date}</span>
                </div>
            ) : (
                <div className="level-card-locked-line">
                    <LockKeyhole size={14} />
                    <span>STAY TUNED</span>
                </div>
            )}

            <div className="level-card-arrow">
                <ArrowRight size={18} />
            </div>
        </button>
    );
}

function SessionDetail({ session, onBack }) {
    const isUnlocked = session.unlocked;

    return (
        <div className="session-detail-screen">
            <div className="session-detail-background">
                <GameDecoration />
            </div>

            <div className="session-detail-inner">
                <button
                    type="button"
                    className="session-back-button"
                    onClick={onBack}
                >
                    <ArrowLeft size={17} />
                    BACK TO LEVELS
                </button>

                <div className="session-detail-hud">
                    <span>DSA SERIES</span>
                    <span>
                        LEVEL {session.level} / {sessions.length}
                    </span>
                </div>

                <div
                    className={`session-machine ${isUnlocked
                            ? "session-machine-open"
                            : "session-machine-locked"
                        }`}
                >
                    <div className="machine-top-bar">
                        <div className="machine-dot"></div>
                        <div className="machine-dot"></div>
                        <div className="machine-dot"></div>

                        <span>DSA_TERMINAL.EXE</span>

                        <div className="machine-level">
                            LEVEL {session.level}
                        </div>
                    </div>

                    <div className="machine-screen">
                        {isUnlocked ? (
                            <>
                                <div className="screen-glow"></div>

                                <div className="session-title-badge">
                                    DSA SESSION 1
                                </div>

                                <h1>ORIENTATION SESSION</h1>

                                <p className="session-intro">
                                    Begin your DSA journey. Understand the
                                    roadmap, resources, guidance and the path
                                    ahead.
                                </p>

                                <div className="session-meta-grid">
                                    <div className="session-meta-box">
                                        <CalendarDays size={19} />
                                        <div>
                                            <small>DATE</small>
                                            <strong>
                                                22 September 2026
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="session-meta-box">
                                        <MapPin size={19} />
                                        <div>
                                            <small>MODE</small>
                                            <strong>Offline</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="explore-heading">
                                    <span>WHAT YOU'LL EXPLORE</span>
                                    <div></div>
                                </div>

                                <div className="session-topics">
                                    {session.topics.map((topic, index) => (
                                        <div
                                            className="session-topic"
                                            key={index}
                                        >
                                            <div className="topic-icon">
                                                {topic.icon}
                                            </div>

                                            <div className="topic-content">
                                                <h3>{topic.title}</h3>
                                                <p>{topic.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="session-message">
                                    <span>&gt;</span>
                                    YOUR DSA JOURNEY STARTS HERE.
                                    <span className="blink">_</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="locked-screen-content">
                                    <div className="big-lock">
                                        <LockKeyhole size={58} />
                                    </div>

                                    <div className="locked-level-label">
                                        LEVEL {session.level}
                                    </div>

                                    <h1>{session.title}</h1>

                                    <div className="coming-soon">
                                        TO BE ANNOUNCED...
                                    </div>

                                    <p>
                                        This session is currently locked.
                                        Details will be revealed as the DSA
                                        Series progresses.
                                    </p>

                                    <div className="locked-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>

                                    <div className="locked-bottom-text">
                                        STAY TUNED FOR THE NEXT LEVEL
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="machine-control-panel">
                        <div className="joystick">
                            <span></span>
                        </div>

                        <div className="control-buttons">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DSAEvents() {
    const [selectedSession, setSelectedSession] = useState(null);

    useEffect(() => {
        if (selectedSession) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedSession]);

    const openSession = (session) => {
        setSelectedSession(session);
    };

    if (selectedSession) {
        return (
            <SessionDetail
                session={selectedSession}
                onBack={() => setSelectedSession(null)}
            />
        );
    }

    return (
        <section
            className="dsa-events-map"
            id="events"
        >
            <GameDecoration />

            <div className="dsa-events-header">
                <div className="events-mini-label">
                    &lt; DSA_SERIES /&gt;
                </div>

                <div className="events-hud">
                    <span>PLAYER 01</span>
                    <span>LEVEL UP YOUR LOGIC</span>
                </div>

                <div className="events-title-area">
                    <span className="events-eyebrow">
                        ACM BY • DSA SERIES
                    </span>

                    <h2>
                        DSA SESSIONS
                        <br />
                        &amp; EVENTS
                    </h2>

                    <p>
                        A game-like journey through learning,
                        practice and problem solving.
                    </p>
                </div>
            </div>

            <div className="map-intro-banner">
                <span className="banner-arrow">&gt;</span>
                <span>SELECT YOUR LEVEL TO CONTINUE</span>
                <span className="banner-arrow">&lt;</span>
            </div>

            <div className="level-map">
                <div className="map-path"></div>

                {sessions.map((session, index) => (
                    <div
                        className={`level-row ${index % 2 === 0
                                ? "level-row-left"
                                : "level-row-right"
                            }`}
                        key={session.id}
                    >
                        <div className="level-side-card">
                            {index % 2 === 0 && (
                                <LevelCard
                                    session={session}
                                    onClick={() => openSession(session)}
                                />
                            )}
                        </div>

                        <div className="level-node-area">
                            <LevelPlatform session={session} />
                        </div>

                        <div className="level-side-card">
                            {index % 2 !== 0 && (
                                <LevelCard
                                    session={session}
                                    onClick={() => openSession(session)}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="map-footer">
                <div className="footer-line"></div>

                <div className="footer-text">
                    <span>SMALL STEPS</span>
                    <span>BIG ALGORITHMS</span>
                    <span>BRIGHTER FUTURE</span>
                </div>

                <div className="footer-hearts">
                    <span>♥</span>
                    <span>♥</span>
                    <span>♥</span>
                </div>
            </div>
        </section>
    );
}