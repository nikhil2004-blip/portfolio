'use client';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  'Initializing hyper-realistic dirt blocks...',
  'Bribing the voxel architect module...',
  'Calculating the exact trajectory of 0 sun rays...',
  'Downloading more RAM for 3D physics...',
  'Watering the low-poly plants...',
  'Assembling your non-existent social life data...',
  'Pre-computing sarcastic loading messages...',
  'Polishing the pixels you won\'t even notice...',
  'Almost ready. Or maybe it\'s just frozen.',
];

import { useGameStore } from '@/store/useGameStore';

/**
 * LoadingScreen — A "yellow dashboard" loading screen with funny sarcastic text
 * Disappears automatically when Three.js finishes loading assets AND isWorldReady is true.
 */
export function LoadingScreen() {
  const { progress, active, item } = useProgress();
  const isWorldReady = useGameStore((s) => s.isWorldReady);
  
  // Show if either the heavy lifting is happening OR we haven't officially "started" the world yet
  const show = active || !isWorldReady;
  const msgIdx = Math.min(
    Math.floor((progress / 100) * MESSAGES.length),
    MESSAGES.length - 1,
  );

  const accentColor = '#00FFC8';

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.45, 0, 0.55, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: '#09090b', // Deep dark theme
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Space Mono', 'Courier New', monospace",
            color: '#ffffff',
          }}
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,200,0.1) 2px, rgba(0,255,200,0.1) 4px)',
          }} />

          <div
            style={{
              width: '90%',
              maxWidth: 550,
              border: `1px solid ${accentColor}40`,
              background: '#111114',
              padding: '2.5rem',
              boxShadow: `0 0 50px ${accentColor}10`,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Corner geometric accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: accentColor }} />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: accentColor }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${accentColor}30`, paddingBottom: '1rem', marginBottom: '2rem' }}>
              <div className="flex flex-col">
                <h1 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, letterSpacing: '0.2rem', color: accentColor }}>
                  SYSTEM_INITIALIZATION
                </h1>
                <span className="text-[10px] opacity-40 uppercase tracking-widest mt-1">Booting Voxel Engine v2.4.0</span>
              </div>
              <div style={{ fontWeight: 700, color: accentColor, fontSize: '1.5rem' }}>
                {Math.round(progress)}%
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem', minHeight: 80 }}>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">Process Log:</p>
              <p style={{ fontWeight: 400, fontSize: '1rem', margin: 0, color: '#e4e4e7' }}>
                {MESSAGES[msgIdx] || 'Performing background computations...'}
              </p>
              {item && (
                <p style={{ fontSize: '0.7rem', color: accentColor, opacity: 0.5, marginTop: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {'>'} {item}
                </p>
              )}
            </div>

            {/* Progress track */}
            <div
              style={{
                width: '100%',
                height: 4,
                background: `${accentColor}10`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: accentColor,
                  width: '0%',
                  boxShadow: `0 0 15px ${accentColor}`,
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', fontSize: '0.7rem', fontWeight: 600, opacity: 0.4 }}>
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                STATUS: UNSTABLE
              </span>
              <span>ESTIMATED TIME: WHO_KNOWS</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
