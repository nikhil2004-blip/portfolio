'use client';
import { Html } from '@react-three/drei';
import { useGameStore } from '@/store/useGameStore';

// Fixed world positions for each sign slot, just south of the Anomaly building entrance
const SIGN_POSITIONS: Record<1 | 2, [number, number, number]> = {
  1: [2, 0, -0.5],
  2: [-2, 0, -0.5],
};

export function GuestSigns() {
  const visitorSigns = useGameStore((s) => s.visitorSigns);

  return (
    <group>
      {visitorSigns.map((sign) => {
        const pos = SIGN_POSITIONS[sign.slot];
        return (
          <group key={sign.id} position={pos}>
            {/* Wooden post */}
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.12, 1.0, 0.12]} />
              <meshLambertMaterial color="#7A4A1A" />
            </mesh>

            {/* Sign face */}
            <mesh position={[0, 1.25, 0]}>
              <boxGeometry args={[1.1, 0.75, 0.08]} />
              <meshLambertMaterial color="#C8965A" />
            </mesh>

            {/* Dark edge on sign face */}
            <mesh position={[0, 1.25, 0.05]}>
              <boxGeometry args={[1.14, 0.79, 0.01]} />
              <meshLambertMaterial color="#A0622A" />
            </mesh>

            {/* HTML label — renders the text on the sign */}
            <Html
              position={[0, 1.25, 0.1]}
              center
              occlude={false}
              transform={false}
              style={{ pointerEvents: 'none' }}
            >
              <div style={{
                width: 90,
                padding: '2px 4px',
                background: 'transparent',
                textAlign: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                lineHeight: 1.3,
                userSelect: 'none',
              }}>
                <div style={{
                  fontSize: 8,
                  color: '#2A1000',
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  maxHeight: 38,
                  wordBreak: 'break-word',
                }}>
                  {sign.message}
                </div>
                <div style={{
                  fontSize: 7,
                  color: '#5A2A00',
                  marginTop: 2,
                  opacity: 0.7,
                }}>
                  — {sign.name}
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
