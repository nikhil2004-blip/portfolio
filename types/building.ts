export interface AABB {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface BuildingData {
  id: string;
  name: string;
  emoji: string;
  accentColor: string;
  position: [number, number, number];   // world-space XYZ
  size: { w: number; h: number; d: number };
  triggerRadius: number;
  collider: AABB;
  doorSide: 'south' | 'north' | 'east' | 'west';
  style?: 'medieval' | 'japanese' | 'chinese' | 'industrial';
}
