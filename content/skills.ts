export const skills: Record<string, string[]> = {
  'Languages':         ['C++', 'Python', 'Dart', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  'App Dev':           ['Flutter', 'React', 'Next.js', 'Android Studio', 'Tailwind CSS', 'Framer Motion'],
  'Backend':           ['Node.js', 'Express.js', 'Firebase', 'Firestore', 'Convex', 'REST APIs', 'WebSockets'],
  'Database':          ['SQLite', 'MongoDB', 'PostgreSQL', 'Cloud Firestore', 'Convex DB'],
  'DevOps & Hosting':  ['Vercel', 'Git', 'GitHub', 'Linux', 'WSL', 'CI/CD pipelines'],
  'AI / ML':           ['NLP Pipelines', 'Scikit-learn', 'Prompt Engineering'],
  'Game & 3D':         ['Godot Engine', 'GDExtension', 'Three.js / R3F', 'WebGL', 'Voxel / Minecraft World-gen'],
  'Design & Creative': ['Figma', 'Canva', 'Cursor (AI Editor)', 'CapCut', 'VN Video Editor', 'PicsArt'],
  'Currently Leveling': ['Systems Programming', 'Embedded / GDExtension on Android'],
};

export const toolsShowcase: { name: string; icon: string; desc: string; category?: string }[] = [
  // Dev Tools
  { name: 'Cursor / Antigravity', icon: '🤖', desc: 'AI-first editor. The future landed early.', category: 'DEV' },
  { name: 'VS Code',              icon: '💻', desc: 'Home. Sweet home. 47 extensions and counting.', category: 'DEV' },
  { name: 'Git / GitHub',         icon: '🐙', desc: '"git commit -m fix" — professional communication.', category: 'DEV' },
  { name: 'Android Studio',       icon: '📱', desc: 'The IDE that tests your patience before your app.', category: 'DEV' },
  { name: 'Godot Engine',         icon: '🎮', desc: 'Game engine + Android embedding experiments at Samsung R&D.', category: 'DEV' },
  { name: 'Unity',                icon: '🕹️', desc: '3D/AR experiments. Because Godot alone was not enough chaos.', category: 'DEV' },
  // Backend / DB / Hosting
  { name: 'Firebase',             icon: '🔥', desc: 'Backend for people who want to ship fast and ask questions later.', category: 'INFRA' },
  { name: 'Convex',               icon: '⚡', desc: 'Reactive backend — real-time sync without the boilerplate pain.', category: 'INFRA' },
  { name: 'MongoDB',              icon: '🍃', desc: 'Document store. JSON all the way down.', category: 'INFRA' },
  { name: 'Vercel',               icon: '▲',  desc: 'Deploy once, forget the server exists. Peak DX.', category: 'INFRA' },
  { name: 'Linux',                icon: '🐧', desc: 'The OS you have to earn the right to complain about.', category: 'INFRA' },
  // Design / Creative
  { name: 'Figma',                icon: '🎨', desc: 'Design before you code. Revolutionary, I know.', category: 'DESIGN' },
  { name: 'Canva',                icon: '✏️', desc: 'Quick designs that look like they took effort. They did not.', category: 'DESIGN' },
  { name: 'CapCut',               icon: '🎬', desc: 'Video editing for humans. Fast cuts, clean output.', category: 'DESIGN' },
  { name: 'VN Video Editor',      icon: '🎞️', desc: 'Mobile-first video editing — reels, shorts, content.', category: 'DESIGN' },
  { name: 'PicsArt',              icon: '🖼️', desc: 'When Canva is too clean and Photoshop is too much.', category: 'DESIGN' },
];

export const skillColors: Record<string, string> = {
  'Languages':          '#60A5FA',
  'App Dev':            '#4ADE80',
  'Backend':            '#34D399',
  'Database':           '#FBBF24',
  'DevOps & Hosting':   '#38BDF8',
  'AI / ML':            '#A78BFA',
  'Game & 3D':          '#F87171',
  'Design & Creative':  '#FB923C',
  'Currently Leveling': '#F472B6',
};
