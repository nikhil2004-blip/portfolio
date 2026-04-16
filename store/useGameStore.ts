import { create } from 'zustand';

export interface GuestSign {
  id: string;
  name: string;
  message: string;
  slot: 1 | 2;
  placedAt: string;
}

interface GameState {
  // ── world state ──────────────────────────────────
  nearbyBuilding: string | null;
  activeBuilding: string | null;
  overlayOpen: boolean;
  isNight: boolean;

  // ── player prefs ────────────────────────────────
  hasSeenTutorial: boolean;
  audioEnabled: boolean;
  minimapVisible: boolean;

  // ── guestbook / visitor state ────────────────────
  visitorId: string;
  visitorSigns: GuestSign[];
  signboardOpen: boolean;

  // ── actions ─────────────────────────────────────
  setNearbyBuilding: (id: string | null) => void;
  openBuilding: (id: string) => void;
  closeBuilding: () => void;
  toggleNight: () => void;
  markTutorialSeen: () => void;
  toggleAudio: () => void;
  toggleMinimap: () => void;

  // ── guestbook actions ─────────────────────────────
  initVisitor: () => void;
  addSign: (sign: GuestSign) => void;
  setSignboardOpen: (v: boolean) => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const useGameStore = create<GameState>((set, get) => ({
  nearbyBuilding: null,
  activeBuilding: null,
  overlayOpen: false,
  isNight: false,
  hasSeenTutorial: false,
  audioEnabled: false,
  minimapVisible: false,

  // guestbook defaults
  visitorId: '',
  visitorSigns: [],
  signboardOpen: false,

  setNearbyBuilding: (id) => set({ nearbyBuilding: id }),

  openBuilding: (id) =>
    set({ activeBuilding: id, overlayOpen: true }),

  closeBuilding: () =>
    set({ activeBuilding: null, overlayOpen: false }),

  toggleNight: () =>
    set((s) => ({ isNight: !s.isNight })),

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
    // Replace if same slot, otherwise append
    const updated = current.some(s => s.slot === sign.slot)
      ? current.map(s => s.slot === sign.slot ? sign : s)
      : [...current, sign];

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_signs', JSON.stringify(updated));
    }

    set({ visitorSigns: updated });
  },

  setSignboardOpen: (v) => set({ signboardOpen: v }),
}));
