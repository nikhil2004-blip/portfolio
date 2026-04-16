'use client';
import { useRef, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';

interface Keys {
  w: boolean; a: boolean; s: boolean; d: boolean;
  shift: boolean; space: boolean;
}

const INITIAL: Keys = { w: false, a: false, s: false, d: false, shift: false, space: false };

/**
 * useKeyboard — tracks raw key state without causing re-renders.
 * Uses a ref so the 3D game loop reads it every frame without
 * triggering React re-renders on every keypress.
 * Automatically blocks keys when the sign modal is open or an input is focused.
 */
export function useKeyboard() {
  const keys = useRef<Keys>({ ...INITIAL });
  const signboardOpen = useGameStore((s) => s.signboardOpen);

  // When the signboard opens, flush all held keys so the player doesn't drift
  useEffect(() => {
    if (signboardOpen) {
      keys.current = { ...INITIAL };
    }
  }, [signboardOpen]);

  useEffect(() => {
    // Returns true when the player is typing in a text field or the sign modal is open
    const isTyping = () => {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
      return useGameStore.getState().signboardOpen;
    };

    const onDown = (e: KeyboardEvent) => {
      if (isTyping()) return; // block movement while writing on a sign
      if (e.code === 'KeyW')      keys.current.w     = true;
      if (e.code === 'KeyA')      keys.current.a     = true;
      if (e.code === 'KeyS')      keys.current.s     = true;
      if (e.code === 'KeyD')      keys.current.d     = true;
      if (e.code === 'ShiftLeft') keys.current.shift = true;
      if (e.code === 'Space')     keys.current.space = true;
    };

    const onUp = (e: KeyboardEvent) => {
      // Always clear on keyup so no key stays "stuck" after modal closes
      if (e.code === 'KeyW')      keys.current.w     = false;
      if (e.code === 'KeyA')      keys.current.a     = false;
      if (e.code === 'KeyS')      keys.current.s     = false;
      if (e.code === 'KeyD')      keys.current.d     = false;
      if (e.code === 'ShiftLeft') keys.current.shift = false;
      if (e.code === 'Space')     keys.current.space = false;
    };

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup',   onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup',   onUp);
    };
  }, []);

  return keys;
}
