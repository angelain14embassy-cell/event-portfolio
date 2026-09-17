import React, { useState, useEffect } from "react";
import "./HomePage.css";
import apajiImg from "../assets/apaji.jpeg";

const dsaTopics = [
    { id: 1, file: "arrays_hash.exe", title: "Arrays & Hashing", tag: "01 // FOUNDATION", code: "O(1) ACCESS", desc: "Prefix Sum, Two Pointers, HashMaps & Frequency Counter" },
    { id: 2, file: "stacks_queues.dll", title: "Stacks & Queues", tag: "02 // LINEAR DATA", code: "LIFO / FIFO", desc: "Monotonic Stack, Sliding Window, Priority Queue" },
    { id: 3, file: "linked_list.sys", title: "Linked Lists", tag: "03 // POINTERS", code: "O(N) TRAVERSAL", desc: "Floyd Cycle Detection, Fast & Slow Pointers, Reversals" },
    { id: 4, file: "binary_trees.bat", title: "Binary Trees & BST", tag: "04 // NON-LINEAR", code: "O(log N) SEARCH", desc: "BST Properties, Tree Traversals, Lowest Common Ancestor" },
    { id: 5, file: "graph_theory.drv", title: "Graph Theory", tag: "05 // NETWORKS", code: "BFS / DFS", desc: "Dijkstra Algorithm, Topological Sort, Disjoint Set Union" },
    { id: 6, file: "dyn_program.cmd", title: "Dynamic Programming", tag: "06 // OPTIMIZATION", code: "MEMOIZATION", desc: "Subproblems, Knapsack, Longest Common Subsequence" },
    { id: 7, file: "backtrack.cpp", title: "Recursion & Backtrack", tag: "07 // SEARCH SPACE", code: "O(2ⁿ) BRANCH", desc: "N-Queens Problem, Subset Generation, Sudoku Solvers" },
    { id: 8, file: "sort_search.bin", title: "Sorting & Search", tag: "08 // EFFICIENCY", code: "O(N log N)", desc: "Binary Search, QuickSelect, Custom Sort Comparators" },
    { id: 9, file: "greedy_algo.app", title: "Greedy Logic", tag: "09 // LOCAL OPTIMA", code: "CHOICE OPTIMAL", desc: "Interval Scheduling, Huffman Coding, Minimum Spanning Tree" },
    { id: 10, file: "trie_bit.vxd", title: "Trie & Bitwise", tag: "10 // LOW LEVEL", code: "O(1) BITWISE", desc: "Prefix Matching, Bitmasks, XOR Tricks, Autocomplete Engine" },
];

const typewriterPhrases = [
    "ALGORITHMIC FORCE",
    "DSA EXCELLENCE",
    "PROBLEM SOLVERS",
    "CODE OPTIMIZERS"
];

export default function HomePage() {
    const [isPaused, setIsPaused] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Typewriter Loop Effect
    useEffect(() => {
        const currentPhrase = typewriterPhrases[textIndex];
        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 1800; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % typewriterPhrases.length);
            typingSpeed = 400;
        }

        const timer = setTimeout(() => {
            setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
            if (!isDeleting && charIndex === currentPhrase.length) {
                setIsDeleting(true);
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, textIndex]);

    return (
        <div className="bv-hero-wrapper">
            {/* Background Layer */}
            <div
                className="bv-left-bg-image"
                style={{ backgroundImage: `url(${apajiImg})` }}
            />
            <div className="bv-left-overlay" />
            <div className="bv-grid-bg" />

            {/* Header */}
            <header className="bv-header">
                <div className="bv-logo-spacer" /> {/* Spacer keeping top-left clean */}
                <button type="button" className="bv-nav-btn">
                    Join Chapter ↗
                </button>
            </header>

            <div className="bv-container">
                {/* Left Hero Content */}
                <div className="bv-left-panel">
                    <div className="bv-tag-pill">
                        <span className="bv-pill-dot" />
                        <span>APAJI SANSTHAN CHAPTER</span>
                    </div>

                    <h1 className="bv-headline">
                        WE ARE THE <br />
                        <span className="bv-blue-gradient typewriter-text">
                            {typewriterPhrases[textIndex].substring(0, charIndex)}
                            <span className="typewriter-cursor">|</span>
                        </span> <br />
                        OF BANASTHALI.
                    </h1>

                    <p className="bv-sub-text">
                        Engineered at <strong>Apaji Sansthan</strong>. We optimize time complexity from{" "}
                        <span className="bv-code-tag">O(N²)</span> to{" "}
                        <span className="bv-code-tag">O(log N)</span>.
                    </p>

                    <div className="bv-stats-container">
                        <div className="bv-stat-item">
                            <span className="bv-stat-num">50+</span>
                            <span className="bv-stat-lbl">DSA Workshops</span>
                        </div>
                        <div className="bv-stat-item">
                            <span className="bv-stat-num">1.2k+</span>
                            <span className="bv-stat-lbl">Problems Solved</span>
                        </div>
                        <div className="bv-stat-item">
                            <span className="bv-stat-num">450+</span>
                            <span className="bv-stat-lbl">Active Coders</span>
                        </div>
                    </div>

                    <div className="bv-cta-row">
                        <button type="button" className="bv-btn-primary">
                            Explore DSA Arena ↗
                        </button>
                        <button type="button" className="bv-btn-secondary">
                            ACM Roadmap
                        </button>
                    </div>

                    <div className="bv-footnote">
                        <span className="bv-footnote-bold">Apaji Sansthan, Banasthali Vidyapith</span>
                        <p>Empowering the next generation of competitive programmers.</p>
                    </div>
                </div>

                {/* Right Stage: 3D Orbit */}
                <div className="bv-right-stage">
                    <div className="bv-cylinder-viewport">
                        <div
                            className={`bv-cylinder-axis ${isPaused ? "paused" : ""}`}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {dsaTopics.map((topic, i) => {
                                const angle = (360 / dsaTopics.length) * i;
                                return (
                                    <div
                                        key={topic.id}
                                        className="bv-cylinder-card win98-window"
                                        style={{
                                            transform: `rotateY(${angle}deg) translateZ(420px)`
                                        }}
                                    >
                                        <div className="win98-title-bar">
                                            <div className="win98-title-text">
                                                <span className="win98-icon">💾</span>
                                                <span>{topic.file}</span>
                                            </div>
                                            <div className="win98-controls">
                                                <button type="button" className="win98-btn">_</button>
                                                <button type="button" className="win98-btn">□</button>
                                                <button type="button" className="win98-btn win98-close">×</button>
                                            </div>
                                        </div>

                                        <div className="win98-content">
                                            <div className="win98-meta-row">
                                                <span className="win98-tag">{topic.tag}</span>
                                                <span className="win98-code">{topic.code}</span>
                                            </div>

                                            <h3 className="win98-card-title">{topic.title}</h3>
                                            <p className="win98-card-desc">{topic.desc}</p>

                                            <div className="win98-card-foot">
                                                <span className="win98-foot-tag">CORE DSA MODULE</span>
                                                <span className="win98-arrow">↗</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bv-carousel-hint">
                        <span>Hover card to pause 3D orbit</span>
                    </div>
                </div>
            </div>
        </div>
    );
}