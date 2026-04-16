'use client';
import { about } from '@/content/about';
import {
  Gamepad2,
  Dumbbell,
  Code2,
  Plane,
  Monitor,
  Music,
  CheckCircle2,
  GraduationCap,
  School,
  Hash,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  '🎮': Gamepad2,
  '💪': Dumbbell,
  '💻': Code2,
  '✈️': Plane,
  '🖥️': Monitor,
  '🎵': Music,
  '✓': CheckCircle2,
  '#': Hash,
};

interface Props { accentColor: string; }

function DynamicIcon({ iconKey, size }: { iconKey: string; size: number }) {
  const Icon = ICON_MAP[iconKey];
  if (Icon) return <Icon size={size} />;
  return <span>{iconKey}</span>;
}

export function AboutPanel({ accentColor }: Props) {
  return (
    <div className="text-white space-y-8 py-4">

      {/* Stat bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'CGPA', value: '9.38', sub: '/ 10.00' },
          { label: 'NSTSE RANK', value: '#5', sub: 'State Level' },
          { label: 'HACKATHONS', value: '2', sub: 'Top placements' },
          { label: 'OPEN SOURCE', value: '✓', sub: 'Merged PRs' },
        ].map((stat) => {
          const StatIcon = ICON_MAP[stat.value];
          return (
            <div key={stat.label} className="border p-4 text-center flex flex-col items-center justify-center" style={{ borderColor: `${accentColor}30` }}>
              <div className="font-monocraft text-2xl font-bold flex items-center gap-2" style={{ color: accentColor }}>
                {StatIcon ? <StatIcon size={24} /> : stat.value}
              </div>
              <div className="text-gray-400 text-xs mt-1">{stat.sub}</div>
              <div className="font-monocraft text-xs opacity-50 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Bio */}
      <div className="space-y-3 border-l-2 pl-4" style={{ borderColor: `${accentColor}60` }}>
        {about.bio.map((para, i) => (
          <p key={i} className="text-gray-300 text-sm leading-relaxed">{para}</p>
        ))}
      </div>

      {/* Education */}
      <div>
        <h3 className="font-monocraft text-sm tracking-widest mb-4" style={{ color: accentColor }}>▸ EDUCATION_LOG</h3>
        <div className="space-y-4">
          {about.education.map((edu, i) => (
            <div key={i} className="border p-4" style={{ borderColor: `${accentColor}20`, background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between mb-2">
                <div className="flex items-center gap-2">
                  <School size={16} style={{ color: accentColor }} />
                  <h4 className="font-monocraft text-sm" style={{ color: accentColor }}>{edu.institution}</h4>
                </div>
                <span className="font-monocraft text-xs text-gray-500">{edu.period}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <GraduationCap size={14} className="opacity-60" />
                {edu.degree}
              </div>
              <div className="flex items-center gap-2 font-monocraft text-xs mt-2" style={{ color: accentColor }}>
                <CheckCircle2 size={12} />
                {edu.score}
              </div>
              <div className="text-gray-500 text-xs mt-2 border-l pl-3 ml-1" style={{ borderColor: `${accentColor}30` }}>
                {edu.courses}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hobbies */}
      <div>
        <h3 className="font-monocraft text-sm tracking-widest mb-4" style={{ color: accentColor }}>▸ ACTIVE_PROCESSES</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {about.hobbies.map((h) => {
            const HobbyIcon = ICON_MAP[h.icon];
            return (
              <div key={h.label} className="border p-3 flex flex-col items-center text-center" style={{ borderColor: `${accentColor}20`, background: 'rgba(255,255,255,0.02)' }}>
                <div className="mb-2" style={{ color: accentColor }}>
                  {HobbyIcon ? <HobbyIcon size={24} /> : h.icon}
                </div>
                <div className="font-monocraft text-sm" style={{ color: accentColor }}>{h.label}</div>
                <div className="text-gray-500 text-xs mt-1">{h.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Games */}
      <div>
        <h3 className="font-monocraft text-sm tracking-widest mb-3" style={{ color: accentColor }}>▸ GAMES_COMPLETED</h3>
        <div className="flex flex-wrap gap-2">
          {about.games.map((g, i) => (
            <span key={i} className="font-monocraft text-xs px-3 py-1 border" style={{ borderColor: `${accentColor}40`, color: `${accentColor}cc` }}>
              {g}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="font-monocraft text-sm tracking-widest mb-3" style={{ color: accentColor }}>▸ ACHIEVEMENTS_UNLOCKED</h3>
        <ul className="space-y-3">
          {about.achievements.map((a, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start gap-3">
              <Trophy size={14} className="mt-1 shrink-0" style={{ color: accentColor }} />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Fun facts */}
      <div>
        <h3 className="font-monocraft text-sm tracking-widest mb-3" style={{ color: accentColor }}>▸ DEBUG_NOTES</h3>
        <ul className="space-y-2">
          {about.funFacts.map((f, i) => (
            <li key={i} className="text-gray-400 text-sm flex gap-2">
              <span style={{ color: `${accentColor}60` }}>›</span> {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Currently */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4" style={{ borderColor: `${accentColor}20`, background: 'rgba(255,255,255,0.02)' }}>
          <div className="font-monocraft text-xs mb-2" style={{ color: accentColor }}>CURRENTLY_BUILDING</div>
          <p className="text-gray-300 text-sm">{about.currentlyBuilding}</p>
        </div>
        <div className="border p-4" style={{ borderColor: `${accentColor}20`, background: 'rgba(255,255,255,0.02)' }}>
          <div className="font-monocraft text-xs mb-2" style={{ color: accentColor }}>CURRENTLY_LEARNING</div>
          <p className="text-gray-300 text-sm">{about.currentlyLearning}</p>
        </div>
      </div>

      {/* Resume */}
      <div className="pt-2">
        <a
          href={about.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-monocraft text-sm px-8 py-3 border inline-block transition-all duration-200 hover:opacity-80"
          style={{ borderColor: accentColor, color: accentColor, background: `${accentColor}10` }}
        >
          [ DOWNLOAD_LOGS / RESUME.PDF ]
        </a>
      </div>
    </div>
  );
}
