# 🎮 Minecraft-Inspired 3D Portfolio — Full PRD
### A hobby project by a developer who refuses to make a boring portfolio

---

## What Is This?

A personal portfolio website with two modes:

- **Normal Mode** → Clean, fast, static portfolio. Works everywhere. Recruiters love it.
- **Immersive Mode** → First-person 3D village. Minecraft-style. You walk around, enter buildings, see portfolio content. Developers lose their minds.

The whole point is: the world looks like a game. The UI inside buildings looks like a professional portfolio. That contrast is the thing that makes people screenshot it and share it.

---

## The One-Line Pitch

> "I built my portfolio as a Minecraft village. Each building is a section. You walk in and read my projects."

---

## Table of Contents

1. [Core Concept](#1-core-concept)
2. [Two Modes Explained](#2-two-modes-explained)
3. [The 3D World — Everything About It](#3-the-3d-world--everything-about-it)
4. [Controls](#4-controls)
5. [Buildings & Content Map](#5-buildings--content-map)
6. [How Interactions Work](#6-how-interactions-work)
7. [UI Design — World vs Overlay](#7-ui-design--world-vs-overlay)
8. [Tech Stack — What to Use and Why](#8-tech-stack--what-to-use-and-why)
9. [Full Folder Structure](#9-full-folder-structure)
10. [How to Build It — Step by Step](#10-how-to-build-it--step-by-step)
11. [All the Code Patterns You Need](#11-all-the-code-patterns-you-need)
12. [Performance — How Not to Lag](#12-performance--how-not-to-lag)
13. [Audio System](#13-audio-system)
14. [Loading Screen](#14-loading-screen)
15. [Mobile & Accessibility](#15-mobile--accessibility)
16. [All Libraries With Exact Reasons](#16-all-libraries-with-exact-reasons)
17. [What to Build First (MVP)](#17-what-to-build-first-mvp)
18. [What to Add Later](#18-what-to-add-later)
19. [Things That Will Go Wrong](#19-things-that-will-go-wrong)
20. [Getting Minecraft Textures](#20-getting-minecraft-textures)

---

## 1. Core Concept

Most portfolio sites look like this:

```
Hero → About → Projects → Skills → Contact → Footer
```

Everyone's seen it. Nobody remembers it.

This portfolio is different. You open it, choose Immersive Mode, and you're inside a tiny Minecraft village. You walk around with WASD. You look around with your mouse. You see buildings with signs above them. You walk up to "Projects" and press E. A beautiful glassmorphism panel slides up showing your GitHub repos, descriptions, and live demo links.

The 3D world is the navigation. Buildings are sections. Walking is scrolling.

It shows you can code beyond tutorials. It shows creativity. It's the kind of thing that gets tweeted.

---

## 2. Two Modes Explained

### Normal Mode

A clean, minimal, fully accessible static portfolio.

Why this exists:
- Recruiters on mobile can't use the 3D version
- Google can't index a Three.js scene
- Some people just want the information fast
- It's the fallback when the 3D doesn't load

What's in it:
- Hero section with your name, title, one-liner
- About — bio paragraph, photo
- Projects — cards with links
- Skills — tech badges
- Contact — email, GitHub, LinkedIn

Keep it simple. Don't spend more than 20% of your time here.

### Immersive Mode

This is the whole project. Everything else is secondary.

A first-person 3D world. Minecraft aesthetic — blocky buildings, pixel textures, low-poly trees, crisp pixel-art sky. You're a camera floating through a tiny village. Each building has a purpose. You enter it, content appears.

The 3D world uses Three.js under React Three Fiber. The UI panels are pure React with Tailwind. Two completely different aesthetics on the same screen — that's the magic.

---

## 3. The 3D World — Everything About It

### The Map

Small. Intentionally. Don't make it big. Big = empty = boring.

```
   N
W--+--E
   S


+-------------------------------------------------------+
|                                                       |
|  [Tree] [Tree]                    [Tree] [Tree]       |
|                                                       |
|   +---------+   cobblestone   +---------+            |
|   |  ABOUT  |~~~~~~~~~~~~~~~~~| PROJECTS|            |
|   |  H1     |     path        |  H2     |            |
|   +---------+                 +---------+            |
|        |                           |                  |
|        |        [=====]            |                  |
|        +--------[ WEL ]------------+                  |
|   path          [ L   ]             path              |
|        +--------[     ]------------+                  |
|        |        [=====]            |                  |
|        |       central             |                  |
|        |         well              |                  |
|   +---------+                 +---------+            |
|   | SKILLS  |~~~~~~~~~~~~~~~~~|  TOOLS  |            |
|   |  H3     |                 |  H4     |            |
|   +---------+                 +---------+            |
|        |                           |                  |
|   +---------+                 +---------+            |
|   |LEADERSHIP                 | CONTACT |            |
|   |  H5     |                 |  H6     |            |
|   +---------+                 +---------+            |
|                                                       |
|                  * SPAWN POINT                        |
|                                                       |
+-------------------------------------------------------+
```

### Terrain

- Flat grass plane. 128x128 units. Not literally 128x128 blocks — just a flat mesh scaled up.
- Grass texture (16x16 Minecraft texture, tiled)
- Stone/cobblestone paths between buildings
- Subtle height variation using a displacement map is optional (v2 thing)

### Skybox

Option A (recommended for v1): Three.js `Sky` shader from `@react-three/drei`
- Gives you a real sky with sun position, atmosphere, horizon haze
- One line of code: `<Sky sunPosition={[100, 20, 100]} />`

Option B: Minecraft-style flat color sky gradient
- Custom shader, more authentic look, harder to implement

Go with Option A for now. Switch in v2.

### Lighting

- One `DirectionalLight` to simulate sunlight — position it at an angle like real sun
- One `AmbientLight` at low intensity so shadows aren't pure black
- No shadow casting in v1 (it's expensive — enable in v2)

```jsx
<ambientLight intensity={0.4} />
<directionalLight position={[50, 100, 50]} intensity={1.2} />
```

### Buildings — What They Look Like

All buildings are made of box geometries stacked and arranged. Minecraft style = boxes. No curves.

Every building has:
- Walls (oak planks texture or cobblestone)
- Roof (wood slabs style — flat or slight overhang)
- Door opening (visible gap in front wall, dark inside)
- Windows (glass texture or just dark squares)
- Sign above door (3D Text from drei with the section name)

Each building has a personality:

| Building | Style | Texture Vibe |
|----------|-------|-------------|
| About Me | Cozy cottage | Oak planks, flowers outside |
| Projects | Workshop / forge | Stone bricks, anvil outside |
| Skills | Library | Bookshelf texture on walls |
| Tools | Tool shed | Small, dark wood |
| Leadership | Town hall | Stone + oak, bigger |
| Contact | Post office | Oak + red detail, mailbox |

### Decorations

- Trees: cone-shaped pine trees (cylinder trunk + cone top, both box-ish)
- Use `InstancedMesh` for trees — there'll be 15-20 of them and they're identical
- Central village well: cylinder + box geometry
- Fences: thin box geometries along paths
- Flowers: tiny flat quads with flower texture (optional, cute)

### Boundaries

- Invisible wall at the edges of the terrain
- OR visible fence/wall going around the whole village
- Either way — player can't walk off the map

---

## 4. Controls

```
WASD        ->  Move (relative to where you're looking)
Mouse       ->  Look around (needs pointer lock)
E           ->  Interact / Enter building
ESC         ->  Close panel / release pointer lock
M           ->  Toggle minimap
Tab         ->  Show/hide controls guide
```

### Pointer Lock

Pointer lock is a browser API that captures the mouse cursor inside the canvas. The cursor disappears and mouse movement becomes raw input for looking around. This is how every first-person browser game works.

- Click the canvas -> pointer lock activates
- Move mouse -> look around
- Press ESC -> pointer lock releases (browser forces this)
- When overlay opens -> release pointer lock (so they can click links)
- When overlay closes -> re-acquire pointer lock

### Movement Feel

This is really important. Bad movement = the whole experience feels broken.

Key things:
- Movement is frame-rate independent: multiply by `delta` in `useFrame`
- Movement is camera-relative: pressing W moves FORWARD, not always north
- Speed should feel natural: about 8-10 units per second
- No acceleration/deceleration in v1 (instant start/stop is fine)
- No jumping — keep it simple

```typescript
const MOVE_SPEED = 8; // units per second

useFrame((state, delta) => {
  const direction = new Vector3();
  
  if (keys.w) direction.z -= 1;
  if (keys.s) direction.z += 1;
  if (keys.a) direction.x -= 1;
  if (keys.d) direction.x += 1;
  
  if (direction.length() > 0) {
    direction.normalize();
    direction.multiplyScalar(MOVE_SPEED * delta);
    // Rotate movement direction to match where camera is looking
    // Only use Y rotation so player doesn't fly up when looking up
    direction.applyEuler({ ...camera.rotation, x: 0, z: 0 } as any);
    
    const nextPos = camera.position.clone().add(direction);
    if (!isColliding(nextPos)) {
      camera.position.add(direction);
    }
    camera.position.y = 1.7; // always lock height
  }
});
```

### Camera Height

Player "height" = camera Y position = 1.7 units above ground. Feels like a person walking.

Lock camera Y to always be `terrain_y + 1.7`. No vertical movement in v1.

---

## 5. Buildings & Content Map

### House 1 — About Me

```
What's inside (overlay):
- Your photo (circular, styled)
- Name + title
- 2-3 paragraph bio
- Currently working on / learning
- Fun facts (3 bullet points)
- Resume download button
```

### House 2 — Projects

```
What's inside (overlay):
- Grid of project cards (2-3 columns)
- Each card:
  - Project name
  - 1-line description
  - Tech stack badges (React, Node, etc.)
  - GitHub button
  - Live Demo button (if exists)
  - Screenshot/thumbnail (optional)
```

### House 3 — Skills / Tech Stack

```
What's inside (overlay):
- Grouped tech badges:
  - Frontend: React, Next.js, TypeScript, Tailwind
  - Backend: Node.js, Express, Python, etc.
  - Database: PostgreSQL, MongoDB, Redis
  - DevOps: Docker, Git, AWS basics
  - Currently learning: [whatever]
- Each badge has the official icon + name
```

### House 4 — Tools

```
What's inside (overlay):
- VS Code, Figma, Postman, etc.
- Different from skills — these are the actual tools
  you use daily, not languages/frameworks
- Can be more casual, even funny
  ("Terminal — yes I know vim, no I won't show off")
```

### House 5 — Leadership / Communication

```
What's inside (overlay):
- If you've led projects: describe them like mini stories
- Hackathons, open source contributions
- Soft skills without being cringe about it
- Timeline format works well here
- Can be renamed "Experience" if you have internships
```

### House 6 — Contact

```
What's inside (overlay):
- Email (clickable mailto:)
- GitHub profile link
- LinkedIn
- Twitter/X if you use it
- Discord if relevant
- Simple contact form (optional — needs backend or Formspree)
- "Open to opportunities" status badge
```

---

## 6. How Interactions Work

### The Flow

```
Player walks around world
        |
        v
Player gets within 4 units of a building entrance
        |
        v
HUD shows: "Press E to enter [Building Name]"
(subtle animated prompt at bottom of screen)
        |
        v
Player presses E
        |
        v
Pointer lock releases
Overlay panel animates in (slide up + fade)
3D scene is still visible but slightly blurred/dimmed behind
        |
        v
Player reads content, clicks links
        |
        v
Player presses ESC or clicks X button
        |
        v
Overlay closes (slide down + fade out)
Pointer lock re-acquired (after small delay)
Player is back in the world
```

### Proximity Detection

Each building has a trigger zone — a sphere or box around its entrance. When the player's XZ position (ignore Y) is inside that zone, show the prompt.

```typescript
// Per building config
const buildings = [
  {
    id: 'about',
    name: 'About Me',
    position: new Vector3(-15, 0, -10),
    triggerRadius: 4, // units
    content: aboutContent,
  },
  // ...
]

// Per frame check
function checkProximity(playerPos: Vector3, buildings: Building[]) {
  for (const building of buildings) {
    // Only check XZ distance (flat, ignore Y)
    const xzDist = Math.sqrt(
      (playerPos.x - building.position.x) ** 2 +
      (playerPos.z - building.position.z) ** 2
    );
    if (xzDist < building.triggerRadius) {
      return building.id;
    }
  }
  return null;
}
```

### Collision Detection

AABB (Axis-Aligned Bounding Box) — the simplest approach. Each building has a rectangular zone the player cannot enter.

No physics engine needed. Just define min/max coordinates per building and check if the player's next position overlaps.

```typescript
interface AABB {
  minX: number; maxX: number;
  minZ: number; maxZ: number;
}

function isColliding(pos: Vector3, colliders: AABB[]): boolean {
  const playerRadius = 0.4;
  return colliders.some(box =>
    pos.x - playerRadius < box.maxX &&
    pos.x + playerRadius > box.minX &&
    pos.z - playerRadius < box.maxZ &&
    pos.z + playerRadius > box.minZ
  );
}
```

The building itself is the collider. Make the AABB slightly smaller than the visual building so it doesn't feel like you're hitting an invisible wall.

### The E Key

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'KeyE' && nearbyBuilding && !overlayOpen) {
      openBuilding(nearbyBuilding);
      document.exitPointerLock();
    }
    if (e.code === 'Escape' && overlayOpen) {
      closeBuilding();
      // Pointer lock re-acquired in overlay close handler
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [nearbyBuilding, overlayOpen]);
```

---

## 7. UI Design — World vs Overlay

### The Contrast Principle

This is the most important design decision:

```
World  = blocky, pixelated, low-res, game-like, colorful, nostalgic
Panels = clean, glassy, sharp, modern, professional, readable
```

Don't make the panels feel like Minecraft UI. That would look like a game mod, not a portfolio. The contrast — game world + pro UI — is what makes it memorable.

### In-World HUD

Always visible while in 3D mode:

```
+--------------------------------------------------+
| [Mute] [Location: Village Center]    [M] [ESC]  |   <- top bar
|                                                  |
|                                                  |
|                      --                          |   <- crosshair
|                    --  --                        |     (4 lines)
|                      --                          |
|                                                  |
|         +-----------------------------+          |
|         |  Press E -- Projects        |          |   <- prompt
|         +-----------------------------+          |     (near building only)
+--------------------------------------------------+
```

### Crosshair Style

Pure CSS. Don't use an image.

```css
.crosshair {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
}
/* 4 lines pointing inward, small gap in center */
/* When near interactive object: lines turn green/gold */
```

### Overlay Panel — Full Spec

```
+------------------------------------------------------------+
|                                                            |
|   +====================================================+   |
|   |                                           [X]      |   |
|   |   [icon]  Projects                                 |   |
|   |   ------------------------------------------------ |   |
|   |                                                    |   |
|   |   +------------+  +------------+  +------------+  |   |
|   |   |            |  |            |  |            |  |   |
|   |   | Project 1  |  | Project 2  |  | Project 3  |  |   |
|   |   |            |  |            |  |            |  |   |
|   |   | desc...    |  | desc...    |  | desc...    |  |   |
|   |   |            |  |            |  |            |  |   |
|   |   |[React][TS] |  |[Node][Pg]  |  |[Next][Tw]  |  |   |
|   |   |            |  |            |  |            |  |   |
|   |   | [GH] [->]  |  | [GH] [->] |  | [GH] [->] |  |   |
|   |   +------------+  +------------+  +------------+  |   |
|   |                                                    |   |
|   |                [press ESC to close]                |   |
|   +====================================================+   |
|                                                            |
|      [blurred 3D world visible in background]             |
+------------------------------------------------------------+
```

**Panel CSS:**
```css
.overlay-panel {
  background: rgba(8, 8, 20, 0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.05),
              0 32px 64px rgba(0,0,0,0.6);
  max-width: 860px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 32px;
}
```

**Panel animation (Framer Motion):**
```tsx
<AnimatePresence>
  {overlayOpen && (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="overlay-panel"
    >
      {/* content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Colors

Each building gets an accent color. Used for the panel header, badges, buttons.

```
About Me    -> #4ADE80  (green)
Projects    -> #60A5FA  (blue)
Skills      -> #FBBF24  (yellow/gold)
Tools       -> #FB923C  (orange)
Leadership  -> #A78BFA  (purple)
Contact     -> #F472B6  (pink)
```

Background is always the same dark glass. Only the accent changes.

### Typography

- Heading: `font-family: 'Inter', sans-serif` — bold, large, clean
- Body: `Inter` at 14-16px
- Code/tech names: `JetBrains Mono` — monospaced, techy
- For in-world signs: use `Monocraft` (a Minecraft-inspired font, free) or Three.js Text with any pixel-art font

---

## 8. Tech Stack — What to Use and Why

### Next.js 14

Use App Router. This is the current standard.

Why Next.js over plain React:
- File-based routing is clean
- Easy deployment on Vercel (free tier is enough)
- Can add API routes later (for contact form, visitor count)
- Good performance defaults

### React Three Fiber (R3F)

Three.js is the 3D engine. React Three Fiber is a React wrapper around it.

Without R3F:
```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

With R3F:
```jsx
<mesh>
  <boxGeometry args={[1, 1, 1]} />
  <meshLambertMaterial map={texture} />
</mesh>
```

It's just React. Use state, hooks, components, all the React patterns you know.

### @react-three/drei

A collection of helpers built on top of R3F. You'll use these constantly:

```
Sky                  -> procedural sky with atmosphere
PointerLockControls  -> mouse-look with pointer lock (built in!)
useProgress          -> loading progress for Suspense
useTexture           -> load + cache textures
Text                 -> 3D text for building signs
Html                 -> put a DOM element inside 3D space
Instances/Instance   -> efficient rendering of many identical objects (trees)
```

### Zustand

Tiny state management. No boilerplate. Perfect for this project.

You need global state because both the 3D scene (R3F, inside Canvas) and the UI layer (outside Canvas) need to talk to each other. Zustand handles this perfectly — it doesn't care whether you're inside or outside the Canvas.

What goes in the store:
```typescript
{
  nearbyBuilding: string | null,   // which building player is near
  activeBuilding: string | null,   // which building is open
  overlayOpen: boolean,
  hasSeenTutorial: boolean,
  audioEnabled: boolean,
  minimapVisible: boolean,
}
```

### Tailwind CSS

Already included with Next.js setup. Use it for all UI panels.

### Framer Motion

For overlay animations. `npm install framer-motion`

Only use it for: panel open/close animations, interaction prompt fade in/out, mode transition (landing -> 3D).

Don't animate things inside the 3D scene with Framer Motion. Three.js handles that.

### What NOT to Use

| Library | Why Skip It |
|---------|-------------|
| `@react-three/cannon` | Physics engine — overkill. AABB collision in plain JS is enough. |
| React Query / SWR | No server data fetching needed. Content is local JSON files. |
| Redux | Way too heavy. Zustand is perfect. |
| Babylon.js | Good engine but worse React integration than R3F. |
| Unity WebGL | Massive bundle size, slow load, complex toolchain. Not worth it. |
| A-Frame | VR-focused, not right for this. |

---

## 9. Full Folder Structure

```
minecraft-portfolio/
|
+-- app/                              # Next.js App Router
|   +-- globals.css                   # Tailwind imports + CSS variables
|   +-- layout.tsx                    # Root layout (fonts, meta)
|   +-- page.tsx                      # Landing page — pick a mode
|   +-- normal/
|   |   +-- page.tsx                  # Normal mode portfolio
|   +-- immersive/
|       +-- page.tsx                  # 3D world entry point
|
+-- components/
|   |
|   +-- landing/
|   |   +-- ModeSelector.tsx          # The two buttons on landing
|   |   +-- LandingScene.tsx          # Animated background (optional)
|   |
|   +-- normal/                       # Normal mode sections
|   |   +-- NormalLayout.tsx
|   |   +-- Hero.tsx
|   |   +-- About.tsx
|   |   +-- Projects.tsx
|   |   +-- Skills.tsx
|   |   +-- Contact.tsx
|   |
|   +-- immersive/
|       |
|       +-- ImmersiveWorld.tsx        # Root: Canvas + DOM UI together
|       |
|       +-- scene/                    # Everything inside Canvas
|       |   +-- WorldScene.tsx        # Main scene component
|       |   +-- Terrain.tsx           # Ground plane
|       |   +-- Sky.tsx               # Skybox wrapper
|       |   +-- Lighting.tsx          # Sun + ambient lights
|       |   +-- Decorations.tsx       # Trees, fences, well (instanced)
|       |
|       +-- buildings/
|       |   +-- Building.tsx          # Single reusable building component
|       |   +-- BuildingGeometry.tsx  # The actual 3D mesh
|       |   +-- BuildingSign.tsx      # Name sign above door
|       |   +-- Door.tsx              # Visual door (animated open/close)
|       |   +-- buildings.data.ts     # All 6 buildings: position, size, content
|       |
|       +-- player/
|       |   +-- Player.tsx            # Combines camera + movement + collision
|       |   +-- useKeyboard.ts        # WASD key state hook
|       |   +-- useMovement.ts        # Movement logic in useFrame
|       |   +-- useProximity.ts       # Building proximity check
|       |
|       +-- ui/                       # DOM elements overlaid on 3D
|           +-- HUD.tsx               # Wrapper for all HUD elements
|           +-- Crosshair.tsx         # Center crosshair
|           +-- InteractPrompt.tsx    # "Press E to enter..."
|           +-- LocationIndicator.tsx # "You're near: Projects"
|           +-- OverlayPanel.tsx      # Building content panel
|           +-- ControlsGuide.tsx     # Tutorial shown on first visit
|           +-- LoadingScreen.tsx     # Progress screen
|           +-- Minimap.tsx           # Top-down map (v2)
|
+-- panels/                           # Panel content per building
|   +-- AboutPanel.tsx
|   +-- ProjectsPanel.tsx
|   +-- SkillsPanel.tsx
|   +-- ToolsPanel.tsx
|   +-- LeadershipPanel.tsx
|   +-- ContactPanel.tsx
|
+-- content/                          # YOUR ACTUAL PORTFOLIO DATA (edit here)
|   +-- about.ts
|   +-- projects.ts
|   +-- skills.ts
|   +-- tools.ts
|   +-- leadership.ts
|   +-- contact.ts
|
+-- store/
|   +-- useGameStore.ts               # Zustand store
|
+-- lib/
|   +-- collision.ts                  # AABB collision functions
|   +-- constants.ts                  # SPEED, FOV, WORLD_SIZE, etc.
|   +-- utils.ts                      # Helpers
|
+-- types/
|   +-- building.ts                   # Building and content types
|   +-- game.ts                       # Game state types
|
+-- public/
    +-- textures/
    |   +-- grass_top.png             # 16x16 Minecraft textures
    |   +-- grass_side.png
    |   +-- oak_planks.png
    |   +-- oak_log.png
    |   +-- oak_log_top.png
    |   +-- cobblestone.png
    |   +-- stone_bricks.png
    |   +-- glass.png
    |   +-- dirt.png
    |   +-- leaves_oak.png
    |   +-- gravel.png
    +-- audio/
    |   +-- ambient.ogg               # Background loop
    |   +-- interact.ogg              # Building enter sound
    |   +-- footstep.ogg              # Walking sound
    |   +-- close.ogg                 # Panel close sound
    +-- fonts/
        +-- monocraft.ttf             # Pixel font for signs (free)
```

---

## 10. How to Build It — Step by Step

### Step 0 — Project Setup

```bash
npx create-next-app@latest minecraft-portfolio \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir

cd minecraft-portfolio

# 3D stack
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three

# State
npm install zustand

# Animations
npm install framer-motion

# Audio (install when you need it)
npm install howler
npm install -D @types/howler

# Utilities
npm install clsx tailwind-merge
```

### Step 1 — Get the Canvas Working

Before anything else, just get a colored box on screen to verify R3F works.

```tsx
// app/immersive/page.tsx
'use client';
import dynamic from 'next/dynamic';

// CRITICAL: Always use dynamic import with ssr: false for R3F
// Three.js uses window/document — these don't exist on server
const ImmersiveWorld = dynamic(
  () => import('@/components/immersive/ImmersiveWorld'),
  { ssr: false, loading: () => <div>Loading world...</div> }
);

export default function ImmersivePage() {
  return <ImmersiveWorld />;
}
```

```tsx
// components/immersive/ImmersiveWorld.tsx
import { Canvas } from '@react-three/fiber';

export default function ImmersiveWorld() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ fov: 75, position: [0, 1.7, 0] }}>
        <ambientLight intensity={0.5} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshLambertMaterial color="green" />
        </mesh>
      </Canvas>
    </div>
  );
}
```

If you see a green box -> R3F works. Continue.

### Step 2 — First Person Controls

```tsx
// components/immersive/player/useKeyboard.ts
import { useRef, useEffect } from 'react';

export function useKeyboard() {
  const keys = useRef({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') keys.current.w = true;
      if (e.code === 'KeyA') keys.current.a = true;
      if (e.code === 'KeyS') keys.current.s = true;
      if (e.code === 'KeyD') keys.current.d = true;
    };
    const up = (e: KeyboardEvent) => {
      if (e.code === 'KeyW') keys.current.w = false;
      if (e.code === 'KeyA') keys.current.a = false;
      if (e.code === 'KeyS') keys.current.s = false;
      if (e.code === 'KeyD') keys.current.d = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return keys;
}
```

```tsx
// components/immersive/player/Player.tsx
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { Vector3, Euler } from 'three';
import { useKeyboard } from './useKeyboard';

const SPEED = 8;

export function Player() {
  const { camera } = useThree();
  const keys = useKeyboard();
  const controlsRef = useRef(null);

  useEffect(() => {
    camera.position.y = 1.7;
  }, []);

  useFrame((_, delta) => {
    const direction = new Vector3();
    if (keys.current.w) direction.z -= 1;
    if (keys.current.s) direction.z += 1;
    if (keys.current.a) direction.x -= 1;
    if (keys.current.d) direction.x += 1;

    if (direction.length() > 0) {
      direction.normalize();
      direction.multiplyScalar(SPEED * delta);
      // Only apply Y rotation — no flying when looking up/down
      direction.applyEuler(new Euler(0, camera.rotation.y, 0));
      camera.position.add(direction);
      camera.position.y = 1.7;
    }
  });

  return <PointerLockControls ref={controlsRef} />;
}
```

### Step 3 — Terrain

```tsx
// components/immersive/scene/Terrain.tsx
import { useTexture } from '@react-three/drei';
import { NearestFilter, RepeatWrapping } from 'three';

export function Terrain() {
  const texture = useTexture('/textures/grass_top.png');
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(32, 32);
  // CRITICAL for pixel look:
  texture.magFilter = NearestFilter;
  texture.minFilter = NearestFilter;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[128, 128]} />
      <meshLambertMaterial map={texture} />
    </mesh>
  );
}
```

### Step 4 — A Building

```tsx
// components/immersive/buildings/Building.tsx
import { useMemo } from 'react';
import { useTexture, Text } from '@react-three/drei';
import { NearestFilter, RepeatWrapping } from 'three';

interface BuildingProps {
  position: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
  name: string;
  accentColor: string;
}

export function Building({
  position, width = 6, height = 5, depth = 6, name, accentColor
}: BuildingProps) {
  const wallTexture = useTexture('/textures/oak_planks.png');
  const roofTexture = useTexture('/textures/oak_log_top.png');

  [wallTexture, roofTexture].forEach(t => {
    t.magFilter = NearestFilter;
    t.minFilter = NearestFilter;
  });

  return (
    <group position={position}>
      {/* Main walls */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, depth]} />
        <meshLambertMaterial map={wallTexture} />
      </mesh>
      {/* Flat roof overhang */}
      <mesh position={[0, height + 0.25, 0]}>
        <boxGeometry args={[width + 0.5, 0.5, depth + 0.5]} />
        <meshLambertMaterial map={roofTexture} />
      </mesh>
      {/* Sign above door */}
      <Text
        position={[0, height + 1.2, depth / 2 + 0.1]}
        fontSize={0.5}
        color={accentColor}
        font="/fonts/monocraft.ttf"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}
```

### Step 5 — Zustand Store

```typescript
// store/useGameStore.ts
import { create } from 'zustand';

interface GameState {
  nearbyBuilding: string | null;
  activeBuilding: string | null;
  overlayOpen: boolean;
  hasSeenTutorial: boolean;
  audioEnabled: boolean;

  setNearbyBuilding: (id: string | null) => void;
  openBuilding: (id: string) => void;
  closeBuilding: () => void;
  markTutorialSeen: () => void;
  toggleAudio: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  nearbyBuilding: null,
  activeBuilding: null,
  overlayOpen: false,
  hasSeenTutorial: false,
  audioEnabled: false,

  setNearbyBuilding: (id) => set({ nearbyBuilding: id }),
  openBuilding: (id) => set({ activeBuilding: id, overlayOpen: true }),
  closeBuilding: () => set({ activeBuilding: null, overlayOpen: false }),
  markTutorialSeen: () => set({ hasSeenTutorial: true }),
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
}));
```

### Step 6 — Building Config File

```typescript
// components/immersive/buildings/buildings.data.ts

export interface BuildingData {
  id: string;
  name: string;
  emoji: string;
  accentColor: string;
  position: [number, number, number];
  size: { w: number; h: number; d: number };
  triggerRadius: number;
  collider: { minX: number; maxX: number; minZ: number; maxZ: number };
}

export const BUILDINGS: BuildingData[] = [
  {
    id: 'about',
    name: 'About Me',
    emoji: '🏠',
    accentColor: '#4ADE80',
    position: [-18, 0, -15],
    size: { w: 6, h: 5, d: 6 },
    triggerRadius: 5,
    collider: { minX: -21, maxX: -15, minZ: -18, maxZ: -12 },
  },
  {
    id: 'projects',
    name: 'Projects',
    emoji: '🏭',
    accentColor: '#60A5FA',
    position: [18, 0, -15],
    size: { w: 8, h: 6, d: 7 },
    triggerRadius: 5,
    collider: { minX: 14, maxX: 22, minZ: -18.5, maxZ: -11.5 },
  },
  {
    id: 'skills',
    name: 'Skills',
    emoji: '📚',
    accentColor: '#FBBF24',
    position: [-18, 0, 10],
    size: { w: 6, h: 5, d: 6 },
    triggerRadius: 5,
    collider: { minX: -21, maxX: -15, minZ: 7, maxZ: 13 },
  },
  {
    id: 'tools',
    name: 'Tools',
    emoji: '🔧',
    accentColor: '#FB923C',
    position: [18, 0, 10],
    size: { w: 5, h: 4, d: 5 },
    triggerRadius: 4.5,
    collider: { minX: 15.5, maxX: 20.5, minZ: 7.5, maxZ: 12.5 },
  },
  {
    id: 'leadership',
    name: 'Leadership',
    emoji: '🏛',
    accentColor: '#A78BFA',
    position: [-12, 0, 28],
    size: { w: 7, h: 5, d: 6 },
    triggerRadius: 5,
    collider: { minX: -15.5, maxX: -8.5, minZ: 25, maxZ: 31 },
  },
  {
    id: 'contact',
    name: 'Contact',
    emoji: '📮',
    accentColor: '#F472B6',
    position: [12, 0, 28],
    size: { w: 5, h: 4, d: 5 },
    triggerRadius: 4.5,
    collider: { minX: 9.5, maxX: 14.5, minZ: 25.5, maxZ: 30.5 },
  },
];
```

### Step 7 — Overlay Panel

```tsx
// components/immersive/ui/OverlayPanel.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { BUILDINGS } from '../buildings/buildings.data';
import { AboutPanel } from '@/panels/AboutPanel';
import { ProjectsPanel } from '@/panels/ProjectsPanel';
import { SkillsPanel } from '@/panels/SkillsPanel';
import { ToolsPanel } from '@/panels/ToolsPanel';
import { LeadershipPanel } from '@/panels/LeadershipPanel';
import { ContactPanel } from '@/panels/ContactPanel';

const PANEL_MAP: Record<string, React.ComponentType> = {
  about: AboutPanel,
  projects: ProjectsPanel,
  skills: SkillsPanel,
  tools: ToolsPanel,
  leadership: LeadershipPanel,
  contact: ContactPanel,
};

export function OverlayPanel() {
  const { overlayOpen, activeBuilding, closeBuilding } = useGameStore();
  const building = BUILDINGS.find(b => b.id === activeBuilding);
  const PanelContent = activeBuilding ? PANEL_MAP[activeBuilding] : null;

  return (
    <AnimatePresence>
      {overlayOpen && building && PanelContent && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBuilding}
          />
          {/* Panel */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl p-8"
              style={{
                background: 'rgba(8, 8, 20, 0.88)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.7)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{building.emoji}</span>
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: building.accentColor }}
                  >
                    {building.name}
                  </h2>
                </div>
                <button
                  onClick={closeBuilding}
                  className="text-gray-400 hover:text-white text-xl transition-colors p-2 rounded-lg hover:bg-white/10"
                >
                  x
                </button>
              </div>

              {/* Content */}
              <PanelContent />

              {/* Footer hint */}
              <p className="text-center text-gray-500 text-sm mt-6">
                Press ESC to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### Step 8 — Putting It All Together

```tsx
// components/immersive/ImmersiveWorld.tsx
'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Terrain } from './scene/Terrain';
import { Lighting } from './scene/Lighting';
import { Decorations } from './scene/Decorations';
import { BUILDINGS } from './buildings/buildings.data';
import { Building } from './buildings/Building';
import { Player } from './player/Player';
import { LoadingScreen } from './ui/LoadingScreen';
import { HUD } from './ui/HUD';
import { OverlayPanel } from './ui/OverlayPanel';
import { ControlsGuide } from './ui/ControlsGuide';

export default function ImmersiveWorld() {
  return (
    <div className="w-screen h-screen relative overflow-hidden bg-sky-400">

      {/* 3D Canvas */}
      <Canvas
        camera={{ fov: 75, near: 0.1, far: 500, position: [0, 1.7, 20] }}
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
      >
        <Suspense fallback={null}>
          <Sky sunPosition={[100, 20, 100]} />
          <Lighting />
          <Terrain />
          <Decorations />
          {BUILDINGS.map(b => (
            <Building
              key={b.id}
              position={b.position}
              width={b.size.w}
              height={b.size.h}
              depth={b.size.d}
              name={b.name}
              accentColor={b.accentColor}
            />
          ))}
          <Player />
        </Suspense>
      </Canvas>

      {/* DOM UI Layer */}
      <LoadingScreen />
      <HUD />
      <OverlayPanel />
      <ControlsGuide />
    </div>
  );
}
```

---

## 11. All the Code Patterns You Need

### Texture Loading (The Right Way)

```tsx
import { useTexture } from '@react-three/drei';
import { NearestFilter, RepeatWrapping } from 'three';

function TexturedMesh() {
  const texture = useTexture('/textures/oak_planks.png');

  // These two lines are THE most important for Minecraft look
  texture.magFilter = NearestFilter;   // no smoothing on zoom in
  texture.minFilter = NearestFilter;   // no smoothing on zoom out

  // If you want the texture to tile (terrain, walls)
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(2, 2);

  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial map={texture} />
    </mesh>
  );
}
```

### Instanced Trees (Performance)

```tsx
import { Instances, Instance } from '@react-three/drei';

const TREE_POSITIONS: [number, number, number][] = [
  [-25, 0, -25], [-30, 0, -10], [28, 0, -20],
  [25, 0, 5],  [-28, 0, 15],  [30, 0, 30],
];

function Trees() {
  return (
    <group>
      {/* Trunks */}
      <Instances>
        <cylinderGeometry args={[0.3, 0.3, 2, 8]} />
        <meshLambertMaterial color="#5c4033" />
        {TREE_POSITIONS.map((pos, i) => (
          <Instance key={i} position={[pos[0], 1, pos[2]]} />
        ))}
      </Instances>
      {/* Canopy */}
      <Instances>
        <coneGeometry args={[2, 3, 8]} />
        <meshLambertMaterial color="#2d5a1b" />
        {TREE_POSITIONS.map((pos, i) => (
          <Instance key={i} position={[pos[0], 3.5, pos[2]]} />
        ))}
      </Instances>
    </group>
  );
}
```

### Loading Progress

```tsx
// components/immersive/ui/LoadingScreen.tsx
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  'Placing the last block...',
  'Loading your projects...',
  'Lighting the torches...',
  'Painting the sky...',
  'Planting the trees...',
];

export function LoadingScreen() {
  const { progress, active } = useProgress();
  const msgIndex = Math.floor((progress / 100) * MESSAGES.length);
  const message = MESSAGES[Math.min(msgIndex, MESSAGES.length - 1)];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1a1a2e]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-4 border-[#8B6914] p-8 bg-[#2a2a3e] rounded">
            <h1 className="text-white text-xl font-mono mb-6 text-center">
              Loading World...
            </h1>
            <div className="w-64 h-4 bg-gray-800 rounded border border-gray-600">
              <motion.div
                className="h-full bg-green-400 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm font-mono mt-3 text-center">
              {message}
            </p>
            <p className="text-gray-600 text-xs font-mono mt-1 text-center">
              {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Proximity Check in useFrame

```tsx
// Inside Player.tsx or a separate ProximityDetector component
import { useFrame, useThree } from '@react-three/fiber';
import { useGameStore } from '@/store/useGameStore';
import { BUILDINGS } from '../buildings/buildings.data';

export function ProximityDetector() {
  const { camera } = useThree();
  const setNearbyBuilding = useGameStore(s => s.setNearbyBuilding);
  const overlayOpen = useGameStore(s => s.overlayOpen);

  useFrame(() => {
    if (overlayOpen) return;

    let closest: string | null = null;
    let closestDist = Infinity;

    for (const building of BUILDINGS) {
      const dx = camera.position.x - building.position[0];
      const dz = camera.position.z - building.position[2];
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < building.triggerRadius && dist < closestDist) {
        closest = building.id;
        closestDist = dist;
      }
    }

    setNearbyBuilding(closest);
  });

  return null;
}
```

### ESC and E Key Handling

```tsx
// components/immersive/ui/OverlayPanel.tsx or a dedicated hook
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape' && overlayOpen) {
      closeBuilding();
      setTimeout(() => {
        // Re-acquire pointer lock after short delay
        document.querySelector('canvas')?.requestPointerLock?.();
      }, 150);
    }
    if (e.code === 'KeyE' && nearbyBuilding && !overlayOpen) {
      openBuilding(nearbyBuilding);
      document.exitPointerLock();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [overlayOpen, nearbyBuilding]);
```

---

## 12. Performance — How Not to Lag

### The Golden Rules

**1. Never create objects inside `useFrame`**

No `new Vector3()`, no `new Euler()` inside the per-frame loop. Create them once with `useRef` or outside the component, reuse every frame.

```tsx
// BAD
useFrame((_, delta) => {
  const dir = new Vector3(); // new object every frame = garbage collection hell
});

// GOOD
const dir = useMemo(() => new Vector3(), []);
useFrame((_, delta) => {
  dir.set(0, 0, 0); // reuse the same object
});
```

**2. Instanced meshes for repeated objects**

20 separate tree meshes = 20 draw calls. InstancedMesh = 1 draw call.

**3. `antialias: false` on Canvas**

This alone makes a big difference. Also gives that crisp pixelated look — so it's a performance win AND the right aesthetic.

**4. `dpr={[1, 1.5]}`**

Never let pixel ratio go above 1.5. 2.0 is a huge performance hit on high-DPI screens.

**5. No shadows in v1**

Shadow maps are expensive. Enable in v2 if you want pretty shadows.

**6. `frameloop="demand"`**

When the overlay is open, nothing in the 3D scene is changing. Tell R3F to stop rendering.

```tsx
<Canvas frameloop="demand" ...>
```

**7. Memoize geometry**

```tsx
// BAD: creates new geometry on every render
function Building() {
  return <boxGeometry args={[6, 5, 6]} />;
}

// GOOD: shared geometry
const geo = new THREE.BoxGeometry(6, 5, 6);
function Building() {
  return <primitive object={geo} />;
}
```

### Performance Targets

```
60fps on a 4-year-old laptop GPU
< 4 second load on average WiFi
< 800KB gzipped JS bundle (Three.js is ~160KB of that)
< 4MB total textures (at 16x16 PNG they're tiny)
```

---

## 13. Audio System

### What Sounds You Need

| Sound | When |
|-------|------|
| `ambient.ogg` | Loops while in 3D world |
| `interact.ogg` | One-shot when entering building |
| `footstep.ogg` | Loops quietly while WASD held |
| `close.ogg` | One-shot when closing panel |

### Getting Sounds

You own Minecraft — extract from:
```
.minecraft/assets/objects/
```
Use the asset index JSON to find the right files, or just search for them.

### Implementation

```typescript
// lib/audio.ts
import { Howl } from 'howler';

const sounds = {
  ambient: new Howl({ src: ['/audio/ambient.ogg'], loop: true, volume: 0.3 }),
  interact: new Howl({ src: ['/audio/interact.ogg'], volume: 0.7 }),
  close: new Howl({ src: ['/audio/close.ogg'], volume: 0.5 }),
  footstep: new Howl({ src: ['/audio/footstep.ogg'], loop: true, volume: 0.2 }),
};

export const playSound = (name: keyof typeof sounds) => sounds[name].play();
export const stopSound = (name: keyof typeof sounds) => sounds[name].stop();
```

**Critical:** Browsers block audio until user interacts with the page. Only start audio after the pointer lock click. Always show a mute toggle in the HUD. Default to muted.

---

## 14. Loading Screen

The loading screen appears while Three.js loads textures and geometry.

Uses `useProgress` from `@react-three/drei` — it hooks directly into Three.js's loading manager and gives you real progress (0-100) and `active` (boolean: true while loading).

See full implementation in Section 11 above.

Design:
- Full screen dark background
- Brown/stone Minecraft border style
- Green progress bar
- Rotating funny messages

---

## 15. Mobile & Accessibility

### Mobile

Pointer lock doesn't work on touchscreens. First-person WASD on mobile is a nightmare.

The right answer: detect mobile -> show a friendly redirect to Normal Mode.

```tsx
// hooks/useIsMobile.ts
export function useIsMobile() {
  if (typeof window === 'undefined') return false;
  return (
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    window.innerWidth < 768
  );
}
```

```tsx
// In your immersive page
const isMobile = useIsMobile();

if (isMobile) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8 text-center">
      <p className="text-4xl mb-4">🎮</p>
      <h2 className="text-xl font-bold mb-2">Immersive mode needs a keyboard + mouse</h2>
      <p className="text-gray-400 mb-6">Open this on a desktop for the full experience</p>
      <a href="/normal" className="bg-green-500 text-white px-6 py-3 rounded-lg">
        View Normal Mode instead
      </a>
    </div>
  );
}
```

Don't feel bad about this. It's a game. Games require controllers.

### SEO

The 3D world is not indexable by Google. That's fine — all your content also exists in Normal Mode, and that's what gets indexed.

---

## 16. All Libraries With Exact Reasons

| Library | Why |
|---------|-----|
| `three` | The actual 3D engine. Everything runs on this. |
| `@react-three/fiber` | React wrapper for Three.js. Write 3D in JSX. |
| `@react-three/drei` | Helpers: PointerLockControls, Sky, useTexture, Text, Instances, useProgress. Saves days of work. |
| `zustand` | Global state management. 3D scene and DOM UI need shared state. Zustand works inside and outside Canvas. |
| `framer-motion` | Panel animations. AnimatePresence for smooth enter/exit. |
| `tailwindcss` | UI styling for panels and HUD. |
| `howler` | Audio. Cross-browser, handles .ogg/.mp3, loop/volume control. |
| `clsx` | Clean conditional className strings. |
| `next` | Framework. App Router, Vercel deploy, dynamic imports. |

### Full Install

```bash
npm install three @react-three/fiber @react-three/drei zustand framer-motion howler clsx tailwind-merge
npm install -D @types/three
```

---

## 17. What to Build First (MVP)

Build in this exact order. Do not skip ahead.

```
1.  Canvas on screen + green box visible       (R3F works)
2.  Pointer lock + mouse look                  (controls work)
3.  WASD movement                              (tune SPEED until it feels right)
4.  Terrain (grass plane with texture)         (now it looks like something)
5.  One building placed in the world           (place it, see it)
6.  Collision with that building               (can't walk through it)
7.  Proximity detection                        (detects when you're near)
8.  "Press E" prompt in HUD                    (UI layer works)
9.  E key opens overlay                        (the loop works)
10. One overlay panel with real content        (Projects, fully built)
11. ESC closes overlay + relocks pointer       (full loop complete)
12. Loading screen                             (first polish)

-> That's your MVP. It works. You can show people.

Then add:
13. All 6 buildings placed with colliders
14. All 6 panels with content
15. Sky + trees + decorations
16. Building signs
17. Controls tutorial on first visit
18. Landing page (mode selector)
19. Normal mode
20. Audio
```

The loop in steps 1-12 is everything. Once you can walk around, approach a building, enter it, read your projects, and close it — you have a portfolio. Everything else is content and polish.

---

## 18. What to Add Later

Things that are genuinely cool but don't belong in v1:

- **Animated doors** — opens when you enter, closes when you leave
- **Day/night cycle** — move the sun, change ambient light, add moon and stars
- **NPC villager** — static mesh that rotates to look at you (simple tracking)
- **Particles** — falling leaves near oak trees, fireflies at night
- **Shareable links** — `/immersive?open=projects` deep links to a specific building
- **Fog** — `<fog attach="fog" args={['#87CEEB', 50, 120]} />` — one line, adds huge depth
- **Post-processing** — bloom on signs, slightly pixelated effect with SMAA
- **Seasonal themes** — snow in December, cherry blossoms in spring
- **Custom 404 page** — "You got lost in the woods"
- **Visitor indicator** — "Someone else is exploring right now" (WebSocket or Supabase)
- **Touch joystick** — someday, v3

---

## 19. Things That Will Go Wrong

These will happen. Being prepared means you won't panic.

**Blank screen, no error**
You're trying to run Three.js on the server. Add `ssr: false` to your dynamic import. This is the #1 R3F gotcha with Next.js.

**Can't walk through anything (or walks through everything)**
Your AABB coordinates are wrong or the collision check is inverted. Console.log the camera position and compare to your collider min/max values.

**Movement feels floaty / different speeds on different computers**
You forgot to multiply by `delta`. Without delta, fast computers move faster than slow ones.

**Looking up/down makes you fly diagonally**
You're applying the full camera rotation to movement. Only apply Y rotation (yaw). See the movement code in Step 2 above.

**Texture is blurry / smoothed**
Forgot `NearestFilter`. That single setting is the difference between Minecraft-style and generic 3D.

**Pointer lock works on localhost but breaks in production**
Pointer lock requires HTTPS. Vercel gives you HTTPS by default. If it still fails, check the browser console for security policy errors.

**Overlay panel is behind the 3D scene**
The Canvas covers everything by default. Put DOM UI outside the Canvas with `position: fixed` and a high z-index.

**Audio doesn't play**
Browser blocked it — no user gesture happened yet. Start audio only after the canvas click (pointer lock click counts as a user gesture).

**It's smooth on your machine, laggy on others**
You have a good GPU. Others don't. Remove shadows, verify your `dpr={[1, 1.5]}`, use InstancedMesh for trees, check for object creation inside `useFrame`.

**PointerLockControls fighting with your ESC handler**
`PointerLockControls` has its own ESC listener. Set `makeDefault={false}` or manually manage the lock state to prevent conflicts.

---

## 20. Getting Minecraft Textures

You own Minecraft Java Edition. Extract textures directly from your install.

### Finding the JAR

```
Windows: C:\Users\[you]\AppData\Roaming\.minecraft\versions\[version]\[version].jar
Mac:     ~/Library/Application Support/minecraft/versions/[version]/[version].jar
Linux:   ~/.minecraft/versions/[version]/[version].jar
```

A `.jar` file is just a `.zip`. Rename it to `.zip`, extract it, navigate to:
```
assets/minecraft/textures/block/
```

### Textures to Extract

| JAR Filename | Use In Project |
|-------------|---------------|
| `grass_block_top.png` | Terrain top |
| `grass_block_side.png` | Terrain edges |
| `dirt.png` | Paths, under grass |
| `oak_planks.png` | Building walls (cozy buildings) |
| `oak_log.png` | Tree trunks, log cabins |
| `oak_log_top.png` | Roof texture |
| `oak_leaves.png` | Tree canopy |
| `cobblestone.png` | Stone paths |
| `stone_bricks.png` | Workshop/forge walls |
| `glass.png` | Windows |
| `gravel.png` | Path variation |
| `bookshelf.png` | Library building interior |

Copy them into `public/textures/` in your Next.js project. They're all 16x16 PNG files — incredibly small.

### Sounds

```
.minecraft/assets/objects/
```

The sound files are stored with hash-based names. Open `.minecraft/assets/indexes/[version].json` to find which hash corresponds to which sound. Minecraft sounds you want:
- `music/game/` — ambient music tracks
- `step/grass1.ogg` through `grass4.ogg` — footstep sounds
- `random/click.ogg` — interaction sound

### Font

The official Minecraft font files are in the JAR too:
```
assets/minecraft/textures/font/
```

For Three.js Text component, use `Monocraft` — a free, MIT-licensed, open source font inspired by Minecraft:
- GitHub: `IdreesInc/Monocraft`
- Download the `.ttf`, put it in `public/fonts/monocraft.ttf`

---

## Quick Reference

### Constants to Tune

```typescript
// lib/constants.ts
export const PLAYER_SPEED = 8;           // units per second (feel it out)
export const PLAYER_HEIGHT = 1.7;        // camera Y position (eye level)
export const PLAYER_RADIUS = 0.4;        // collision radius
export const INTERACTION_DISTANCE = 4;   // units to trigger "Press E"
export const FOV = 75;                   // degrees (Minecraft is ~70)
export const NEAR_CLIP = 0.1;
export const FAR_CLIP = 500;
export const WORLD_SIZE = 128;           // terrain size in units
export const TEXTURE_REPEAT = 32;        // how many times grass tiles across terrain
```

### Canvas Props That Matter

```tsx
<Canvas
  camera={{ fov: 75, near: 0.1, far: 500, position: [0, 1.7, 20] }}
  dpr={[1, 1.5]}           // pixel ratio: never go above 1.5
  gl={{
    antialias: false,       // off = pixelated Minecraft look + better performance
    powerPreference: 'high-performance',
  }}
  frameloop="demand"        // don't re-render if nothing changed
>
```

### The Render Order (Important for Performance)

```
Sky (cheapest — just a shader)
    |
Terrain (one mesh with repeated texture)
    |
Decorations (InstancedMesh — cheap)
    |
Buildings (6 meshes — cheap)
    |
Player (no visible mesh — just camera)
```

---

*Build the loop first. Walk around, enter a building, see your content, close it, walk away. Once that feels good — you're done with the hard part.*
