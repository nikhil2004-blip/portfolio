'use client';
import { toolsShowcase } from '@/content/skills';

interface Props { accentColor: string; }

export function ToolsPanel({ accentColor }: Props) {
  return (
    <div className="text-white space-y-6 py-4">
      <p className="text-gray-400 text-sm border-l-2 pl-4" style={{ borderColor: `${accentColor}60` }}>
        Every craftsman has a preferred set of tools. These are mine — some by choice, one or two by circumstance (looking at you, Android Studio).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {toolsShowcase.map((tool) => (
          <div
            key={tool.name}
            className="border p-5 flex items-start gap-4 transition-all duration-200 hover:scale-[1.01]"
            style={{ borderColor: `${accentColor}25`, background: 'rgba(255,255,255,0.02)' }}
          >
            <span className="text-3xl shrink-0">{tool.icon}</span>
            <div>
              <div className="font-monocraft text-sm font-bold" style={{ color: accentColor }}>{tool.name}</div>
              <div className="text-gray-400 text-xs mt-1">{tool.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Setup quip */}
      <div className="border p-4 mt-4" style={{ borderColor: `${accentColor}20`, background: 'rgba(255,255,255,0.02)' }}>
        <div className="font-monocraft text-xs mb-2" style={{ color: accentColor }}>WORKSPACE_CONFIG</div>
        <div className="text-gray-500 text-xs space-y-1 font-monocraft">
          <div>OS: Windows (with WSL for when it matters)</div>
          <div>Editor: VS Code — 47 extensions, 3 themes, 1 survivor</div>
          <div>Terminal: PowerShell (reluctantly) / Zsh (respectfully)</div>
          <div>Music while coding: Lo-fi / Phonk / Silence (rare)</div>
          <div>Debug strategy: rubber duck → Stack Overflow → actually read the docs</div>
        </div>
      </div>
    </div>
  );
}
