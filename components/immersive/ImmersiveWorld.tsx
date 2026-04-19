'use client';
import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Stars, Sparkles, useProgress } from '@react-three/drei';
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
import { ControlsGuide } from './ui/ControlsGuide';
import { Inventory } from './ui/Inventory';
import { SignModal } from './ui/SignModal';
import { NightTransitionScreen } from './ui/NightTransitionScreen';
import { GlobalGuestbook } from './ui/GlobalGuestbook';

import { useGameStore } from '@/store/useGameStore';
import { useControls } from './player/useControls';
import { MobileControls } from './ui/MobileControls';

export default function ImmersiveWorld() {
  const overlayOpen = useGameStore((s) => s.overlayOpen);
  const isNight = useGameStore((s) => s.isNight);
  const initVisitor = useGameStore((s) => s.initVisitor);
  const isWorldReady = useGameStore((s) => s.isWorldReady);
  const setIsWorldReady = useGameStore((s) => s.setIsWorldReady);
  const isMobile = useGameStore((s) => s.isMobile);
  const setIsMobile = useGameStore((s) => s.setIsMobile);
  
  const controls = useControls();
  const { progress } = useProgress();
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Use User Agent detection to avoid triggering on desktop resize
      const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileAgent);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  // Initialize visitor UUID and load cached signs from localStorage
  useEffect(() => {
    initVisitor();
  }, [initVisitor]);

  // Handle loading state: wait for both 3D assets AND the WebGL context to be ready
  useEffect(() => {
    if (progress === 100 && canvasReady) {
      // Small 200ms grace period for the first frame to stabilize
      const timer = setTimeout(() => setIsWorldReady(true), 200);
      return () => clearTimeout(timer);
    }
  }, [progress, canvasReady, setIsWorldReady]);

  const targetBg = isNight ? '#0B1026' : '#87CEEB';
  const bgColor = isWorldReady ? targetBg : '#000000';

  return (
    <div className="w-full h-screen overflow-hidden" style={{ backgroundColor: bgColor, transition: 'background-color 1s ease-in-out' }}>
      
      {isWorldReady && (
        <>
          <ControlsGuide />
          <HUD />
          <OverlayPanel />
          <Inventory />
          <SignModal />
          <NightTransitionScreen />
          <GlobalGuestbook />
          <MobileControls controls={controls} />
        </>
      )}

      {/* 3D Canvas (Lock Target) */}
      <div id="game-canvas-container" className="absolute inset-0">
        <Canvas
          frameloop="always"
          shadows={false}
          camera={{ fov: 75, near: 0.1, far: 500 }}
          style={{ touchAction: 'none' }} // Prevent scrolling on mobile
          onCreated={() => setCanvasReady(true)}
        >
          <color attach="background" args={[bgColor]} />
        
        {/* Skybox & Stars */}
        {isNight ? (
          <>
            <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sky sunPosition={[0, -10, -100]} turbidity={0.1} rayleigh={0.5} />
            {/* Firefly/Stars particles at night near ground */}
            <Sparkles count={1000} scale={120} size={12} speed={0.4} opacity={0.6} color="#FFE680" position={[0, 8, 0]} />
          </>
        ) : (
          <>
            <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={0.5} />
            {/* Ambient dust/pollen particles in day near ground */}
            <Sparkles count={800} scale={120} size={6} speed={0.3} opacity={0.3} color="#FFFFFF" position={[0, 8, 0]} />
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
            doorSide={b.doorSide}
          />
        ))}

        {/* Player (Camera & Movement) */}
        <Player controls={controls} />
      </Canvas>
      </div>
      
      {/* Minimal mobile info */}
      {!isWorldReady && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 bg-black/80 text-white p-4 rounded text-xs text-center z-[100] font-monocraft">
          Loading mobile experience...
        </div>
      )}
    </div>
  );
}
