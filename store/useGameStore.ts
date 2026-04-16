import { create } from 'zustand';

export interface GuestSign {
  id: string;
  name: string;
  message: string;
  position: [number, number, number];
  rotationY: number;
  placedAt: string;
}

interface GameState {
  // ── world state ──────────────────────────────────
  nearbyBuilding: string | null;
  activeBuilding: string | null;
  overlayOpen: boolean;
  isNight: boolean;

  isTransitioningNight: boolean;
  hasToggledNight: boolean;

  // ── player prefs ────────────────────────────────
  hasSeenTutorial: boolean;
  audioEnabled: boolean;
  minimapVisible: boolean;

  // ── guestbook / visitor state ────────────────────
  visitorId: string;
  visitorSigns: GuestSign[];
  signboardOpen: boolean;
  editingSignId: string | null;
  activeSlot: number;

  // ── actions ─────────────────────────────────────
  setNearbyBuilding: (id: string | null) => void;
  openBuilding: (id: string) => void;
  closeBuilding: () => void;
  toggleNight: () => void;
  triggerNightMode: () => void;
  _setNightAndFinish: () => void;
  markTutorialSeen: () => void;
  toggleAudio: () => void;
  toggleMinimap: () => void;

  // ── guestbook actions ─────────────────────────────
  initVisitor: () => void;
  addSign: (sign: GuestSign) => void;
  removeSign: (id: string) => void;
  updateSign: (id: string, updates: Partial<GuestSign>) => void;
  setSignboardOpen: (isOpen: boolean, signId?: string | null) => void;
  setActiveSlot: (slot: number) => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const useGameStore = create<GameState>((set, get) => ({
  nearbyBuilding: null,
  activeBuilding: null,
  overlayOpen: false,
  isNight: false,
  isTransitioningNight: false,
  hasToggledNight: false,
  hasSeenTutorial: false,
  audioEnabled: false,
  minimapVisible: false,

  // guestbook defaults
  visitorId: '',
  visitorSigns: [],
  signboardOpen: false,
  editingSignId: null,
  activeSlot: 0,

  setNearbyBuilding: (id) => set({ nearbyBuilding: id }),

  openBuilding: (id) =>
    set({ activeBuilding: id, overlayOpen: true }),

  closeBuilding: () =>
    set({ activeBuilding: null, overlayOpen: false }),

  toggleNight: () =>
    set((s) => ({ isNight: !s.isNight })),

  triggerNightMode: () => {
    const { hasToggledNight, isNight } = get();
    // Only show loading screen on the first switch to night.
    if (!hasToggledNight && !isNight) {
      // Just set the flag — the NightTransitionScreen component will
      // use a double-rAF to guarantee a paint BEFORE flipping isNight
      // (which freezes the browser while compiling WebGL shaders).
      set({ isTransitioningNight: true });
    } else {
      get().toggleNight();
    }
  },

  // Called by NightTransitionScreen after it has confirmed a browser paint
  _setNightAndFinish: () => {
    set({ isNight: true, hasToggledNight: true });
    // After setting isNight, the browser will freeze to compile shaders.
    // Once it unfreezes, we wait briefly then dismiss the screen.
    setTimeout(() => set({ isTransitioningNight: false }), 800);
  },

  markTutorialSeen: () => set({ hasSeenTutorial: true }),

  toggleAudio: () =>
    set((s) => ({ audioEnabled: !s.audioEnabled })),

  toggleMinimap: () =>
    set((s) => ({ minimapVisible: !s.minimapVisible })),

  // ── Guestbook ────────────────────────────────────
  initVisitor: () => {
    if (typeof window === 'undefined') return;

    // Get or generate visitor UUID
    let vid = localStorage.getItem('portfolio_vid');
    if (!vid) {
      vid = generateId();
      localStorage.setItem('portfolio_vid', vid);
    }

    // Load cached signs from localStorage
    let signs: GuestSign[] = [];
    try {
      const raw = localStorage.getItem('portfolio_signs');
      if (raw) signs = JSON.parse(raw);
    } catch {
      signs = [];
    }

    set({ visitorId: vid, visitorSigns: signs });
  },

  addSign: (sign) => {
    const current = get().visitorSigns;
    const updated = [...current, sign];
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_signs', JSON.stringify(updated));
    }
    set({ visitorSigns: updated });
  },

  removeSign: (id) => {
    const current = get().visitorSigns;
    const updated = current.filter(s => s.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_signs', JSON.stringify(updated));
    }
    set({ visitorSigns: updated });
  },

  updateSign: (id, updates) => {
    const current = get().visitorSigns;
    const updated = current.map(s => s.id === id ? { ...s, ...updates } : s);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_signs', JSON.stringify(updated));
    }
    set({ visitorSigns: updated });
  },

  setSignboardOpen: (isOpen, signId = null) => set({ signboardOpen: isOpen, editingSignId: signId }),
  
  setActiveSlot: (slot) => set({ activeSlot: slot }),
}));
