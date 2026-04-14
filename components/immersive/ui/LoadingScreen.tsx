'use client';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  'Placing the last block...',
  'Loading your projects...',
  'Lighting the torches...',
  'Painting the sky...',
  'Planting the trees...',
  'Carving the paths...',
  'Filling the well...',
];

/**
 * LoadingScreen — full-screen Minecraft-style loading overlay.
 * Disappears automatically when Three.js finishes loading assets.
 */
export function LoadingScreen() {
  const { progress, active } = useProgress();
  const msgIdx = Math.min(
    Math.floor((progress / 100) * MESSAGES.length),
    MESSAGES.length - 1,
  );

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="loading"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: '#1a1a2e',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Press Start 2P', monospace",
          }}
        >
          {/* Minecraft-style dirt border */}
          <div
            style={{
              border: '4px solid #8B6914',
              outline: '4px solid #5c4010',
              padding: '32px 40px',
              background: '#2a2a3e',
              textAlign: 'center',
              maxWidth: 380,
              width: '90vw',
            }}
          >
            <div style={{ color: '#fff', fontSize: 14, marginBottom: 24 }}>
              Loading World...
            </div>

            {/* Progress track */}
            <div
              className="mc-progress-track"
              style={{ width: '100%', height: 16, marginBottom: 12 }}
            >
              <motion.div
                className="mc-progress-bar"
                style={{ height: '100%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div style={{ color: '#8BC34A', fontSize: 9, marginBottom: 8 }}>
              {MESSAGES[msgIdx]}
            </div>
            <div style={{ color: '#555', fontSize: 8 }}>
              {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
