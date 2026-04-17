'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { RealTimeClock } from '@/components/ui/RealTimeClock';

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-w14 text-white flex flex-col items-center justify-center">
      {/* Clock Telemetry */}
      <div className="absolute top-8 right-8 text-right hidden md:block">
        <RealTimeClock className="text-sm font-bold tracking-widest text-w14-cyan" />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 w14-grid-bg opacity-30 pointer-events-none" />
      
      {/* Scanline Effect */}
      <div className="scanline" />

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-white/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-white/20" />

      {/* Top Header Label */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-white/40 uppercase"
      >
        Constructors • Formula One • W14
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="mb-2"
        >
          <h1 className="text-[8vw] md:text-[120px] font-black w14-neon-text leading-none italic">
            W14
          </h1>
          <div className="w14-neon-line mb-4" />
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/60 mb-12">
            Where Engineering Becomes Art
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-2xl px-4"
        >
          <div className="w14-stat-box text-left">
            <span className="text-[10px] uppercase text-white/40 block mb-1">Academic Proficiency</span>
            <div className="text-3xl font-black">9.28</div>
            <span className="text-[10px] text-white/60 uppercase">CGPA / 10.0</span>
          </div>
          <div className="w14-stat-box text-left">
            <span className="text-[10px] uppercase text-white/40 block mb-1">Development Velocity</span>
            <div className="text-3xl font-black">15+</div>
            <span className="text-[10px] text-white/60 uppercase">Deployed Projects</span>
          </div>
          <div className="w14-stat-box text-left">
            <span className="text-[10px] uppercase text-white/40 block mb-1">Algorithmic Capacity</span>
            <div className="text-3xl font-black">200+</div>
            <span className="text-[10px] text-white/60 uppercase">LeetCode Solved</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6">
          <Link href="/immersive">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w14-btn w14-btn-primary min-w-[200px]"
            >
              Enter Immersive
            </motion.button>
          </Link>
          <Link href="/normal">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w14-btn min-w-[200px]"
            >
              View Minimal
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Bottom Footer Label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 text-[10px] tracking-widest text-white/20 uppercase">
        <span>NY_PORTFOLIO_V2.0</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>CYBER_ATHLETIC_UI</span>
      </div>
    </div>
  );
}
