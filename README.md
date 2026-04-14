# 🌲 Immersive Voxel Portfolio

A cinematic, interactive 3D portfolio experience built with **Next.js**, **Three.js**, and **Zustand**. Explore a hand-crafted voxel village where your work comes to life across different atmospheric buildings.

![Voxel World](https://raw.githubusercontent.com/nikhilkx/minecraft-portfolio/main/public/preview.png) *(Preview placeholder)*

## ✨ Features

- **🎮 Immersive Navigation**: First-person perspective with smooth movement and collision detection.
- **🌇 Dynamic Atmosphere**: Real-time Day/Night cycle that transforms the world illumination.
- **🎞️ Cinematic Transitions**: Seamless "fade-to-black" building entries with automatic mouse release for UI interaction.
- **🧱 Procedural Voxel Architecture**: Symmetrical buildings themed by category (Projects, Skills, About).
- **🕹️ Retro UI**: Monocraft typography and pixel-perfect overlays for a cohesive gaming aesthetic.
- **🚀 Performance Optimized**: Leveraging GPU-accelerated `Instances` for rendering thousands of blocks at high frame rates.

## 🛠️ Tech Stack

- **Core**: [Next.js 14](https://nextjs.org/) (App Router)
- **3D Engine**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) / [Three.js](https://threejs.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Audio**: [Howler.js](https://howlerjs.com/)

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/minecraft-portfolio.git
   cd minecraft-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to start exploring.

## 🕹️ Controls

- **WASD / Arrows**: Move around the village
- **Mouse**: Look around (Pointer Lock)
- **Space**: Toggle Day/Night cycle
- **Proximity**: Walk into a building to open its portfolio section
- **ESC**: Exit a building and return to the 3D world

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

Crafted with ❤️ by [Nikhil Kumar Yadav](https://github.com/nikhilkx)
