import React, { useState, useEffect } from "react";

import HomePage from "./components/HomePage";
import DsaArena from "./components/DsaArena";
import SplashTerminal from "./components/SplashTerminal";
import Navbar from "./components/Navbar";
import PhotoGallery from "./components/PhotoGallery";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer/Footer";

import "./App.css";

function App() {
    const [showSplash, setShowSplash] =
        useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    if (showSplash) {
        return (
            <SplashTerminal
                onEnter={() =>
                    setShowSplash(false)
                }
            />
        );
    }

    return (
        <div className="app-root">
            <Navbar />

            <main>
                {/* HOME */}
                <HomePage />

                {/* DSA LEVEL MAP + POPUPS */}
                <DsaArena />

                {/* EVENT MEMORIES */}
                <section className="memories-section">
                    <div className="section-heading">
                        <span className="section-eyebrow">
                            EVENT MEMORIES
                        </span>

                        <h2>
                            Moments That Matter
                        </h2>

                        <p>
                            A glimpse into the
                            experiences, teamwork,
                            and memories created
                            together.
                        </p>
                    </div>

                    <PhotoGallery />
                </section>

                {/* DSA JOURNEY */}
                <Timeline />
            </main>

            <Footer />
        </div>
    );
}

export default App;