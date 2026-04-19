'use client';
import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { isColliding, clampToWorld } from '@/lib/collision';
import { BUILDINGS, ENVIRONMENT_COLLIDERS } from '../buildings/buildings.data';
import { PLAYER_SPEED, PLAYER_HEIGHT } from '@/lib/constants';
import { useGameStore } from '@/store/useGameStore';
import type { RefObject } from 'react';

import { useControls, ControlState } from './useControls';

const GRAVITY = 20;
const JUMP_FORCE = 6.5;

/**
 * useMovement — runs every frame inside useFrame.
 * Moves camera relative to its yaw (Y rotation) so WASD
 * always goes forward/back/left/right relative to mouse look direction!
 * Shift = sprint (2× speed, like Minecraft).
 * Jump logic included.
 */
export function useMovement(controls: RefObject<ControlState>) {
  const { camera } = useThree();
  const overlayOpen = useGameStore((s) => s.overlayOpen);

  // Pre-allocate to avoid GC pressure every frame
  const dir     = useMemo(() => new Vector3(), []);
  const forward = useMemo(() => new Vector3(), []);
  const right   = useMemo(() => new Vector3(), []);
  const nextPos = useMemo(() => new Vector3(), []);
  
  const velocityY = useRef(0);

  const colliders = useMemo(() => [
    ...BUILDINGS.map((b) => b.collider),
    ...ENVIRONMENT_COLLIDERS
  ], []);

  useFrame((_, delta) => {
    if (!controls.current || overlayOpen) return;

    // 1. Calculate X/Z WASD Movement
    dir.set(0, 0, 0);
    
    // Get camera's true world direction
    camera.getWorldDirection(forward);
    forward.y = 0; // Flatten it to horizontal plane
    
    if (forward.lengthSq() > 0.0001) {
      forward.normalize();
      right.copy(forward).cross(camera.up).normalize();

      if (controls.current.w) dir.add(forward);
      if (controls.current.s) dir.sub(forward);
      if (controls.current.a) dir.sub(right);
      if (controls.current.d) dir.add(right);
    }

    if (dir.length() > 0) {
      dir.normalize();
      const speed = controls.current.shift ? PLAYER_SPEED * 1.6 : PLAYER_SPEED;
      dir.multiplyScalar(speed * delta);
    }

    // 2. Physics & Jump Implementation (Y Axis)
    const isOnGround = Math.abs(camera.position.y - PLAYER_HEIGHT) < 0.05;

    if (isOnGround && velocityY.current <= 0) {
      velocityY.current = 0;
      camera.position.y = PLAYER_HEIGHT; // Snap to ground
      
      if (controls.current.space) {
        velocityY.current = JUMP_FORCE;
      }
    } else {
      // Apply gravity
      velocityY.current -= GRAVITY * delta;
    }
    
    // Hard floor limit to prevent falling through map due to huge dt
    if (camera.position.y + velocityY.current * delta < PLAYER_HEIGHT) {
      velocityY.current = 0;
      camera.position.y = PLAYER_HEIGHT;
    }

    // 3. Apply all movement to next position check
    nextPos.copy(camera.position);
    nextPos.x += dir.x;
    nextPos.z += dir.z;
    nextPos.y += velocityY.current * delta;

    // 4. Slide along walls collision math
    const slideX = nextPos.clone();
    slideX.z = camera.position.z; // keep old Z
    const slideZ = nextPos.clone();
    slideZ.x = camera.position.x; // keep old X

    if (!isColliding(nextPos, colliders)) {
      camera.position.copy(nextPos);
    } else if (!isColliding(slideX, colliders)) {
      camera.position.copy(slideX);
    } else if (!isColliding(slideZ, colliders)) {
      camera.position.copy(slideZ);
    } else {
      // Fallback: still apply Y jump falling even if stuck in wall
      camera.position.y = nextPos.y;
    }

    clampToWorld(camera.position);
  });
}
