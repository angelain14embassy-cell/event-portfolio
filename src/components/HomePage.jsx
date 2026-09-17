import React from "react";

export default function HomePage() {
    return (
        <div className="game-hero-container">
            {/* Top Arcade HUD Header */}
            <div className="arcade-hud">
                <div className="hud-left">HP: UI/UX LEVEL 03</div>
                <div className="hud-right">PLAYER 01</div>
            </div>

            {/* Main Arcade Frame */}
            <div className="arcade-window">
                <h2 className="year-title">2026</h2>
                <h1 className="portfolio-title">PORTFOLIO</h1>

                <div className="start-btn-wrapper">
                    <button
                        type="button"
                        className="arcade-start-btn"
                        onClick={() => {
                            const gallery = document.getElementById("photo-gallery-section");
                            if (gallery) gallery.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        START
                    </button>
                </div>
            </div>

            {/* Decorative Bottom Bar */}
            <div className="arcade-bottom-bar">
                <span>★ ABOUT ME</span>
                <span>★ PROJECTS</span>
                <span>★ SKILLS</span>
                <span>★ CONTACT</span>
            </div>
        </div>
    );
}