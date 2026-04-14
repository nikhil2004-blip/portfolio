import { experience } from '@/content/experience';

interface Props {
  type?: 'work' | 'hackathon' | 'open-source';
}

export function ExperiencePanel({ type = 'work' }: Props) {
  // Filter experience by type, or show all if none specified
  // In the OverlayPanel we pass 'hackathon' for the leadership building, but let's just show everything in experience if no type is passed
  const items = type && type !== 'work' ? experience.filter(e => e.type === type) : experience.filter(e => e.type === 'work');

  const title = type === 'hackathon' ? 'Guild Activity (Leadership & Hackathons)' : 'Advancements (Experience)';

  return (
    <div className="text-white">
      <h2 className="font-monocraft text-2xl text-mc-gold mb-6 border-b-2 border-mc-gold/30 pb-2">
        {title}
      </h2>

      <div className="space-y-8">
        {items.length === 0 ? (
          <p className="text-gray-400 font-monocraft text-sm">No records found.</p>
        ) : (
          items.map((exp, idx) => (
            <div key={idx} className="relative pl-6 border-l-2 border-mc-green/50">
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-mc-darkGreen border-2 border-mc-green rounded-sm"></div>
              
              <div className="mb-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="font-bold text-xl text-mc-green shadow-black drop-shadow-md">
                  {exp.role}
                </h3>
                <span className="font-monocraft text-xs text-mc-gold bg-black/50 px-2 py-1 rounded">
                  {exp.period}
                </span>
              </div>
              
              <h4 className="text-gray-300 font-medium mb-3">{exp.org}</h4>
              
              <ul className="space-y-2 mt-2">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-200">
                    <span className="text-gray-500">-</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
