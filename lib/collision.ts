import { Vector3 } from 'three';
import type { AABB } from '@/types/building';
import { PLAYER_RADIUS, WORLD_SIZE, BOUNDARY_MARGIN } from './constants';

/**
 * Returns true if the given position collides with any AABB collider.
 */
export function isColliding(pos: Vector3, colliders: AABB[]): boolean {
  const r = PLAYER_RADIUS;
  return colliders.some(
    (box) =>
      pos.x - r < box.maxX &&
      pos.x + r > box.minX &&
      pos.z - r < box.maxZ &&
      pos.z + r > box.minZ,
  );
}

/**
 * Clamps position inside the world boundary.
 */
export function clampToWorld(pos: Vector3): Vector3 {
  const half = WORLD_SIZE / 2 - BOUNDARY_MARGIN;
  pos.x = Math.max(-half, Math.min(half, pos.x));
  pos.z = Math.max(-half, Math.min(half, pos.z));
  return pos;
}
