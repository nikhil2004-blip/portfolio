export const skills: Record<string, string[]> = {
  'Languages':        ['C++', 'Python', 'Dart', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  'App Dev':          ['Flutter', 'React', 'Next.js', 'Android Studio'],
  'Backend':          ['Node.js', 'Express.js', 'Firebase', 'Firestore', 'REST APIs'],
  'Database':         ['SQLite', 'MongoDB', 'SQL', 'Cloud Firestore'],
  'AI / ML':          ['Gemini API', 'NLP Pipelines', 'Scikit-learn', 'Basic ML (yes, including linear regression)'],
  'Tools & Infra':    ['Git', 'GitHub', 'VS Code', 'Figma', 'Godot', 'Android Studio', 'Linux'],
  'Currently Leveling': ['WebGL / Three.js', 'Machine Learning (the proper kind)', 'Systems Programming'],
};

export const toolsShowcase: { name: string; icon: string; desc: string }[] = [
  { name: 'Figma',         icon: '🎨', desc: 'Design before you code. Revolutionary, I know.' },
  { name: 'Godot',         icon: '🎮', desc: 'Game engine + Android embedding experiments at Samsung R&D.' },
  { name: 'VS Code',       icon: '💻', desc: 'Home. Sweet home. 47 extensions and counting.' },
  { name: 'Android Studio',icon: '📱', desc: 'The IDE that tests your patience before your app.' },
  { name: 'Git / GitHub',  icon: '🐙', desc: '\"git commit -m fix\" — professional communication.' },
  { name: 'Firebase',      icon: '🔥', desc: 'Backend for people who want to ship fast and ask questions later.' },
  { name: 'Linux',         icon: '🐧', desc: 'The OS you have to earn the right to complain about.' },
  { name: 'Postman',       icon: '📮', desc: 'Testing APIs like a responsible adult.' },
];

export const skillColors: Record<string, string> = {
  'Languages':          '#60A5FA',
  'App Dev':            '#4ADE80',
  'Backend':            '#34D399',
  'Database':           '#FBBF24',
  'AI / ML':            '#A78BFA',
  'Tools & Infra':      '#FB923C',
  'Currently Leveling': '#F472B6',
};
