import { create } from 'zustand';

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

  // ── actions ─────────────────────────────────────
  setNearbyBuilding: (id: string | null) => void;
  openBuilding: (id: string) => void;
  closeBuilding: () => void;
  toggleNight: () => void;
  markTutorialSeen: () => void;
  toggleAudio: () => void;
  toggleMinimap: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  nearbyBuilding: null,
  activeBuilding: null,
  overlayOpen: false,
  isNight: false,
  hasSeenTutorial: false,
  audioEnabled: false,
  minimapVisible: false,

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
}));
