'use client';
import { useState, useRef, useEffect } from 'react';
import { useGameStore, GuestSign } from '@/store/useGameStore';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function SignModal() {
  const { signboardOpen, setSignboardOpen, visitorId, visitorSigns, addSign, updateSign, editingSignId } = useGameStore();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (signboardOpen) {
      if (editingSignId) {
        const signToEdit = visitorSigns.find(s => s.id === editingSignId);
        if (signToEdit) {
           setName(signToEdit.name !== 'Anonymous' ? signToEdit.name : '');
           setMessage(signToEdit.message);
        }
      } else {
        setName('Anonymous');
        setMessage('');
      }
      setStatus('idle');
      setErrorText('');
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [signboardOpen, editingSignId, visitorSigns]);

  if (!signboardOpen) return null;

  // Determine which slot to use
  const usedSlots = visitorSigns.map((s) => s.slot);
  const nextSlot: 1 | 2 = usedSlots.includes(1) ? 2 : 1;

  const remaining = message.length;
  const canSubmit = message.trim().length > 0 && remaining <= 100 && status !== 'loading';

  async function handlePlace() {
    if (!canSubmit) return;
    setStatus('loading');

    const finalName = name.trim() || 'Anonymous';
    const finalMessage = message.trim();

    if (editingSignId) {
       updateSign(editingSignId, { name: finalName, message: finalMessage });
       // Also notify GitHub logic optionally
       try {
         fetch('/api/sign', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ visitorId, name: finalName, message: finalMessage, slot: visitorSigns.find(s=>s.id === editingSignId)?.slot || 1 }),
         }).catch(() => {});
       } catch {}
    } else {
       const sign: GuestSign = {
         id: generateId(),
         name: finalName,
         message: finalMessage,
         slot: nextSlot,
         placedAt: new Date().toISOString(),
       };
       addSign(sign);
       try {
         fetch('/api/sign', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ visitorId, name: sign.name, message: sign.message, slot: sign.slot }),
         }).catch(() => {});
       } catch {}
    }

    setStatus('success');
    setTimeout(() => {
      setSignboardOpen(false);
      setName('');
      setMessage('');
      setStatus('idle');
    }, 1800);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') { setSignboardOpen(false); }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(3px)' }}
      onClick={() => setSignboardOpen(false)}
      onKeyDown={handleKey}
    >
      {/* Sign editor box */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#2C1A0A',
          border: '3px solid #6B4226',
          outline: '2px solid #A0622A',
          padding: '0',
          width: 420,
          maxWidth: '95vw',
          fontFamily: "'JetBrains Mono', monospace",
          boxShadow: '0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header */}
        <div style={{
          background: '#5C3D1E',
          borderBottom: '2px solid #6B4226',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="16" viewBox="0 0 22 18" fill="none">
              <rect x="10" y="10" width="2" height="8" fill="#A0622A" />
              <rect x="1" y="0" width="20" height="10" rx="1" fill="#C8965A" />
              <rect x="4" y="3" width="14" height="1.5" rx="0.5" fill="rgba(0,0,0,0.35)" />
              <rect x="4" y="6" width="10" height="1.5" rx="0.5" fill="rgba(0,0,0,0.25)" />
            </svg>
            <span style={{ color: '#F5CF60', fontSize: 13, fontWeight: 'bold', letterSpacing: 2 }}>
              EDIT SIGN
            </span>
          </div>
          <button
            onClick={() => setSignboardOpen(false)}
            style={{
              background: 'none', border: 'none', color: '#A0622A',
              cursor: 'pointer', fontSize: 16, padding: '0 4px',
              lineHeight: 1,
            }}
          >✕</button>
        </div>

        {/* Sign preview area */}
        <div style={{
          margin: 16,
          background: '#C8965A',
          border: '2px solid #A0622A',
          padding: '14px 16px',
          minHeight: 80,
          position: 'relative',
        }}>
          {/* Wood grain lines */}
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              position: 'absolute',
              left: 0, right: 0,
              top: 8 + i * 18,
              height: 1,
              background: 'rgba(0,0,0,0.08)',
            }} />
          ))}
          <div style={{
            color: '#1A0A00',
            fontSize: 13,
            lineHeight: 1.6,
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            minHeight: 52,
            position: 'relative',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {message || <span style={{ opacity: 0.35 }}>{'Your message here...'}</span>}
          </div>
          <div style={{
            position: 'absolute',
            bottom: 6,
            right: 8,
            fontSize: 9,
            color: 'rgba(0,0,0,0.25)',
          }}>
            — {name || 'Anonymous'}
          </div>
        </div>

        {/* Inputs */}
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ marginBottom: 10 }}>
            <label style={{ color: '#C8965A', fontSize: 11, display: 'block', marginBottom: 4 }}>
              YOUR NAME (optional)
            </label>
            <input
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 20))}
              placeholder="Anonymous"
              maxLength={20}
              style={{
                width: '100%',
                background: '#1A0A00',
                border: '1px solid #6B4226',
                color: '#F5D98F',
                padding: '7px 10px',
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <label style={{ color: '#C8965A', fontSize: 11 }}>MESSAGE *</label>
              <span style={{
                fontSize: 10,
                color: remaining > 90 ? '#FF6060' : '#6B4226',
              }}>
                {remaining}/100
              </span>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 100))}
              placeholder="Leave a message for Nikhil..."
              rows={3}
              style={{
                width: '100%',
                background: '#1A0A00',
                border: '1px solid #6B4226',
                color: '#F5D98F',
                padding: '7px 10px',
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                resize: 'none',
                outline: 'none',
                boxSizing: 'border-box',
                lineHeight: 1.5,
              }}
            />
          </div>

          {/* Error */}
          {errorText && (
            <div style={{ color: '#FF6060', fontSize: 11, marginBottom: 8 }}>
              ⚠ {errorText}
            </div>
          )}

          {/* Slot info */}
          <div style={{ color: 'rgba(160,98,42,0.6)', fontSize: 10, marginBottom: 12 }}>
            Placing sign #{nextSlot} of 2 · signs are visible only to you · survives refresh
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handlePlace}
              disabled={!canSubmit}
              style={{
                flex: 1,
                background: canSubmit
                  ? (status === 'success' ? '#2A6A2A' : '#5C3D1E')
                  : '#2A2A2A',
                border: `2px solid ${canSubmit ? '#A0622A' : '#555'}`,
                color: canSubmit ? '#F5CF60' : '#666',
                padding: '9px 16px',
                fontSize: 12,
                fontWeight: 'bold',
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                letterSpacing: 1,
                fontFamily: "'JetBrains Mono', monospace",
                transition: 'all 0.15s',
              }}
            >
              {status === 'loading' ? '[ PLACING... ]'
                : status === 'success' ? '[ ✓ SIGN PLACED! ]'
                : '[ ✎ PLACE SIGN ]'}
            </button>
            <button
              onClick={() => setSignboardOpen(false)}
              style={{
                background: 'none',
                border: '2px solid rgba(107,66,38,0.5)',
                color: '#6B4226',
                padding: '9px 14px',
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
