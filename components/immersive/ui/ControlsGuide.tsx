'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';

const CONTROLS = [
  { key: 'W A S D',    desc: 'Move (like every game since 1996)' },
  { key: 'Mouse',      desc: 'Look around and judge my design choices' },
  { key: 'Shift',      desc: 'Sprint (for when HR gives you 30 seconds)' },
  { key: 'E',          desc: 'Enter buildings to see my actual work' },
  { key: 'ESC',        desc: 'Release your cursor from my hostage situation' },
  { key: 'N',          desc: 'Toggle night mode (vampires not included)' },
  { key: 'Right Click',desc: 'Place signboard and leave a message!' }
];

/**
 * ControlsGuide — shown for 5 seconds on first visit.
 */
export function ControlsGuide() {
  const hasSeenTutorial = useGameStore(s => s.hasSeenTutorial);
  const markTutorialSeen = useGameStore(s => s.markTutorialSeen);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasSeenTutorial) {
      setVisible(true);
      // Removed auto-dismiss so it stays on the side until explicitly closed
    }
  }, [hasSeenTutorial]);

  const dismiss = () => {
    setVisible(false);
    markTutorialSeen();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 100,
            left: 24,
            zIndex: 40,
            background: 'rgba(0,0,0,0.85)',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: 6,
            padding: '24px 24px',
            backdropFilter: 'blur(10px)',
            minWidth: 300,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 10,
            color: '#FFD700',
            marginBottom: 20,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            Welcome to Nikhil&apos;s<br />Over-Engineered Portfolio
          </div>
          {CONTROLS.map(({ key, desc }) => (
            <div
              key={key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 7,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
              }}
            >
              <kbd style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 2,
                padding: '1px 6px',
                color: '#eee',
                fontSize: 10,
              }}>
                {key}
              </kbd>
              <span style={{ color: '#aaa' }}>{desc}</span>
            </div>
          ))}
          <button
            onClick={dismiss}
            style={{
              marginTop: 20,
              width: '100%',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 10,
              background: '#FFD700',
              border: '2px solid #B8860B',
              borderRadius: 4,
              color: '#000',
              padding: '10px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'transform 0.1s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            I&apos;m Ready!
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
