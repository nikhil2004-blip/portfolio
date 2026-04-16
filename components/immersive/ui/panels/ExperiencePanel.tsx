import { experience } from '@/content/experience';
import { Briefcase, GitBranch, Calendar } from 'lucide-react';

interface Props { accentColor: string; }

export function ExperiencePanel({ accentColor }: Props) {
  const workItems = experience.filter(e => e.type === 'work' || e.type === 'open-source');

  return (
    <div className="text-white space-y-6 py-4">
      <div className="relative space-y-8">
        {workItems.map((exp, idx) => (
          <div key={idx} className="relative pl-6 border-l" style={{ borderColor: `${accentColor}40` }}>
            {/* Timeline dot */}
            <div
              className="absolute -left-[5px] top-2 w-2.5 h-2.5 border-2"
              style={{ background: 'black', borderColor: accentColor }}
            />

            <div className="border p-5" style={{ borderColor: `${accentColor}20`, background: 'rgba(255,255,255,0.02)' }}>
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div style={{ color: accentColor }}>
                    {exp.type === 'work' ? <Briefcase size={18} /> : <GitBranch size={18} />}
                  </div>
                  <h3 className="font-monocraft text-base font-bold" style={{ color: accentColor }}>
                    {exp.role}
                  </h3>
                </div>
                <div className="flex items-center gap-2 font-monocraft text-xs text-gray-500 shrink-0">
                  <Calendar size={12} />
                  {exp.period}
                </div>
              </div>

              <h4 className="text-gray-400 text-sm mb-3 ml-7">{exp.org}</h4>

              <ul className="space-y-2 ml-7">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-gray-300 text-sm flex gap-2 leading-relaxed">
                    <span style={{ color: `${accentColor}60` }} className="shrink-0 mt-0.5">›</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Coursework footer */}
      <div className="border p-4 mt-4" style={{ borderColor: `${accentColor}20` }}>
        <div className="font-monocraft text-xs mb-3" style={{ color: accentColor }}>COURSEWORK_LOADED</div>
        <div className="flex flex-wrap gap-2">
          {['OOP', 'DSA', 'DBMS', 'Operating Systems', 'Computer Networks', 'Cryptography & Network Security'].map((c) => (
            <span key={c} className="font-monocraft text-xs px-3 py-1 border" style={{ borderColor: `${accentColor}30`, color: `${accentColor}aa` }}>
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
