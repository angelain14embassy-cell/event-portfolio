import React, { useState, useEffect, useRef } from "react";
import "./Timeline.css";

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
    } else if (type === "error") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.setValueAtTime(100, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) { }
};

export default function Timeline() {
  const [activeTab, setActiveTab] = useState("start");
  const [isLeaderboardLocked, setIsLeaderboardLocked] = useState(true);
  const [isHallOfFameLocked, setIsHallOfFameLocked] = useState(true);
  const [xp, setXp] = useState(500);
  const [showQuizModal, setShowQuizModal] = useState(true);
  const [quizState, setQuizState] = useState({ status: "question", msg: "" });
  const canvasRef = useRef(null);

  // CLOUD & SPARKLE CANVAS ENGINE
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

    const clouds = Array.from({ length: 12 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.5),
      speed: Math.random() * 0.4 + 0.2,
      scale: Math.random() * 0.6 + 0.8,
    }));

    const sparkles = Array.from({ length: 18 }, () => ({
      x: Math.random() * (width * 0.4) + width * 0.55,
      y: Math.random() * (height * 0.4) + 20,
      size: Math.random() > 0.5 ? 6 : 4,
      opacity: Math.random(),
      fadeSpeed: Math.random() * 0.02 + 0.01,
    }));

    const drawPixelCloud = (x, y, scale) => {
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.9;
      const b = 14 * scale;
      ctx.fillRect(x + b * 2, y, b * 4, b);
      ctx.fillRect(x + b, y + b, b * 6, b);
      ctx.fillRect(x, y + b * 2, b * 8, b * 1.5);
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        if (cloud.x > width + 120) cloud.x = -140;
        drawPixelCloud(cloud.x, cloud.y, cloud.scale);
      });

      sparkles.forEach((sp) => {
        sp.opacity += sp.fadeSpeed;
        if (sp.opacity >= 1 || sp.opacity <= 0.1) sp.fadeSpeed = -sp.fadeSpeed;

        ctx.fillStyle = "#fff77d";
        ctx.globalAlpha = Math.max(0, Math.min(1, sp.opacity));
        ctx.fillRect(Math.floor(sp.x), Math.floor(sp.y), sp.size, sp.size);
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleTabChange = (tabName) => {
    playAudioFX("click");
    setActiveTab(tabName);
  };

  const handleStartClick = () => {
    playAudioFX("unlock");
    setXp((prev) => prev + 500);
    setActiveTab("leaderboard");
  };

  // DSA QUIZ INTERACTION LOGIC
  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      playAudioFX("unlock");
      setXp((prev) => prev + 200);
      setQuizState({ status: "correct", msg: "🎉 Correct! +200 XP Rewarded!" });
      setTimeout(() => {
        setShowQuizModal(false);
      }, 1500);
    } else {
      playAudioFX("error");
      setQuizState({ status: "wrong", msg: "❌ Incorrect! Try Again." });
      setTimeout(() => {
        setQuizState({ status: "question", msg: "" });
      }, 1200);
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
    <div className="retro-game-viewport full-interface">
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

      {/* RETRO LOADING BAR */}
      <div className="pixel-loading-container">
        <div className="pixel-loading-bar">
          <div className="pixel-loading-fill" style={{ width: `${Math.min(100, (xp / 1000) * 100)}%` }}></div>
        </div>
        <div className="pixel-loading-text">PROGRESS LEVEL {Math.floor(xp / 500) + 1}</div>
      </div>

      {/* SCENERY CONTAINER */}
      <div className="pixel-scenery">
        <canvas ref={canvasRef} className="cloud-canvas" />

        <div className="pixel-sun-container">
          <div className="pixel-sun-rays"></div>
          <div className="pixel-sun"></div>
        </div>

        <div className="floating-os-icon cursor-pointer-1">👆</div>
        <div className="floating-os-icon game-controller-icon">🎮</div>

        {/* INTERACTIVE DSA QUIZ DIALOGUE BOX */}
        {showQuizModal && (
          <div className="pixel-warning-dialog">
            <div className="dialog-header">
              <span>❓ QUICK_DSA_QUIZ.EXE</span>
              <button className="dialog-close" onClick={() => setShowQuizModal(false)}>×</button>
            </div>
            <div className="dialog-body">
              {quizState.status === "question" && (
                <>
                  <p className="dialog-title">WORST-CASE BST SEARCH?</p>
                  <p className="dialog-desc">What is the worst-case time complexity of searching in a BST?</p>
                  <div className="dialog-buttons">
                    <button className="dialog-btn" onClick={() => handleAnswerSubmit(false)}>O(1)</button>
                    <button className="dialog-btn" onClick={() => handleAnswerSubmit(false)}>O(log N)</button>
                    <button className="dialog-btn active" onClick={() => handleAnswerSubmit(true)}>O(N)</button>
                  </div>
                </>
              )}
              {quizState.status === "correct" && (
                <p className="dialog-feedback success">{quizState.msg}</p>
              )}
              {quizState.status === "wrong" && (
                <p className="dialog-feedback error">{quizState.msg}</p>
              )}
            </div>
          </div>
        )}

        {/* PIXEL LANDSCAPE GROUND */}
        <div className="pixel-landscape-ground">
          <div className="pixel-mountains"></div>
          <div className="pixel-hills">
            <span className="pixel-flower f1">🌸</span>
            <span className="pixel-flower f2">🌺</span>
            <span className="pixel-flower f3">🌼</span>
            <span className="pixel-flower f4">🌸</span>
            <span className="pixel-flower f5">🌺</span>
          </div>
        </div>
      </div>

      {/* MAIN RETRO WINDOW CONTAINER (LANDSCAPE.EXE) */}
      <div className="pixel-controls-container">
        <div className="retro-window-header">
          <div className="window-title">
            <span className="window-icon">🖥️</span> LANDSCAPE.EXE
          </div>
          <div className="window-controls">
            <span className="win-btn">_</span>
            <span className="win-btn">□</span>
            <span className="win-btn close">×</span>
          </div>
        </div>

        <div className="pixel-nav-bar">
          <button
            className={`pixel-btn nav-btn ${activeTab === "start" ? "active" : ""}`}
            onClick={() => handleTabChange("start")}
          >
            ▶ 1. START
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

        {/* TAB 1: START SCREEN */}
        {activeTab === "start" && (
          <div className="pixel-card">
            <div className="pixel-card-header">
              <h3>🎮 ARENA READY</h3>
              <span className="pixel-badge badge-live">PRESS START</span>
            </div>

            <div className="pixel-success-box">
              <div className="start-hero-container">
                <button
                  type="button"
                  className="pixel-btn start-giant-btn"
                  onClick={handleStartClick}
                >
                  START
                </button>
              </div>
              <p className="start-hint">Click START to launch the challenge and unlock rankings (+500 XP)</p>
            </div>
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
                  setIsLeaderboardLocked(!isLeaderboardLocked);
                }}
              >
                {isLeaderboardLocked ? "🔒 LOCK: ON" : "🔓 LOCK: OFF"}
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

              {isLeaderboardLocked && (
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
              <button
                className="pixel-btn lock-btn"
                onClick={() => {
                  playAudioFX("click");
                  setIsHallOfFameLocked(!isHallOfFameLocked);
                }}
              >
                {isHallOfFameLocked ? "🔒 LOCK: ON" : "🔓 LOCK: OFF"}
              </button>
            </div>

            <div className="pixel-podium-wrapper" style={{ position: "relative" }}>
              <div className="pixel-podium-container">
                <div className="podium-card rank-2">
                  <div className="podium-crown">🥈</div>
                  <div className="podium-avatar">🧙‍♂️</div>
                  <h4>AlgoMage</h4>
                  <div className="podium-stats">8/8 SOLVED</div>
                  <span className="podium-tag tag-cyan">MASTER</span>
                </div>

                <div className="podium-card rank-1">
                  <div className="podium-crown">👑</div>
                  <div className="podium-avatar">🗡️</div>
                  <h3>PixelKnight</h3>
                  <div className="podium-stats">8/8 SOLVED (42m)</div>
                  <span className="podium-tag tag-gold">LEGENDARY</span>
                </div>

                <div className="podium-card rank-3">
                  <div className="podium-crown">🥉</div>
                  <div className="podium-avatar">🧝</div>
                  <h4>ByteRogue</h4>
                  <div className="podium-stats">7/8 SOLVED</div>
                  <span className="podium-tag tag-bronze">EXPERT</span>
                </div>
              </div>

              {isHallOfFameLocked && (
                <div className="pixel-lockdown-overlay">
                  <div className="lock-icon">🏆🔒</div>
                  <h4>HALL OF FAME LOCKED</h4>
                  <p>TOP CODERS WILL BE CROWNED AT GRAND FINALE</p>
                  <div className="countdown-badge">
                    ⏳ CONTEST IN PROGRESS
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="desktop-folder-icon" onClick={() => playAudioFX("click")}>
        <div className="folder-graphic">📁</div>
        <div className="folder-label">GELEA</div>
      </div>
    </div>
  );
}