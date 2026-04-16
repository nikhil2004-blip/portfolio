'use client';
import { useRef, useEffect, useCallback } from 'react';
import { PointerLockControls } from '@react-three/drei';
import { useKeyboard } from './useKeyboard';
import { useMovement } from './useMovement';
import { useProximity } from './useProximity';
import { useThree, createPortal } from '@react-three/fiber';
import * as THREE from 'three';
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

  const { nearbyBuilding, overlayOpen, openBuilding, closeBuilding, activeSlot } =
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
      if (e.code === 'KeyN' && !overlayOpen && !useGameStore.getState().signboardOpen) {
        useGameStore.getState().triggerNightMode();
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

  // Scroll wheel to cycle inventory slots
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (document.pointerLockElement) {
        useGameStore.setState((s) => {
          let next = s.activeSlot + Math.sign(e.deltaY);
          if (next > 7) next = 0;
          if (next < 0) next = 7;
          return { activeSlot: next };
        });
      }
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Primary click logic (when pointer locked)
  const { scene } = useThree();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Only process left (0) and right (2) clicks when playing the game
      if (!document.pointerLockElement || (e.button !== 0 && e.button !== 2)) return;

      const state = useGameStore.getState();
      
      // 1. Raycast to see if we're looking at a placed signboard
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      
      let clickedSignId = null;
      for (const hit of intersects) {
        if (hit.distance > 5) break; 
        if (hit.object.userData?.isSign && hit.object.userData?.signId) {
          clickedSignId = hit.object.userData.signId;
          break;
        }
      }

      if (clickedSignId) {
        if (e.button === 0) {
          // Left click breaks the sign
          state.removeSign(clickedSignId);
          return;
        } else if (e.button === 2) {
          // Right click edits the sign
          state.setSignboardOpen(true, clickedSignId);
          releaseLock();
          return; 
        }
      }

      // 2. If no sign was clicked, right click while holding Signboard (Slot 7) places it
      if (e.button === 2 && state.activeSlot === 7 && state.visitorSigns.length < 2) {
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        
        // Spawn distance ~2.5 units ahead
        const pos = camera.position.clone().add(dir.multiplyScalar(2.5));
        
        const newSignId = Date.now().toString(36);
        state.addSign({
          id: newSignId,
          name: 'Anonymous', // Default to Anonymous for the text
          message: '',
          position: [pos.x, 0, pos.z],
          rotationY: Math.atan2(dir.x, dir.z), // face away from player
          placedAt: new Date().toISOString()
        });
        
        // Optionally auto-open the sign right away for editing
        setTimeout(() => {
           useGameStore.getState().setSignboardOpen(true, newSignId);
           releaseLock();
        }, 100);
      }
    };

    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [camera, scene, releaseLock]);

  // Movement each frame
  useMovement(keys);

  // Proximity detection each frame
  useProximity();

  // First-person hand item rendering
  const rightHand = (
    <group position={[0.6, -0.4, -0.8]} rotation={[0.1, -0.2, 0.05]} scale={0.4}>
       {/* Small Sign representing the hotbar selection */}
       <mesh position={[0, 0.5, 0]}>
         <boxGeometry args={[0.12, 1.0, 0.12]} />
         <meshLambertMaterial color="#7A4A1A" />
       </mesh>
       <mesh position={[0, 1.25, 0]}>
         <boxGeometry args={[1.1, 0.75, 0.08]} />
         <meshLambertMaterial color="#C8965A" />
       </mesh>
       <mesh position={[0, 1.25, 0.05]}>
         <boxGeometry args={[1.14, 0.79, 0.01]} />
         <meshLambertMaterial color="#A0622A" />
       </mesh>
    </group>
  );

  return (
    <>
      <PointerLockControls
        ref={controlsRef}
        makeDefault
        selector="#game-canvas-container"
      />
      {activeSlot === 7 && createPortal(rightHand, camera)}
    </>
  );
}
