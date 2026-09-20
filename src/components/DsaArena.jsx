import React, { useState } from "react";
import "./DsaArena.css";

// Import your exported pixel images
import devWorkstationImg from "../assets/dev-workstation.jpeg";
import avatarsGroupImg from "../assets/avatars-group.jpeg";
import sessionConductImg from "../assets/session-conduct.jpeg";
import calendarUiImg from "../assets/calendar-ui.jpeg";
import academyBuildingImg from "../assets/academy-building.jpeg";

const CAL_DOW = ["S", "M", "T", "W", "T", "F", "S"];

const CALENDAR_WEEKS = [
    {
        days: [12, 13, 14, 15, 16, 17, 18],
        highlights: { 15: "highlight-orange" },
        event: { label: "SESSION 1: CONCEPT", tone: "event-blue" },
    },
    { days: [19, 20, 21, 22, 23, 24, 25] },
    {
        days: [26, 27, 28, 29, 30, null, null],
        highlights: { 29: "highlight-gold" },
        event: { label: "SESSION 2: APPLICATION", tone: "event-purple" },
    },
];

export default function DsaArena() {
    const [applied, setApplied] = useState(false);

    const handleApply = () => {
        setApplied(true);
        // Opens the application Google Form in a new browser tab
        window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSeEDAeJrfCPgfT941mnLNmxjvDj0yanmyGghXDnZCOANU8Sdw/viewform",
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <section id="dsa-arena-section" className="space-arcade-container">
            {/* Space sky background art */}
            <div className="space-bg-elements" aria-hidden="true">
                <div className="pixel-planet planet-earth"></div>
                <div className="pixel-planet planet-saturn"></div>
                <div className="pixel-planet planet-violet"></div>
                <div className="pixel-planet planet-mars"></div>
                <div className="pixel-planet planet-jupiter"></div>

                <div className="space-stars">
                    <div className="s-star s1"></div>
                    <div className="s-star s2"></div>
                    <div className="s-star s3"></div>
                    <div className="s-star s4"></div>
                    <div className="s-star s5"></div>
                    <div className="s-star s6"></div>
                    <div className="s-star s7"></div>
                    <div className="s-star s8"></div>

                    <div className="starburst sb1"></div>
                    <div className="starburst sb2"></div>
                    <div className="starburst sb3"></div>
                    <div className="starburst sb4"></div>
                    <div className="starburst sb5"></div>
                </div>

                <div className="bottom-ui-sheet sheet-left">
                    <div className="sheet-header">Review comments</div>
                    <p>Learned so much about Trees and Heaps!</p>
                </div>
                <div className="bottom-ui-sheet sheet-right">
                    <div className="sheet-icons">👟 👕</div>
                </div>
            </div>

            {/* Main content */}
            <div className="arcade-content-wrapper">
                {/* Marquee banner */}
                <header className="marquee-banner-frame">
                    <div className="banner-side-screen side-left" aria-hidden="true">🖥️</div>
                    <div className="banner-side-screen side-right" aria-hidden="true">🖥️</div>

                    <div className="banner-top-tag">MASTER THE CORE:</div>
                    <div className="banner-inner">
                        <h1 className="banner-main-title">
                            ADVANCED DATA STRUCTURES &amp; ALGORITHMS (DSA)
                        </h1>
                        <div className="banner-bottom-tag">MONTHLY WORKSHOP STRATEGIES</div>
                    </div>
                </header>

                {/* 5-column quest grid */}
                <div className="arcade-columns-grid">
                    {/* Card 1: Why DSA is important */}
                    <div className="arcade-card card-blue-theme">
                        <div className="card-badge badge-cyan">1</div>
                        <h3 className="card-title">WHY DSA IS IMPORTANT</h3>

                        <div className="card-visual-frame">
                            <img
                                src={devWorkstationImg}
                                alt="Developer Workstation"
                                className="pixel-card-image"
                            />
                        </div>

                        <ul className="pixel-bullet-list">
                            <li>◆ OPTIMIZED PROBLEM SOLVING</li>
                            <li>◆ TECHNICAL INTERVIEW PREP</li>
                            <li>◆ CLEANER, FASTER CODE</li>
                            <li>◆ CAREER ADVANCEMENT</li>
                        </ul>

                        <button type="button" className="pixel-btn btn-orange">
                            VIEW CASE STUDIES
                        </button>
                    </div>

                    {/* Card 2: Who can apply */}
                    <div className="arcade-card card-orange-theme">
                        <div className="card-badge badge-orange">2</div>
                        <h3 className="card-title">WHO CAN APPLY</h3>

                        <div className="card-visual-frame">
                            <img
                                src={avatarsGroupImg}
                                alt="Applicants Group"
                                className="pixel-card-image"
                            />
                        </div>

                        <ul className="pixel-bullet-list">
                            <li>• ALL MAJORS WELCOME</li>
                            <li>• CODING BEGINNERS &amp; PROS</li>
                            <li>• ASPIRING DEVELOPERS</li>
                        </ul>

                        <div className="eligibility-widget-box">
                            <div className="widget-header">
                                ELIGIBILITY CHECK
                                <span className="widget-controls">■ ✖</span>
                            </div>
                            <div className="check-row">✔ Background Check</div>
                            <div className="check-row">✔ Open Mindset</div>
                            <div className="youre-in-stamp">You're in!</div>
                        </div>
                    </div>

                    {/* Card 3: How will the session conduct */}
                    <div className="arcade-card card-cyan-theme">
                        <div className="card-badge badge-cyan">3</div>
                        <h3 className="card-title">HOW WILL THE SESSION CONDUCT</h3>

                        <div className="card-visual-frame">
                            <img
                                src={sessionConductImg}
                                alt="Live Session Conduct"
                                className="pixel-card-image"
                            />
                        </div>

                        <div className="highlight-info-banner">
                            <p>Two distinct session types each month!</p>
                            <p className="bold-gold">Bi-weekly structure: Lecture &gt; Workshop</p>
                        </div>
                    </div>

                    {/* Card 4: The monthly schedule */}
                    <div className="arcade-card card-purple-theme">
                        <div className="card-badge badge-yellow">4</div>
                        <h3 className="card-title">THE MONTHLY SCHEDULE</h3>

                        <div className="card-visual-frame">
                            <img
                                src={calendarUiImg}
                                alt="Monthly Schedule Calendar"
                                className="pixel-card-image"
                            />
                        </div>

                        <div className="schedule-meta-text">
                            <h4>TWO SESSIONS PER MONTH!</h4>
                            <p>Bi-weekly Cadence</p>
                        </div>
                    </div>

                    {/* Card 5: Apply now for the cohort */}
                    <div className="arcade-card card-red-theme highlight-cohort">
                        <div className="card-badge badge-red">5</div>
                        <h3 className="card-title">APPLY NOW FOR THE COHORT</h3>

                        <div className="apply-now-ribbon">APPLY NOW</div>

                        <div className="card-visual-frame">
                            <img
                                src={academyBuildingImg}
                                alt="Corporate Academy Building"
                                className="pixel-card-image"
                            />
                        </div>

                        <div className="progress-deadline-box">
                            <span className="deadline-label">DEADLINE APPROACHING</span>
                            <div className="progress-bar-track">
                                <div className="progress-bar-fill"></div>
                            </div>
                        </div>

                        <ul className="pixel-bullet-list">
                            <li>• LIMITED SPOTS AVAILABLE</li>
                            <li>• NEXT COHORT STARTS SOON!</li>
                        </ul>

                        <button
                            type="button"
                            className={`pixel-btn btn-green ${applied ? "applied" : ""}`}
                            onClick={handleApply}
                        >
                            {applied ? "APPLICATION SENT!" : "START APPLICATION"}
                        </button>
                    </div>
                </div>

                {/* Footer tagline and pixel stickers */}
                <div className="arcade-bottom-footer">
                    <h2 className="footer-tagline">MASTER THE SKILLS FOR A BRIGHTER FUTURE!</h2>
                    <div className="footer-pixel-stickers" aria-hidden="true">
                        <span className="sticker">🐉</span>
                        <span className="sticker">💖</span>
                        <span className="sticker">🖥️</span>
                        <span className="sticker">⚡</span>
                    </div>
                </div>
            </div>
        </section>
    );
}