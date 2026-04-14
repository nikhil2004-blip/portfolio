import dynamic from 'next/dynamic';

// Dynamically import the 3D world to disable SSR.
// Three.js and Canvas require access to the window/document object,
// which is not available on the server.
const ImmersiveWorld = dynamic(
  () => import('@/components/immersive/ImmersiveWorld'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#1a1a2e] flex flex-col items-center justify-center font-monocraft text-white text-xs">
        <p className="mb-4 text-mc-gold animate-pulse">Initializing 3D Engine...</p>
        <p className="text-gray-500">Retrieving chunks</p>
      </div>
    )
  }
);

export default function Home() {
  return (
    <main className="w-full h-screen bg-black overflow-hidden m-0 p-0">
      <ImmersiveWorld />
    </main>
  );
}
