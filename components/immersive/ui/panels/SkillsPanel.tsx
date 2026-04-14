import { skills, skillColors } from '@/content/skills';

export function SkillsPanel() {
  return (
    <div className="text-white">
      <h2 className="font-monocraft text-2xl text-mc-gold mb-6 border-b-2 border-mc-gold/30 pb-2">
        Inventory (Skills)
      </h2>

      <div className="space-y-6">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="bg-black/40 p-4 rounded border-2 border-white/10">
            <h3 
              className="font-monocraft text-lg mb-3 shadow-black drop-shadow-md"
              style={{ color: skillColors[category] || '#FFF' }}
            >
              {category}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {items.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 bg-gray-800 border border-gray-600 px-3 py-1.5 rounded"
                >
                  {/* Mock Inventory Slot look */}
                  <div className="w-4 h-4 bg-gray-900 border border-black shadow-[inset_1px_1px_0_rgba(255,255,255,0.2)]"></div>
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
