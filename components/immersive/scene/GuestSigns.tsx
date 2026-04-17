'use client';
import { Text } from '@react-three/drei';
import { useGameStore } from '@/store/useGameStore';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SignItem({ sign, breakingSignId }: { sign: any; breakingSignId: string | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const basePos = useRef(new THREE.Vector3().fromArray(sign.position));

  useFrame(() => {
    if (groupRef.current) {
      if (breakingSignId === sign._id) {
        const shakeX = (Math.random() - 0.5) * 0.1;
        const shakeY = (Math.random() - 0.5) * 0.1;
        const shakeZ = (Math.random() - 0.5) * 0.1;
        groupRef.current.position.set(
          basePos.current.x + shakeX,
          basePos.current.y + shakeY,
          basePos.current.z + shakeZ
        );
      } else {
        groupRef.current.position.copy(basePos.current);
      }
    }
  });

  return (
    <group ref={groupRef} position={sign.position} rotation={[0, sign.rotationY || 0, 0]}>
      {/* Wooden post */}
      <mesh position={[0, 0.5, 0]} userData={{ isSign: true, signId: sign._id, uid: sign.uid }}>
        <boxGeometry args={[0.12, 1.0, 0.12]} />
        <meshLambertMaterial color="#7A4A1A" />
      </mesh>

      {/* Sign face */}
      <mesh position={[0, 1.25, 0]} userData={{ isSign: true, signId: sign._id, uid: sign.uid }}>
        <boxGeometry args={[1.1, 0.75, 0.08]} />
        <meshLambertMaterial color="#C8965A" />
      </mesh>

      {/* Dark edge on sign face */}
      <mesh position={[0, 1.25, 0]} userData={{ isSign: true, signId: sign._id, uid: sign.uid }}>
        <boxGeometry args={[1.14, 0.79, 0.04]} />
        <meshLambertMaterial color="#A0622A" />
      </mesh>

      <group>
        {/* Front Text */}
        <Text
          position={[0, 1.4, 0.056]}
          fontSize={0.08}
          color="#2A1000"
          maxWidth={1.0}
          textAlign="center"
          anchorY="top"
          overflowWrap="break-word"
        >
          {sign.message || 'Click to edit...'}
        </Text>
        <Text
          position={[0, 1.0, 0.056]}
          fontSize={0.06}
          color="#5A2A00"
          maxWidth={1.0}
          textAlign="right"
          anchorY="bottom"
        >
          {`— ${sign.name || 'Anonymous'}`}
        </Text>

        {/* Back Text */}
        <Text
          position={[0, 1.4, -0.056]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.08}
          color="#2A1000"
          maxWidth={1.0}
          textAlign="center"
          anchorY="top"
          overflowWrap="break-word"
        >
          {sign.message || 'Click to edit...'}
        </Text>
        <Text
          position={[0, 1.0, -0.056]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.06}
          color="#5A2A00"
          maxWidth={1.0}
          textAlign="right"
          anchorY="bottom"
        >
          {`— ${sign.name || 'Anonymous'}`}
        </Text>
      </group>
    </group>
  );
}

export function GuestSigns() {
  const convexSigns = useQuery(api.signs.get) || [];
  const breakingSignId = useGameStore((state) => state.breakingSignId);

  return (
    <group>
      {convexSigns.map((sign) => (
        <SignItem key={sign._id} sign={sign} breakingSignId={breakingSignId} />
      ))}
    </group>
  );
}
