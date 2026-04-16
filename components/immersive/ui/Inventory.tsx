'use client';
import { useGameStore } from '@/store/useGameStore';

const BLOCKS = [
  { label: '1', color: '#5A8A35', title: 'Grass Block' },
  { label: '2', color: '#888888', title: 'Cobblestone' },
  { label: '3', color: '#C8A068', title: 'Oak Plank' },
  { label: '4', color: '#5ECFEF', title: 'Diamond Block' },
  { label: '5', color: '#BBBBBB', title: 'Iron Block' },
  { label: '6', color: '#F5CF60', title: 'Gold Block' },
  { label: '7', color: '#C33C2E', title: 'Redstone Block' },
];

export function Inventory() {
  const { overlayOpen, visitorSigns, setSignboardOpen } = useGameStore();

  if (overlayOpen) return null;

  const signCount = visitorSigns.length;
  const canPlace = signCount < 2;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        display: 'flex',
        gap: 4,
        padding: '4px 6px',
        background: 'rgba(0,0,0,0.55)',
        border: '2px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(4px)',
        imageRendering: 'pixelated',
      }}
    >
      {/* Decorative blocks — visual only */}
      {BLOCKS.map((block, i) => (
        <div
          key={i}
          title={block.title}
          style={{
            width: 44,
            height: 44,
            background: block.color,
            border: '2px solid rgba(0,0,0,0.6)',
            outline: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: 2,
            boxSizing: 'border-box',
            position: 'relative',
            cursor: 'default',
          }}
        >
          {/* Pixel highlight top-left */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '50%', height: '50%',
            background: 'rgba(255,255,255,0.15)',
          }} />
          {/* Pixel shadow bottom-right */}
          <div style={{
            position: 'absolute',
            bottom: 0, right: 0,
            width: '50%', height: '50%',
            background: 'rgba(0,0,0,0.2)',
          }} />
          <span style={{
            fontSize: 9,
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            textShadow: '1px 1px 0 #000',
            position: 'relative',
            zIndex: 1,
          }}>
            {block.label}
          </span>
        </div>
      ))}

      {/* Separator */}
      <div style={{ width: 2, background: 'rgba(255,255,255,0.1)', margin: '4px 2px' }} />

      {/* Signboard slot */}
      <div
        onClick={canPlace ? () => setSignboardOpen(true) : undefined}
        title={canPlace ? 'Place a Sign (click to open)' : 'Max signs placed (2/2)'}
        style={{
          width: 52,
          height: 44,
          background: canPlace ? '#5C3D1E' : '#2A2A2A',
          border: `2px solid ${canPlace ? 'rgba(200,150,80,0.8)' : 'rgba(80,80,80,0.5)'}`,
          outline: canPlace ? '1px solid rgba(255,200,100,0.3)' : '1px solid transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          cursor: canPlace ? 'pointer' : 'not-allowed',
          opacity: canPlace ? 1 : 0.45,
          transition: 'all 0.15s',
          position: 'relative',
          boxShadow: canPlace ? '0 0 8px rgba(255,180,80,0.3)' : 'none',
        }}
      >
        {/* Sign icon — simple SVG */}
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none" style={{ flexShrink: 0 }}>
          {/* Post */}
          <rect x="10" y="10" width="2" height="8" fill={canPlace ? '#A0622A' : '#555'} />
          {/* Sign face */}
          <rect x="1" y="0" width="20" height="10" rx="1" fill={canPlace ? '#C8965A' : '#444'} />
          {/* Lines on sign */}
          <rect x="4" y="3" width="14" height="1.5" rx="0.5" fill={canPlace ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.1)'} />
          <rect x="4" y="6" width="10" height="1.5" rx="0.5" fill={canPlace ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.1)'} />
        </svg>
        <span style={{
          fontSize: 8,
          color: canPlace ? 'rgba(255,210,130,0.9)' : 'rgba(120,120,120,0.6)',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          textShadow: '1px 1px 0 #000',
          lineHeight: 1,
        }}>
          {canPlace ? `SIGN ${signCount}/2` : 'FULL'}
        </span>
        {/* Hot key label */}
        <span style={{
          position: 'absolute',
          bottom: 2,
          right: 3,
          fontSize: 8,
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'monospace',
        }}>8</span>
      </div>
    </div>
  );
}
