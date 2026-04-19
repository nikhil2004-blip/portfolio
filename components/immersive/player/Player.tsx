'use client';
import { useRef, useEffect, useCallback, useMemo } from 'react';
import { PointerLockControls } from '@react-three/drei';
import { useKeyboard } from './useKeyboard';
import { useMovement } from './useMovement';
import { useProximity } from './useProximity';
import { useThree, createPortal } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '@/store/useGameStore';
import { PLAYER_HEIGHT, SPAWN_X, SPAWN_Z } from '@/lib/constants';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

let spawned = false;

/**
 * Player — the camera controller.
 * Must be placed INSIDE <Canvas>.
 */
export function Player() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const keys = useKeyboard();

  const nearbyBuilding = useGameStore(s => s.nearbyBuilding);
  const overlayOpen = useGameStore(s => s.overlayOpen);
  const openBuilding = useGameStore(s => s.openBuilding);
  const closeBuilding = useGameStore(s => s.closeBuilding);
  const activeSlot = useGameStore(s => s.activeSlot);
  const globalGuestbookOpen = useGameStore(s => s.globalGuestbookOpen);
  const signboardOpen = useGameStore(s => s.signboardOpen);

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
      if (e.code === 'Escape') {
        const state = useGameStore.getState();
        if (overlayOpen) {
          closeBuilding();
          setTimeout(requestLock, 150);
          return;
        }
        if (state.globalGuestbookOpen) {
          state.setGlobalGuestbookOpen(false);
          setTimeout(requestLock, 150);
          return;
        }
        if (state.signboardOpen) {
          state.setSignboardOpen(false);
          setTimeout(requestLock, 150);
          return;
        }
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
    if (overlayOpen || globalGuestbookOpen || signboardOpen) {
      releaseLock();
    }
    // Do NOT auto-lock when closing — the ESC handler handles it,
    // and auto-enter via proximity also handles it via clicking canvas.
  }, [overlayOpen, globalGuestbookOpen, signboardOpen, releaseLock]);

  // Intercept global clicks to prevent locking when UI is open
  useEffect(() => {
    const blockClick = (e: MouseEvent) => {
      const state = useGameStore.getState();
      if (state.overlayOpen || state.globalGuestbookOpen || state.signboardOpen) {
        // Only block if the user somehow clicked the underlying canvas while a modal is up
        if (e.target instanceof HTMLElement && e.target.tagName.toLowerCase() === 'canvas') {
          e.stopPropagation();
        }
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
  const removeSignConvex = useMutation(api.signs.remove);
  const rawSigns = useQuery(api.signs.get);
  const convexSigns = useMemo(() => rawSigns || [], [rawSigns]);
  
  useEffect(() => {
    let breakingTimer: NodeJS.Timeout | null = null;
    let currentBreakingId: string | null = null;

    const doRaycast = () => {
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      
      for (const hit of intersects) {
        if (hit.distance > 5) break; 
        if (hit.object.userData?.isSign && hit.object.userData?.signId) {
          return { id: hit.object.userData.signId, uid: hit.object.userData.uid };
        }
      }
      return null;
    };

    const onMouseDown = (e: MouseEvent) => {
      if (!document.pointerLockElement || (e.button !== 0 && e.button !== 2)) return;

      const state = useGameStore.getState();
      const clicked = doRaycast();

      if (clicked) {
         if (clicked.uid === state.visitorId) {
           if (e.button === 2) {
             // Right click down - start breaking/editing
             state.setBreakingSignId(clicked.id);
             currentBreakingId = clicked.id;
             breakingTimer = setTimeout(() => {
                removeSignConvex({ id: clicked.id as any });
                useGameStore.getState().setBreakingSignId(null);
                currentBreakingId = null;
             }, 350); // Snappier 350ms long press
             return;
           }
         }
         return; // Clicked a sign, stop here
      }

      // No sign clicked. If Left Click (button 0) + Slot 7: Place
      if (e.button === 0 && state.activeSlot === 7) {
        const mySigns = convexSigns.filter(s => s.uid === state.visitorId);
        if (mySigns.length < 2) {
          const dir = new THREE.Vector3();
          camera.getWorldDirection(dir);
          const pos = camera.position.clone().add(dir.multiplyScalar(2.5));
          state.startPlacingSign({
            position: [pos.x, 0, pos.z],
            rotationY: Math.atan2(dir.x, dir.z),
          });
          releaseLock();
        }
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 2 && currentBreakingId) {
        if (breakingTimer) clearTimeout(breakingTimer);
        useGameStore.getState().setBreakingSignId(null);
        
        // Treat as a short right-click -> edit
        useGameStore.getState().setSignboardOpen(true, currentBreakingId);
        releaseLock();
        currentBreakingId = null;
      }
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (breakingTimer) clearTimeout(breakingTimer);
    };
  }, [camera, scene, releaseLock, convexSigns, removeSignConvex]);

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
