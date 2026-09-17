import React, { useState, useEffect } from "react";
import "./HomePage.css";

export default function HomePage() {
    const [typedCode, setTypedCode] = useState("");
    const fullCode = "while(alive) { learn_dsa(); crush_tle(); }";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setTypedCode(fullCode.slice(0, index));
            index++;
            if (index > fullCode.length) clearInterval(interval);
        }, 60);
        return () => clearInterval(interval);
    }, []);

    // Targets the newly styled DsaArena section directly
    const handleStartClick = () => {
        const arenaElement = document.getElementById("dsa-arena-section");
        if (arenaElement) {
            arenaElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="crt-screen-wrapper">
            {/* Outer CRT Glass Monitor Frame */}
            <div className="tv-frame">
                {/* Curved Glass CRT Screen */}
                <div className="crt-viewport">
                    <div className="scanline-overlay"></div>
                    <div className="vignette-overlay"></div>

                    {/* Animated Sky Background & Pixel Clouds */}
                    <div className="pixel-sky">
                        <div className="cloud cloud-1"></div>
                        <div className="cloud cloud-2"></div>
                        <div className="cloud cloud-3"></div>
                    </div>

                    {/* Top Arcade HUD Header */}
                    <div className="crt-hud">
                        <span className="hud-badge">LEVEL 01: BANASTHALI ACM</span>
                        <span className="hud-score">SCORE: 99990</span>
                    </div>

                    {/* Core Content - Giant Pixel Typography */}
                    <div className="crt-main-content">
                        <div className="tagline-pill">★ ARENA IS LIVE ★</div>

                        <h1 className="retro-blue-title">DSA SESSIONS</h1>
                        <h2 className="retro-sub-title">MASTER LOGIC & ALGORITHMS</h2>

                        {/* Interactive Terminal Line */}
                        <div className="terminal-box">
                            <span className="prompt">&gt;</span>
                            <span className="code-text">{typedCode}</span>
                            <span className="cursor">█</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="btn-group">
                            <button type="button" className="pixel-crt-btn primary" onClick={handleStartClick}>
                                ▶ PRESS START TO SOLVE
                            </button>
                            <button type="button" className="pixel-crt-btn secondary" onClick={handleStartClick}>
                                ⚙ VIEW ROADMAP
                            </button>
                        </div>
                    </div>

                    {/* Bottom Interactive Scroll Trigger */}
                    <div className="scroll-hook-footer" onClick={handleStartClick}>
                        <p>INSERT COIN OR SCROLL DOWN TO ENTER ARENA</p>
                        <div className="pixel-arrow">▼</div>
                    </div>
                </div>
            </div>
        </div>
    );
}