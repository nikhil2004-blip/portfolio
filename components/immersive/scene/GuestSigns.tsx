'use client';
import { Text } from '@react-three/drei';
import { useGameStore } from '@/store/useGameStore';



export function GuestSigns() {
  const visitorSigns = useGameStore((s) => s.visitorSigns);

  return (
    <group>
      {visitorSigns.map((sign) => {
        return (
          <group key={sign.id} position={sign.position} rotation={[0, sign.rotationY || 0, 0]}>
            {/* Wooden post */}
            <mesh position={[0, 0.5, 0]} userData={{ isSign: true, signId: sign.id }}>
              <boxGeometry args={[0.12, 1.0, 0.12]} />
              <meshLambertMaterial color="#7A4A1A" />
            </mesh>

            {/* Sign face */}
            <mesh position={[0, 1.25, 0]} userData={{ isSign: true, signId: sign.id }}>
              <boxGeometry args={[1.1, 0.75, 0.08]} />
              <meshLambertMaterial color="#C8965A" />
            </mesh>

            {/* Dark edge on sign face (now centered to frame both sides) */}
            <mesh position={[0, 1.25, 0]} userData={{ isSign: true, signId: sign.id }}>
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
      })}
    </group>
  );
}
