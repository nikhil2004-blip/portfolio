'use client';
import { useRef, useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';

export interface ControlState {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  shift: boolean;
  space: boolean;
  // joystick values for smoother mobile movement if needed
  joystickX: number;
  joystickY: number;
}

const INITIAL: ControlState = { 
  w: false, a: false, s: false, d: false, 
  shift: false, space: false,
  joystickX: 0, joystickY: 0
};

/**
 * useControls — tracks input state (keyboard + virtual) without causing re-renders.
 */
export function useControls() {
  const controls = useRef<ControlState>({ ...INITIAL });

  useEffect(() => {
    const isTyping = () => {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
      return useGameStore.getState().signboardOpen;
    };

    const unsubscribe = useGameStore.subscribe(
      (state) => state.signboardOpen,
      (isOpen) => {
        if (isOpen) {
          // Reset but preserve joystick if we're technically still touching it?
          // Actually, if signboard is open, we usually want total halt.
          controls.current = { ...INITIAL };
        }
      }
    );

    const onDown = (e: KeyboardEvent) => {
      if (isTyping()) return;
      if (e.code === 'KeyW')      controls.current.w     = true;
      if (e.code === 'KeyA')      controls.current.a     = true;
      if (e.code === 'KeyS')      controls.current.s     = true;
      if (e.code === 'KeyD')      controls.current.d     = true;
      if (e.code === 'ShiftLeft') controls.current.shift = true;
      if (e.code === 'Space')     controls.current.space = true;
    };

    const onUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW')      controls.current.w     = false;
      if (e.code === 'KeyA')      controls.current.a     = false;
      if (e.code === 'KeyS')      controls.current.s     = false;
      if (e.code === 'KeyD')      controls.current.d     = false;
      if (e.code === 'ShiftLeft') controls.current.shift = false;
      if (e.code === 'Space')     controls.current.space = false;
    };

    const clearControls = () => {
      controls.current = { ...INITIAL };
    };

    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup',   onUp);
    window.addEventListener('blur', clearControls);
    document.addEventListener('pointerlockchange', clearControls);
    
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup',   onUp);
      window.removeEventListener('blur', clearControls);
      document.removeEventListener('pointerlockchange', clearControls);
      unsubscribe();
    };
  }, []);

  return controls;
}
