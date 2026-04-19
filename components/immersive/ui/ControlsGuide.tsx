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
  const isMobile = useGameStore(s => s.isMobile);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasSeenTutorial) {
      setVisible(true);
    }
  }, [hasSeenTutorial]);

  const dismiss = () => {
    setVisible(false);
    markTutorialSeen();
  };

  const mobileControls = [
    { key: 'Joystick', desc: 'Move your character' },
    { key: 'Swipe',    desc: 'Look around the world' },
    { key: 'Jump',     desc: 'Space-tier hopping' },
    { key: 'Interact', desc: 'Enter buildings' },
  ];

  const currentControls = isMobile ? mobileControls : CONTROLS;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed z-[100] flex flex-col items-center justify-center p-6 md:p-8"
          style={{
            top: isMobile ? '50%' : '100px',
            left: isMobile ? '50%' : '24px',
            transform: isMobile ? 'translate(-50%, -50%)' : 'none',
            background: 'rgba(0,0,0,0.9)',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: 8,
            backdropFilter: 'blur(20px)',
            width: isMobile ? '90%' : '320px',
            maxWidth: isMobile ? '400px' : 'none',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
          }}
        >
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: isMobile ? 8 : 10,
            color: '#FFD700',
            marginBottom: isMobile ? 12 : 20,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: '1.6'
          }}>
            Welcome to Nikhil&apos;s<br />Immersive Portfolio
          </div>

          <div className="w-full flex flex-col gap-3">
            {currentControls.map(({ key, desc }) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: isMobile ? 10 : 11,
                }}
              >
                <kbd style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 3,
                  padding: '2px 8px',
                  color: '#eee',
                  fontSize: isMobile ? 9 : 10,
                  whiteSpace: 'nowrap'
                }}>
                  {key}
                </kbd>
                <span className="text-right flex-1 truncate" style={{ color: '#aaa' }}>{desc}</span>
              </div>
            ))}
          </div>

          <button
            onClick={dismiss}
            style={{
              marginTop: isMobile ? 16 : 24,
              width: '100%',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 10,
              background: '#FFD700',
              border: '2px solid #B8860B',
              borderRadius: 4,
              color: '#000',
              padding: '12px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              boxShadow: '0 4px 0 #B8860B'
            }}
            className="active:translate-y-1 active:shadow-none transition-all"
          >
            I&apos;m Ready!
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
