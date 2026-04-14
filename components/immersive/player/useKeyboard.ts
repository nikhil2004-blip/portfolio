'use client';
import { useRef, useEffect } from 'react';

interface Keys {
  w: boolean; a: boolean; s: boolean; d: boolean;
  shift: boolean; space: boolean;
}

const INITIAL: Keys = { w: false, a: false, s: false, d: false, shift: false, space: false };

/**
 * useKeyboard — tracks raw key state without causing re-renders.
 * Uses a ref so the 3D game loop reads it every frame without
 * triggering React re-renders on every keypress.
 */
export function useKeyboard() {
  const keys = useRef<Keys>({ ...INITIAL });

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyW')      keys.current.w     = true;
      if (e.code === 'KeyA')      keys.current.a     = true;
      if (e.code === 'KeyS')      keys.current.s     = true;
      if (e.code === 'KeyD')      keys.current.d     = true;
      if (e.code === 'ShiftLeft') keys.current.shift = true;
      if (e.code === 'Space')     keys.current.space = true;
    };
    const onUp = (e: KeyboardEvent) => {
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
