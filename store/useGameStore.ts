import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface PendingSign {
  position: [number, number, number];
  rotationY: number;
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
  signboardOpen: boolean;
  editingSignId: string | null;
  pendingSign: PendingSign | null;
  activeSlot: number;
  breakingSignId: string | null;
  globalGuestbookOpen: boolean;
  isMobile: boolean;
  isAdminMode: boolean;

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
  setSignboardOpen: (isOpen: boolean, signId?: string | null) => void;
  startPlacingSign: (sign: PendingSign) => void;
  setActiveSlot: (slot: number) => void;
  setBreakingSignId: (id: string | null) => void;
  setGlobalGuestbookOpen: (isOpen: boolean) => void;
  setIsWorldReady: (ready: boolean) => void;
  setIsMobile: (mobile: boolean) => void;
  toggleAdminMode: () => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export const useGameStore = create<GameState>()(
  subscribeWithSelector((set, get) => ({
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
  signboardOpen: false,
  editingSignId: null,
  pendingSign: null,
  activeSlot: 0,
  breakingSignId: null,
  globalGuestbookOpen: false,
  isMobile: false,
  isAdminMode: false,

  setNearbyBuilding: (id) => set({ nearbyBuilding: id }),

  openBuilding: (id) =>
    set({ activeBuilding: id, overlayOpen: true }),

  closeBuilding: () =>
    set({ activeBuilding: null, overlayOpen: false }),

  toggleNight: () =>
    set((s) => ({ isNight: !s.isNight })),

  triggerNightMode: () => {
    const { hasToggledNight, isNight } = get();
    if (!hasToggledNight && !isNight) {
      set({ isTransitioningNight: true });
    } else {
      get().toggleNight();
    }
  },

  _setNightAndFinish: () => {
    set({ isNight: true, hasToggledNight: true });
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

    set({ visitorId: vid });
  },

  setSignboardOpen: (isOpen, signId = null) => {
    set({ signboardOpen: isOpen, editingSignId: signId, pendingSign: isOpen ? get().pendingSign : null });
  },

  startPlacingSign: (sign) => {
    set({ pendingSign: sign, signboardOpen: true, editingSignId: null });
  },
  
  setActiveSlot: (slot) => set({ activeSlot: slot }),

  setBreakingSignId: (id) => set({ breakingSignId: id }),

  setGlobalGuestbookOpen: (isOpen) => set({ globalGuestbookOpen: isOpen, overlayOpen: isOpen }),

  setIsWorldReady: (ready) => set({ isWorldReady: ready }),

  setIsMobile: (mobile) => set({ isMobile: mobile }),

  toggleAdminMode: () => set((s) => ({ isAdminMode: !s.isAdminMode })),
})));
