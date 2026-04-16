'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';

const CONTROLS = [
  { key: 'W A S D',    desc: 'Move' },
  { key: 'Mouse',      desc: 'Look around' },
  { key: 'Shift',      desc: 'Sprint' },
  { key: 'E',          desc: 'Enter building' },
  { key: 'ESC',        desc: 'Close / release cursor' },
  { key: 'M',          desc: 'Toggle minimap' },
];

/**
 * ControlsGuide — shown for 5 seconds on first visit.
 */
export function ControlsGuide() {
  const { hasSeenTutorial, markTutorialSeen } = useGameStore();
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
            textAlign: 'center'
          }}>
            Rules & Controls
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
