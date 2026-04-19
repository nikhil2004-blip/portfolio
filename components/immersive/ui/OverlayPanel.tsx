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
  const overlayOpen = useGameStore(s => s.overlayOpen);
  const activeBuilding = useGameStore(s => s.activeBuilding);
  const closeBuilding = useGameStore(s => s.closeBuilding);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [clock, setClock] = useState('');
  const [copiedHUD, setCopiedHUD] = useState(false);

  const [contentReady, setContentReady] = useState(false);

  // Tick clock every second
  useEffect(() => {
    setMounted(true);
    setClock(new Date().toLocaleTimeString('en-IN', { hour12: false }));
    const id = setInterval(() =>
      setClock(new Date().toLocaleTimeString('en-IN', { hour12: false }))
    , 1000);
    return () => clearInterval(id);
  }, []);

  // Defer the heavy DOM render slightly so WebGL pointer lock release doesn't stutter
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (overlayOpen) {
      timer = setTimeout(() => setContentReady(true), 100);
    } else {
      setContentReady(false);
    }
    return () => clearTimeout(timer);
  }, [overlayOpen]);

  useEffect(() => {
    if (overlayOpen && panelRef.current && contentReady) panelRef.current.focus();
  }, [overlayOpen, contentReady]);

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
          className="fixed inset-0 z-50 flex flex-col cursor-pointer overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.97)', height: '100dvh' }}
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
            zIndex: 1,
          }} />

          {/* Corner brackets */}
          {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-12 h-12 pointer-events-none`} style={{ zIndex: 10 }}>
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
              <button 
                onClick={() => window.location.replace('/normal')}
                className="font-monocraft text-[10px] opacity-40 hover:opacity-100 transition-opacity uppercase tracking-tighter cursor-pointer" 
                style={{ color: accentColor, background: 'none', border: 'none' }}
              >
                Switch to Minimal
              </button>
              <span className="font-monocraft text-xs" style={{ color: `${accentColor}60` }}>
                {mounted ? clock : '--:--:--'}
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
            className="relative px-8 pt-4 pb-2 shrink-0 cursor-default"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 3 }}
          >
            <h1 className="font-monocraft text-2xl md:text-4xl font-bold tracking-wider" style={{ color: accentColor, textShadow: `0 0 40px ${accentColor}40` }}>
              {meta.title}
            </h1>
            <p className="font-monocraft text-[10px] tracking-widest mt-1 opacity-60 text-white">
              — {meta.subtitle}
            </p>
            <div className="mt-2 h-px w-full" style={{ background: `linear-gradient(to right, ${accentColor}80, transparent)` }} />
          </motion.div>

          {/* Scrollable content (Deferred!) */}
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
            {contentReady && (
              <>
                {activeBuilding === 'about' && <AboutPanel accentColor={accentColor} />}
                {activeBuilding === 'projects' && <ProjectsPanel accentColor={accentColor} />}
                {activeBuilding === 'skills' && <SkillsPanel accentColor={accentColor} />}
                {activeBuilding === 'tools' && <ToolsPanel accentColor={accentColor} />}
                {activeBuilding === 'leadership' && <LeadershipPanel accentColor={accentColor} />}
                {activeBuilding === 'contact' && <ContactPanel accentColor={accentColor} />}
                {activeBuilding === 'anomaly' && <AnomalyPanel accentColor={accentColor} />}
              </>
            )}
          </motion.div>

          {/* Bottom HUD bar */}
          <div className="relative shrink-0 px-6 py-2 border-t flex items-center justify-between cursor-default" onClick={(e) => e.stopPropagation()} style={{ borderColor: `${accentColor}30`, zIndex: 3 }}>
            <span className="font-monocraft text-xs" style={{ color: `${accentColor}40` }}>
              RIT_CS_2026 :: CGPA_9.28 :: BUILD_PASSIONATE
            </span>
            <button 
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText('nikhilyadavsky2004@gmail.com');
                setCopiedHUD(true);
                setTimeout(() => setCopiedHUD(false), 2000);
              }}
              className="font-monocraft text-xs relative group/hud-mail" 
              style={{ color: `${accentColor}40` }}
            >
              <AnimatePresence>
                {copiedHUD ? (
                  <motion.span 
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -10 }}
                    style={{ color: accentColor }}
                  >
                    [ ✓ EMAIL_COPIED ]
                  </motion.span>
                ) : (
                  <span className="group-hover/hud-mail:opacity-100 opacity-60 transition-opacity">
                    nikhilyadavsky2004@gmail.com
                  </span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
