import React, { useEffect, useRef, useState } from "react";

const timelineData = [
  {
    number: "01",
    label: "REGISTRATION",
    title: "Start Your DSA Journey",
    description:
      "Register and become a part of the ACM BV DSA Learning Series. Begin your journey towards stronger problem-solving and algorithmic thinking.",
    date: "Registration",
    button: "Register Now",
    image: "/dsa/registration.png",
    icon: "👤",
    side: "left",
  },
  {
    number: "02",
    label: "INTRODUCTORY",
    title: "DSA Introductory Session",
    description:
      "Understand the importance of Data Structures, Algorithms, complexity analysis and systematic problem solving.",
    date: "Session 01",
    button: "View Details",
    image: "/dsa/introductory.png",
    icon: "📖",
    side: "right",
  },
  {
    number: "03",
    label: "SESSION 01",
    title: "DSA Session 1",
    description:
      "Build your foundation with essential concepts, programming logic, data structures and algorithmic thinking.",
    date: "Session 02",
    button: "View Details",
    image: "/dsa/session1.png",
    icon: "💻",
    side: "left",
  },
  {
    number: "04",
    label: "SESSION 02",
    title: "DSA Session 2",
    description:
      "Move beyond the basics and explore problem-solving techniques, complexity and practical implementation.",
    date: "Session 03",
    button: "View Details",
    image: "/dsa/session2.png",
    icon: "⚡",
    side: "right",
  },
  {
    number: "05",
    label: "CHALLENGE",
    title: "DSA Challenge",
    description:
      "Put your knowledge into practice. Solve problems, compete with your peers and test your DSA skills.",
    date: "Challenge",
    button: "Participate",
    image: "/dsa/challenge.png",
    icon: "🏆",
    side: "left",
  },
  {
    number: "06",
    label: "UPCOMING",
    title: "More Events Coming",
    description:
      "Workshops, coding challenges, contests and advanced DSA sessions are coming soon. Stay connected with ACM BV.",
    date: "Coming Soon",
    button: "Stay Tuned",
    image: "/dsa/upcoming.png",
    icon: "🚀",
    side: "right",
  },
];

