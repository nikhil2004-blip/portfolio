import { projects } from '@/content/projects';

export function ProjectsPanel() {
  return (
    <div className="text-white">
      <h2 className="font-monocraft text-2xl text-mc-gold mb-6 border-b-2 border-mc-gold/30 pb-2">
        Quest Log (Projects)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
        {projects.map((project, idx) => (
          <div key={idx} className="bg-black/40 border-2 border-white/10 rounded overflow-hidden flex flex-col hover:border-mc-gold/50 transition-colors">
            {/* Visual Header / Thumbnail Placeholder */}
            <div className="h-32 bg-gray-800 relative border-b-2 border-white/10 flex items-center justify-center overflow-hidden">
               {/* Minecraft style alternating stripes or a real image */}
               <div className="absolute inset-0 opacity-20" style={{
                 backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #222 25%, #222 75%, #000 75%, #000)',
                 backgroundPosition: '0 0, 10px 10px',
                 backgroundSize: '20px 20px'
               }} />
               <span className="font-monocraft text-gray-500 z-10 text-xs">NO_TEXTURE.PNG</span>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-xl mb-2 text-mc-green shadow-black drop-shadow-md">{project.name}</h3>
              <p className="text-gray-300 text-sm mb-4 flex-1">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, i) => (
                  <span key={i} className="bg-white/10 px-2 py-1 rounded text-xs font-monocraft text-gray-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-2 border-t border-white/10">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="mc-btn flex-1 text-center font-monocraft text-xs py-2">
                    Source
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="mc-btn flex-1 text-center font-monocraft text-xs py-2 bg-[#3A6B35]">
                    Play
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
