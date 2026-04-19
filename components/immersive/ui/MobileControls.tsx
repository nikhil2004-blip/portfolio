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
  
  // Joystick State
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const joystickHandleRef = useRef<HTMLDivElement>(null);
  
  // Static center (relative to base)
  const [active, setActive] = useState(false);

  // Reset joystick when overlays open or mobile status changes
  useEffect(() => {
    if (overlayOpen || signboardOpen) {
      handleJoystickEnd();
    }
  }, [overlayOpen, signboardOpen]);

  if (!isMobile) return null;

  const handleJoystickMove = (e: React.PointerEvent) => {
    if (overlayOpen || signboardOpen || !controls.current || !joystickBaseRef.current) return;
    
    // Calculate relative to the static base center
    const rect = joystickBaseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    
    // Guard against zeroed coordinates or invalid center calculation
    if (e.clientX === 0 && e.clientY === 0) return;
    if (rect.width === 0) return;

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
    
    controls.current.joystickX = lx / maxDist;
    controls.current.joystickY = ly / maxDist;
  };

  const handleJoystickEnd = () => {
    setActive(false);
    if (joystickHandleRef.current) {
      joystickHandleRef.current.style.transform = `translate(0px, 0px)`;
    }
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
    <div className={`fixed inset-0 z-[1000] pointer-events-none select-none transition-opacity duration-300 ${overlayOpen ? 'opacity-0' : 'opacity-100'}`}>
      {/* Joystick Area */}
      <div 
        className="absolute bottom-10 left-10 w-32 h-32 pointer-events-auto flex items-center justify-center"
        onPointerDown={(e) => { 
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          setActive(true); 
          handleJoystickMove(e); 
        }}
        onPointerMove={(e) => active && handleJoystickMove(e)}
        onPointerUp={(e) => {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          handleJoystickEnd();
        }}
        onPointerCancel={(e) => {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          handleJoystickEnd();
        }}
      >
        {/* Virtual Joystick Visuals - Always visible but highlights when active */}
        <div 
          ref={joystickBaseRef}
          className={`w-24 h-24 bg-white/10 border-2 border-white/20 rounded-full backdrop-blur-sm transition-colors ${active ? 'bg-white/20 border-white/40' : ''}`}
          style={{ touchAction: 'none' }}
        >
          <div 
            ref={joystickHandleRef}
            className="absolute top-1/2 left-1/2 -ml-6 -mt-6 w-12 h-12 bg-white/40 rounded-full shadow-lg transition-transform duration-75"
          />
        </div>
      </div>

      {/* Right Side Buttons */}
      <div className="absolute bottom-10 right-10 flex items-center gap-10 pointer-events-auto">
        <button 
          onPointerDown={() => controls.current && (controls.current.space = true)}
          onPointerUp={() => controls.current && (controls.current.space = false)}
          className="w-20 h-20 bg-white/10 border-2 border-white/20 rounded-full flex items-center justify-center active:bg-white/30 backdrop-blur-sm shadow-xl active:scale-95 transition-all"
        >
          <span className="text-white font-monocraft text-[8px]">JUMP</span>
        </button>
        
        <button 
          onClick={() => {
            const state = useGameStore.getState();
            if (state.nearbyBuilding && !state.overlayOpen) {
               state.openBuilding(state.nearbyBuilding);
            }
          }}
          className="w-24 h-24 bg-blue-500/20 border-2 border-blue-400/30 rounded-full flex items-center justify-center active:bg-blue-400/40 backdrop-blur-md shadow-2xl active:scale-95 transition-all"
        >
          <span className="text-white font-monocraft text-[8px]">INTERACT</span>
        </button>
      </div>
    </div>
  );
}
