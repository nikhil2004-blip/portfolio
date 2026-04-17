import dynamic from 'next/dynamic';

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

export default function ImmersivePage() {
  return (
    <main className="w-full h-screen bg-black overflow-hidden m-0 p-0">
      <ImmersiveWorld />
    </main>
  );
}
