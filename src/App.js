import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import SplashTerminal from "./components/SplashTerminal";
import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import PhotoGallery from "./components/PhotoGallery";
import Timeline from "./components/Timeline";
import DSAEvents from "./components/DSAEvents";

import "./App.css";

function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    if (showSplash) {
        return <SplashTerminal onEnter={() => setShowSplash(false)} />;
    }

    return (
        <div className="app-root">
            <Navbar />

            <main>
                {/* HOME */}
                <HomePage />

                {/* HERO / 3D SECTION */}
                <section className="hero-wrapper">
                    <div className="hero-3d-box">
                        <Hero3D />
                    </div>
                </section>

                {/* DSA LEVEL MAP */}
                <DSAEvents />

                {/* EVENT MEMORIES */}
                <section
                    className="memories-section"
                    id="memories"
                >
                    <div className="section-heading">
                        <span className="section-eyebrow">
                            EVENT MEMORIES
                        </span>

                        <h2>Moments That Matter</h2>

                        <p>
                            A glimpse into the experiences, teamwork, and
                            memories created together.
                        </p>
                    </div>

                    <PhotoGallery />
                </section>

                {/* DSA JOURNEY */}
                <Timeline />
            </main>
        </div>
    );
}

export default App;