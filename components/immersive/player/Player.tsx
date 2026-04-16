'use client';
import { useRef, useEffect, useCallback } from 'react';
import { PointerLockControls } from '@react-three/drei';
import { useKeyboard } from './useKeyboard';
import { useMovement } from './useMovement';
import { useProximity } from './useProximity';
import { useThree } from '@react-three/fiber';
import { useGameStore } from '@/store/useGameStore';
import { PLAYER_HEIGHT, SPAWN_X, SPAWN_Z } from '@/lib/constants';

let spawned = false;

/**
 * Player — the camera controller.
 * Must be placed INSIDE <Canvas>.
 */
export function Player() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const keys = useKeyboard();

  const { nearbyBuilding, overlayOpen, openBuilding, closeBuilding } =
    useGameStore();

  // Set spawn position only once when first loading
  useEffect(() => {
    if (!spawned) {
      camera.position.set(SPAWN_X, PLAYER_HEIGHT, SPAWN_Z);
      camera.lookAt(0, PLAYER_HEIGHT, -5);
      spawned = true;
    }
  }, [camera]);

  const requestLock = useCallback(() => {
    // Try PointerLockControls first, then raw canvas fallback
    if (controlsRef.current?.lock) {
      try { controlsRef.current.lock(); } catch (_) {}
    } else {
      const canvas = document.querySelector('canvas');
      if (canvas) canvas.requestPointerLock();
    }
  }, []);

  const releaseLock = useCallback(() => {
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
    if (controlsRef.current?.unlock) {
      try { controlsRef.current.unlock(); } catch (_) {}
    }
  }, []);

  // E / ESC interaction keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyE' && nearbyBuilding && !overlayOpen) {
        openBuilding(nearbyBuilding);
        releaseLock();
        return;
      }
      if (e.code === 'Escape' && overlayOpen) {
        closeBuilding();
        // Small delay to let React re-render the overlay away before requesting lock
        setTimeout(requestLock, 150);
        return;
      }
      if (e.code === 'KeyN') {
        useGameStore.getState().toggleNight();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nearbyBuilding, overlayOpen, openBuilding, closeBuilding, requestLock, releaseLock]);

  // When overlay opens, always release the lock; when it closes, re-acquire
  useEffect(() => {
    if (overlayOpen) {
      releaseLock();
    }
    // Do NOT auto-lock when closing — the ESC handler handles it,
    // and auto-enter via proximity also handles it via clicking canvas.
  }, [overlayOpen, releaseLock]);

  // Intercept global clicks to prevent locking when UI is open
  useEffect(() => {
    const blockClick = (e: MouseEvent) => {
      if (useGameStore.getState().overlayOpen) {
        e.stopPropagation();
      }
    };
    document.addEventListener('click', blockClick, true);
    return () => document.removeEventListener('click', blockClick, true);
  }, []);

  // Movement each frame
  useMovement(keys);

  // Proximity detection each frame
  useProximity();

  return (
    <PointerLockControls
      ref={controlsRef}
      makeDefault
      selector="#game-canvas-container"
    />
  );
}
