import React, { useState } from "react";
import "./DsaArena.css";

export default function DsaArena() {
    const [accepted, setAccepted] = useState(false);

    const handleAcceptQuest = () => {
        setAccepted(true);
        const eventsSection = document.getElementById("events") || document.getElementById("dsa-arena-section");
        if (eventsSection) {
            eventsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="dsa-arena-section" className="quest-container">
            {/* Animated Retro Sky: Static Clouds, Moon, Stars & Mountain Silhouette */}
            <div className="pixel-sky">
                {/* Pixel Moon */}
                <div className="pixel-moon"></div>

                {/* Pixel Stars */}
                <div className="pixel-stars">
                    <div className="star star-1"></div>
                    <div className="star star-2"></div>
                    <div className="star star-3"></div>
                    <div className="star star-4"></div>
                </div>

                {/* Big Static Clouds */}
                <div className="cloud cloud-1"></div>
                <div className="cloud cloud-2"></div>
                <div className="cloud cloud-3"></div>

                {/* Parallax Mountain Range */}
                <div className="pixel-mountains">
                    <div className="mountain-layer back-mountains"></div>
                    <div className="mountain-layer front-mountains"></div>
                </div>
            </div>

            {/* Main UI Content Wrapper */}
            <div className="quest-ui-wrapper">
                {/* Top Navigation Tabs */}
                <div className="quest-top-nav">
                    <button type="button" className="nav-tab active-tab">⚔ ACTIVE QUEST</button>
                    <button type="button" className="nav-tab">⚔ CHALLENGE</button>
                    <button type="button" className="nav-tab">LEARN</button>
                    <button type="button" className="nav-tab">GROW</button>
                    <div className="heart-icons">❤️ ❤️</div>
                </div>

                {/* Main Heading */}
                <h2 className="quest-main-heading">ABOUT DSA SESSIONS</h2>

                {/* Main Quest Parchment Box */}
                <div className="quest-paper-box">
                    
                    {/* Section 1: Why DSA Matters */}
                    <div className="quest-section">
                        <div className="section-tag">🛡️ WHY DSA MATTERS</div>
                        <div className="section-content-box">
                            <p>
                                Data Structures and Algorithms (DSA) are the ultimate secret weapon for any B.Tech student, transforming you from someone who just writes code that works into an elite engineer who builds software that thrives at scale. Beyond being the golden ticket to crushing technical interviews at top tech giants, mastering DSA supercharges your brain with elite problem-solving logic and forms the bedrock for advanced fields like AI, machine learning, and high-performance system design. Ultimately, it teaches you to look past brute force and find the most elegant, lightning-fast path to solving any computational puzzle thrown your way.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Who Can Apply */}
                    <div className="quest-section">
                        <div className="section-tag">🔍 WHO CAN APPLY ??</div>
                        <div className="section-content-box center-text">
                            <p className="highlight-text">Every student with computer Science Background</p>
                        </div>
                    </div>

                    {/* Section 3: Rewards */}
                    <div className="quest-section">
                        <div className="section-tag">🏆 REWARDS</div>
                        <div className="rewards-grid">
                            <div className="reward-card gold-card">
                                <span className="reward-icon">⭐</span>
                                <div className="reward-title">+350 XP</div>
                                <div className="reward-sub">Base Reward</div>
                            </div>
                            <div className="reward-card gold-card">
                                <span className="reward-icon">🔥</span>
                                <div className="reward-title">+50 XP</div>
                                <div className="reward-sub">Streak Bonus (3d)</div>
                            </div>
                            <div className="reward-card badge-card">
                                <span className="reward-icon">🛡️</span>
                                <div className="reward-title">Tree Knight</div>
                                <div className="reward-sub">Rare Badge</div>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Notice Notes */}
                    <div className="notice-box">
                        <p>☘ Two session will be held every month.</p>
                        <p>☘ Details About every next session will be given in previous session.</p>
                        <p>☘ References and questions will be sent to prepare and compete.</p>
                    </div>

                </div>

                {/* Action Footer */}
                <div className="quest-footer">
                    <button 
                        type="button" 
                        className={`accept-quest-btn ${accepted ? "accepted" : ""}`} 
                        onClick={handleAcceptQuest}
                    >
                        ⚔ {accepted ? "QUEST JOINED!" : "ACCEPT QUEST!"}
                    </button>
                    <a href="#roadmap" className="skip-link">Skip for now</a>
                </div>
            </div>
        </section>
    );
}