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
      // Calculate the specific "gate" position based on building orientation
      let gateX = b.position[0];
      let gateZ = b.position[2];

      const halfW = b.size.w / 2;
      const halfD = b.size.d / 2;

      if (b.doorSide === 'east') gateX += halfW;
      else if (b.doorSide === 'west') gateX -= halfW;
      else if (b.doorSide === 'south') gateZ += halfD;
      else if (b.doorSide === 'north') gateZ -= halfD;

      const dx   = camera.position.x - gateX;
      const dz   = camera.position.z - gateZ;
      const dist = Math.sqrt(dx * dx + dz * dz);

      // Proximity for the HUD prompt (showing building name)
      // We use a 4.5 unit radius around the gate specifically
      if (dist < 4.5 && dist < closestDist) {
        closest     = b.id;
        closestDist = dist;
      }

      // AUTO-ENTER: We only open the building if the player is right at the gate
      const autoEnterRadius = 2.0; 
      const autoResetRadius = 5.0;

      if (dist < autoEnterRadius && closest === b.id && lastClosedBuildingRef.current !== b.id) {
          openBuilding(b.id);
          if (document.pointerLockElement) {
            document.exitPointerLock();
          }
          return;
      }

      if (lastClosedBuildingRef.current === b.id && dist > autoResetRadius) {
          lastClosedBuildingRef.current = null;
      }
    }

    setNearbyBuilding(closest);
  });
}
