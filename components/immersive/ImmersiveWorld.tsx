'use client';
import { Canvas } from '@react-three/fiber';
import { Sky, Stars, Sparkles } from '@react-three/drei';
import { useEffect } from 'react';
// Oh wait, the PRD said custom collision Math for performance! We won't use Rapier.

import { Player } from './player/Player';
import { Terrain } from './scene/Terrain';
import { Lighting } from './scene/Lighting';
import { Decorations } from './scene/Decorations';
import { GuestSigns } from './scene/GuestSigns';
import { Building } from './buildings/Building';
import { BUILDINGS } from './buildings/buildings.data';

import { HUD } from './ui/HUD';
import { OverlayPanel } from './ui/OverlayPanel';
import { LoadingScreen } from './ui/LoadingScreen';
import { ControlsGuide } from './ui/ControlsGuide';
import { Inventory } from './ui/Inventory';
import { SignModal } from './ui/SignModal';
import { NightTransitionScreen } from './ui/NightTransitionScreen';

import { useGameStore } from '@/store/useGameStore';

export default function ImmersiveWorld() {
  const overlayOpen = useGameStore((s) => s.overlayOpen);
  const isNight = useGameStore((s) => s.isNight);
  const initVisitor = useGameStore((s) => s.initVisitor);

  // Initialize visitor UUID and load cached signs from localStorage
  useEffect(() => {
    initVisitor();
  }, [initVisitor]);

  const bgColor = isNight ? '#0B1026' : '#87CEEB';

  return (
    <div className="w-full h-screen overflow-hidden" style={{ backgroundColor: bgColor, transition: 'background-color 1s ease-in-out' }}>
      {/* 2D UI Overlays */}
      <LoadingScreen />
      <ControlsGuide />
      <HUD />
      <OverlayPanel />
      <Inventory />
      <SignModal />
      <NightTransitionScreen />

      {/* 3D Canvas (Lock Target) */}
      <div id="game-canvas-container" className="absolute inset-0">
        <Canvas
          frameloop="always"
          shadows={false}
          camera={{ fov: 75, near: 0.1, far: 500 }}
          style={{ touchAction: 'none' }} // Prevent scrolling on mobile
        >
          <color attach="background" args={[bgColor]} />
        
        {/* Skybox & Stars */}
        {isNight ? (
          <>
            {/* Static stars — no per-frame animation (speed=0), low count */}
            <Stars radius={200} depth={50} count={1500} factor={4} saturation={0} fade={false} speed={0} />
            <Sky sunPosition={[0, -10, -100]} turbidity={0.1} rayleigh={0.5} />
            {/* Minimal fireflies — fewer particles, slower, lower cost */}
            <Sparkles count={150} scale={[120, 20, 120]} size={10} speed={0.1} opacity={0.5} color="#FFE680" position={[0, 10, 0]} />
          </>
        ) : (
          <>
            <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />
            {/* Ambient dust — kept minimal */}
            <Sparkles count={200} scale={[120, 20, 120]} size={6} speed={0.1} opacity={0.3} color="#FFFFFF" position={[0, 10, 0]} />
          </>
        )}
        
        <Lighting isNight={isNight} />
        
        {/* World Geometry */}
        <Terrain />
        <Decorations />
        
        {/* Guest Signboards */}
        <GuestSigns />
        
        {/* Buildings */}
        {BUILDINGS.map((b) => (
          <Building
            key={b.id}
            id={b.id}
            position={b.position}
            size={b.size}
            name={b.name}
            accentColor={b.accentColor}
          />
        ))}

        {/* Player (Camera & Movement) */}
        <Player />
      </Canvas>
      </div>
      
      {/* Mobile fallback / warning */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-black/80 text-white p-4 rounded text-xs text-center z-[100] font-monocraft">
        Warning: This 3D experience is designed for desktop keyboard/mouse navigation.
      </div>
    </div>
  );
}
