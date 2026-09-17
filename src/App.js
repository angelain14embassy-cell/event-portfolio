import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Hero3D from "./components/Hero3D";
import EventCard from "./components/EventCard";
import EventModal from "./components/EventModal";
import PhotoGallery from "./components/PhotoGallery";
import Timeline from "./components/Timeline";

import { acmDsaEvents } from "./data/eventsData";

import "./App.css";

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="app-root">

      {/* =========================================
          NAVBAR
      ========================================= */}
      <Navbar />

      <main>

        {/* =========================================
            HERO / 3D SECTION
        ========================================= */}
        <section className="hero-wrapper">

          <div className="hero-3d-box">
            <Hero3D />
          </div>

        </section>


        {/* =========================================
            DSA SESSIONS / EVENTS
        ========================================= */}
        <section className="events-section" id="events">

          <div className="section-heading">

            <span className="section-eyebrow">
              ACM BV
            </span>

            <h2>
              DSA Sessions &amp; Events
            </h2>

            <p>
              Explore our DSA sessions, learning experiences,
              resources and problem-solving journey.
            </p>

          </div>


          {/* =========================================
              MOVING DSA SESSION CARDS
          ========================================= */}
          <div className="dsa-marquee">

            <div className="dsa-marquee-track">

              {/* First set of cards */}
              {acmDsaEvents.map((event) => (
                <EventCard
                  key={`first-${event.id}`}
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}

              {/* Duplicate set for seamless infinite movement */}
              {acmDsaEvents.map((event) => (
                <EventCard
                  key={`second-${event.id}`}
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}

            </div>

          </div>

        </section>


        {/* =========================================
            EVENT MEMORIES
        ========================================= */}
        <section className="memories-section">

          <div className="section-heading">

            <span className="section-eyebrow">
              EVENT MEMORIES
            </span>

            <h2>
              Moments That Matter
            </h2>

            <p>
              A glimpse into the experiences,
              teamwork and memories created together.
            </p>

          </div>

          <PhotoGallery />

        </section>


        {/* =========================================
            DSA JOURNEY TIMELINE
        ========================================= */}
        <Timeline />


        {/* =========================================
            FOOTER SPACE
        ========================================= */}
        <div className="app-bottom-space"></div>

      </main>


      {/* =========================================
          EVENT MODAL
      ========================================= */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

    </div>
  );
}

export default App;


/* =================================================
   APP LEVEL STYLES
================================================= */

const style = document.createElement("style");

style.innerHTML = `

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: #f7fbff;
    color: #10213f;
    font-family:
      Inter,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  button {
    font-family: inherit;
  }

  .app-root {
    min-height: 100vh;
    background:
      radial-gradient(
        circle at 10% 10%,
        rgba(67, 153, 255, 0.10),
        transparent 28%
      ),
      radial-gradient(
        circle at 90% 30%,
        rgba(126, 194, 255, 0.10),
        transparent 30%
      ),
      #f7fbff;
    overflow-x: hidden;
  }

  .hero-wrapper {
    width: 100%;
    padding: 25px 20px 40px;
  }

  .hero-3d-box {
    width: min(1200px, 100%);
    min-height: 420px;
    margin: 0 auto;

    border-radius: 30px;

    background:
      radial-gradient(
        circle at 20% 20%,
        rgba(77, 163, 255, 0.25),
        transparent 30%
      ),
      linear-gradient(
        135deg,
        #ffffff,
        #eaf5ff
      );

    border: 1px solid rgba(56, 139, 255, 0.15);

    box-shadow:
      0 30px 80px rgba(29, 92, 170, 0.12),
      inset 0 1px 0 rgba(255,255,255,0.9);

    overflow: hidden;
  }

  .events-section,
  .memories-section {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
    padding: 90px 0;
  }

  .memories-section {
    padding-top: 50px;
  }

  .section-heading {
    text-align: center;
    max-width: 760px;
    margin: 0 auto 45px;
  }

  .section-eyebrow {
    display: inline-block;
    margin-bottom: 12px;

    color: #1769ff;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 2.5px;
  }

  .section-heading h2 {
    margin: 0;

    font-size: clamp(32px, 5vw, 52px);
    line-height: 1.05;

    color: #0e1b35;
    letter-spacing: -1.5px;
  }

  .section-heading p {
    margin: 18px auto 0;

    max-width: 650px;

    color: #61708a;
    font-size: 16px;
    line-height: 1.7;
  }

  .app-bottom-space {
    height: 100px;
  }

  @media (max-width: 700px) {

    .hero-wrapper {
      padding: 15px 12px 30px;
    }

    .hero-3d-box {
      min-height: 350px;
      border-radius: 22px;
    }

    .events-section,
    .memories-section {
      width: min(
        100% - 24px,
        1200px
      );

      padding: 60px 0;
    }

    .section-heading h2 {
      font-size: 34px;
    }

    .section-heading p {
      font-size: 14px;
    }

  }

`;

document.head.appendChild(style);