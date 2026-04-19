import dynamic from 'next/dynamic';
import { LoadingScreen } from '@/components/immersive/ui/LoadingScreen';

const ImmersiveWorld = dynamic(
  () => import('@/components/immersive/ImmersiveWorld'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-screen bg-[#09090b]" />
  }
);

export default function ImmersivePage() {
  return (
    <main className="w-full h-screen bg-[#09090b] overflow-hidden m-0 p-0 relative">
      <LoadingScreen />
      <ImmersiveWorld />
    </main>
  );
}
