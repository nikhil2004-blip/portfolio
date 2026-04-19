'use client';
import { useRef, useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { ControlState } from '../player/useControls';
import type { RefObject } from 'react';

interface Props {
  controls: RefObject<ControlState>;
}

export function MobileControls({ controls }: Props) {
  const isMobile = useGameStore(s => s.isMobile);
  const overlayOpen = useGameStore(s => s.overlayOpen);
  const signboardOpen = useGameStore(s => s.signboardOpen);
  const [touching, setTouching] = useState(false);
  
  // Joystick State
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const joystickHandleRef = useRef<HTMLDivElement>(null);
  const joystickOrigin = useRef<{ x: number, y: number } | null>(null);

  if (!isMobile) return null;

  const handleJoystickStart = (e: React.PointerEvent) => {
    if (overlayOpen || signboardOpen) return;
    const { clientX: x, clientY: y } = e;
    joystickOrigin.current = { x, y };
    setTouching(true);
    
    if (joystickBaseRef.current) {
      joystickBaseRef.current.style.display = 'block';
      joystickBaseRef.current.style.left = `${x - 40}px`;
      joystickBaseRef.current.style.top = `${y - 40}px`;
    }
  };

  const handleJoystickMove = (e: React.PointerEvent) => {
    if (!joystickOrigin.current || !controls.current) return;
    
    const dx = e.clientX - joystickOrigin.current.x;
    const dy = e.clientY - joystickOrigin.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 40;
    
    const limitedDist = Math.min(dist, maxDist);
    const angle = Math.atan2(dy, dx);
    const lx = Math.cos(angle) * limitedDist;
    const ly = Math.sin(angle) * limitedDist;

    if (joystickHandleRef.current) {
      joystickHandleRef.current.style.transform = `translate(${lx}px, ${ly}px)`;
    }

    // Set controls based on joystick vector
    const threshold = 15;
    controls.current.w = ly < -threshold;
    controls.current.s = ly > threshold;
    controls.current.a = lx < -threshold;
    controls.current.d = lx > threshold;
    
    // Smooth analog values for potential use
    controls.current.joystickX = lx / maxDist;
    controls.current.joystickY = ly / maxDist;
  };

  const handleJoystickEnd = () => {
    joystickOrigin.current = null;
    setTouching(false);
    if (joystickBaseRef.current) joystickBaseRef.current.style.display = 'none';
    if (controls.current) {
      controls.current.w = false;
      controls.current.s = false;
      controls.current.a = false;
      controls.current.d = false;
      controls.current.joystickX = 0;
      controls.current.joystickY = 0;
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none select-none">
      {/* Left Touch Area (Joystick) */}
      <div 
        className="absolute bottom-0 left-0 w-1/2 h-3/4 pointer-events-auto"
        onPointerDown={handleJoystickStart}
        onPointerMove={handleJoystickMove}
        onPointerUp={handleJoystickEnd}
        onPointerCancel={handleJoystickEnd}
      />

      {/* Virtual Joystick Visuals */}
      <div 
        ref={joystickBaseRef}
        className="absolute hidden w-20 h-20 bg-white/20 border-2 border-white/30 rounded-full backdrop-blur-sm"
        style={{ touchAction: 'none' }}
      >
        <div 
          ref={joystickHandleRef}
          className="absolute top-1/2 left-1/2 -ml-6 -mt-6 w-12 h-12 bg-white/60 rounded-full shadow-lg"
        />
      </div>

      {/* Right Side Buttons */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-6 pointer-events-auto">
        <button 
          onPointerDown={() => controls.current && (controls.current.space = true)}
          onPointerUp={() => controls.current && (controls.current.space = false)}
          className="w-16 h-16 bg-white/20 border-2 border-white/40 rounded-full flex items-center justify-center active:bg-white/40 backdrop-blur-sm"
        >
          <span className="text-white font-bold">JUMP</span>
        </button>
        
        <button 
          onClick={() => {
            const state = useGameStore.getState();
            if (state.nearbyBuilding && !state.overlayOpen) {
               state.openBuilding(state.nearbyBuilding);
            }
          }}
          className="w-20 h-20 bg-blue-500/30 border-2 border-blue-400/50 rounded-full flex items-center justify-center active:bg-blue-400/50 backdrop-blur-sm"
        >
          <span className="text-white font-bold text-xs">INTERACT</span>
        </button>
      </div>

      {/* Rotation Swipe Area (Right 50%) */}
      {/* This will be handled by a global listener in MobileCameraControls later */}
    </div>
  );
}
