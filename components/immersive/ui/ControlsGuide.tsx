'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';

const CONTROLS = [
  { key: 'W A S D',    desc: 'Move (Unchanged since 1996)' },
  { key: 'Mouse',      desc: 'Look around and judge my life choices' },
  { key: 'Shift',      desc: 'Sprint (For 30s HR speedruns)' },
  { key: 'E',          desc: 'Enter my mind (or just the building)' },
  { key: 'ESC',        desc: 'Stop holding your cursor hostage' },
  { key: 'N',          desc: 'Toggle Night (to hide my bugs)' },
  { key: 'Right Click',desc: 'Graffiti my world with a sign' }
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
            background: 'rgba(0,0,0,0.95)',
            border: '2px solid rgba(255,255,255,0.4)',
            borderRadius: 0, // Brutalist: sharper corners
            backdropFilter: 'blur(25px)',
            width: isMobile ? '90%' : '440px', // Wider to fit on one line
            maxWidth: isMobile ? '400px' : 'none',
            boxShadow: '0 30px 60px rgba(0,0,0,0.9)',
          }}
        >
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: isMobile ? 8 : 12,
            color: '#FFD700',
            marginBottom: isMobile ? 12 : 30,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            textAlign: 'center',
            lineHeight: '1.4'
          }}>
            WELCOME TO MY<br />OVERENGINEERED PORTFOLIO
          </div>

          <div className="w-full flex flex-col gap-4">
            {CONTROLS.map(({ key, desc }) => (
              <div
                key={key}
                className="flex items-start justify-between gap-4"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  lineHeight: '1.4'
                }}
              >
                <kbd style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 3,
                  padding: '2px 8px',
                  color: '#eee',
                  fontSize: 10,
                  whiteSpace: 'nowrap',
                  marginTop: '1px'
                }}>
                  {key}
                </kbd>
                <span className="text-right flex-1 whitespace-nowrap" style={{ color: '#aaa' }}>{desc}</span>
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
