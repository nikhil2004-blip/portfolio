'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useGameStore } from '@/store/useGameStore';

import { AboutPanel } from './panels/AboutPanel';
import { ProjectsPanel } from './panels/ProjectsPanel';
import { SkillsPanel } from './panels/SkillsPanel';
import { ToolsPanel } from './panels/ToolsPanel';
import { ExperiencePanel } from './panels/ExperiencePanel';
import { LeadershipPanel } from './panels/LeadershipPanel';
import { ContactPanel } from './panels/ContactPanel';
import { AnomalyPanel } from './panels/AnomalyPanel';

const BUILDING_LABELS: Record<string, { title: string; subtitle: string; color: string }> = {
  about:      { title: 'PLAYER_PROFILE.EXE', subtitle: 'Identity confirmed. Mostly.', color: '#4ADE80' },
  projects:   { title: 'MISSION_ARCHIVE.SYS', subtitle: 'Ships that shipped.', color: '#60A5FA' },
  skills:     { title: 'LOADOUT_MATRIX.DAT', subtitle: 'Technical inventory unlocked.', color: '#FBBF24' },
  tools:      { title: 'TOOLKIT_INDEX.BIN', subtitle: 'The weapons of choice.', color: '#FB923C' },
  leadership: { title: 'GUILD_RECORDS.DAT', subtitle: 'Wins, losses, and the ones we don\'t talk about.', color: '#A78BFA' },
  contact:    { title: 'ESTABLISH_LINK.NET', subtitle: 'Ping sent. Awaiting response.', color: '#F472B6' },
  anomaly:    { title: '???_ANOMALY.EXE', subtitle: 'You were not supposed to find this.', color: '#FF0044' },
};

export function OverlayPanel() {
  const { overlayOpen, activeBuilding, closeBuilding } = useGameStore();
  const panelRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState(() =>
    new Date().toLocaleTimeString('en-IN', { hour12: false })
  );

  // Tick clock every second
  useEffect(() => {
    const id = setInterval(() =>
      setClock(new Date().toLocaleTimeString('en-IN', { hour12: false }))
    , 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (overlayOpen && panelRef.current) panelRef.current.focus();
  }, [overlayOpen]);

  const handleClose = () => {
    closeBuilding();
    // Small delay to ensure the DOM has updated and UI is gone
    setTimeout(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) canvas.requestPointerLock();
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  };

  const meta = activeBuilding ? BUILDING_LABELS[activeBuilding] : null;
  const accentColor = meta?.color ?? '#00FFC8';

  return (
    <AnimatePresence>
      {overlayOpen && activeBuilding && meta && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          onPointerDown={(e) => e.nativeEvent.stopPropagation()}
          className="absolute inset-0 z-50 flex flex-col cursor-pointer"
          style={{ background: 'rgba(0,0,0,0.97)' }}
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
            zIndex: 1,
          }} />

          {/* Corner brackets */}
          {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-12 h-12 pointer-events-none`} style={{ zIndex: 2 }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                {i === 0 && <><line x1="0" y1="16" x2="0" y2="0" stroke={accentColor} strokeWidth="2"/><line x1="0" y1="0" x2="16" y2="0" stroke={accentColor} strokeWidth="2"/></>}
                {i === 1 && <><line x1="48" y1="16" x2="48" y2="0" stroke={accentColor} strokeWidth="2"/><line x1="48" y1="0" x2="32" y2="0" stroke={accentColor} strokeWidth="2"/></>}
                {i === 2 && <><line x1="0" y1="32" x2="0" y2="48" stroke={accentColor} strokeWidth="2"/><line x1="0" y1="48" x2="16" y2="48" stroke={accentColor} strokeWidth="2"/></>}
                {i === 3 && <><line x1="48" y1="32" x2="48" y2="48" stroke={accentColor} strokeWidth="2"/><line x1="48" y1="48" x2="32" y2="48" stroke={accentColor} strokeWidth="2"/></>}
              </svg>
            </div>
          ))}

          {/* Top HUD bar */}
          <div className="relative flex items-center justify-between px-6 py-3 border-b shrink-0 cursor-default" onClick={(e) => e.stopPropagation()} style={{ borderColor: `${accentColor}40`, zIndex: 3 }}>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
              <span className="font-monocraft text-xs tracking-widest uppercase" style={{ color: `${accentColor}99` }}>
                NIKHIL_KUMAR_YADAV :: SESSION_ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/normal" className="font-monocraft text-[10px] opacity-40 hover:opacity-100 transition-opacity uppercase tracking-tighter" style={{ color: accentColor }}>
                Switch to Minimal
              </Link>
              <span className="font-monocraft text-xs" style={{ color: `${accentColor}60` }}>
                {clock}
              </span>
              <button
                onClick={handleClose}
                onPointerDown={(e) => { e.stopPropagation(); handleClose(); }}
                className="font-monocraft text-xs px-3 py-1 border transition-all duration-200 hover:opacity-80 relative z-50 pointer-events-auto"
                style={{ borderColor: `${accentColor}60`, color: accentColor }}
              >
                [ESC] EXIT
              </button>
            </div>
          </div>

          {/* Title section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="relative px-8 pt-6 pb-4 shrink-0 cursor-default"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 3 }}
          >
            <h1 className="font-monocraft text-3xl md:text-5xl font-bold tracking-wider" style={{ color: accentColor, textShadow: `0 0 40px ${accentColor}60` }}>
              {meta.title}
            </h1>
            <p className="font-monocraft text-xs tracking-widest mt-2 opacity-60 text-white">
              — {meta.subtitle}
            </p>
            <div className="mt-3 h-px w-full" style={{ background: `linear-gradient(to right, ${accentColor}80, transparent)` }} />
          </motion.div>

          {/* Scrollable content */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="relative flex-1 overflow-y-auto px-8 pb-8 outline-none custom-scrollbar cursor-default"
            style={{ zIndex: 3 }}
          >
            {activeBuilding === 'about' && <AboutPanel accentColor={accentColor} />}
            {activeBuilding === 'projects' && <ProjectsPanel accentColor={accentColor} />}
            {activeBuilding === 'skills' && <SkillsPanel accentColor={accentColor} />}
            {activeBuilding === 'tools' && <ToolsPanel accentColor={accentColor} />}
            {activeBuilding === 'leadership' && <LeadershipPanel accentColor={accentColor} />}
            {activeBuilding === 'contact' && <ContactPanel accentColor={accentColor} />}
            {activeBuilding === 'anomaly' && <AnomalyPanel accentColor={accentColor} />}
          </motion.div>

          {/* Bottom HUD bar */}
          <div className="relative shrink-0 px-6 py-2 border-t flex items-center justify-between cursor-default" onClick={(e) => e.stopPropagation()} style={{ borderColor: `${accentColor}30`, zIndex: 3 }}>
            <span className="font-monocraft text-xs" style={{ color: `${accentColor}40` }}>
              RIT_CS_2026 :: CGPA_9.28 :: BUILD_PASSIONATE
            </span>
            <span className="font-monocraft text-xs" style={{ color: `${accentColor}40` }}>
              nikhilyadavsky2004@gmail.com
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
