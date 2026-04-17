'use client';
import { experience as expData, hackathons, achievements } from '@/content/experience';
import {
  Trophy,
  Award,
  Target,
  GraduationCap,
  Radio,
  Brain,
  Briefcase,
  GitBranch,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  '📡': Radio,
  '🥉': Trophy,
  '🏆': Award,
  '📐': Target,
  '🧠': Brain,
  '🎓': GraduationCap,
};

interface Props { accentColor: string; }

export function LeadershipPanel({ accentColor }: Props) {
  const workItems = expData.filter(e => e.type === 'work' || e.type === 'open-source');

  return (
    <div className="text-white space-y-6 py-4">

      {/* Work Experience */}
      <div>
        <h3 className="font-monocraft text-sm tracking-widest mb-4" style={{ color: accentColor }}>▸ PROFESSIONAL_EXPERIENCE</h3>
        <div className="space-y-5 relative border-l pl-6" style={{ borderColor: `${accentColor}40` }}>
          {workItems.map((exp, idx) => (
            <div key={idx} className="relative">
              <div
                className="absolute -left-[23px] top-2 w-2.5 h-2.5 border-2"
                style={{ background: 'black', borderColor: accentColor }}
              />
              <div className="border p-4" style={{ borderColor: `${accentColor}20`, background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-3">
                    <div style={{ color: accentColor }}>
                      {exp.type === 'work' ? <Briefcase size={16} /> : <GitBranch size={16} />}
                    </div>
                    {exp.badge && (
                      <span className="font-monocraft text-[10px] px-2 py-0.5 border" style={{ borderColor: `${accentColor}50`, color: accentColor }}>
                        {exp.badge}
                      </span>
                    )}
                    {exp.org.includes('Samsung') && (
                      <span className="font-monocraft text-[10px] px-2 py-0.5 bg-green-500/20 border border-green-500/50 text-green-400 animate-pulse">
                        CURRENT
                      </span>
                    )}
                    <h4 className="font-monocraft text-sm font-bold" style={{ color: accentColor }}>{exp.role}</h4>
                  </div>
                  <span className="font-monocraft text-[10px] text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-500 text-xs mb-2">{exp.org}</p>
                <ul className="space-y-1">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="text-gray-300 text-xs flex gap-2">
                      <span style={{ color: `${accentColor}60` }}>›</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements grid */}
      <div>
        <h3 className="font-monocraft text-sm tracking-widest mb-4" style={{ color: accentColor }}>▸ ACHIEVEMENTS_UNLOCKED</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {achievements.map((a) => {
            const AchIcon = ICON_MAP[a.icon];
            return (
              <div
                key={a.label}
                className="border p-4 text-center flex flex-col items-center justify-center"
                style={{ borderColor: `${accentColor}25`, background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="mb-2" style={{ color: accentColor }}>
                  {AchIcon ? <AchIcon size={24} /> : a.icon}
                </div>
                <div className="font-monocraft text-sm font-bold" style={{ color: accentColor }}>{a.label}</div>
                <div className="text-gray-500 text-xs mt-1">{a.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hackathon timeline */}
      <div>
        <h3 className="font-monocraft text-sm tracking-widest mb-4" style={{ color: accentColor }}>▸ HACKATHON_HISTORY</h3>
        <div className="space-y-5 relative border-l pl-6" style={{ borderColor: `${accentColor}40` }}>
          {hackathons.map((h, idx) => (
            <div key={idx} className="relative">
              <div
                className="absolute -left-[23px] top-2 w-2.5 h-2.5 border-2"
                style={{ background: 'black', borderColor: accentColor }}
              />
              <div className="border p-4" style={{ borderColor: `${accentColor}20`, background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-3">
                    {h.badge && (
                      <span className="font-monocraft text-xs px-2 py-0.5 border" style={{ borderColor: `${accentColor}50`, color: accentColor }}>
                        {h.badge}
                      </span>
                    )}
                    <h4 className="font-monocraft text-sm font-bold" style={{ color: accentColor }}>{h.role}</h4>
                  </div>
                  <span className="font-monocraft text-xs text-gray-500">{h.period}</span>
                </div>
                <p className="text-gray-500 text-xs mb-2">{h.org}</p>
                <ul className="space-y-1">
                  {h.bullets.map((b, i) => (
                    <li key={i} className="text-gray-300 text-xs flex gap-2">
                      <span style={{ color: `${accentColor}60` }}>›</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitive */}
      <div className="border p-4" style={{ borderColor: `${accentColor}20` }}>
        <div className="font-monocraft text-xs mb-3" style={{ color: accentColor }}>COMPETITIVE_EXAMS</div>
        <div className="text-gray-400 text-sm space-y-1">
          <p>📐 PRMO &amp; RMO — Qualified. Math olympiads. Because apparently CS wasn&apos;t enough.</p>
          <p>🧠 NSTSE — State Rank 5. Still waiting for it to be useful.</p>
        </div>
      </div>

      {/* Footer */}
      <p className="font-monocraft text-xs text-center opacity-30">
        {'// IEEE RIT :: Coverage Member :: Computer Society Member :: still shows up to meetings'}
      </p>
    </div>
  );
}
