export interface Experience {
  role: string;
  org: string;
  period: string;
  bullets: string[];
  type: 'work' | 'hackathon' | 'open-source' | 'achievement';
  badge?: string;
}

export const experience: Experience[] = [
  {
    role: 'Research Intern',
    org: 'Samsung R&D Institute, Bangalore',
    period: 'Mar 2026 – May 2026',
    bullets: [
      'Investigated embedding Godot as a component within Android applications for Lottie-based MapView animations.',
      'Diagnosed GDExtension rendering failures caused by missing native .so binaries on Android — turns out phones are picky.',
      'Analyzed Android plugin-based loading via AndroidManifest and lifecycle integration for native libraries.',
    ],
    type: 'work',
    badge: '🔬 Research',
  },
  {
    role: 'Intern (On-site)',
    org: 'MSRIT, Bangalore',
    period: 'Aug 2024',
    bullets: [
      'Built a high-fidelity frontend prototype for a Bangalore Commute App using Flutter.',
      'Designed 10+ interactive screens with simulated booking flows for cabs, autos, and metro.',
      'Integrated metro maps and functional chat/call interfaces — the full Bangalore traffic experience, now in your pocket.',
    ],
    type: 'work',
    badge: '📱 Flutter',
  },
  {
    role: 'Open Source Contributor',
    org: 'Textual (Textualize)',
    period: 'Dec 2025',
    bullets: [
      'Contributed to the Textual open-source repository — implemented radio button widgets.',
      'Improved Tree-sitter–based syntax highlighting for the terminal UI framework.',
      'First open-source PR landed. Turns out "it works on my machine" doesn\'t fly in open source.',
    ],
    type: 'open-source',
    badge: '🌐 OSS',
  },
];

export const hackathons: Experience[] = [
  {
    role: 'Nagrik Seva Setu — Smart India Hackathon \'25',
    org: 'Government of India Initiative',
    period: 'Sep 2025',
    bullets: [
      'Built a civic grievance redressal system end-to-end — auth, geotagged complaints, real-time sync.',
      'AI urgency classification + geospatial analytics to prioritize complaints.',
      'Firebase-backed architecture syncing app and web simultaneously.',
    ],
    type: 'hackathon',
    badge: '🏆 SIH \'25',
  },
  {
    role: 'HAW — Hostel Anarchy Wing — wHACKiest 2024',
    org: 'MSRIT',
    period: 'Dec 2024',
    bullets: [
      'wHACKiest 2024 — Top 5 finish. Built hostel management platform under 24 hours.',
      'Emergency broadcast system with device-level vibration for critical alerts.',
      'Location-aware safety system with custom map interface. Tested by 30+ hostel users.',
    ],
    type: 'hackathon',
    badge: '🥈 Top 5',
  },
  {
    role: 'wHACKiest 2025 — 2nd Runner Up 🥉',
    org: 'MSRIT',
    period: 'Dec 2025',
    bullets: [
      'Returned to settle the score. Built something better, got 2nd runner-up.',
      'The character arc is complete.',
    ],
    type: 'hackathon',
    badge: '🥉 2nd Runner-Up',
  },
];

export const achievements = [
  { label: 'IEEE RIT', desc: 'Coverage & Computer Society Member', icon: '📡' },
  { label: 'wHACKiest \'25', desc: '2nd Runner-Up (MSRIT)', icon: '🥉' },
  { label: 'wHACKiest \'24', desc: 'Top 5 (MSRIT)', icon: '🏆' },
  { label: 'PRMO & RMO', desc: 'Qualified — Math olympiads, because why not.', icon: '📐' },
  { label: 'NSTSE', desc: 'State Rank: 5', icon: '🧠' },
  { label: 'CGPA: 9.28', desc: 'Ramaiah Institute of Technology', icon: '🎓' },
];

export const contact = {
  email: 'nikhilyadavsky2004@gmail.com',
  phone: '+91 9650909795',
  github: 'https://github.com/nikhil2004-blip',
  linkedin: 'https://www.linkedin.com/in/nikhil-kumar-yadav-a66769327/',
  leetcode: 'https://leetcode.com/u/nikhil_kumar_yadav/',
  status: 'Open to opportunities (and good memes) 🟢',
};
