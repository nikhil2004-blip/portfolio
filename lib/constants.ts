// ─── Player physics ─────────────────────────────────
export const PLAYER_SPEED     = 5.5;   // units/sec — exactly Minecraft walk speed feel
export const PLAYER_HEIGHT    = 1.62;  // camera Y — Minecraft eye height
export const PLAYER_RADIUS    = 0.35;  // collision radius
export const INTERACTION_DIST = 4.5;   // trigger "Press E" prompt radius

// ─── Camera ─────────────────────────────────────────
export const FOV      = 70;    // Minecraft default FOV
export const NEAR     = 0.1;
export const FAR      = 500;

// ─── World ──────────────────────────────────────────
export const WORLD_SIZE      = 128; // terrain extent (units)
export const TEXTURE_REPEAT  = 48;  // grass tiling count across terrain
export const BOUNDARY_MARGIN = 4;   // how far from edge player is blocked

// ─── Spawn ──────────────────────────────────────────
export const SPAWN_X = 0;
export const SPAWN_Z = 38;   // south end, looking north into village
