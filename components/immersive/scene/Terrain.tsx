'use client';
import { useRef, useLayoutEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { InstancedMesh, Object3D, NearestFilter } from 'three';

/**
 * Terrain — A flat 100x100 grid of 1x1x1 grass and path voxels.
 * NearestFilter is strictly applied for the pixelated Minecraft look.
 */
export function Terrain() {
  const grassTop = useTexture('/textures/grass_block_top.png');
  const grassSide = useTexture('/textures/grass_block_side.png');
  const dirt = useTexture('/textures/dirt.png');
  const cobble = useTexture('/textures/cobblestone.png');

  [grassTop, grassSide, dirt, cobble].forEach((t) => {
    t.magFilter = NearestFilter;
    t.minFilter = NearestFilter;
  });

  const grassRef = useRef<InstancedMesh>(null);
  const pathRef = useRef<InstancedMesh>(null);
  const stoneRef = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!grassRef.current || !pathRef.current || !stoneRef.current) return;
    
    const dummy = new Object3D();
    let grassCount = 0;
    let pathCount = 0;
    let stoneCount = 0;

    // 1. Generate Ground (-50 to 50)
    for (let x = -50; x <= 50; x++) {
      for (let z = -50; z <= 50; z++) {
        const isSpine = Math.abs(x) <= 1 && z >= -25 && z <= 35;
        const isPath1 = (z >= -19 && z <= -17) && Math.abs(x) <= 20 && Math.abs(x) > 1;
        const isPath2 = (z >= 7 && z <= 9) && Math.abs(x) <= 20 && Math.abs(x) > 1;
        const isPath3 = (z >= 27 && z <= 29) && Math.abs(x) <= 14 && Math.abs(x) > 1;

        const isCenterSquare = Math.abs(x) <= 3 && z <= -2 && z >= -8;
        const isRoad = isSpine || isPath1 || isPath2 || isPath3 || isCenterSquare;
        
        dummy.position.set(x, -0.5, z);
        dummy.updateMatrix();

        if (isRoad) {
          pathRef.current.setMatrixAt(pathCount++, dummy.matrix);
        } else {
          grassRef.current.setMatrixAt(grassCount++, dummy.matrix);
        }
      }
    }

    // 2. Generate Perimeter Fence (-51 and 51)
    // Post-and-rail design: thin vertical pillars + horizontal bars
    const placeFenceSection = (x: number, z: number, isVerticalZ: boolean) => {
      // 2.1 Vertical Post (every block)
      dummy.position.set(x, 0.75, z); // Center of pillar (height 1.5)
      dummy.scale.set(0.2, 1.5, 0.2); // Thin pillar, not taller than player
      dummy.updateMatrix();
      stoneRef.current?.setMatrixAt(stoneCount++, dummy.matrix);

      // 2.2 Horizontal Rails
      // Top rail
      dummy.position.set(x, 1.2, z);
      if (isVerticalZ) {
        dummy.scale.set(0.08, 0.08, 1.0); // Longitudinal on Z
      } else {
        dummy.scale.set(1.0, 0.08, 0.08); // Longitudinal on X
      }
      dummy.updateMatrix();
      stoneRef.current?.setMatrixAt(stoneCount++, dummy.matrix);

      // Bottom rail
      dummy.position.set(x, 0.5, z);
      dummy.updateMatrix();
      stoneRef.current?.setMatrixAt(stoneCount++, dummy.matrix);
      
      // Reset scale for next operations if any
      dummy.scale.set(1, 1, 1);
    };

    // North & South walls (Horizontal bars along X)
    for (let x = -51; x <= 51; x++) {
      placeFenceSection(x, -51, false);
      placeFenceSection(x, 51, false);
    }
    // East & West walls (Horizontal bars along Z)
    for (let z = -50; z <= 50; z++) {
      placeFenceSection(-51, z, true);
      placeFenceSection(51, z, true);
    }
    
    grassRef.current.count = grassCount;
    pathRef.current.count = pathCount;
    stoneRef.current.count = stoneCount;

    grassRef.current.instanceMatrix.needsUpdate = true;
    pathRef.current.instanceMatrix.needsUpdate = true;
    stoneRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      {/* Grass Blocks */}
      <instancedMesh ref={grassRef} args={[undefined, undefined, 11000]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial attach="material-0" map={grassSide} />
        <meshLambertMaterial attach="material-1" map={grassSide} />
        <meshLambertMaterial attach="material-2" map={grassTop} color="#59C93C" />
        <meshLambertMaterial attach="material-3" map={dirt} />
        <meshLambertMaterial attach="material-4" map={grassSide} />
        <meshLambertMaterial attach="material-5" map={grassSide} />
      </instancedMesh>

      {/* Cobblestone Path Blocks */}
      <instancedMesh ref={pathRef} args={[undefined, undefined, 5000]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={cobble} />
      </instancedMesh>

      {/* Perimeter Fence Blocks (Combined Posts and Rails) */}
      <instancedMesh ref={stoneRef} args={[undefined, undefined, 3000]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={cobble} />
      </instancedMesh>
    </group>
  );
}
