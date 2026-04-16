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

/**
 * LoadingScreen — A "yellow dashboard" loading screen with funny sarcastic text
 * Disappears automatically when Three.js finishes loading assets.
 */
export function LoadingScreen() {
  const { progress, active, item } = useProgress();
  const msgIdx = Math.min(
    Math.floor((progress / 100) * MESSAGES.length),
    MESSAGES.length - 1,
  );

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="loading"
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: '#FDE047', // vivid yellow background
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Space Mono', 'Courier New', monospace",
            color: '#111827',
          }}
        >
          <div
            style={{
              width: '90%',
              maxWidth: 600,
              border: '4px solid #111827',
              background: '#FEF08A',
              padding: '2rem',
              boxShadow: '12px 12px 0px 0px rgba(17,24,39,1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid #111827', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0, textTransform: 'uppercase' }}>
                System Boot
              </h1>
              <div style={{ fontWeight: 700 }}>
                {Math.round(progress)}%
              </div>
            </div>

            <div style={{ marginBottom: '2rem', minHeight: 60 }}>
              <p style={{ fontWeight: 600, fontSize: '1.1rem', margin: 0 }}>
                {MESSAGES[msgIdx] || 'Doing something computationally expensive...'}
              </p>
              {item && (
                <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  Processing: {item}
                </p>
              )}
            </div>

            {/* Progress track */}
            <div
              style={{
                width: '100%',
                height: 24,
                border: '3px solid #111827',
                background: '#FEF9C3',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  background: '#111827',
                  width: '0%', // Starting width
                }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
              {/* Optional hazard stripes over the bar for that dashboard look */}
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none',
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 10px, #ffffff 20px)'
              }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 700 }}>
              <span>STATUS: PANICKING</span>
              <span>PLEASE DO NOT REFRESH</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
