# 🌲 Immersive Voxel Portfolio

A cinematic, interactive 3D portfolio experience built with **Next.js**, **Three.js**, and **Convex**. Explore a hand-crafted voxel village where your work comes to life across different atmospheric buildings, or switch to a high-speed brutalist interface.

## 🌟 Dual-Mode Experience

- **⚡ Normal Mode**: A lighting-fast, brutalist-tech landing page for quick access to projects and experience.
- **🎮 Immersive Mode**: A first-person 3D world with physical navigation, dynamic lighting, and spatial audio.

## ✨ Key Features

- **🗺️ Global Guestbook (Signboards)**: Leave permanent messages in the 3D world. Powered by **Convex** for real-time synchronization across all visitors.
- **🎮 Minecraft-Inspired Engine**: Smooth movement, collision detection, and voxel interactions.
- **🌇 Real-Time Day/Night**: Dynamic environmental lighting shifts that transform the atmosphere.
- **🎞️ Cinematic Logic**: Seamless entries into building interiors with automatic mouse release.
- **🧱 Procedural Voxel Art**: Custom-built symmetrical architecture for Skills, Projects, and About sections.
- **📬 One-Click Contact**: Brutalist contact module with "Click to Copy" email integration and social links.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router), [React](https://reactjs.org/)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) / [Three.js](https://threejs.org/)
- **Backend/Database**: [Convex](https://www.convex.dev/) (Real-time global state)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Audio**: [Howler.js](https://howlerjs.com/)

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nikhil2004-blip/portfolio.git
   cd portfolio
   ```

2. **Setup Environment**:
   Copy `.env.example` to `.env.local` and fill in your Convex and GitHub credentials.

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the development server**:
   ```bash
   npx convex dev # In one terminal
   npm run dev    # In another terminal
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

## 🕹️ Controls (Immersive Mode)

- **WASD / Arrows**: Move around
- **Mouse**: Look around (Pointer Lock)
- **Space**: Toggle Day/Night cycle
- **Ctrl + Shift + G**: Show/Hide all guest signboards
- **ESC**: Exit building or release mouse cursor

## 📜 License

Distributed under the **MIT License**.

---

Crafted with ❤️ by [Nikhil Kumar Yadav](https://github.com/nikhil2004-blip)
