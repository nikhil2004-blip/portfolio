'use client';
import { useRef, useEffect } from 'react';
import { PointerLockControls } from '@react-three/drei';
import { useKeyboard } from './useKeyboard';
import { useMovement } from './useMovement';
import { useProximity } from './useProximity';
import { useThree } from '@react-three/fiber';
import { useGameStore } from '@/store/useGameStore';
import { PLAYER_HEIGHT, SPAWN_X, SPAWN_Z } from '@/lib/constants';
import { BUILDINGS } from '../buildings/buildings.data';

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
      camera.lookAt(0, PLAYER_HEIGHT, -5); // face the center well
      spawned = true;
    }
  }, [camera]);

  // E / ESC interaction keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'KeyE' && nearbyBuilding && !overlayOpen) {
        openBuilding(nearbyBuilding);
        document.exitPointerLock();
        return;
      }
      if (e.code === 'Escape' && overlayOpen) {
        closeBuilding();
        setTimeout(() => {
          const canvas = document.querySelector('canvas');
          if (canvas) canvas.requestPointerLock();
        }, 200);
      }
      if (e.code === 'KeyN') {
        useGameStore.getState().toggleNight();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nearbyBuilding, overlayOpen, openBuilding, closeBuilding]);

  // Movement each frame
  useMovement(keys);

  // Proximity detection each frame
  useProximity();

  return (
    <PointerLockControls
      ref={controlsRef}
      makeDefault
      // Prevent default ESC handler from fighting ours
      onUpdate={(ctrl) => {
        // no-op
      }}
    />
  );
}
