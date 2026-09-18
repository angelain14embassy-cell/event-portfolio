import React, { useState, useEffect, useRef } from "react";

export default function SplashTerminal({ onEnter }) {
    const [showDeck, setShowDeck] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState(-1);
    const canvasRef = useRef(null);

    // Canvas Stage: Sequential Target Spotlight + Blue/White Jump Scare + Error Loading
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animId;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Dynamic Matrix text sampler for "DSA SESSION \n BY ACM BV"
        const generateMatrixText = () => {
            const offCanvas = document.createElement("canvas");
            const offCtx = offCanvas.getContext("2d");
            offCanvas.width = width;
            offCanvas.height = height;

            const targetWidth = width * 0.85;
            let fontSize = 110;
            offCtx.font = `900 ${fontSize}px "Courier New", monospace`;
            let textWidth = offCtx.measureText("DSA SESSION").width;

            fontSize = Math.floor(fontSize * (targetWidth / textWidth));
            fontSize = Math.min(Math.max(fontSize, 36), 160);

            offCtx.fillStyle = "#000";
            offCtx.font = `900 ${fontSize}px "Courier New", monospace`;
            offCtx.textAlign = "center";
            offCtx.textBaseline = "middle";

            const subFontSize = Math.floor(fontSize * 0.38);

            // Render Title & Subtitle onto offline mask
            offCtx.fillText("DSA SESSION", width / 2, height / 2 - fontSize * 0.3);
            offCtx.font = `900 ${subFontSize}px "Courier New", monospace`;
            offCtx.fillText("BY ACM BV", width / 2, height / 2 + fontSize * 0.5);

            const imgData = offCtx.getImageData(0, 0, width, height).data;
            const points = [];
            const step = Math.max(4, Math.floor(fontSize / 24));

            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    if (imgData[(y * width + x) * 4 + 3] > 128) {
                        points.push({
                            x: x - width / 2,
                            y: y - height / 2,
                            size: step - 1,
                        });
                    }
                }
            }
            return points;
        };

        const targets = generateMatrixText();
        const particles = targets.map((t) => ({
            x: (Math.random() - 0.5) * width * 1.5,
            y: (Math.random() - 0.5) * height * 1.5,
            tx: t.x,
            ty: t.y,
            size: t.size,
        }));

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        const startTime = Date.now();
        let glitchStarted = false;

        const render = () => {
            const elapsed = (Date.now() - startTime) / 1000;
            const cx = width / 2;
            const cy = height / 2;

            // Keep the spotlight stage dark until the error transition.
            ctx.fillStyle = "#02040a";
            ctx.fillRect(0, 0, width, height);

            // --- Precise Spotlight Beam Coordinates ---
            let spotlightX = cx;
            let spotlightY = cy;
            const spotRadius = Math.min(width, height) * 0.26; // Generous beam size to clearly show words

            if (elapsed < 2.2) {
                // Step 1: Move to & reveal "SESSION" (Right side)
                const progress = Math.min(1, elapsed / 2.2);
                spotlightX = cx + width * 0.22 * progress;
                spotlightY = cy - height * 0.1;
            } else if (elapsed < 4.8) {
                // Step 2: Smoothly sweep to & reveal "DSA" (Left side)
                const progress = (elapsed - 2.2) / 2.6;
                spotlightX = (cx + width * 0.22) - (width * 0.44 * progress);
                spotlightY = cy - height * 0.1;
            } else if (elapsed < 6.8) {
                // Step 3: Move down to & reveal "BY ACM BV" (Center bottom)
                const progress = (elapsed - 4.8) / 2.0;
                spotlightX = (cx - width * 0.22) + (width * 0.22 * progress);
                spotlightY = (cy - height * 0.1) + (height * 0.25 * progress);
            } else if (elapsed >= 6.8 && !glitchStarted) {
                // Trigger Blue/White Jump-Scare Glitch Exit
                glitchStarted = true;
                setTimeout(() => setShowDeck(true), 600); // 0.6s glitch duration
            }

            // Render Spotlight Glow Beam
            const lightGrad = ctx.createRadialGradient(
                spotlightX, spotlightY, 10,
                spotlightX, spotlightY, spotRadius * 1.4
            );
            lightGrad.addColorStop(0, "rgba(0, 213, 255, 0.5)");
            lightGrad.addColorStop(0.5, "rgba(0, 68, 255, 0.2)");
            lightGrad.addColorStop(1, "rgba(2, 4, 10, 0)");

            ctx.fillStyle = lightGrad;
            ctx.beginPath();
            ctx.arc(spotlightX, spotlightY, spotRadius * 1.4, 0, Math.PI * 2);
            ctx.fill();

            // --- Blue & White Glitch Jump-Scare Screen Shake ---
            const isGlitchFrame = glitchStarted && Math.random() > 0.2;
            const glitchOffsetX = isGlitchFrame ? (Math.random() - 0.5) * 60 : 0;
            const glitchOffsetY = isGlitchFrame ? (Math.random() - 0.5) * 60 : 0;

            if (isGlitchFrame) {
                // Blue and White theme high-speed flash screen
                ctx.fillStyle = Math.random() > 0.4 ? "#0044ff" : "#ffffff";
                ctx.fillRect(0, 0, width, height);
            }

            // Render Matrix Pixel Particles inside beam
            particles.forEach((p) => {
                p.x += (p.tx - p.x) * 0.12;
                p.y += (p.ty - p.y) * 0.12;

                const drawX = p.x + cx + glitchOffsetX;
                const drawY = p.y + cy + glitchOffsetY;

                const dx = drawX - spotlightX;
                const dy = drawY - spotlightY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < spotRadius || isGlitchFrame) {
                    const intensity = Math.max(0.1, 1 - dist / spotRadius);
                    ctx.globalAlpha = isGlitchFrame ? 1.0 : intensity;

                    ctx.fillStyle = isGlitchFrame ? "#001a66" : "#00d5ff";
                    ctx.fillRect(drawX - p.size / 2, drawY - p.size / 2, p.size, p.size);
                }
            });

            // --- Render "ERROR LOADING..." overlay during glitch jump scare ---
            if (glitchStarted) {
                ctx.globalAlpha = 1.0;
                ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#00d5ff";
                ctx.font = '900 36px "Courier New", monospace';
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(
                    "ERROR LOADING...",
                    cx + (Math.random() - 0.5) * 30,
                    cy + (Math.random() - 0.5) * 30
                );
            }

            ctx.globalAlpha = 1.0;

            if (!showDeck) {
                animId = requestAnimationFrame(render);
            }
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animId);
        };
    }, [showDeck]);

    // Deck flipping card sequence after Glitch transition
    useEffect(() => {
        if (!showDeck) return;

        const timer1 = setTimeout(() => setActiveCardIndex(0), 300);
        const timer2 = setTimeout(() => setActiveCardIndex(1), 1800);
        const timer3 = setTimeout(() => setActiveCardIndex(2), 3300);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [showDeck]);

    const cards = [
        {
            title: "PROMPT_01.EXE",
            type: "statement",
            content: "WHAT IF YOU COULD DEBUG YOUR CODE EFFORTLESSLY?",
            footer: "ACM BV // DSA SESSION 2026",
        },
        {
            title: "RECURSION_QUERY.LOG",
            type: "statement",
            content: "HOW TO SOLVE RECURSION WITHOUT STACK OVERFLOW?",
            footer: "TOPIC: DATA STRUCTURES & ALGORITHMS",
        },
        {
            title: "LOGIC_CORE.JS",
            type: "code",
            content: (
                <div className="card-code-block">
                    <code>
                        <span className="keyword">if</span> (life.gives(
                        <span className="str">"bugs"</span>)) &#123;
                        <br />
                        &nbsp;&nbsp;<span className="fn">debug</span>();
                        <br />
                        &#125; <span className="keyword">else</span> &#123;
                        <br />
                        &nbsp;&nbsp;<span className="fn">keep_coding</span>();
                        <br />
                        &#125;
                    </code>
                </div>
            ),
            footer: "// READY TO ENTER SESSION PORTAL",
        },
    ];

    return (
        <div
            className={`splash-container ${showDeck ? "error-complete" : ""}`}
            style={{ backgroundColor: showDeck ? "#ffffff" : "#02040a" }}
        >
            {!showDeck && <canvas ref={canvasRef} className="globe-canvas" />}

            {/* Retro Deck Container popping cards like a stack */}
            {showDeck && (
                <div className="retro-deck-wrapper">
                    {cards.map((card, idx) => {
                        let cardClass = "";
                        if (activeCardIndex === idx) cardClass = "active";
                        else if (activeCardIndex > idx && idx === activeCardIndex - 1) cardClass = "stacked-1";
                        else if (activeCardIndex > idx && idx === activeCardIndex - 2) cardClass = "stacked-2";

                        return (
                            <div key={card.title} className={`retro-card ${cardClass}`}>
                                <div className="retro-card-titlebar">
                                    <span>{card.title}</span>
                                    <div className="retro-window-controls">
                                        <span className="pixel-control-btn">_</span>
                                        <span className="pixel-control-btn">□</span>
                                        <span className="pixel-control-btn">×</span>
                                    </div>
                                </div>

                                <div className="retro-card-body">
                                    {card.type === "statement" ? (
                                        <h2 className="card-statement">{card.content}</h2>
                                    ) : (
                                        card.content
                                    )}
                                    <div className="card-footer-info">{card.footer}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Persistent CTA Button */}
            <div
                className="enter-btn-wrap"
                style={{
                    opacity: activeCardIndex >= 2 ? 1 : 0.85,
                }}
            >
                <button type="button" className="uniqode-btn" onClick={onEnter}>
                    ENTER PORTFOLIO →
                </button>
            </div>
        </div>
    );
}