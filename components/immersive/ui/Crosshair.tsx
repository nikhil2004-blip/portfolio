'use client';
import { useGameStore } from '@/store/useGameStore';

/**
 * Crosshair — Minecraft-style white cross with center gap.
 * Turns yellow-green when near an interactive building.
 */
export function Crosshair() {
  const nearbyBuilding = useGameStore((s) => s.nearbyBuilding);

  return (
    <div
      className={`mc-crosshair${nearbyBuilding ? ' near' : ''}`}
      style={nearbyBuilding ? {
        '--ch-color': '#F5D142',
      } as React.CSSProperties : undefined}
    />
  );
}
