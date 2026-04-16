import type { BuildingData, AABB } from '@/types/building';
import { User, Archive, Cpu, Wrench, Trophy, Mail, AlertTriangle } from 'lucide-react';

export const BUILDINGS: BuildingData[] = [
  {
    id: 'about',
    name: 'About Me',
    Icon: User,
    accentColor: '#4ADE80',
    position: [-20, 0, -18],
    size: { w: 9, h: 11, d: 9 },
    triggerRadius: 6.5,
    collider: { minX: -24.8, maxX: -15.2, minZ: -22.8, maxZ: -13.8 },
    doorSide: 'south',
    style: 'medieval',
  },
  {
    id: 'projects',
    name: 'Projects',
    Icon: Archive,
    accentColor: '#60A5FA',
    position: [20, 0, -18],
    size: { w: 11, h: 10, d: 9 },
    triggerRadius: 7,
    collider: { minX: 14.2, maxX: 25.8, minZ: -22.8, maxZ: -13.8 },
    doorSide: 'south',
    style: 'industrial',
  },
  {
    id: 'skills',
    name: 'Skills',
    Icon: Cpu,
    accentColor: '#FBBF24',
    position: [-20, 0, 8],
    size: { w: 9, h: 11, d: 9 },
    triggerRadius: 6.5,
    collider: { minX: -24.8, maxX: -15.2, minZ: 3.2, maxZ: 12.2 },
    doorSide: 'south',
    style: 'japanese',
  },
  {
    id: 'tools',
    name: 'Tools',
    Icon: Wrench,
    accentColor: '#FB923C',
    position: [20, 0, 8],
    size: { w: 8, h: 10, d: 8 },
    triggerRadius: 6,
    collider: { minX: 15.7, maxX: 24.3, minZ: 3.7, maxZ: 12.3 },
    doorSide: 'south',
    style: 'japanese',
  },
  {
    id: 'leadership',
    name: 'Experience',
    Icon: Trophy,
    accentColor: '#A78BFA',
    position: [-14, 0, 28],
    size: { w: 10, h: 12, d: 9 },
    triggerRadius: 6.5,
    collider: { minX: -19.3, maxX: -8.7, minZ: 23.2, maxZ: 32.8 },
    doorSide: 'south',
    style: 'chinese',
  },
  {
    id: 'contact',
    name: 'Contact',
    Icon: Mail,
    accentColor: '#F472B6',
    position: [14, 0, 28],
    size: { w: 8, h: 10, d: 8 },
    triggerRadius: 6,
    collider: { minX: 9.7, maxX: 18.3, minZ: 23.7, maxZ: 32.3 },
    doorSide: 'south',
    style: 'medieval',
  },
  {
    id: 'anomaly',
    name: '???',
    Icon: AlertTriangle,
    accentColor: '#FF0044',
    position: [0, 0, -5],
    size: { w: 7, h: 9, d: 7 },
    triggerRadius: 5.5,
    collider: { minX: -3.5, maxX: 3.5, minZ: -8.5, maxZ: -1.5 },
    doorSide: 'south',
    style: 'industrial',
  },
];

export const TREES: { x: number; z: number; type: number }[] = [
  // Original positions + type
  { x: -30, z: -30, type: 0 }, { x: -38, z: -15, type: 1 }, { x: -35, z: 5, type: 2 }, { x: -32, z: 22, type: 0 },
  { x: 32, z: -28, type: 1 }, { x: 38, z: -10, type: 2 }, { x: 35, z: 10, type: 0 }, { x: 30, z: 25, type: 1 },
  { x: -25, z: -45, type: 2 }, { x: 0, z: -42, type: 0 }, { x: 25, z: -45, type: 1 },
  { x: -40, z: 35, type: 2 }, { x: 40, z: 35, type: 0 }, { x: 0, z: 50, type: 1 },
  { x: -20, z: -50, type: 0 }, { x: 20, z: -50, type: 2 }, { x: 45, z: -22, type: 1 },
  { x: -45, z: -5, type: 0 }, { x: 45, z: 5, type: 2 }, { x: 25, z: 45, type: 1 }, { x: -25, z: 45, type: 0 },
  { x: -15, z: -40, type: 2 }, { x: 15, z: -40, type: 0 }, { x: -10, z: 48, type: 1 }, { x: 10, z: 48, type: 2 },
  { x: -45, z: 15, type: 0 }, { x: 45, z: -35, type: 1 }, { x: -35, z: 30, type: 2 }, { x: 38, z: 25, type: 0 },
  { x: -12, z: -32, type: 1 }, { x: 14, z: -34, type: 2 }, { x: -6, z: 38, type: 0 }, { x: 8, z: 38, type: 1 },
  // Perimeter enhancements
  { x: -48, z: -20, type: 1 }, { x: -47, z: -35, type: 2 }, { x: -45, z: 25, type: 0 }, { x: -42, z: 40, type: 1 },
  { x: -35, z: 45, type: 2 }, { x: -18, z: 49, type: 0 }, { x: 18, z: 49, type: 1 }, { x: 35, z: 42, type: 2 },
  { x: 44, z: 30, type: 0 }, { x: 47, z: 15, type: 1 }, { x: 48, z: -5, type: 2 }, { x: 46, z: -18, type: 0 },
  { x: 42, z: -40, type: 1 }, { x: 32, z: -48, type: 2 }, { x: 12, z: -48, type: 0 }, { x: -10, z: -49, type: 1 },
  { x: -32, z: -46, type: 2 }, { x: -45, z: -42, type: 0 }, { x: 35, z: -35, type: 1 }, { x: -35, z: -25, type: 2 },
];

export const TREE_COLLIDERS: AABB[] = TREES.map(t => ({
  minX: t.x - 1.2, maxX: t.x + 1.2,
  minZ: t.z - 1.2, maxZ: t.z + 1.2
}));

export const PERIMETER_COLLIDERS: AABB[] = [
  // North (Negative Z)
  { minX: -52, maxX: 52, minZ: -51.5, maxZ: -50.5 },
  // South (Positive Z)
  { minX: -52, maxX: 52, minZ: 50.5, maxZ: 51.5 },
  // West (Negative X)
  { minX: -51.5, maxX: -50.5, minZ: -52, maxZ: 52 },
  // East (Positive X)
  { minX: 50.5, maxX: 51.5, minZ: -52, maxZ: 52 },
];

export const ENVIRONMENT_COLLIDERS: AABB[] = [
  // Add trees
  ...TREE_COLLIDERS,
  // Add perimeter walls
  ...PERIMETER_COLLIDERS
];
