# Project Memory: Portfolio Final State (v1.0)

This document records the final design decisions and architectural state of the portfolio as of April 19, 2026.

## 🚀 Experience Architecture
- **Dual-Experience System**:
  - **Gateway (`/`)**: A high-tech "W14" themed landing page allowing users to choose between Immersive and Normal modes.
  - **Immersive Mode (`/immersive`)**: A 3D voxel-based engine (Minecraft style) built with React Three Fiber.
  - **Normal Mode (`/normal`)**: An ultra-minimalist, high-performance HUD portfolio for quick browsing. Includes a global "Back" navigation for easy context switching.

## 🎨 Visual Identity (W14 E-Performance)
- **Primary Color**: `#00ffcc` (W14 Cyan) - Used for neon lines, glows, and active states.
- **Background**: Deep technical black (`#080808`) with a grain texture and a 40px HUD grid.
- **Typography**: 
  - `Outfit` (Headings, bold/italicized).
  - `JetBrains Mono` (Technical data, telemetry).
- **HUD Elements**: Integrated secondary telemetry sidebars, dynamic scanline animations, and real-time system clocks.

## 🛠️ Integrated Tech Stack & Content
- **CGPA**: 9.28 (Ramaiah Institute of Technology).
- **Key Skills**: Unity, Godot (GDExtension), Convex, MongoDB, Vercel, Cursor/Antigravity, Flutter.
- **External Links**: LeetCode (200+ solved), GitHub, LinkedIn.

## 🔧 Technical Fixes & Optimizations
- **Scroll System**: Replaced `overflow: hidden` with `overflow-x: hidden` to allow vertical scrolling in the normal portfolio while preserving 3D canvas bounds.
- **Navigation**: Implemented `IntersectionObserver` in `MinimalPortfolio.tsx` for precise section-tracking and dot-indicator updates.
- **Iconography**: Migrated from legacy Lucide icons to verified stable versions (`GitBranch`, `Briefcase`, `Terminal`, `Monitor`).
- **Telemetry**: Added real-time clock and mock system performance metrics for visual depth.

## 📁 Critical Files
- `components/landing/LandingPage.tsx`: Gateway UI.
- `components/minimal/MinimalPortfolio.tsx`: Minimalist HUD UI.
- `components/immersive/`: 3D Engine & Buildings.
- `content/`: Centralized data store for skills, projects, and bio.
- `tailwind.config.ts`: Custom design tokens for the W14 theme.
