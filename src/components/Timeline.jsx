import React, { useState, useEffect, useRef } from "react";
import "./Timeline.css";

// ⚠️ REPLACE WITH YOUR ACTUAL GOOGLE FORM ENDPOINT & ENTRY IDs
const GOOGLE_FORM_ACTION_URL =
  "hhttps://docs.google.com/forms/d/e/1FAIpQLSeEDAeJrfCPgfT941mnLNmxjvDj0yanmyGghXDnZCOANU8Sdw/viewform";

const FORM_FIELD_IDS = {
  fullName: "entry.123456789",
  collegeEmail: "entry.987654321",
  handle: "entry.456789012",
  playerClass: "entry.789012345",
};

// Retro Web Audio Synthesizer
const playAudioFX = (type) => {
  if (typeof window === "undefined") return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;

  try {
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "click") {
      osc.type = "square";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === "unlock") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) { }
};

export default function Timeline() {
  const [activeTab, setActiveTab] = useState("registration");
  const [isLocked, setIsLocked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [xp, setXp] = useState(0);

  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    collegeEmail: "",
    handle: "",
    playerClass: "Array Warrior",
  });

  // FALLING STARS & NIGHT SKY CANVAS ENGINE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate falling stars
    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() > 0.7 ? 4 : 2,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: Math.random() * 0.4 - 0.2,
      color: ["#ffffff", "#ffcc00", "#00ffff", "#ff69b4"][Math.floor(Math.random() * 4)],
      opacity: Math.random() * 0.8 + 0.2,
    }));

    // Shooting star state
    let shootingStar = null;
    const createShootingStar = () => {
      if (Math.random() < 0.02 && !shootingStar) {
        shootingStar = {
          x: Math.random() * width,
          y: Math.random() * (height / 2),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 10 + 6,
          opacity: 1,
        };
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Pixel Falling Stars
      stars.forEach((star) => {
        star.y += star.speedY;
        star.x += star.speedX;

        if (star.y > height) {
          star.y = -10;
          star.x = Math.random() * width;
        }

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.opacity;
        ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
      });

      // Draw Shooting Star
      createShootingStar();
      if (shootingStar) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.globalAlpha = shootingStar.opacity;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.length, shootingStar.y + shootingStar.length / 2);
        ctx.stroke();

        shootingStar.x += shootingStar.speed;
        shootingStar.y += shootingStar.speed / 2;
        shootingStar.opacity -= 0.02;

        if (shootingStar.opacity <= 0 || shootingStar.x > width) {
          shootingStar = null;
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (tabName) => {
    playAudioFX("click");
    setActiveTab(tabName);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.collegeEmail) return;

    setIsSubmitting(true);

    const formPayload = new FormData();
    formPayload.append(FORM_FIELD_IDS.fullName, formData.fullName);
    formPayload.append(FORM_FIELD_IDS.collegeEmail, formData.collegeEmail);
    formPayload.append(FORM_FIELD_IDS.handle, formData.handle);
    formPayload.append(FORM_FIELD_IDS.playerClass, formData.playerClass);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formPayload,
      });
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
      setIsRegistered(true);
      setXp(500);
      playAudioFX("unlock");
    }
  };

  const leaderboardData = [
    { rank: 1, name: "PixelKnight", solved: "8/8", score: "2450 pts", time: "42m 10s", avatar: "🗡️" },
    { rank: 2, name: "AlgoMage", solved: "8/8", score: "2380 pts", time: "48m 35s", avatar: "🧙‍♂️" },
    { rank: 3, name: "ByteRogue", solved: "7/8", score: "2100 pts", time: "55m 02s", avatar: "🧝" },
    { rank: 4, name: "CodeArcher", solved: "7/8", score: "1980 pts", time: "59m 40s", avatar: "🏹" },
    { rank: 5, name: "StackPaladin", solved: "6/8", score: "1750 pts", time: "61m 15s", avatar: "🛡️" },
  ];

  return (
    <div className="retro-game-viewport">
      {/* HUD OVERLAY */}
      <div className="pixel-hud">
        <div className="hud-hearts">
          <span>❤️</span><span>❤️</span><span>❤️</span>
        </div>
        <div className="hud-title">BANASTHALI DSA QUEST</div>
        <div className="hud-xp">
          🪙 XP: {xp.toString().padStart(5, "0")}
        </div>
      </div>

      {/* NIGHT SKY SCENERY WITH FALLING STARS & AIRPLANES */}
      <div className="pixel-scenery">
        <canvas ref={canvasRef} className="star-canvas" />

        {/* MOON */}
        <div className="pixel-moon">🌙</div>

        {/* WELCOME BANNER */}
        <div className="pixel-welcome-sign">
          <div className="sign-title">WELCOME</div>
          <div className="sign-subtitle">TO DSA CODING ARENA</div>
        </div>

        {/* FLYING AIRPLANES WITH VAPOR TRAILS */}
        <div className="pixel-sky-traffic">
          <div className="pixel-airplane plane-high">
            <span className="vapor-trail"></span>
            ✈️
          </div>
          <div className="pixel-airplane plane-mid">
            <span className="vapor-trail"></span>
            🛫
          </div>
          <div className="pixel-airplane plane-low">
            <span className="vapor-trail"></span>
            🛩️
          </div>
        </div>

        {/* PIXEL SKYLINE GRID */}
        <div className="pixel-horizon"></div>
      </div>

      {/* PIXEL TAB CONTROL PANEL */}
      <div className="pixel-controls-container">
        <div className="pixel-nav-bar">
          <button
            className={`pixel-btn nav-btn ${activeTab === "registration" ? "active" : ""}`}
            onClick={() => handleTabChange("registration")}
          >
            📜 1. REGISTER
          </button>
          <button
            className={`pixel-btn nav-btn ${activeTab === "leaderboard" ? "active" : ""}`}
            onClick={() => handleTabChange("leaderboard")}
          >
            ⚔️ 2. LEADERBOARD
          </button>
          <button
            className={`pixel-btn nav-btn ${activeTab === "halloffame" ? "active" : ""}`}
            onClick={() => handleTabChange("halloffame")}
          >
            🏆 3. HALL OF FAME
          </button>
        </div>

        {/* TAB 1: REGISTRATION CARD */}
        {activeTab === "registration" && (
          <div className="pixel-card">
            <div className="pixel-card-header">
              <h3>📜 PLAYER REGISTRATION</h3>
              <span className="pixel-badge badge-live">EVENT LIVE</span>
            </div>

            {!isRegistered ? (
              <form onSubmit={handleRegisterSubmit} className="pixel-form">
                <div className="pixel-field">
                  <label>FULL NAME / PLAYER NAME:</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Aditi Sharma"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pixel-input"
                  />
                </div>

                <div className="pixel-field">
                  <label>COLLEGE EMAIL:</label>
                  <input
                    type="email"
                    name="collegeEmail"
                    required
                    placeholder="student@banasthali.in"
                    value={formData.collegeEmail}
                    onChange={handleInputChange}
                    className="pixel-input"
                  />
                </div>

                <div className="pixel-grid">
                  <div className="pixel-field">
                    <label>LEETCODE HANDLE:</label>
                    <input
                      type="text"
                      name="handle"
                      placeholder="e.g. cyber_coder99"
                      value={formData.handle}
                      onChange={handleInputChange}
                      className="pixel-input"
                    />
                  </div>

                  <div className="pixel-field">
                    <label>PLAYER CLASS:</label>
                    <select
                      name="playerClass"
                      value={formData.playerClass}
                      onChange={handleInputChange}
                      className="pixel-input"
                    >
                      <option value="Array Warrior">⚔️ Array Warrior</option>
                      <option value="DP Wizard">🧙 DP Wizard</option>
                      <option value="Graph Hacker">👾 Graph Hacker</option>
                      <option value="Recursion Rogue">🗡️ Recursion Rogue</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="pixel-btn submit-btn"
                >
                  {isSubmitting ? "SAVING TO QUEST LOG..." : "💖 JOIN THE CONTEST (+500 XP)"}
                </button>
              </form>
            ) : (
              <div className="pixel-success-box">
                <div className="success-icon">🪙</div>
                <h3>REGISTRATION COMPLETE!</h3>
                <p>
                  Player <b>{formData.fullName.toUpperCase()}</b> [{formData.playerClass}] joined the quest database!
                </p>
                <div className="xp-claimed">+500 STARTER XP CLAIMED!</div>
                <button
                  className="pixel-btn nav-btn active"
                  onClick={() => handleTabChange("leaderboard")}
                >
                  GO TO LEADERBOARD ▶
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LEADERBOARD VIEW */}
        {activeTab === "leaderboard" && (
          <div className="pixel-card">
            <div className="pixel-card-header">
              <h3>⚔️ CONTEST LEADERBOARD</h3>
              <button
                className="pixel-btn lock-btn"
                onClick={() => {
                  playAudioFX("click");
                  setIsLocked(!isLocked);
                }}
              >
                {isLocked ? "🔒 LOCK: ON" : "🔓 LOCK: OFF"}
              </button>
            </div>

            <div className="pixel-table-wrapper">
              <table className="pixel-table">
                <thead>
                  <tr>
                    <th>RANK</th>
                    <th>PLAYER</th>
                    <th>SOLVED</th>
                    <th>SCORE</th>
                    <th>TIME</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((row) => (
                    <tr key={row.rank}>
                      <td className="rank-cell">#{row.rank}</td>
                      <td>{row.avatar} {row.name}</td>
                      <td className="solved-cell">{row.solved}</td>
                      <td className="score-cell">{row.score}</td>
                      <td className="time-cell">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* FROSTED GLASS LOCKDOWN OVERLAY */}
              {isLocked && (
                <div className="pixel-lockdown-overlay">
                  <div className="lock-icon">🔒</div>
                  <h4>LEADERBOARD FROZEN</h4>
                  <p>FINAL RESULTS PENDING VERIFICATION</p>
                  <div className="countdown-badge">
                    ⏳ 01:23:45 UNTIL REVEAL
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: HALL OF FAME PODIUM */}
        {activeTab === "halloffame" && (
          <div className="pixel-card">
            <div className="pixel-card-header">
              <h3>🏆 HALL OF FAME</h3>
              <span className="pixel-badge badge-live">TOP PLAYERS</span>
            </div>

            <div className="pixel-podium-container">
              {/* 2ND PLACE (LEFT) */}
              <div className="podium-card rank-2">
                <div className="podium-crown">🥈</div>
                <div className="podium-avatar">🧙‍♂️</div>
                <h4>AlgoMage</h4>
                <div className="podium-stats">8/8 SOLVED</div>
                <span className="podium-tag tag-cyan">MASTER</span>
              </div>

              {/* 1ST PLACE (CENTER) */}
              <div className="podium-card rank-1">
                <div className="podium-crown">👑</div>
                <div className="podium-avatar">🗡️</div>
                <h3>PixelKnight</h3>
                <div className="podium-stats">8/8 SOLVED (42m)</div>
                <span className="podium-tag tag-gold">LEGENDARY</span>
              </div>

              {/* 3RD PLACE (RIGHT) */}
              <div className="podium-card rank-3">
                <div className="podium-crown">🥉</div>
                <div className="podium-avatar">🧝</div>
                <h4>ByteRogue</h4>
                <div className="podium-stats">7/8 SOLVED</div>
                <span className="podium-tag tag-bronze">EXPERT</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}