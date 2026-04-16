'use client';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGameStore } from '@/store/useGameStore';
import { BUILDINGS } from '../buildings/buildings.data';
import { INTERACTION_DIST } from '@/lib/constants';

/**
 * useProximity — runs every frame, checks XZ distance to each building.
 * Updates nearbyBuilding in the Zustand store.
 * Short circuits when overlay is open.
 */
export function useProximity() {
  const { camera } = useThree();
  const setNearbyBuilding  = useGameStore((s) => s.setNearbyBuilding);
  const openBuilding       = useGameStore((s) => s.openBuilding);
  const activeBuilding     = useGameStore((s) => s.activeBuilding);
  const overlayOpen        = useGameStore((s) => s.overlayOpen);

  // Track the last building that was closed to prevent auto-reopening instantly
  // Using a ref to persist across frames without causing re-renders
  const lastClosedBuildingRef = useRef<string | null>(null);

  useFrame(() => {
    if (overlayOpen) {
      if (activeBuilding) lastClosedBuildingRef.current = activeBuilding;
      return;
    }

    let closest: string | null = null;
    let closestDist = Infinity;

    for (const b of BUILDINGS) {
      const dx   = camera.position.x - b.position[0];
      const dz   = camera.position.z - b.position[2];
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < b.triggerRadius && dist < closestDist) {
        closest     = b.id;
        closestDist = dist;
      }

      // Use dynamic auto-enter radius based on building size. 
      // Made larger so the player easily enters when bumping against the building
      const maxDim = Math.max(b.size.w, b.size.d) / 2;
      const autoEnterRadius = maxDim + 2.5; 
      const autoResetRadius = autoEnterRadius + 1.5;

      // AUTO-ENTER: If extremely close (inside the autoEnter limit)
      // and NOT the building we just closed (unless we moved away and came back)
      if (dist < autoEnterRadius && closest === b.id && lastClosedBuildingRef.current !== b.id) {
          openBuilding(b.id);
          // Release mouse immediately for cinematic entry
          if (document.pointerLockElement) {
            document.exitPointerLock();
          }
          return;
      }

      // Reset the "last closed" filter if we moved away from it
      if (lastClosedBuildingRef.current === b.id && dist > autoResetRadius) {
          lastClosedBuildingRef.current = null;
      }
    }

    setNearbyBuilding(closest);
  });
}
