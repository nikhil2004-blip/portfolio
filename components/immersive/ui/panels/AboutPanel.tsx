import Image from 'next/image';
import { about } from '@/content/about';

export function AboutPanel() {
  return (
    <div className="text-white">
      <h2 className="font-monocraft text-2xl text-mc-gold mb-6 border-b-2 border-mc-gold/30 pb-2">
        Player Profile
      </h2>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar/Skin Section */}
        <div className="flex flex-col items-center gap-4 shrink-0 w-full md:w-64">
          <div className="w-48 h-48 relative border-4 border-mc-darkGreen bg-mc-dirt rounded shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Fallback to a styled div if image path is broken/missing initially */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-6xl font-monocraft text-gray-600">
              ?
            </div>
            {/* <Image src={about.photo} alt={about.name} fill className="object-cover pixelated z-10" /> */}
          </div>
          <div className="text-center">
            <h3 className="font-bold text-xl">{about.name}</h3>
            <p className="text-mc-green font-monocraft text-sm mt-1">{about.title}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4 text-gray-200">
            {about.bio.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">{paragraph}</p>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-black/40 p-4 rounded border border-white/10">
              <h4 className="font-monocraft text-mc-gold text-xs mb-2">Currently Building</h4>
              <p className="text-sm text-gray-300">{about.currentlyBuilding}</p>
            </div>
            <div className="bg-black/40 p-4 rounded border border-white/10">
              <h4 className="font-monocraft text-mc-gold text-xs mb-2">Currently Learning</h4>
              <p className="text-sm text-gray-300">{about.currentlyLearning}</p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-monocraft text-mc-gold text-sm mb-3">Fun Facts</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              {about.funFacts.map((fact, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-mc-green">▶</span> {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6">
            <a 
              href={about.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mc-btn inline-block text-center font-monocraft"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
