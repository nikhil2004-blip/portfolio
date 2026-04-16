'use client';
import { skills, skillColors } from '@/content/skills';

interface Props { accentColor: string; }

export function SkillsPanel({ accentColor }: Props) {
  return (
    <div className="text-white space-y-6 py-4">
      {Object.entries(skills).map(([category, items]) => {
        const catColor = skillColors[category] ?? accentColor;
        const isLearning = category === 'Currently Leveling';
        return (
          <div
            key={category}
            className="border p-5"
            style={{
              borderColor: `${catColor}30`,
              background: isLearning ? `${catColor}06` : 'rgba(255,255,255,0.02)',
            }}
          >
            <h3
              className="font-monocraft text-sm tracking-widest mb-4 flex items-center gap-2"
              style={{ color: catColor }}
            >
              {isLearning ? '⟳' : '▸'} {category.toUpperCase()}
              {isLearning && (
                <span className="text-xs opacity-50 normal-case font-normal">{"// active downloads"}</span>
              )}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill, i) => (
                <div
                  key={i}
                  className="font-monocraft text-xs px-3 py-2 border transition-all duration-150 hover:scale-105"
                  style={{
                    borderColor: `${catColor}40`,
                    color: catColor,
                    background: `${catColor}10`,
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Footer quip */}
      <p className="font-monocraft text-xs text-center opacity-30">
        {"// stack depth: sufficient :: type errors: handled :: semicolons: optional (dart said so)"}
      </p>
    </div>
  );
}
