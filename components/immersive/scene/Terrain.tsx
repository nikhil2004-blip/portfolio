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

  useLayoutEffect(() => {
    if (!grassRef.current || !pathRef.current) return;
    
    const dummy = new Object3D();
    let grassCount = 0;
    let pathCount = 0;
    // We can piggy-back on this to add some decorative blocks right on top of the ground
    // but the references are not defined yet. Let's just fix the paths here.

    // Generate a 100x100 grid from -50 to +50
    for (let x = -50; x <= 50; x++) {
      for (let z = -50; z <= 50; z++) {
        // Spine of the village
        const isSpine = Math.abs(x) <= 1 && z >= -25 && z <= 35;
        
        // Paths from spine to Row 1 (About/Projects - Doors at z=-18)
        const isPath1 = (z >= -19 && z <= -17) && Math.abs(x) <= 20 && Math.abs(x) > 1;
        
        // Paths to Row 2 (Skills/Tools - Doors at z=8)
        const isPath2 = (z >= 7 && z <= 9) && Math.abs(x) <= 20 && Math.abs(x) > 1;

        // Paths to Row 3 (Experience/Contact - Doors at z=28)
        const isPath3 = (z >= 27 && z <= 29) && Math.abs(x) <= 14 && Math.abs(x) > 1;

        const isCenterSquare = Math.abs(x) <= 3 && z <= -2 && z >= -8;
        const isRoad = isSpine || isPath1 || isPath2 || isPath3 || isCenterSquare;
        
        dummy.position.set(x, -0.5, z); // Ground level sits below y=0
        dummy.updateMatrix();

        if (isRoad) {
          pathRef.current.setMatrixAt(pathCount++, dummy.matrix);
        } else {
          grassRef.current.setMatrixAt(grassCount++, dummy.matrix);
        }
      }
    }
    
    grassRef.current.count = grassCount;
    pathRef.current.count = pathCount;
    grassRef.current.instanceMatrix.needsUpdate = true;
    pathRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      {/* Grass Blocks */}
      <instancedMesh ref={grassRef} args={[undefined, undefined, 10201]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial attach="material-0" map={grassSide} />
        <meshLambertMaterial attach="material-1" map={grassSide} />
        <meshLambertMaterial attach="material-2" map={grassTop} color="#59C93C" />
        <meshLambertMaterial attach="material-3" map={dirt} />
        <meshLambertMaterial attach="material-4" map={grassSide} />
        <meshLambertMaterial attach="material-5" map={grassSide} />
      </instancedMesh>

      {/* Cobblestone Path Blocks */}
      <instancedMesh ref={pathRef} args={[undefined, undefined, 10201]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial map={dirt} />
      </instancedMesh>
    </group>
  );
}
