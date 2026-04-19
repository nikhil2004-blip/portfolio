'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, GitBranch, Briefcase, Mail, Check } from 'lucide-react';
import { contact } from '@/content/experience'; // Using your existing contact import

// Chamfered (cut corner) container component
const BrutalistContainer = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
    animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
    transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
    className={`relative border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm ${className}`}
    style={{
      clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
    }}
  >
    {children}
  </motion.div>
);

// Clean Facial Recognition Module (BW to Color, No Grid/Laser)
const InteractiveImageModule = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BrutalistContainer delay={0.5} className="aspect-square lg:aspect-auto lg:h-[400px] w-full p-2 relative group overflow-hidden bg-black cursor-crosshair">

      {/* Invisible interaction layer */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute inset-0 z-40"
      />

      {/* Base Image */}
      <div className={`w-full h-full relative transition-all duration-700 filter brightness-[1.02] ${isHovered ? 'grayscale-0 contrast-[1.1]' : 'grayscale contrast-[1.05]'}`}>
        <Image
          src="/profile.jpg"
          alt="Nikhil Kumar Yadav"
          fill
          className="object-cover object-center antialiased will-change-transform"
          sizes="(max-width: 768px) 100vw, 380px"
          priority
          style={{ 
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>

      {/* Tech Overlay (Appears on Hover) */}
      <div
        className={`absolute inset-2 z-20 transition-all duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0 scale-95'}`}
        style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
      >
        {/* Floating ML Tech Data Removed as per request */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1 text-[8px] md:text-[10px] font-mono text-[#D4FF00]">
        </div>
      </div>

      {/* Permanent Bottom HUD Label */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-30 pointer-events-none">
        <div className="bg-black/80 px-2 py-1 text-[9px] font-mono text-[#D4FF00] border border-[#D4FF00]/30 backdrop-blur-md uppercase shadow-[0_0_10px_rgba(212,255,0,0.2)]">
          Subject // Active
        </div>
        <div className="w-8 h-8 border-b-2 border-r-2 border-white/50" />
      </div>
    </BrutalistContainer>
  );
};

// Terminal Boot Sequence Component
const TerminalLog = () => {
  const lines = [
    "INITIALIZING BYPASS PROTOCOL...",
    "DECRYPTING MAINFRAME DOSSIER...",
    "ACCESS GRANTED.",
    "SUBJECT: NIKHIL KUMAR YADAV"
  ];

  return (
    <div className="font-mono text-[10px] md:text-xs text-[#D4FF00] mb-6 flex flex-col gap-1 opacity-80">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + (i * 0.4) }}
          className="flex gap-2"
        >
          <span className="text-zinc-500">{">"}</span>
          <span className={i === lines.length - 1 ? "bg-[#D4FF00] text-black px-1 font-bold" : ""}>
            {line}
          </span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: 2.0 }}
        className="w-2 h-3 bg-[#D4FF00] mt-1"
      />
    </div>
  );
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = () => {
    if (!contact?.email) return;
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mouse tracking for the radial grid spotlight
  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] text-zinc-300 font-sans selection:bg-[#D4FF00] selection:text-black overflow-x-hidden"
    >
      {/* INTERACTIVE BACKGROUND */}
      <div
        className="fixed inset-0 z-0 opacity-40 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(212, 255, 0, 0.15) 0%, transparent 25%),
                            linear-gradient(to right, #1a1a1a 1px, transparent 1px),
                            linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px'
        }}
      />

      {/* Ambient noise overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("/noise.svg")' }}></div>

      {/* FRAME BORDERS */}
      <div className="fixed top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#D4FF00]/50 z-50 pointer-events-none" />
      <div className="fixed top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#D4FF00]/50 z-50 pointer-events-none" />
      <div className="fixed bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#D4FF00]/50 z-50 pointer-events-none" />
      <div className="fixed bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#D4FF00]/50 z-50 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full min-h-screen max-w-[1400px] mx-auto px-6 py-12 md:px-12 md:py-8 lg:py-6 flex flex-col justify-start lg:justify-center overflow-x-hidden pt-12 md:pt-16">

        {/* TOP METADATA BAR - Moved to relative to prevent overlapping content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full hidden md:flex justify-between items-end border-b border-zinc-800 pb-4 mb-8"
        >
          <div className="flex gap-8 text-[10px] font-mono tracking-widest text-zinc-500 uppercase items-center">
            <span>SYS.INIT // 2026.4</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#D4FF00] animate-pulse" /> CORE: ONLINE
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase border-l border-zinc-800 pl-6">
              LAT: 12.971 // LON: 77.594
            </div>
          </div>
        </motion.div>

        {/* ASYMMETRICAL HERO CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center w-full">

          {/* Left Column: Terminal, Huge Typography & Identity */}
          <div className="lg:col-span-7 flex flex-col z-20">

            <TerminalLog />

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="lg:pl-16 xl:pl-32"
            >
              <h1 className="text-[clamp(3.5rem,15vw,6rem)] sm:text-[12vw] lg:text-[5rem] xl:text-[6.5rem] font-black leading-[0.9] sm:leading-[0.85] tracking-tighter text-white uppercase sm:mix-blend-difference mb-4 relative">
                Nikhil <br />
                Kumar <br />
                <span 
                  className="text-transparent" 
                  style={{ 
                    WebkitTextStroke: '1.5px #D4FF00',
                    // Smoother shadow-based outline for mobile devices
                    textShadow: '0 0 0px #D4FF00' // Placeholder for shadow if needed, but keeping stroke for desktop
                  }}
                >
                  Yadav.
                </span>
                
                {/* Responsive measurement lines */}
                <div className="absolute -left-6 lg:-left-12 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4FF00]/50 to-transparent hidden md:block"></div>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-4 flex flex-col gap-8 lg:pl-16 xl:pl-32"
            >
              <p className="text-zinc-400 font-mono text-xs md:text-sm leading-relaxed max-w-md border-l-2 border-zinc-800 pl-4 uppercase tracking-widest">
                <span className="text-white bg-zinc-900 px-1">Software Engineer.</span><br />
                Crafting high-performance systems and interactive logic structures.
              </p>
              
              <div className="flex gap-4 mt-4 relative">
                <a href={contact?.github || "#"} target="_blank" rel="noreferrer" className="p-3 border border-zinc-800 hover:border-[#D4FF00] hover:text-[#D4FF00] text-zinc-500 transition-colors bg-zinc-950/50">
                  <GitBranch size={18} />
                </a>
                <a href={contact?.linkedin || "#"} target="_blank" rel="noreferrer" className="p-3 border border-zinc-800 hover:border-[#D4FF00] hover:text-[#D4FF00] text-zinc-500 transition-colors bg-zinc-950/50">
                  <Briefcase size={18} />
                </a>
                <button 
                  onClick={handleCopyEmail}
                  className="p-3 border border-zinc-800 hover:border-[#D4FF00] hover:text-[#D4FF00] text-zinc-500 transition-colors bg-zinc-950/50 relative group"
                  title="Copy Email"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Check size={18} className="text-[#D4FF00]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="mail"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Mail size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Floating tooltip */}
                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: -40 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-[#D4FF00] text-black text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap pointer-events-none"
                      >
                        Copied!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Profile & Path Selection */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full max-w-sm lg:max-w-[380px] relative z-20 mx-auto lg:ml-auto">
            
            <InteractiveImageModule />

            {/* Path Selection Module */}
            <div className="flex flex-col gap-3 mt-1">
              <Link href="/normal">
                <motion.button
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.7 }}
                  className="w-full relative group bg-white text-black p-4 flex items-center justify-between overflow-hidden cursor-pointer"
                  style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
                >
                  <div className="absolute inset-0 bg-[#D4FF00] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                  <span className="relative z-10 font-bold tracking-widest uppercase text-xs">Access Portfolio</span>
                  <ArrowUpRight size={18} className="relative z-10 group-hover:rotate-45 transition-transform duration-300" />
                </motion.button>
              </Link>

              <Link href="/immersive">
                <motion.button
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }}
                  className="w-full relative group bg-transparent border border-zinc-700 hover:border-[#D4FF00] text-white p-4 flex items-center justify-between transition-colors cursor-pointer"
                  style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
                >
                  <div className="flex flex-col text-left">
                    <span className="font-bold tracking-widest uppercase text-xs group-hover:text-[#D4FF00] transition-colors">Launch Immersive 3D</span>
                    <span className="text-[9px] font-mono text-zinc-500 mt-1">[ EXPERIMENTAL ENGINE ]</span>
                  </div>
                  <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-[#D4FF00] transition-colors" />
                </motion.button>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}