'use client';

interface Props {
  isNight?: boolean;
}

/**
 * Lighting — Minecraft-like flat lambertian shading.
 * No shadows in v1 (expensive). AmbientLight prevents pure-black areas.
 */
export function Lighting({ isNight }: Props) {
  // Boosted intensities for better visibility while keeping night vibes
  const ambientInt = isNight ? 0.8 : 0.7;
  const sunMoonInt = isNight ? 1.2 : 1.1;
  const fillInt = isNight ? 0.4 : 0.2;
  
  const sunMoonColor = isNight ? '#a0b0ff' : '#fff8e8';
  const fillColor = isNight ? '#8090ff' : '#b0d0ff';

  return (
    <>
      <ambientLight intensity={ambientInt} color="#e8f4ff" />
      
      {/* Sun/Moon */}
      <directionalLight
        position={[60, 100, 40]}
        intensity={sunMoonInt}
        color={sunMoonColor}
        castShadow={false}
      />
      
      {/* Soft fill from opposite to reduce harsh shadows */}
      <directionalLight
        position={[-30, 20, -40]}
        intensity={fillInt}
        color={fillColor}
        castShadow={false}
      />
    </>
  );
}
