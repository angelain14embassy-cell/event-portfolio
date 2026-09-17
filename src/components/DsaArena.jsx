import React from "react";
import "./DsaArena.css";

export default function DsaArena() {
    const sessions = [
        { id: "STAGE 01", title: "ARRAYS & STRINGS", status: "UNLOCKED", desc: "Master basic memory layouts & two-pointer tricks." },
        { id: "STAGE 02", title: "TREES & GRAPHS", status: "LOCKED", desc: "Traverse BFS/DFS & conquer short-path algorithms." },
        { id: "STAGE 03", title: "DYNAMIC PROGRAMMING", status: "BOSS FIGHT", desc: "Optimize memoization & defeat time limits." },
    ];

    return (
        <section id="dsa-arena-section" className="dsa-arena-container">
            {/* Dark CRT Grid Header */}
            <div className="arena-header">
                <h2 className="arena-title">⚡ SELECT YOUR MISSION ⚡</h2>
                <div className="terminal-script">
                    <p className="green-text">$ dsa_debugger.sh --query="How to master DSA at Banasthali?"</p>
                    <p className="cyan-text">&gt; Output: Join Banasthali ACM Chapter Sessions...</p>
                    <p className="yellow-text">✓ 100% MATCH FOUND! ARENA READY.</p>
                </div>
            </div>

            {/* Grid of Session Cards */}
            <div className="sessions-grid">
                {sessions.map((item) => (
                    <div key={item.id} className={`session-card ${item.status.toLowerCase().replace(" ", "-")}`}>
                        <div className="card-badge">{item.status}</div>
                        <span className="stage-id">{item.id}</span>
                        <h3 className="stage-title">{item.title}</h3>
                        <p className="stage-desc">{item.desc}</p>
                        <button type="button" className="action-btn">
                            {item.status === "LOCKED" ? "🔒 LOCKED" : "▶ ENTER STAGE"}
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}