'use client';
import { useTexture, Text, Instances, Instance } from '@react-three/drei';
import { NearestFilter } from 'three';
import type { BuildingData } from '@/types/building';
import { useGameStore } from '@/store/useGameStore';
import { BUILDINGS } from './buildings.data';

interface Props extends Pick<BuildingData, 'position' | 'size' | 'name' | 'accentColor' | 'id'> {}

/**
 * Building — A procedurally generated voxel structure that changes
 * style (Medieval, Industrial, Japanese, Chinese) based on its data.
 */
export function Building({ position, size, name, accentColor, id }: Props) {
  const { w, h, d } = size;
  const isNight = useGameStore((s) => s.isNight);

  const style = (BUILDINGS.find(b => b.id === id)?.style || 'medieval') as 'medieval' | 'japanese' | 'chinese' | 'industrial';

  const stoneBrickTex = useTexture('/textures/stone_bricks.png');
  const oakPlankTex = useTexture('/textures/oak_planks.png');
  const bookShelfTex = useTexture('/textures/bookshelf.png');
  const stoneTex = useTexture('/textures/cobblestone.png');
  const logTex   = useTexture('/textures/oak_log.png');
  const logTop   = useTexture('/textures/oak_log_top.png');
  const glassTex = useTexture('/textures/glass.png');

  [stoneBrickTex, oakPlankTex, bookShelfTex, stoneTex, logTex, logTop, glassTex].forEach((t) => {
    t.magFilter = NearestFilter;
    t.minFilter = NearestFilter;
  });

  let wallColor = '#ffffff';
  let roofColor = '#ffffff';
  let pillarColor = '#ffffff';
  
  let useWallTex = oakPlankTex;
  let useRoofTex = oakPlankTex;
  let usePillarTex = logTex;
  let usePillarTopTex = logTop;

  if (style === 'medieval') {
    useWallTex = id === 'skills' ? bookShelfTex : oakPlankTex;
    useRoofTex = stoneBrickTex;
    wallColor = '#eeeeee';
  } else if (style === 'industrial') {
    useWallTex = stoneBrickTex;
    useRoofTex = stoneTex;
    usePillarTex = stoneTex;
    usePillarTopTex = stoneTex;
    wallColor = '#c0c0c0';
  } else if (style === 'japanese') {
    useWallTex = oakPlankTex;
    wallColor = '#fdfdfd'; // White walls
    usePillarTex = oakPlankTex;
    usePillarTopTex = oakPlankTex;
    pillarColor = '#7A0000'; // Dark red pillars
    useRoofTex = stoneTex;
    roofColor = '#3a3a3a'; // Dark grey roof
  } else if (style === 'chinese') {
    useWallTex = oakPlankTex;
    wallColor = '#A01515'; // Firebrick Red walls
    usePillarTex = oakPlankTex;
    usePillarTopTex = oakPlankTex;
    pillarColor = '#DD9000'; // Gold pillars
    useRoofTex = oakPlankTex;
    roofColor = '#E6C200'; // Gold roof
  }

  const wallBlocks: [number, number, number][] = [];
  const logBlocks: [number, number, number][] = [];
  const stoneBlocks: [number, number, number][] = [];
  const roofBlocks: [number, number, number][] = [];
  const glassBlocks: [number, number, number][] = [];
  const lightBlocks: [number, number, number][] = [];

  const push = (arr: [number, number, number][], x: number, y: number, z: number) => {
    arr.push([x - (w - 1) / 2, y + 0.5, z - (d - 1) / 2]);
  };

  // 1. Foundation & Walls & Pillars
  for (let x = 0; x < w; x++) {
    for (let z = 0; z < d; z++) {
      const isWallX = (x === 0 || x === w - 1);
      const isWallZ = (z === 0 || z === d - 1);
      if (!(isWallX || isWallZ)) continue;

      const isCorner = isWallX && isWallZ;
      const mid = (w - 1) / 2;
      const isDoor = z === d - 1 && (
        w % 2 === 0 
          ? (x === Math.floor(mid) || x === Math.ceil(mid)) 
          : (x === mid || x === mid - 1 || x === mid + 1)
      );
      
      const distFromDoor = Math.abs(x - (w - 1) / 2);
      const isFrontWindow = z === d - 1 && !isDoor && distFromDoor >= 2 && distFromDoor <= w / 2 - 1;
      const isSideWindow = isWallX && (z === Math.floor((d - 1) / 2) || z === Math.ceil((d - 1) / 2));
      const isBackWindow = z === 0 && (x === Math.floor((w - 1) / 2) || x === Math.ceil((w - 1) / 2));

      if (isCorner) {
         push(logBlocks, x, 0, z);
      } else if (!isDoor) {
         push(stoneBlocks, x, 0, z);
      }

      for (let y = 1; y < h - 1; y++) {
         if (isCorner) {
             push(logBlocks, x, y, z);
         } else if (isDoor && y <= 1) {
             // Open entryway
         } else {
             const isWindow = (y === 1 || y === 2) && (isFrontWindow || isSideWindow || isBackWindow);
             if (isWindow && !isDoor) {
                 push(glassBlocks, x, y, z);
             } else {
                 push(wallBlocks, x, y, z);
             }
         }
      }
    }
  }

  const ty = h - 1;
  const roofHeightAtZ: number[] = [];
  
  if (style !== 'industrial') {
    // Overhanging ring for medieval/oriental
    for (let x = -1; x <= w; x++) { push(logBlocks, x, ty, -1); push(logBlocks, x, ty, d); }
    for (let z = 0; z < d; z++) { push(logBlocks, -1, ty, z); push(logBlocks, w, ty, z); }
  }

  // Inner top wall layer
  for (let x = 0; x < w; x++) {
      for (let z = 0; z < d; z++) {
          const isWallX = (x === 0 || x === w - 1);
          const isWallZ = (z === 0 || z === d - 1);
          if (isWallX || isWallZ) push(wallBlocks, x, ty, z);
      }
  }

  const zRange = Math.ceil((d - 1) / 2) + 1;
  
  // Roof processing
  if (style === 'industrial') {
      // Flat roof logic
      const rY = ty + 1;
      for (let x = -1; x <= w; x++) {
          for (let z = -1; z <= d; z++) {
              push(roofBlocks, x, rY, z);
          }
      }
  } else {
      // Pitched or Pagoda roof logic
      for (let zStep = 0; zStep <= zRange; zStep++) {
          const z1 = Math.floor((d - 1) / 2) - zStep;
          const z2 = Math.ceil((d - 1) / 2) + zStep;
          
          let ry = ty + 1 + (zRange - zStep);
          // Pagoda curve - ends get flipped up
          if ((style === 'japanese' || style === 'chinese') && zStep === zRange) {
              ry += 1; 
          }
          
          const zSet = Array.from(new Set([z1, z2]));
          
          zSet.forEach(z => {
              if (z < -1 || z > d) return;
              roofHeightAtZ[z] = ry;
              
              for (let x = -1; x <= w; x++) {
                  const isSideEdge = x === -1 || x === w; // gable overhang sides
                  const isOrientalEdge = isSideEdge && (z === -1 || z === d); // Corners for pagoda hooks

                  let rry = ry;
                  if ((style === 'japanese' || style === 'chinese') && isSideEdge) {
                     rry += 1; // Curve up on X edges too
                  }
                  
                  if (style === 'medieval' && isSideEdge) {
                      push(stoneBlocks, x, rry, z); // Cobble trim
                  } else {
                      push(roofBlocks, x, rry, z); // Main roof
                      
                      // Extra decorative flip at corners for oriental styles
                      if ((style === 'japanese' || style === 'chinese') && isOrientalEdge) {
                         push(roofBlocks, x, rry + 1, z);
                         push(lightBlocks, x, rry - 1, z); // hanging lanterns on corners
                      }
                  }
              }
          });
      }

      // Fill gable ends up to roof 
      for (let x = 0; x < w; x++) {
          for (let z = 0; z < d; z++) {
              const isWall = (x === 0 || x === w - 1) || (z === 0 || z === d - 1);
              if (isWall) {
                  const ry = roofHeightAtZ[z];
                  if (ry !== undefined) {
                      for (let y = ty + 1; y < ry; y++) {
                          push(wallBlocks, x, y, z);
                      }
                  }
              }
          }
      }
  }

  // Entrance Lanterns
  const midPoint = (w - 1) / 2;
  const lanternOffset = w % 2 === 0 ? 1.5 : 2;
  push(lightBlocks, midPoint - lanternOffset, 2, d);
  push(lightBlocks, midPoint + lanternOffset, 2, d);

  // Chimney
  if (style === 'medieval' && (id === 'about' || id === 'contact')) {
    const chX = Math.floor(w / 4);
    const chZ = Math.floor(d / 4);
    const roofY = roofHeightAtZ[chZ] ?? ty + 3;
    
    push(stoneBlocks, chX, roofY, chZ);
    push(stoneBlocks, chX, roofY + 1, chZ);
    push(stoneBlocks, chX, roofY + 2, chZ);
  }

  // Coordinates for the sign
  const signY = ty + 0.5;
  const signZ = (d - 1) / 2 + 1.51;

  const lightColor = "#fff1a8";
  const emissiveInt = isNight ? 1.5 : 0;

  return (
    <group position={position}>
      {/* Walls */}
      <Instances limit={wallBlocks.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={useWallTex} color={wallColor} />
        {wallBlocks.map((pos, i) => <Instance key={`w${i}`} position={pos} />)}
      </Instances>

      {/* Pillars and Timber Framing */}
      <Instances limit={logBlocks.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial attach="material-0" map={usePillarTex} color={pillarColor} />
        <meshLambertMaterial attach="material-1" map={usePillarTex} color={pillarColor} />
        <meshLambertMaterial attach="material-2" map={usePillarTopTex} color={pillarColor} />
        <meshLambertMaterial attach="material-3" map={usePillarTopTex} color={pillarColor} />
        <meshLambertMaterial attach="material-4" map={usePillarTex} color={pillarColor} />
        <meshLambertMaterial attach="material-5" map={usePillarTex} color={pillarColor} />
        {logBlocks.map((pos, i) => <Instance key={`p${i}`} position={pos} />)}
      </Instances>

      {/* Roof */}
      <Instances limit={roofBlocks.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={useRoofTex} color={roofColor} />
        {roofBlocks.map((pos, i) => <Instance key={`r${i}`} position={pos} />)}
      </Instances>

      {/* Stone Trim & Foundation */}
      <Instances limit={stoneBlocks.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={stoneTex} />
        {stoneBlocks.map((pos, i) => <Instance key={`s${i}`} position={pos} />)}
      </Instances>

      {/* Light Blocks (Lanterns) */}
      {/* We use individual meshes here because instances can't nest PointLights */}
      {lightBlocks.map((pos, i) => (
        <mesh key={`l${i}`} position={pos}>
            <boxGeometry args={[0.5, 0.8, 0.5]} />
            <meshStandardMaterial 
                color={lightColor} 
                emissive={lightColor}
                emissiveIntensity={emissiveInt} 
                toneMapped={false}
            />
            {isNight && <pointLight intensity={0.8} distance={10} decay={2} color={lightColor} />}
        </mesh>
      ))}

      {/* Colored Stained Glass Windows */}
      <Instances limit={glassBlocks.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={glassTex} transparent opacity={0.6} color={accentColor} />
        {glassBlocks.map((pos, i) => <Instance key={`g${i}`} position={pos} />)}
      </Instances>

      {/* Name Sign mounted on the overhanging log beam */}
      <mesh position={[0, signY, signZ - 0.1]}>
        <boxGeometry args={[name.length * 0.35 + 0.5, 0.6, 0.1]} />
        <meshLambertMaterial map={usePillarTex} color={pillarColor} />
      </mesh>
      <Text
        position={[0, signY, signZ - 0.04]}
        fontSize={0.34}
        color={accentColor}
        font="/fonts/monocraft.ttf"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000"
      >
        {name}
      </Text>
    </group>
  );
}
