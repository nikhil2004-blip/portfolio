'use client';
import { Instances, Instance, useTexture } from '@react-three/drei';
import { NearestFilter } from 'three';
import { useGameStore } from '@/store/useGameStore';

import { TREES } from '../buildings/buildings.data';

// ─── Lamp Post positions (Beside paths and spine) ──────
const LAMP_POS: [number, number][] = [
  [-4, -22], [4, -22],   // Beside Row 1 path
  [-4, -13], [4, -13],
  [-4, 3], [4, 3],       // Beside Row 2 path
  [-4, 13], [4, 13],
  [-4, 23], [4, 23],     // Beside Row 3 path
  [-4, 33], [4, 33],
  [-3, -3], [3, -3],     // Near center square
  [-3, -7], [3, -7],
];

export function Decorations() {
  const isNight = useGameStore((s) => s.isNight);
  const logTex   = useTexture('/textures/oak_log.png');
  const logTop   = useTexture('/textures/oak_log_top.png');
  const leavesTex = useTexture('/textures/oak_leaves.png');
  const stoneTex = useTexture('/textures/cobblestone.png');

  [logTex, logTop, leavesTex, stoneTex].forEach((t) => {
    t.magFilter = NearestFilter;
    t.minFilter = NearestFilter;
  });

  const leafColor  = '#3D7220'; // Classic Minecraft leaf green to tint the grayscale leaf texture
  const lanternColor = isNight ? '#ffea00' : '#886600';
  const emissiveIntensity = isNight ? 2.5 : 0;

  // Generate Voxel arrays
  const logBlocks: [number, number, number][] = [];
  const leafBlocks: [number, number, number][] = [];
  const poleBlocks: [number, number, number][] = []; 
  const armBlocks: [number, number, number][] = []; 
  const stoneBlocks: [number, number, number][] = [];
  const lanternBlocks: [number, number, number][] = [];

  // 1. Voxel Trees with Variations
  TREES.forEach(({ x: tx, z: tz, type }) => {
     if (type === 0) {
       // Classic Tree
       for (let y = 1; y <= 5; y++) logBlocks.push([tx, y - 0.5, tz]);
       for (let y = 3; y <= 4; y++) {
         for (let x = -2; x <= 2; x++) {
           for (let z = -2; z <= 2; z++) {
             if (Math.abs(x) === 2 && Math.abs(z) === 2) continue;
             if (x === 0 && z === 0) continue;
             leafBlocks.push([tx + x, y - 0.5, tz + z]);
           }
         }
       }
       for (let x = -1; x <= 1; x++) {
         for (let z = -1; z <= 1; z++) {
           if (Math.abs(x) === 1 && Math.abs(z) === 1) continue;
           if (x === 0 && z === 0) continue;
           leafBlocks.push([tx + x, 4.5, tz + z]);
         }
       }
       leafBlocks.push([tx, 5.5, tz], [tx - 1, 5.5, tz], [tx + 1, 5.5, tz], [tx, 5.5, tz - 1], [tx, 5.5, tz + 1]);
     } else if (type === 1) {
       // Pine Tree (Taller, thinner)
       for (let y = 1; y <= 7; y++) logBlocks.push([tx, y - 0.5, tz]);
       for (let y = 2; y <= 3; y++) {
         for (let x = -2; x <= 2; x++) {
           for (let z = -2; z <= 2; z++) {
             if (Math.abs(x) === 2 || Math.abs(z) === 2) {
               if (Math.random() > 0.5) continue; // Randomly sparse edges
             }
             if (x === 0 && z === 0) continue;
             leafBlocks.push([tx + x, y - 0.5, tz + z]);
           }
         }
       }
       for (let y = 4; y <= 5; y++) {
         for (let x = -1; x <= 1; x++) {
           for (let z = -1; z <= 1; z++) {
             if (x === 0 && z === 0) continue;
             leafBlocks.push([tx + x, y - 0.5, tz + z]);
           }
         }
       }
       leafBlocks.push([tx, 5.5, tz], [tx - 1, 5.5, tz], [tx + 1, 5.5, tz], [tx, 5.5, tz - 1], [tx, 5.5, tz + 1]);
       leafBlocks.push([tx, 6.5, tz]);
       leafBlocks.push([tx, 7.5, tz]);
     } else if (type === 2) {
       // Bushy/Round Tree (Shorter, wider)
       for (let y = 1; y <= 3; y++) logBlocks.push([tx, y - 0.5, tz]);
       for (let y = 2; y <= 4; y++) {
         for (let x = -3; x <= 3; x++) {
           for (let z = -3; z <= 3; z++) {
             // Make it round
             if (x * x + z * z >= 8) continue;
             if (x === 0 && z === 0 && y <= 3) continue;
             leafBlocks.push([tx + x, y - 0.5, tz + z]);
           }
         }
       }
       for (let x = -1; x <= 1; x++) {
         for (let z = -1; z <= 1; z++) {
           if (Math.abs(x) === 1 && Math.abs(z) === 1) continue;
           leafBlocks.push([tx + x, 4.5, tz + z]);
         }
       }
     }
  });

  // 2. Medieval Lamp Posts
  LAMP_POS.forEach(([lx, lz]) => {
      // Thin pole (main stem)
      poleBlocks.push([lx, 1.25, lz]);
      // Small piece sticking out (arm)
      armBlocks.push([lx, 2.75, lz]);
      // Cobblestone base (ground level)
      stoneBlocks.push([lx, -0.5, lz]);
      // Lantern hanging slightly lower from the arm level
      lanternBlocks.push([lx, 2.5, lz]);
  });




  return (
    <group>
      {/* Trees Logs */}
      <Instances limit={logBlocks.length + 10} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial attach="material-0" map={logTex} />
        <meshLambertMaterial attach="material-1" map={logTex} />
        <meshLambertMaterial attach="material-2" map={logTop} />
        <meshLambertMaterial attach="material-3" map={logTop} />
        <meshLambertMaterial attach="material-4" map={logTex} />
        <meshLambertMaterial attach="material-5" map={logTex} />
        {logBlocks.map((pos, i) => <Instance key={i} position={pos} />)}
      </Instances>

      {/* Trees Leaves */}
      <Instances limit={leafBlocks.length + 100} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={leavesTex} color={leafColor} transparent={true} alphaTest={0.5} />
        {leafBlocks.map((pos, i) => <Instance key={i} position={pos} />)}
      </Instances>

      {/* Bases for Lamp Posts */}
      <Instances limit={stoneBlocks.length + 10} frustumCulled={false}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={stoneTex} />
        {stoneBlocks.map((pos, i) => <Instance key={i} position={pos} />)}
      </Instances>

      {/* Thin Poles for Lamp Posts */}
      <Instances limit={poleBlocks.length + 10} frustumCulled={false}>
        <boxGeometry args={[0.15, 3.5, 0.15]} />
        <meshLambertMaterial color="#3B2A1A" />
        {poleBlocks.map((pos, i) => <Instance key={i} position={pos} />)}
      </Instances>

      {/* Cross-arm for Lamp Posts */}
      <Instances limit={armBlocks.length + 10} frustumCulled={false}>
        <boxGeometry args={[0.6, 0.1, 0.1]} />
        <meshLambertMaterial color="#3B2A1A" />
        {armBlocks.map((pos, i) => <Instance key={i} position={pos} />)}
      </Instances>

      {/* Lanterns glowing */}
      <Instances limit={lanternBlocks.length + 10} frustumCulled={false}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={lanternColor}
          emissive={lanternColor}
          emissiveIntensity={emissiveIntensity}
          toneMapped={false}
        />
        {lanternBlocks.map((pos, i) => (
          <group key={i} position={pos}>
            <Instance />
            {isNight && (
              <pointLight distance={10} intensity={2} color="#ffaa00" />
            )}
          </group>
        ))}
      </Instances>
    </group>
  );
}
