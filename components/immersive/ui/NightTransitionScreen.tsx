'use client';
import { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';

/**
 * NightTransitionScreen — Renders a fullscreen black overlay with a funny message
 * when switching to night mode for the first time. This component uses a double
 * requestAnimationFrame trick to guarantee the browser actually paints the black
 * screen BEFORE we set isNight=true and WebGL starts compiling shaders (which
 * freezes the main thread and prevents any paint).
 */
export function NightTransitionScreen() {
  const isTransitioningNight = useGameStore((s) => s.isTransitioningNight);
  const setNightAndFinish = useGameStore((s) => s._setNightAndFinish);

  useEffect(() => {
    if (!isTransitioningNight) return;

    // Use a solid 500ms delay before triggering the WebGL compilation.
    // This provides a guaranteed window where the browser can paint the
    // loading screen and lets the user actually read the start of the joke
    // before the thread locks up entirely.
    const id = setTimeout(() => {
      setNightAndFinish();
    }, 500);

    return () => clearTimeout(id);
  }, [isTransitioningNight, setNightAndFinish]);

  if (!isTransitioningNight) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99999,
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Press Start 2P', monospace",
      color: '#FCD34D',
      textAlign: 'center',
      padding: 20,
    }}>
      <div style={{ fontSize: 22, marginBottom: 28 }}>🌙 Reticulating Splines...</div>
      <div style={{ fontSize: 9, lineHeight: '2', color: '#aaa', maxWidth: 420 }}>
        Booting up night mode.<br />
        Compiling shaders, plugging in digital lightbulbs,<br />
        and paying the virtual electricity bill.<br /><br />
        <span style={{ color: '#FCD34D' }}>(This only happens once. Probably.)</span>
      </div>
    </div>
  );
}
