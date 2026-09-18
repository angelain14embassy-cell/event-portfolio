// src/components/Timeline.jsx
import React, { useState, useEffect } from "react";
import "./Timeline.css";

const STATIONS = [
  { id: "register", x: 18, name: "REGISTER.EXE", icon: "📜", label: "Registration Scroll" },
  { id: "quests", x: 42, name: "DSA_QUESTS", icon: "⚔️", label: "DSA Arena Dungeon" },
  { id: "resources", x: 66, name: "RESOURCES", icon: "📁", label: "Knowledge Chest" },
  { id: "prizes", x: 88, name: "PRIZES.DAT", icon: "🎁", label: "Mystery Loot Box" },
];

const DSA_QUESTS = [
  {
    id: 1,
    title: "Array Dungeon: Two Sum",
    difficulty: "EASY",
    exp: "100 XP",
    icon: "🗡️",
    platform: "Internal Challenge",
    desc: "Find two numbers in an array that add up to a target value.",
  },
  {
    id: 2,
    title: "Stack Citadel: Valid Parentheses",
    difficulty: "EASY",
    exp: "120 XP",
    icon: "🛡️",
    platform: "Internal Challenge",
    desc: "Verify if character brackets inside strings are balanced correctly.",
  },
  {
    id: 3,
    title: "Tree Boss: Invert Binary Tree",
    difficulty: "MEDIUM",
    exp: "250 XP",
    icon: "🌲",
    platform: "Internal Challenge",
    desc: "Flip a binary tree horizontally so all left children become right children.",
  },
  {
    id: 4,
    title: "Graph Realm: Shortest Path",
    difficulty: "HARD",
    exp: "500 XP",
    icon: "👑",
    platform: "Internal Challenge",
    desc: "Calculate minimum cost routing using Dijkstra's shortest path algorithm.",
  },
];

const RESOURCE_CHESTS = [
  { id: 1, title: "Strivers A2Z DSA Sheet", icon: "📜", desc: "Complete Topic-wise Roadmap PDF" },
  { id: 2, title: "NeetCode Practice Map", icon: "🗺️", desc: "150 Handpicked Array & Tree Problems" },
  { id: 3, title: "Competitive Programming Handbook", icon: "📚", desc: "Core Algorithms & Data Structures Guide" },
];

