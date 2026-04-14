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
      // Auto-dismiss after 7s
      const t = setTimeout(() => {
        setVisible(false);
        markTutorialSeen();
      }, 7000);
      return () => clearTimeout(t);
    }
  }, [hasSeenTutorial, markTutorialSeen]);

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
            top: 72,
            right: 16,
            zIndex: 40,
            background: 'rgba(0,0,0,0.82)',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: 4,
            padding: '16px 20px',
            backdropFilter: 'blur(8px)',
            minWidth: 220,
          }}
        >
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: 9,
            color: '#FFD700',
            marginBottom: 14,
            letterSpacing: '0.04em',
          }}>
            Controls
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
              marginTop: 12,
              width: '100%',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 8,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 2,
              color: '#ccc',
              padding: '6px',
              cursor: 'pointer',
            }}
          >
            Got it
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
