# Immersive 3D Portfolio - Project Documentation

## 🌟 Overview
This project is a highly interactive, Minecraft-inspired 3D portfolio built for the web. It diverges from traditional scrolling web pages by offering an immersive, first-person explorable voxel world. Visitors can walk around, experience a dynamic environment with a day/night cycle, interact with physical "buildings" that represent different sections of a resume (Projects, Skills, Experience, About), and leave real-time messages on a community guestbook. 

The goal is to showcase technical prowess, creativity, and a deep understanding of modern web technologies, offering a memorable user experience.

---

## 🏗 Tech Stack

The architecture leverages cutting-edge web technologies to deliver a 60FPS 3D experience in the browser while maintaining standard accessibility and SEO benefits through side-by-side minimal versions.

### Core Frameworks
*   **Next.js (App Router)**: Powers the application structure, routing, and SSR. Provides the foundation for serving both the minimal 2D site and the 3D experience seamlessly.
*   **React 19**: Drives the UI components, bridging the gap between standard DOM elements and WebGL elements.
*   **TypeScript**: Ensures type safety across complex game logic, state management, and component architecture.

### 3D Rendering & WebGL
*   **Three.js & @react-three/fiber (R3F)**: The engine behind the 3D world. R3F allows declarative construction of the 3D scene using React components.
*   **@react-three/drei**: Provides essential helpers for the 3D scene, such as pre-built skyboxes, particle effects, and camera controls.

### State Management & Physics
*   **Zustand**: Acts as the central nervous system of the game. It handles the UI state (e.g., is a menu open?), player preferences (audio, day/night), and guestbook synchronization without the performance overhead of React Context.
*   **Custom AABB Collision Detection**: *Why not a physics engine?* Libraries like Rapier or Cannon.js carry significant bundle size and calculation overhead. Since the world is grid-based and voxel-inspired, we implemented custom Axis-Aligned Bounding Box (AABB) collision math. This drastically improves performance, keeping frame rates high even on lower-end devices.

### UI / Styling
*   **Tailwind CSS**: Used for all standard HTML overlays (HUD, Menus, Information Panels).
*   **Framer Motion**: Handles smooth transitions and animations for DOM elements overlaid on the WebGL canvas.

---

## ⚙️ System Architecture & Data Flow

The project relies on a hybrid DOM/WebGL architecture. The 3D world runs in a `<Canvas>` element, while all user interface overlays (HUD, content panels) sit in the absolute HTML layer above it.

1.  **Entry Point (`app/page.tsx` & `LandingPage`)**: The user starts on a fast-loading standard 2D landing page. They are presented with a choice: Minimal UI or Immersive Experience.
2.  **Immersive Initialization (`ImmersiveWorld.tsx`)**: 
    *   Once selected, the `<Canvas>` mounts. 
    *   3D assets, textures, and geometry are loaded into the GPU.
    *   Global state detects screen size to serve either Desktop controls (Pointer-Lock + Keyboard) or Mobile controls (Virtual Joystick + Touch).
3.  **The Game Loop (`Player.tsx`)**: 
    *   `useFrame` hooks from R3F run up to 60/120 times per second. 
    *   It checks control inputs (`useControls.ts`) and updates the camera position.
    *   It concurrently runs custom boundary checks against the `BUILDINGS` array to prevent clipping through walls.
4.  **Interaction System**:
    *   A Raycaster checks if the player is looking at a recognizable entity (a building door or a sign).
    *   If the user presses "Interact" (or taps the mobile button), `useGameStore` updates `activeBuilding`.
    *   The game loop pauses specific actions, unlocks the pointer, and triggers the DOM layer (`OverlayPanel.tsx`) to fade in over the 3D scene, rendering the content.

---

## 🎮 Unique Features & "The Cool Stuff"

### 1. Hybrid Control Scheme
The project doesn't alienate mobile users. Desktop users get traditional WASD/Mouse First-Person controls. Mobile users are presented with a custom-built Virtual Joystick, touch-to-pan camera mechanics, and an orientation guard requiring Landscape mode, ensuring the immersive feel isn't lost on small screens.

### 2. Spatial Context "Buildings"
Instead of clicking a menu bar, users must walk to the "Projects" building. This spatial navigation makes the act of discovering the portfolio contents an engaging mini-game. 

### 3. Custom Physics & Geometry
To mimic Minecraft's aesthetic, the world uses Instanced Meshes for repeating blocks and custom box geometries for buildings. By relying on simple math equations for barriers instead of complex rigid-body simulations, the "game" is incredibly lightweight.

### 4. Interactive Guestbook system
This elevates the site from a static portfolio to a community hub. Visitors can write messages on virtual signboards placed in the 3D world. 

### 5. Day/Night Cycle & Atmospheric Particles
Toggleable environmental effects change the skybox, lighting (Ambient vs. Directional vs. Point lights), and spawn custom particle effects (fireflies at night, pollen during the day). 

---

## 🚀 Why We Did It This Way

*   **Why React Three Fiber instead of Unity/Unreal WebGL export?** 
    *   *Load time and seamlessness.* A Unity export loads as a massive black box iframe, taking forever and completely detaching from the rest of the website's ecosystem. R3F allows the 3D world to share state instantly with standard React DOM elements (like the overlay panels), keeping bundle sizes small and integration tight.
*   **Why a Custom store (Zustand)?** 
    *   React Context triggers re-renders for all consumers when any value changes. In a 60FPS 3D loop, a single unwarranted re-render drops frames. Zustand allows components to selectively subscribe to specific microscopic pieces of state.
*   **Why a Minimum/Immersive choice?** 
    *   Accessibility. A recruiter parsing hundreds of resumes might not want to navigate a 3D world to find a PDF link. Offering a minimal toggle proves an understanding of diverse user needs while still showing off technical flair.

---

## 📈 Future Roadmap
*   **Multiplayer / Presence:** Implementing WebSockets/WebRTC so users can see other floating blocks representing live current visitors.
*   **Database persistence:** Storing Guestbook signs in a remote DB (e.g., Supabase, Convex) so messages persist indefinitely.
*   **Audio Synthesis:** Spatially aware sounds (e.g., footsteps changing pitch on different voxel blocks).