export default function Timeline() {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeWindow, setActiveWindow] = useState(null); // 'register' | 'quests' | 'resources' | 'prizes'
  const [coins, setCoins] = useState(305);
  const [selectedQuest, setSelectedQuest] = useState(DSA_QUESTS[0]);

  // Interactive Walk Position State
  const [characterX, setCharacterX] = useState(10);
  const [facing, setFacing] = useState("right");
  const [nearStation, setNearStation] = useState(null);

  // Retro Web Audio SFX Generator
  const playRetroSound = (freq = 440, type = "sine") => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Audio context fallbacks
    }
  };

  // Keyboard Movement & Interaction Controls (Arrow keys & 'E')
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || activeWindow) return;

      if (e.key === "ArrowLeft" || e.key === "a") {
        moveHero("left");
      } else if (e.key === "ArrowRight" || e.key === "d") {
        moveHero("right");
      } else if ((e.key === "e" || e.key === "E" || e.key === " ") && nearStation) {
        handleOpenWindow(nearStation.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, activeWindow, nearStation, characterX]);

  // Check proximity to stations whenever position changes
  useEffect(() => {
    const matched = STATIONS.find((st) => Math.abs(st.x - characterX) < 6);
    if (matched && matched !== nearStation) {
      playRetroSound(700, "triangle");
      setNearStation(matched);
    } else if (!matched && nearStation) {
      setNearStation(null);
    }
  }, [characterX, nearStation]);

  const moveHero = (direction) => {
    playRetroSound(220, "sawtooth");
    setFacing(direction);
    setCharacterX((prev) => {
      if (direction === "left") return Math.max(4, prev - 4);
      if (direction === "right") return Math.min(94, prev + 4);
      return prev;
    });
  };

  const handleStartGame = () => {
    playRetroSound(880, "square");
    setGameStarted(true);
  };

  const handleOpenWindow = (winType) => {
    playRetroSound(520, "triangle");
    setActiveWindow(winType);
  };

  const handleCloseWindow = () => {
    playRetroSound(300, "sawtooth");
    setActiveWindow(null);
  };

  const handleGainCoins = () => {
    playRetroSound(987, "square");
    setCoins((prev) => prev + 50);
  };

  return (
    <div className="retro-os-wrapper">
      {/* Top Menu Status Bar */}
      <div className="os-top-bar">
        <div className="os-title">
          <span className="os-icon">🕹️</span> BANASTHALI ACM CHAPTER - DSA ARENA 2026
        </div>
        <div className="os-stats">
          <button type="button" className="coin-badge-btn" onClick={handleGainCoins}>
            🪙 {coins} COINS <span className="add-hint">(+50)</span>
          </button>
          <span className="os-time">16:23 PM</span>
        </div>
      </div>

      {/* Retro Canvas Monitor Viewport */}
      <div className="retro-monitor">
        <div className="landscape-screen">
          <div className="sky-gradient">
            <div className="loading-bar-container">
              <span className="loading-text">LOADING LANDSCAPE.EXE...</span>
              <div className="loading-bar">
                <div className="loading-fill"></div>
              </div>
            </div>
          </div>

          <div className="window-app-title">LANDSCAPE.EXE ✖</div>

          {/* START OVERLAY */}
          {!gameStarted ? (
            <div className="start-modal-card">
              <div className="start-banner-glow">DSA CHALLENGERS 2026</div>
              <p className="start-subtext">WALK YOUR HERO TO INTERACT WITH STATIONS</p>
              <button
                type="button"
                className="pixel-start-btn"
                onClick={handleStartGame}
              >
                ▶ START GAME
              </button>
            </div>
          ) : (
            /* DESKTOP TOP QUICK-LAUNCH ICONS */
            <div className="desktop-icons-container">
              {STATIONS.map((st) => (
                <button
                  key={st.id}
                  type="button"
                  className="desktop-icon"
                  onClick={() => handleOpenWindow(st.id)}
                >
                  <div className="icon-frame">{st.icon}</div>
                  <span>{st.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* CONTROLS OVERLAY & PROXIMITY ACTION BAR */}
          {gameStarted && (
            <div className="game-hud-bar">
              <div className="dpad-controls">
                <span className="hud-label">CONTROLS:</span>
                <button type="button" onClick={() => moveHero("left")}>◀ LEFT [A]</button>
                <button type="button" onClick={() => moveHero("right")}>RIGHT [D] ▶</button>
              </div>

              {nearStation ? (
                <button
                  type="button"
                  className="interact-prompt-btn pulse"
                  onClick={() => handleOpenWindow(nearStation.id)}
                >
                  ⚡ PRESS [E] TO OPEN {nearStation.name}
                </button>
              ) : (
                <span className="walk-hint-text">WALK NEAR A CHEST/STATION TO OPEN IT</span>
              )}
            </div>
          )}

          {/* BACKGROUND MOUNTAINS */}
          <div className="pixel-mountain-bg"></div>

          {/* GRASS FLOOR WITH INTERACTIVE STATIONS & HERO */}
          <div className="pixel-grass-floor">
            {/* World Stations / Chests placed along the ground */}
            {STATIONS.map((st) => (
              <div
                key={st.id}
                className={`world-station ${nearStation?.id === st.id ? "highlight" : ""}`}
                style={{ left: `${st.x}%` }}
                onClick={() => handleOpenWindow(st.id)}
              >
                <div className="station-tooltip">{st.label}</div>
                <div className="station-chest-icon">{st.icon}</div>
              </div>
            ))}

            {/* Walkable Hero Character */}
            <div
              className={`player-character ${facing === "left" ? "flip-left" : ""}`}
              style={{ left: `${characterX}%` }}
            >
              <div className="player-tag">YOU</div>
              <div className="player-sprite">🚶‍♂️</div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: REGISTRATION */}
      {activeWindow === "register" && (
        <div className="os-modal-overlay">
          <div className="os-modal-box large">
            <div className="os-modal-header">
              <span>📜 DSA REGISTRATION FORM - GOOGLE FORM</span>
              <button type="button" className="os-close-btn" onClick={handleCloseWindow}>
                ✖
              </button>
            </div>
            <div className="os-modal-body">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSc_EXAMPLE/viewform?embedded=true"
                width="100%"
                height="520"
                frameBorder="0"
                title="Registration Form"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DSA QUESTS */}
      {activeWindow === "quests" && (
        <div className="os-modal-overlay">
          <div className="os-modal-box large">
            <div className="os-modal-header">
              <span>⚔️ DSA PRACTICE QUESTS</span>
              <button type="button" className="os-close-btn" onClick={handleCloseWindow}>
                ✖
              </button>
            </div>
            <div className="os-modal-body dsa-split-view">
              <div className="quest-list-panel">
                {DSA_QUESTS.map((quest) => (
                  <button
                    key={quest.id}
                    type="button"
                    className={`quest-item-btn ${selectedQuest.id === quest.id ? "active" : ""
                      }`}
                    onClick={() => {
                      playRetroSound(600, "sine");
                      setSelectedQuest(quest);
                    }}
                  >
                    <span>{quest.icon} {quest.title}</span>
                    <span className="quest-xp">{quest.exp}</span>
                  </button>
                ))}
              </div>

              <div className="quest-detail-panel">
                <h3>{selectedQuest.title}</h3>
                <div className="quest-meta-tags">
                  <span className="meta-tag diff">{selectedQuest.difficulty}</span>
                  <span className="meta-tag plat">{selectedQuest.platform}</span>
                </div>
                <p className="quest-description">{selectedQuest.desc}</p>

                <button
                  type="button"
                  className="quest-launch-link"
                  onClick={() => alert(`Starting quest: ${selectedQuest.title}`)}
                >
                  ⚔️ START QUEST IN ARENA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: RESOURCES */}
      {activeWindow === "resources" && (
        <div className="os-modal-overlay">
          <div className="os-modal-box">
            <div className="os-modal-header">
              <span>📁 PREPARATION CHEST</span>
              <button type="button" className="os-close-btn" onClick={handleCloseWindow}>
                ✖
              </button>
            </div>
            <div className="os-modal-body">
              <div className="resources-grid">
                {RESOURCE_CHESTS.map((res) => (
                  <div key={res.id} className="resource-card">
                    <span className="res-icon">{res.icon}</span>
                    <div>
                      <div className="res-title">{res.title}</div>
                      <div className="res-desc">{res.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: PRIZES */}
      {activeWindow === "prizes" && (
        <div className="os-modal-overlay">
          <div className="os-modal-box small warning-theme">
            <div className="os-modal-header warning-bar">
              <span>⚠️ WARNING: LOCKED AREA</span>
              <button type="button" className="os-close-btn" onClick={handleCloseWindow}>
                ✖
              </button>
            </div>
            <div className="os-modal-body warning-content">
              <div className="warning-icon">🔒</div>
              <h3>PRIZES YET TO BE ANNOUNCED!</h3>
              <p>Grand cash rewards, badges, and certificates will be unlocked during Stage 04.</p>
              <button type="button" className="pixel-ok-btn" onClick={handleCloseWindow}>
                GOT IT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}