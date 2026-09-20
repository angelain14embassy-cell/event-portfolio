import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import DsaAbout from "./components/DsaAbout";
import DsaArena from "./components/DsaArena";
import DSAEvents from "./components/DSAEvents";
import SplashTerminal from "./components/SplashTerminal";
import Navbar from "./components/Navbar";
import EventCard from "./components/EventCard";
import EventModal from "./components/EventModal";
import PhotoGallery from "./components/PhotoGallery";
import Timeline from "./components/Timeline";
import Footer from './components/Footer/Footer';

import { acmDsaEvents, categories } from "./data/eventsData";
import "./App.css";

function App() {
    const [showSplash, setShowSplash] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Auto-skip retro terminal after 15 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    const filteredEvents = acmDsaEvents.filter(
        (event) => activeCategory === "All" || event.category === activeCategory
    );

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

                {/* DSA ARENA / GAME STAGES SECTION */}
                <DsaArena />

                {/* ACM SESSIONS / EVENTS */}
                <section className="events-section">
                    <div className="section-heading">
                        <span className="section-eyebrow">ACM BV</span>
                        <h2>ACM Sessions & Events</h2>
                        <p>
                            Explore our technical sessions, workshops, challenges, and learning experiences.
                        </p>
                    </div>

                    <div className="category-filter">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className={
                                    activeCategory === category
                                        ? "category-btn active"
                                        : "category-btn"
                                }
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="events-grid">
                        {filteredEvents.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                onClick={() => setSelectedEvent(event)}
                            />
                        ))}
                    </div>
                </section>

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

            {/* EVENT MODAL */}
            <EventModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </div>
    );
}

export default App;