function Timeline() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const start = windowHeight * 0.75;
      const end = windowHeight * 0.2;

      let progress = (start - sectionTop) / (sectionHeight - start + end);

      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observers = [];

    timelineData.forEach((_, index) => {
      const element = document.getElementById(`dsa-timeline-item-${index}`);

      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((previous) => ({
                ...previous,
                [index]: true,
              }));
            }
          });
        },
        {
          threshold: 0.2,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="dsa-timeline-section"
      id="dsa-journey"
    >
      {/* Background decoration */}
      <div className="dsa-bg-circle dsa-bg-circle-one"></div>
      <div className="dsa-bg-circle dsa-bg-circle-two"></div>
      <div className="dsa-bg-circle dsa-bg-circle-three"></div>

      <div className="dsa-grid"></div>

      <div className="dsa-floating-dot dot-one"></div>
      <div className="dsa-floating-dot dot-two"></div>
      <div className="dsa-floating-dot dot-three"></div>
      <div className="dsa-floating-dot dot-four"></div>

      {/* Heading */}
      <div className="dsa-timeline-heading">
        <div className="dsa-heading-badge">ACM BV PRESENTS</div>

        <h2>
          DSA <span>Journey</span>
        </h2>

        <div className="dsa-heading-subtitle">
          <span>Learn</span>
          <b>•</b>
          <span>Practice</span>
          <b>•</b>
          <span>Compete</span>
          <b>•</b>
          <span>Grow</span>
        </div>

        <p>
          A structured learning path to strengthen your problem-solving skills
          and master Data Structures &amp; Algorithms.
        </p>
      </div>

      {/* Timeline */}
      <div className="dsa-timeline-wrapper">
        {/* SVG curved path */}
        <svg
          className="dsa-timeline-svg"
          viewBox="0 0 500 2800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Shadow path */}
          <path
            className="dsa-path-shadow"
            d="
              M250 0
              C250 180 380 250 250 420
              C120 590 120 700 250 850
              C380 1000 380 1120 250 1270
              C120 1420 120 1540 250 1690
              C380 1840 380 1960 250 2110
              C120 2260 120 2380 250 2550
              C270 2630 250 2710 250 2800
            "
          />

          {/* Animated main path */}
          <path
            className="dsa-path"
            d="
              M250 0
              C250 180 380 250 250 420
              C120 590 120 700 250 850
              C380 1000 380 1120 250 1270
              C120 1420 120 1540 250 1690
              C380 1840 380 1960 250 2110
              C120 2260 120 2380 250 2550
              C270 2630 250 2710 250 2800
            "
            style={{
              strokeDasharray: 3400,
              strokeDashoffset: 3400 - 3400 * scrollProgress,
            }}
          />
        </svg>

        {/* Timeline items */}
        <div className="dsa-timeline-items">
          {timelineData.map((item, index) => {
            const isVisible = visibleItems[index];

            return (
              <div
                id={`dsa-timeline-item-${index}`}
                className={`dsa-timeline-row ${item.side} ${
                  isVisible ? "is-visible" : ""
                }`}
                key={item.number}
              >
                {/* Card */}
                <div className="dsa-card-container">
                  <div className="dsa-card">
                    <div className="dsa-card-top">
                      <div className="dsa-number">{item.number}</div>

                      <div className="dsa-label">{item.label}</div>

                      <div className="dsa-date">{item.date}</div>
                    </div>

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                    <button
                      type="button"
                      className="dsa-card-button"
                      onClick={() => {
                        if (item.number === "01") {
                          const contact =
                            document.getElementById("contact");

                          if (contact) {
                            contact.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                        }
                      }}
                    >
                      {item.button}
                      <span>→</span>
                    </button>
                  </div>
                </div>

                {/* Timeline node */}
                <div className="dsa-node-area">
                  <div className="dsa-node-ring">
                    <div className="dsa-node">
                      <span>{item.icon}</span>
                    </div>
                  </div>

                  <div className="dsa-node-number">
                    {item.number}
                  </div>
                </div>

                {/* Image */}
                <div className="dsa-image-container">
                  <div className="dsa-image-card">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading={index > 1 ? "lazy" : "eager"}
                    />

                    <div className="dsa-image-overlay"></div>

                    <div className="dsa-image-glow"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* End point */}
        <div className="dsa-timeline-end">
          <div className="dsa-end-ring">
            <div className="dsa-end-icon">🚀</div>
          </div>

          <h3>Your DSA journey continues.</h3>

          <p>
            Keep learning. Keep practicing. Keep building.
          </p>
        </div>
      </div>

      <style>{`
        /* =====================================================
           DSA TIMELINE
           White + Light Blue + Royal Blue
        ===================================================== */

        .dsa-timeline-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 10% 15%,
              rgba(73, 145, 255, 0.16),
              transparent 24%
            ),
            radial-gradient(
              circle at 90% 70%,
              rgba(48, 125, 255, 0.12),
              transparent 28%
            ),
            linear-gradient(
              180deg,
              #ffffff 0%,
              #f5f9ff 45%,
              #ffffff 100%
            );
          color: #12213f;
          padding: 100px 20px 140px;
          min-height: 3000px;
        }

        .dsa-grid {
          position: absolute;
          inset: 0;
          opacity: 0.35;
          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(49, 117, 255, 0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(49, 117, 255, 0.045) 1px,
              transparent 1px
            );

          background-size: 48px 48px;
        }

        /* Background circles */

        .dsa-bg-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(1px);
        }

        .dsa-bg-circle-one {
          width: 360px;
          height: 360px;
          top: 80px;
          left: -180px;

          background:
            radial-gradient(
              circle at 65% 65%,
              rgba(42, 122, 255, 0.18),
              rgba(42, 122, 255, 0.03) 60%,
              transparent 70%
            );
        }

        .dsa-bg-circle-two {
          width: 320px;
          height: 320px;
          top: 1250px;
          right: -160px;

          background:
            radial-gradient(
              circle at 35% 35%,
              rgba(74, 151, 255, 0.15),
              rgba(74, 151, 255, 0.02) 62%,
              transparent 70%
            );
        }

        .dsa-bg-circle-three {
          width: 400px;
          height: 400px;
          bottom: 100px;
          left: -200px;

          background:
            radial-gradient(
              circle at 60% 40%,
              rgba(57, 132, 255, 0.12),
              transparent 68%
            );
        }

        /* Floating dots */

        .dsa-floating-dot {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #4c9cff;
          box-shadow:
            0 0 20px rgba(38, 118, 255, 0.5);
          animation: dsaFloat 5s ease-in-out infinite;
          pointer-events: none;
        }

        .dot-one {
          top: 230px;
          left: 9%;
        }

        .dot-two {
          top: 900px;
          right: 11%;
          animation-delay: 1s;
        }

        .dot-three {
          top: 1750px;
          left: 8%;
          animation-delay: 2s;
        }

        .dot-four {
          bottom: 400px;
          right: 8%;
          animation-delay: 3s;
        }

        @keyframes dsaFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-18px) scale(1.15);
          }
        }

        /* Heading */

        .dsa-timeline-heading {
          position: relative;
          z-index: 5;
          max-width: 900px;
          margin: 0 auto 90px;
          text-align: center;
        }

        .dsa-heading-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 9px 24px;

          border: 1px solid rgba(46, 113, 255, 0.35);
          border-radius: 999px;

          color: #1461e8;
          background: rgba(255, 255, 255, 0.72);

          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.8px;

          box-shadow:
            0 8px 30px rgba(37, 105, 255, 0.08);

          backdrop-filter: blur(10px);
        }

        .dsa-timeline-heading h2 {
          margin: 22px 0 8px;

          font-size: clamp(54px, 8vw, 94px);
          line-height: 0.95;

          font-weight: 800;
          letter-spacing: -4px;

          color: #101d36;
        }

        .dsa-timeline-heading h2 span {
          color: #1767f5;
          background:
            linear-gradient(
              135deg,
              #0d5cff,
              #53a6ff
            );

          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dsa-heading-subtitle {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;

          margin-top: 25px;

          color: #355078;
          font-size: 18px;
          font-weight: 700;
        }

        .dsa-heading-subtitle b {
          color: #1767f5;
          font-size: 20px;
        }

        .dsa-timeline-heading p {
          max-width: 700px;
          margin: 26px auto 0;

          color: #607795;

          font-size: 17px;
          line-height: 1.8;
        }

        /* Timeline wrapper */

        .dsa-timeline-wrapper {
          position: relative;
          max-width: 1250px;
          margin: 0 auto;
        }

        /* SVG path */

        .dsa-timeline-svg {
          position: absolute;
          top: 0;
          left: 50%;
          width: 300px;
          height: 2800px;

          transform: translateX(-50%);

          pointer-events: none;
          overflow: visible;

          z-index: 1;
        }

        .dsa-path-shadow {
          fill: none;
          stroke: rgba(36, 113, 255, 0.08);
          stroke-width: 22;
          stroke-linecap: round;
        }

        .dsa-path {
          fill: none;

          stroke: url(#dsaPathGradient);

          stroke: #1670ff;
          stroke-width: 7;
          stroke-linecap: round;

          filter:
            drop-shadow(
              0 0 8px rgba(25, 108, 255, 0.45)
            );

          transition:
            stroke-dashoffset 0.15s linear;
        }

        /* Rows */

        .dsa-timeline-items {
          position: relative;
          z-index: 3;

          display: flex;
          flex-direction: column;

          gap: 125px;
        }

        .dsa-timeline-row {
          position: relative;

          display: grid;

          grid-template-columns:
            1fr
            150px
            1fr;

          align-items: center;

          min-height: 350px;

          opacity: 0;

          transform: translateY(60px);

          transition:
            opacity 0.9s ease,
            transform 0.9s cubic-bezier(
              0.16,
              1,
              0.3,
              1
            );
        }

        .dsa-timeline-row.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .dsa-timeline-row.left
          .dsa-card-container {
          grid-column: 1;
          grid-row: 1;

          padding-right: 35px;
        }

        .dsa-timeline-row.left
          .dsa-image-container {
          grid-column: 3;
          grid-row: 1;

          padding-left: 35px;
        }

        .dsa-timeline-row.right
          .dsa-card-container {
          grid-column: 3;
          grid-row: 1;

          padding-left: 35px;
        }

        .dsa-timeline-row.right
          .dsa-image-container {
          grid-column: 1;
          grid-row: 1;

          padding-right: 35px;
        }

        /* Center */

        .dsa-node-area {
          grid-column: 2;
          grid-row: 1;

          position: relative;

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 10;
        }

        .dsa-node-ring {
          width: 82px;
          height: 82px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.9);

          border: 7px solid rgba(74, 148, 255, 0.14);

          box-shadow:
            0 15px 40px rgba(32, 103, 226, 0.15),
            inset 0 0 0 1px
              rgba(255, 255, 255, 0.9);

          backdrop-filter: blur(12px);

          animation: nodePulse 3s ease-in-out infinite;
        }

        .dsa-node {
          width: 56px;
          height: 56px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #e9f3ff
            );

          border: 3px solid #2677ff;

          box-shadow:
            0 8px 25px
              rgba(31, 111, 255, 0.28);
        }

        .dsa-node span {
          font-size: 25px;
        }

        @keyframes nodePulse {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.06);
          }
        }

        .dsa-node-number {
          position: absolute;

          bottom: -18px;
          right: 13px;

          width: 27px;
          height: 27px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #1767f5;
          color: white;

          font-size: 10px;
          font-weight: 800;

          border: 3px solid white;

          box-shadow:
            0 5px 15px
              rgba(23, 103, 245, 0.3);
        }

        /* Cards */

        .dsa-card-container {
          position: relative;
          z-index: 5;
        }

        .dsa-card {
          position: relative;

          padding: 32px;

          min-height: 280px;

          border-radius: 25px;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.96),
              rgba(244, 249, 255, 0.92)
            );

          border: 1px solid
            rgba(76, 151, 255, 0.2);

          box-shadow:
            0 20px 60px
              rgba(44, 109, 197, 0.1),
            inset 0 1px 0
              rgba(255, 255, 255, 0.95);

          backdrop-filter: blur(18px);

          overflow: hidden;

          transition:
            transform 0.45s ease,
            box-shadow 0.45s ease,
            border-color 0.45s ease;
        }

        .dsa-card::before {
          content: "";

          position: absolute;

          width: 170px;
          height: 170px;

          top: -80px;
          right: -70px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(72, 148, 255, 0.16),
              transparent 70%
            );

          pointer-events: none;
        }

        .dsa-card:hover {
          transform:
            translateY(-8px)
            rotateX(2deg)
            rotateY(-2deg);

          border-color:
            rgba(48, 126, 255, 0.4);

          box-shadow:
            0 30px 80px
              rgba(35, 109, 226, 0.17);
        }

        .dsa-card-top {
          display: flex;
          align-items: center;
          gap: 12px;

          margin-bottom: 25px;
        }

        .dsa-number {
          width: 50px;
          height: 50px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 13px;

          color: white;

          font-size: 17px;
          font-weight: 800;

          background:
            linear-gradient(
              145deg,
              #1160ff,
              #55a7ff
            );

          box-shadow:
            0 10px 25px
              rgba(26, 105, 255, 0.25);
        }

        .dsa-label {
          color: #1767f5;

          font-size: 11px;
          font-weight: 900;

          letter-spacing: 1.6px;
        }

        .dsa-date {
          margin-left: auto;

          color: #6b7f9d;

          font-size: 12px;
          font-weight: 600;
        }

        .dsa-card h3 {
          position: relative;
          z-index: 2;

          margin: 0 0 13px;

          color: #11213d;

          font-size: 27px;
          line-height: 1.2;

          font-weight: 750;
          letter-spacing: -0.7px;
        }

        .dsa-card p {
          position: relative;
          z-index: 2;

          margin: 0;

          color: #637997;

          font-size: 15px;
          line-height: 1.75;
        }

        .dsa-card-button {
          position: relative;
          z-index: 3;

          display: inline-flex;
          align-items: center;
          gap: 13px;

          margin-top: 25px;

          padding: 11px 18px;

          border: 1px solid #4a91ff;
          border-radius: 10px;

          background:
            rgba(255, 255, 255, 0.85);

          color: #1767f5;

          font-size: 13px;
          font-weight: 800;

          cursor: pointer;

          transition:
            background 0.3s ease,
            color 0.3s ease,
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .dsa-card-button span {
          font-size: 18px;
          transition: transform 0.3s ease;
        }

        .dsa-card-button:hover {
          color: white;

          background:
            linear-gradient(
              135deg,
              #1767f5,
              #4d9cff
            );

          box-shadow:
            0 10px 25px
              rgba(31, 111, 255, 0.25);

          transform: translateY(-2px);
        }

        .dsa-card-button:hover span {
          transform: translateX(4px);
        }

        /* Images */

        .dsa-image-container {
          position: relative;
          z-index: 5;
        }

        .dsa-image-card {
          position: relative;

          height: 290px;

          border-radius: 25px;

          overflow: hidden;

          background: #eaf3ff;

          border: 1px solid
            rgba(70, 143, 255, 0.25);

          box-shadow:
            0 25px 65px
              rgba(37, 105, 216, 0.14);

          transform-style: preserve-3d;

          transition:
            transform 0.5s ease,
            box-shadow 0.5s ease;
        }

        .dsa-image-card:hover {
          transform:
            perspective(1000px)
            rotateY(-4deg)
            rotateX(2deg)
            translateY(-7px);

          box-shadow:
            0 35px 80px
              rgba(31, 104, 222, 0.2);
        }

        .dsa-image-card img {
          width: 100%;
          height: 100%;

          object-fit: cover;

          display: block;

          transition:
            transform 0.8s
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );
        }

        .dsa-image-card:hover img {
          transform: scale(1.07);
        }

        .dsa-image-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              180deg,
              transparent 55%,
              rgba(10, 50, 110, 0.18)
            );

          pointer-events: none;
        }

        .dsa-image-glow {
          position: absolute;
          inset: 0;

          border-radius: inherit;

          box-shadow:
            inset 0 0 0 1px
              rgba(255, 255, 255, 0.4);

          pointer-events: none;
        }

        /* End */

        .dsa-timeline-end {
          position: relative;
          z-index: 5;

          max-width: 500px;

          margin: 130px auto 0;

          padding: 35px;

          text-align: center;

          border-radius: 25px;

          background:
            rgba(255, 255, 255, 0.85);

          border: 1px solid
            rgba(72, 145, 255, 0.2);

          box-shadow:
            0 20px 60px
              rgba(32, 103, 226, 0.1);

          backdrop-filter: blur(14px);
        }

        .dsa-end-ring {
          width: 80px;
          height: 80px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin: -75px auto 20px;

          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #e9f3ff
            );

          border: 5px solid
            rgba(49, 126, 255, 0.16);

          box-shadow:
            0 15px 40px
              rgba(37, 105, 216, 0.17);
        }

        .dsa-end-icon {
          width: 54px;
          height: 54px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #1767f5,
              #58a8ff
            );

          font-size: 24px;

          box-shadow:
            0 10px 25px
              rgba(23, 103, 245, 0.28);
        }

        .dsa-timeline-end h3 {
          margin: 0;

          color: #142443;

          font-size: 22px;
        }

        .dsa-timeline-end p {
          margin: 10px 0 0;

          color: #6b7f9d;

          font-size: 14px;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 900px) {
          .dsa-timeline-section {
            padding-left: 15px;
            padding-right: 15px;
          }

          .dsa-timeline-svg {
            left: 45px;
            width: 90px;
          }

          .dsa-timeline-items {
            gap: 80px;
          }

          .dsa-timeline-row {
            display: grid;

            grid-template-columns: 90px 1fr;

            min-height: auto;

            gap: 0;

            align-items: start;
          }

          .dsa-node-area {
            grid-column: 1;
            grid-row: 1;

            align-self: center;
          }

          .dsa-card-container,
          .dsa-image-container {
            grid-column: 2 !important;
            grid-row: auto !important;

            padding: 0 !important;

            width: 100%;
          }

          .dsa-card-container {
            margin-bottom: 20px;
          }

          .dsa-image-container {
            margin-top: 0;
          }

          .dsa-image-card {
            height: 260px;
          }

          .dsa-card {
            min-height: auto;
          }
        }

        @media (max-width: 600px) {
          .dsa-timeline-section {
            padding-top: 70px;
            padding-bottom: 100px;
          }

          .dsa-timeline-heading {
            margin-bottom: 60px;
          }

          .dsa-timeline-heading h2 {
            font-size: 55px;
            letter-spacing: -3px;
          }

          .dsa-heading-subtitle {
            gap: 8px;
            font-size: 14px;
            flex-wrap: wrap;
          }

          .dsa-timeline-heading p {
            font-size: 14px;
          }

          .dsa-timeline-svg {
            left: 35px;
            width: 70px;
          }

          .dsa-timeline-row {
            grid-template-columns: 70px 1fr;
          }

          .dsa-node-ring {
            width: 64px;
            height: 64px;
          }

          .dsa-node {
            width: 44px;
            height: 44px;
          }

          .dsa-node span {
            font-size: 19px;
          }

          .dsa-node-number {
            right: 0;
            bottom: -10px;

            width: 23px;
            height: 23px;
          }

          .dsa-card {
            padding: 22px;
            border-radius: 20px;
          }

          .dsa-card-top {
            flex-wrap: wrap;
            margin-bottom: 20px;
          }

          .dsa-date {
            width: 100%;
            margin-left: 0;
          }

          .dsa-card h3 {
            font-size: 23px;
          }

          .dsa-card p {
            font-size: 14px;
          }

          .dsa-image-card {
            height: 220px;
            border-radius: 20px;
          }

          .dsa-timeline-end {
            margin-top: 100px;
            padding: 25px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dsa-timeline-row,
          .dsa-card,
          .dsa-image-card,
          .dsa-image-card img,
          .dsa-card-button,
          .dsa-node-ring,
          .dsa-floating-dot {
            transition: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Timeline;