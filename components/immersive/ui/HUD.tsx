'use client';
import { useGameStore } from '@/store/useGameStore';
import { Crosshair } from './Crosshair';
import { InteractPrompt } from './InteractPrompt';

/**
 * HUD — the always-visible in-world overlay.
 * Top bar: location + mute + ESC hint.
 * Center: crosshair.
 * Bottom: interact prompt (conditional).
 */
export function HUD() {
  const { nearbyBuilding, overlayOpen, audioEnabled, toggleAudio, isNight, triggerNightMode, isTransitioningNight } =
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

        {/* Right: mute + ESC hint */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={toggleAudio}
            title={audioEnabled ? 'Mute' : 'Unmute'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              padding: '2px 4px',
              color: audioEnabled ? '#FFD700' : '#555',
            }}
          >
            {audioEnabled ? '🔊' : '🔇'}
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

      {/* ── Night Mode Transition ─────────────────── */}
      {isTransitioningNight && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Press Start 2P', monospace",
          color: '#FCD34D',
          textAlign: 'center',
          padding: 20
        }}>
          <div style={{ fontSize: 24, marginBottom: 20 }}>Reticulating Splines...</div>
          <div style={{ fontSize: 10, lineHeight: '1.6', color: '#ccc', maxWidth: 400 }}>
            Booting up night mode.<br/><br/>
            Compiling shaders, plugging in digital lightbulbs, and paying the virtual electricity bill.<br/><br/>
            (This only takes 2-3 seconds the first time. Probably.)
          </div>
        </div>
      )}
    </>
  );
}
