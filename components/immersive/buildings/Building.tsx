'use client';
import { useTexture, Text, Instances, Instance } from '@react-three/drei';
import { NearestFilter } from 'three';
import type { BuildingData } from '@/types/building';
import { useGameStore } from '@/store/useGameStore';
import { BUILDINGS } from './buildings.data';

interface Props extends Pick<BuildingData, 'position' | 'size' | 'name' | 'accentColor' | 'id' | 'doorSide'> {}

/**
 * Building — A procedurally generated voxel structure that changes
 * style (Medieval, Industrial, Japanese, Chinese) based on its data.
 */
export function Building({ position, size, name, accentColor, id, doorSide }: Props) {
  const { w, h, d } = size;
  const cx = (w - 1) / 2;
  const cz = (d - 1) / 2;
  const isNight = useGameStore((s) => s.isNight);

  const style = (BUILDINGS.find(b => b.id === id)?.style || 'medieval') as 'medieval' | 'japanese' | 'chinese' | 'industrial';
  const doorFace = doorSide === 'east' ? 'px' : 
                   doorSide === 'west' ? 'nx' : 
                   doorSide === 'south' ? 'pz' : 'nz';

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
    arr.push([x - cx, y + 0.5, z - cz]);
  };

  // 1. Foundation & Walls & Pillars
  for (let x = 0; x < w; x++) {
    for (let z = 0; z < d; z++) {
      const isWallX = (x === 0 || x === w - 1);
      const isWallZ = (z === 0 || z === d - 1);
      if (!(isWallX || isWallZ)) continue;

      const isCorner = isWallX && isWallZ;

      let isDoor = false;

      if (doorFace === 'px' && x === w - 1) {
          isDoor = Math.abs(z - cz) <= 1;
      } else if (doorFace === 'nx' && x === 0) {
          isDoor = Math.abs(z - cz) <= 1;
      } else if (doorFace === 'pz' && z === d - 1) {
          isDoor = Math.abs(x - cx) <= 1;
      } else if (doorFace === 'nz' && z === 0) {
          isDoor = Math.abs(x - cx) <= 1;
      }

      let isWindowCol = false;
      if (!isDoor && !isCorner) {
          if (isWallZ) {
              const distFromMid = Math.abs(x - cx);
              isWindowCol = distFromMid === 1 || distFromMid === 2;
          } else if (isWallX) {
              const distFromMid = Math.abs(z - cz);
              isWindowCol = distFromMid === 1 || distFromMid === 2;
          }
      }

      if (isCorner) {
         push(logBlocks, x, 0, z);
      } else if (!isDoor) {
         push(stoneBlocks, x, 0, z);
      }

      const midY = Math.floor(h / 2);
      for (let y = 1; y < h - 1; y++) {
         if (isCorner) {
             push(logBlocks, x, y, z);
         } else if (isDoor && y <= 1) {
             // Open entryway
         } else if (y === midY) {
             // Second story dividing trim
             if (style === 'medieval' || style === 'industrial') {
                 push(stoneBlocks, x, y, z);
             } else {
                 push(logBlocks, x, y, z);
             }
         } else {
             const isWindowY = (y === midY - 1 || y === Math.max(1, midY - 2) || y === midY + 1 || y === midY + 2);
             
             if (isWindowCol && isWindowY) {
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
              // Add industrial 'warning lights' or lanterns on corners
              if ((x === -1 || x === w) && (z === -1 || z === d)) {
                  push(lightBlocks, x, rY + 0.3, z);
              }
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
                      // Add top lanterns to medieval buildings too
                      if (isOrientalEdge) {
                        push(lightBlocks, x, rry - 1, z);
                      }
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

  // Entrance Lanterns and Awning structure
  const awningZOffset = Math.floor(d / 2) >= 3 ? 2 : 1.5;
  const awningXOffset = Math.floor(w / 2) >= 3 ? 2 : 1.5;
  const lightH = 2; // y=2 is next to door

  // Path extending to walkway
  const pathBlocks: [number, number, number][] = [];
  
  if (doorFace === 'px' || doorFace === 'nx') {
      for (let pz = cz - 1; pz <= cz + 1; pz++) {
          if (doorFace === 'px') { // Door at +x side
              for (let px = w; px <= w + 1; px++) pathBlocks.push([px - cx, -0.49, pz - cz]);
          } else {
              for (let px = -2; px < 0; px++) pathBlocks.push([px - cx, -0.49, pz - cz]);
          }
      }
  } else if (doorFace === 'pz') {
      for (let px = cx - 1; px <= cx + 1; px++) {
          for (let pz = d; pz <= d + 1; pz++) pathBlocks.push([px - cx, -0.49, pz - cz]);
      }
  } else if (doorFace === 'nz') {
      for (let px = cx - 1; px <= cx + 1; px++) {
          for (let pz = -2; pz < 0; pz++) pathBlocks.push([px - cx, -0.49, pz - cz]);
      }
  }

  if (doorFace === 'px') { // Door at x = w - 1
      // Wooden pillars for awning
      push(logBlocks, w, 0, cz - awningZOffset);
      push(logBlocks, w, 1, cz - awningZOffset);
      push(logBlocks, w, 0, cz + awningZOffset);
      push(logBlocks, w, 1, cz + awningZOffset);
      // Awning roof
      for(let az = cz - awningZOffset; az <= cz + awningZOffset; az+=0.5) {
          push(roofBlocks, w, 2, az);
      }
      // Lanterns
      push(lightBlocks, w, lightH, cz - awningZOffset);
      push(lightBlocks, w, lightH, cz + awningZOffset);
  } else if (doorFace === 'nx') { // Door at x = 0
      // Wooden pillars for awning
      push(logBlocks, -1, 0, cz - awningZOffset);
      push(logBlocks, -1, 1, cz - awningZOffset);
      push(logBlocks, -1, 0, cz + awningZOffset);
      push(logBlocks, -1, 1, cz + awningZOffset);
      // Awning roof
      for(let az = cz - awningZOffset; az <= cz + awningZOffset; az+=0.5) {
          push(roofBlocks, -1, 2, az);
      }
      // Lanterns
      push(lightBlocks, -1, lightH, cz - awningZOffset);
      push(lightBlocks, -1, lightH, cz + awningZOffset);
  } else if (doorFace === 'pz') { // Door at z = d - 1
      push(logBlocks, cx - awningXOffset, 0, d);
      push(logBlocks, cx - awningXOffset, 1, d);
      push(logBlocks, cx + awningXOffset, 0, d);
      push(logBlocks, cx + awningXOffset, 1, d);
      for(let ax = cx - awningXOffset; ax <= cx + awningXOffset; ax+=0.5) {
          push(roofBlocks, ax, 2, d);
      }
      push(lightBlocks, cx - awningXOffset, lightH, d);
      push(lightBlocks, cx + awningXOffset, lightH, d);
  } else if (doorFace === 'nz') { // Door at z = 0
      push(logBlocks, cx - awningXOffset, 0, -1);
      push(logBlocks, cx - awningXOffset, 1, -1);
      push(logBlocks, cx + awningXOffset, 0, -1);
      push(logBlocks, cx + awningXOffset, 1, -1);
      for(let ax = cx - awningXOffset; ax <= cx + awningXOffset; ax+=0.5) {
          push(roofBlocks, ax, 2, -1);
      }
      push(lightBlocks, cx - awningXOffset, lightH, -1);
      push(lightBlocks, cx + awningXOffset, lightH, -1);
  }

  // Chimney
  if (style === 'medieval' && (id === 'about' || id === 'contact')) {
    const chX = Math.floor(w / 4);
    const chZ = Math.floor(d / 4);
    const roofY = roofHeightAtZ[chZ] ?? ty + 3;
    
    push(stoneBlocks, chX, roofY, chZ);
    push(stoneBlocks, chX, roofY + 1, chZ);
    push(stoneBlocks, chX, roofY + 2, chZ);
  }

  // ── Interior: floor, ceiling, interior lanterns ────────────────────────
  const interiorFloor: [number,number,number][] = [];
  const interiorCeil: [number,number,number][] = [];
  const interiorLanterns: [number,number,number][] = [];

  for (let x = 1; x < w - 1; x++) {
    for (let z = 1; z < d - 1; z++) {
      interiorFloor.push([x - cx, 0.05, z - cz]); 
    }
  }
  // Ceiling at floor 1 level (just above head height)
  const ceilY = Math.floor(h / 2) - 1;
  for (let x = 1; x < w - 1; x++) {
    for (let z = 1; z < d - 1; z++) {
      interiorCeil.push([x - cx, ceilY, z - cz]);
    }
  }
  // Single central lantern inside for performance
  const lj = ceilY - 1;
  interiorLanterns.push([Math.floor(w/2) - cx, lj, Math.floor(d/2) - cz]);

  // Coordinates and Orientation for the top Banner
  let bannerX = 0;
  let bannerY = Math.floor(h / 2) + 0.6;
  let bannerZ = 0;
  let bannerRot: [number, number, number] = [0, 0, 0];
  
  if (doorFace === 'px') { 
    bannerX = (w - 1) / 2 + 0.52;
    bannerRot = [0, Math.PI / 2, 0];
  } else if (doorFace === 'nx') { 
    bannerX = -((w - 1) / 2 + 0.52);
    bannerRot = [0, -Math.PI / 2, 0];
  } else if (doorFace === 'pz') { 
    bannerZ = (d - 1) / 2 + 0.52;
    bannerRot = [0, 0, 0];
  } else if (doorFace === 'nz') { // Front facing towards camera origin
    bannerZ = -((d - 1) / 2 + 0.52);
    bannerRot = [0, Math.PI, 0];
  }

  const bannerWidth = name.length * 0.75 + 2.0;

  const lightColor = "#fff1a8";
  const emissiveInt = isNight ? 2.5 : 0;

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
            {isNight && <pointLight intensity={1.0} distance={8} decay={2} color={lightColor} />}
        </mesh>
      ))}

      {/* Colored Stained Glass Windows */}
      <Instances limit={glassBlocks.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={glassTex} transparent opacity={0.6} color={accentColor} />
        {glassBlocks.map((pos, i) => <Instance key={`g${i}`} position={pos} />)}
      </Instances>

      {/* ── Interior Floor (oak planks) */}
      <Instances limit={interiorFloor.length}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshLambertMaterial map={oakPlankTex} color="#d4a96a" />
        {interiorFloor.map((pos, i) => <Instance key={`if${i}`} position={pos} />)}
      </Instances>

      {/* ── Path Blocks (stone) */}
      <Instances limit={pathBlocks.length}>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshLambertMaterial map={stoneTex} />
        {pathBlocks.map((pos, i) => <Instance key={`path${i}`} position={pos} />)}
      </Instances>

      {/* ── Interior Ceiling (stone trim) */}
      <Instances limit={interiorCeil.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={stoneBrickTex} color="#cccccc" />
        {interiorCeil.map((pos, i) => <Instance key={`ic${i}`} position={pos} />)}
      </Instances>

      {/* ── Interior Lanterns */}
      {interiorLanterns.map((pos, i) => (
        <mesh key={`il${i}`} position={pos}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color="#fff1a8"
            emissive="#fff1a8"
            emissiveIntensity={isNight ? 2.5 : 1.0}
            toneMapped={false}
          />
          <pointLight intensity={isNight ? 1.2 : 0.5} distance={6} decay={2} color="#fff1a8" />
        </mesh>
      ))}

      {/* ── Large Banner attached to the wall */}
      <group position={[bannerX, bannerY, bannerZ]} rotation={bannerRot}>
        {/* Backing board — taller and wider than before */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[bannerWidth + 1.0, 3.2, 0.25]} />
          <meshLambertMaterial map={usePillarTex} color={pillarColor} />
        </mesh>
        {/* Accent stripe at bottom */}
        <mesh position={[0, -1.4, 0.13]}>
          <boxGeometry args={[bannerWidth + 1.0, 0.4, 0.15]} />
          <meshLambertMaterial color={accentColor} />
        </mesh>
        {/* Banner name text */}
        <Text
          position={[0, 0.4, 0.14]}
          fontSize={0.65}
          color={accentColor}
          font="/fonts/monocraft.ttf"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.04}
          outlineColor="#000"
          maxWidth={bannerWidth - 0.4}
        >
          {name}
        </Text>
        {/* Subtitle / emoji */}
        <Text
          position={[0, -0.7, 0.14]}
          fontSize={0.3}
          color="#ffffff"
          font="/fonts/monocraft.ttf"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000"
          fillOpacity={0.7}
        >
          [ ENTER ]
        </Text>
      </group>
    </group>
  );
}
