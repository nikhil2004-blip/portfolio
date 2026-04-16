'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { BUILDINGS } from '../buildings/buildings.data';
import { Building } from 'lucide-react';

/**
 * InteractPrompt — shows "walk into a building to explore" at start,
 * then switches to "[ E ] Enter — Building Name" when near a building.
 */
export function InteractPrompt() {
  const { nearbyBuilding, overlayOpen } = useGameStore();
  const [showHint, setShowHint] = useState(false);

  // Show the intro hint 1.5s after mount, hide after 6s
  useEffect(() => {
    const show = setTimeout(() => setShowHint(true), 1500);
    const hide = setTimeout(() => setShowHint(false), 7000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  if (overlayOpen) return null;

  const buildingMeta = nearbyBuilding
    ? BUILDINGS.find(b => b.id === nearbyBuilding)
    : null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        pointerEvents: 'none',
      }}
    >
      {/* Near-building prompt */}
      <AnimatePresence>
        {nearbyBuilding && buildingMeta && (
          <motion.div
            key="enter-prompt"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(0,0,0,0.75)',
              border: `1px solid ${buildingMeta.accentColor}60`,
              borderRadius: 3,
              padding: '8px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backdropFilter: 'blur(6px)',
            }}
          >
            <span style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 9,
              background: buildingMeta.accentColor,
              color: '#000',
              padding: '3px 8px',
              borderRadius: 2,
            }}>
              E
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#fff',
              letterSpacing: '0.05em',
            }}>
              Enter · {buildingMeta.name}
            </span>
            <span style={{ fontSize: 14 }}>
              <buildingMeta.Icon size={16} color={buildingMeta.accentColor} />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro hint — shown once on load */}
      <AnimatePresence>
        {showHint && !nearbyBuilding && (
          <motion.div
            key="intro-hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'rgba(0,0,0,0.65)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 3,
              padding: '8px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              backdropFilter: 'blur(6px)',
            }}
          >
            <span style={{ display: 'flex' }}><Building size={16} color="rgba(255,255,255,0.7)" /></span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.04em',
            }}>
              Walk into a building to explore
            </span>
            <span style={{ fontSize: 12 }}>·</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.04em',
            }}>
              WASD to move · Mouse to look
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
