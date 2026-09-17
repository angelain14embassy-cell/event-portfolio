import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection() {
    const [isEntered, setIsEntered] = useState(false);

    return (
        <div className="relative min-h-screen bg-[#070b12] text-white overflow-hidden">
            <AnimatePresence>
                {!isEntered ? (
                    /* RETRO SEARCH / DEBUGGER OVERLAY */
                    <motion.div
                        key="retro-landing"
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070a12] p-6"
                    >
                        {/* Ambient Matrix Globe Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                        <div className="relative z-10 max-w-lg w-full bg-[#0d1322] border-2 border-indigo-500/40 rounded-xl p-6 shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                            {/* Terminal Window Top Bar */}
                            <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-3">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                <span className="text-xs font-mono text-gray-400 ml-2">dsa_debugger.sh</span>
                            </div>

                            {/* Retro Search Box */}
                            <div className="space-y-3 font-mono text-sm">
                                <p className="text-indigo-400">$ search --query="How to master DSA at Banasthali?"</p>
                                <div className="bg-[#131b2e] p-3 rounded border border-gray-700 text-gray-300">
                                    <p>► Output: Joining Banasthali ACM Chapter...</p>
                                    <p className="text-emerald-400 font-semibold mt-1">✓ 100% Match Found!</p>
                                </div>
                            </div>

                            {/* Interactive Big Pixel Cursor Button */}
                            <button
                                onClick={() => setIsEntered(true)}
                                className="mt-6 w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 shadow-lg"
                            >
                                <span>ENTER ACM ARENA</span>
                                {/* Custom Pixel Arrow Icon */}
                                <svg className="w-5 h-5 fill-current animate-bounce" viewBox="0 0 24 24">
                                    <path d="M12 2l-1.41 1.41L16.17 9H4v2h12.17l-5.58 5.59L12 18l8-8-8-8z" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    /* MAIN BANASTHALI ACM ARENA HOME PAGE (IMAGE 2) */
                    <motion.div
                        key="main-portfolio"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="container mx-auto px-6 py-12"
                    >
                        {/* Banasthali Header Section */}
                        <div className="text-center max-w-3xl mx-auto space-y-4">
                            <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-semibold border border-indigo-500/20">
                                Banasthali Vidyapith ACM Chapter
                            </span>
                            <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                                DSA & Competitive Programming Arena
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Build your problem-solving skills, master core fundamentals, and step into a thriving community.
                            </p>
                        </div>

                        {/* Path to Mastery Interactive Roadmap (Road/Milestone Layout) */}
                        {/* Teammates' Timeline, Event Cards, and Gallery components embed here */}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}