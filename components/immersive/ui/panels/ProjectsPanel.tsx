'use client';
import { projects } from '@/content/projects';

interface Props { accentColor: string; }

export function ProjectsPanel({ accentColor }: Props) {
  return (
    <div className="text-white space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="border flex flex-col transition-all duration-200 hover:scale-[1.01]"
            style={{ borderColor: `${accentColor}30`, background: 'rgba(255,255,255,0.02)' }}
          >
            {/* Card Header */}
            <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: `${accentColor}20` }}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-monocraft text-base font-bold" style={{ color: accentColor }}>
                  {project.name}
                </h3>
                {project.badge && (
                  <span
                    className="font-monocraft text-xs px-2 py-0.5 border shrink-0"
                    style={{ borderColor: `${accentColor}50`, color: accentColor }}
                  >
                    {project.badge}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-xs mt-1 font-monocraft italic">{project.tagline}</p>
            </div>

            {/* Description */}
            <div className="px-5 py-3 flex-1">
              <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>

              {/* Stats */}
              {project.stats && project.stats.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {project.stats.map((s, i) => (
                    <li key={i} className="text-xs text-gray-500 flex gap-2">
                      <span style={{ color: `${accentColor}60` }}>›</span> {s}
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 border font-monocraft"
                    style={{ borderColor: `${accentColor}25`, color: `${accentColor}99` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="px-5 pb-4 flex gap-3 border-t mt-2 pt-3" style={{ borderColor: `${accentColor}15` }}>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-monocraft text-xs px-4 py-2 border flex-1 text-center transition-all duration-200 hover:opacity-80"
                  style={{ borderColor: `${accentColor}50`, color: accentColor, background: `${accentColor}10` }}
                >
                  [ SOURCE ]
                </a>
              )}
              {project.demo && project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-monocraft text-xs px-4 py-2 border flex-1 text-center"
                  style={{ borderColor: `${accentColor}50`, color: accentColor, background: `${accentColor}10` }}
                >
                  [ DEMO ]
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
