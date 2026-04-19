'use client';
import { useGameStore } from '@/store/useGameStore';
import Link from 'next/link';
import { Crosshair } from './Crosshair';
import { InteractPrompt } from './InteractPrompt';

/**
 * HUD — the always-visible in-world overlay.
 * Top bar: location + mute + ESC hint.
 * Center: crosshair.
 * Bottom: interact prompt (conditional).
 */
export function HUD() {
  const { nearbyBuilding, overlayOpen, audioEnabled, toggleAudio, isNight, triggerNightMode, isTransitioningNight, setGlobalGuestbookOpen } =
    useGameStore();

  if (overlayOpen) return null;

  return (
    <>
      {/* ── Top bar ──────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 25,
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: '#ccc',
        }}
      >
        {/* Left: location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#6b6b6b' }}>📍</span>
          <span>
            {nearbyBuilding
              ? `Near: ${nearbyBuilding.charAt(0).toUpperCase() + nearbyBuilding.slice(1)}`
              : 'Village Center'}
          </span>
        </div>

        {/* Right: ESC hint + Home + Night toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => window.location.replace('/')}
            style={{
              background: 'none',
              border: '1px solid #333',
              padding: '1px 6px',
              borderRadius: '2px',
              color: '#888',
              fontSize: 10,
              cursor: 'pointer',
              fontFamily: 'inherit',
              textTransform: 'uppercase'
            }}
            className="hover:text-white transition-colors"
          >
            HOME
          </button>
          <button
            onClick={triggerNightMode}
            title={isNight ? 'Switch to Day' : 'Switch to Night'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              padding: '2px 4px',
              color: isNight ? '#E0E7FF' : '#FCD34D',
            }}
          >
            {isNight ? '🌙' : '☀️'}
          </button>
          <span style={{ color: '#444', fontSize: 10 }}>
            Click canvas to lock cursor
          </span>
        </div>
      </div>

      {/* ── Crosshair ─────────────────────────────── */}
      <Crosshair />

      {/* ── Interact prompt ───────────────────────── */}
      <InteractPrompt />

    </>
  );
}
