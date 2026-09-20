import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import DsaAbout from "./components/DsaAbout";
import DsaArena from "./components/DsaArena";
import SplashTerminal from "./components/SplashTerminal";
import Navbar from "./components/Navbar";

import PhotoGallery from "./components/PhotoGallery";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
    const [showSplash, setShowSplash] = useState(true);

    // Auto-skip retro terminal after 15 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    // If splash is active, render retro search screen
    if (showSplash) {
        return <SplashTerminal onEnter={() => setShowSplash(false)} />;
    }

    return (
        <div className="app-root">
            <Navbar />

            <main>
                {/* CRT HERO HOMEPAGE */}
                <HomePage />

                {/* DSA ABOUT PAGE (Added here!) */}
                <DsaAbout />

                {/* DSA ARENA / GAME STAGES SECTION */}
                <DsaArena />

                {/* EVENT MEMORIES */}
                <section className="memories-section">
                    <div className="section-heading">
                        <span className="section-eyebrow">EVENT MEMORIES</span>
                        <h2>Moments That Matter</h2>
                        <p>
                            A glimpse into the experiences, teamwork, and memories created together.
                        </p>
                    </div>
                    <PhotoGallery />
                </section>

                {/* DSA JOURNEY TIMELINE */}
                <Timeline />
            </main>

            <Footer />
        </div>
    );
}

export default App;