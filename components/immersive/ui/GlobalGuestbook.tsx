'use client';
import { useGameStore } from '@/store/useGameStore';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect, useRef } from 'react';

export function GlobalGuestbook() {
  const { globalGuestbookOpen, setGlobalGuestbookOpen } = useGameStore();
  const signs = useQuery(api.signs.get) || [];
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on ESC, Open on Secret Combo (Ctrl+Shift+G)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close on ESC
      if (e.key === 'Escape' && globalGuestbookOpen) {
        setGlobalGuestbookOpen(false);
        setTimeout(() => {
          const canvas = document.querySelector('canvas');
          if (canvas) canvas.requestPointerLock();
        }, 100);
      }
      
      // Toggle on Ctrl + Shift + G
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        setGlobalGuestbookOpen((prev) => {
          const next = !prev;
          if (!next) {
            setTimeout(() => {
              const canvas = document.querySelector('canvas');
              if (canvas) canvas.requestPointerLock();
            }, 100);
          }
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [globalGuestbookOpen, setGlobalGuestbookOpen]);

  if (!globalGuestbookOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        padding: '20px',
      }}
      onClick={() => {
        setGlobalGuestbookOpen(false);
        setTimeout(() => {
          const canvas = document.querySelector('canvas');
          if (canvas) canvas.requestPointerLock();
        }, 100);
      }}
    >
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          background: '#C6C6C6',
          border: '4px solid #000',
          boxShadow: 'inset -4px -4px #555, inset 4px 4px #FFF',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: '20px',
          imageRendering: 'pixelated',
        }}
      >
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          borderBottom: '2px solid #555',
          paddingBottom: '10px'
        }}>
          <h2 style={{
            fontFamily: "'Monocraft', monospace",
            color: '#3F3F3F',
            fontSize: '24px',
            textShadow: '2px 2px #FFF',
            margin: 0
          }}>
            Global Guestbook
          </h2>
          <p style={{
            fontFamily: 'monospace',
            color: '#555',
            fontSize: '12px',
            marginTop: '4px'
          }}>
            {signs.length} Total Messages
          </p>
        </div>

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          paddingRight: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }} className="minecraft-scrollbar">
          {signs.length === 0 ? (
            <div style={{ textAlign: 'center', py: '40px', color: '#666', fontFamily: 'monospace' }}>
              No messages yet. Be the first to place a sign!
            </div>
          ) : (
            [...signs].reverse().map((sign) => (
              <div
                key={sign._id}
                style={{
                  background: '#8B8B8B',
                  border: '2px solid #000',
                  boxShadow: 'inset -2px -2px #555, inset 2px 2px #AAA',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}>
                  <span style={{
                    fontFamily: "'Monocraft', monospace",
                    color: '#FFF',
                    fontSize: '14px',
                    textShadow: '1px 1px #000'
                  }}>
                    {sign.name || 'Anonymous'}
                  </span>
                  <span style={{
                    fontFamily: 'monospace',
                    color: '#CCC',
                    fontSize: '10px'
                  }}>
                    {sign.placedAt ? new Date(sign.placedAt).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
                <p style={{
                  fontFamily: 'monospace',
                  color: '#EEE',
                  fontSize: '13px',
                  margin: 0,
                  wordBreak: 'break-word',
                  lineHeight: '1.4'
                }}>
                  &quot;{sign.message}&quot;
                </p>
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => {
            setGlobalGuestbookOpen(false);
            setTimeout(() => {
              const canvas = document.querySelector('canvas');
              if (canvas) canvas.requestPointerLock();
            }, 100);
          }}
          style={{
            marginTop: '20px',
            background: '#C6C6C6',
            border: '2px solid #000',
            boxShadow: 'inset -2px -2px #555, inset 2px 2px #FFF',
            padding: '10px 20px',
            fontFamily: "'Monocraft', monospace",
            fontSize: '14px',
            cursor: 'pointer',
            alignSelf: 'center',
            color: '#3F3F3F'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#D6D6D6';
            e.currentTarget.style.color = '#000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#C6C6C6';
            e.currentTarget.style.color = '#3F3F3F';
          }}
        >
          BACK TO WORLD
        </button>

        <style jsx>{`
          .minecraft-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .minecraft-scrollbar::-webkit-scrollbar-track {
            background: #555;
            border: 2px solid #000;
          }
          .minecraft-scrollbar::-webkit-scrollbar-thumb {
            background: #C6C6C6;
            border: 2px solid #000;
            boxShadow: inset -2px -2px #555, inset 2px 2px #FFF;
          }
        `}</style>
      </div>
    </div>
  );
}
