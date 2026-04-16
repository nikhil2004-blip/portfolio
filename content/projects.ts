export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  badge?: string;
  stats?: string[];
}

export const projects: Project[] = [
  {
    name: 'Nagrik Seva Setu',
    tagline: 'Civic grievance platform — because someone has to.',
    description: 'End-to-end civic tech system with authentication, geotagged complaint submission, and real-time sync. AI-driven urgency classification and geospatial analytics for prioritizing which pothole gets fixed first.',
    tech: ['Flutter', 'Firebase', 'Leaflet', 'AI Prioritization', 'Firestore'],
    github: 'http://github.com/nikhil2004-blip/Nagrik-Seva-Setu',
    badge: '🏆 SIH \'25',
    stats: ['Role-based dashboard', 'AI urgency classification', 'Geo-upvoting to reduce duplicate complaints'],
  },
  {
    name: 'HAW — Hostel Anarchy Wing',
    tagline: 'Hostel chaos, systematically organized.',
    description: 'Built at wHACKiest 2024. Hostel management platform with expense tracking, real-time chat, academic collaboration, emergency broadcasts with device vibration, and a location-aware safety system. Tested by 30+ hostel residents who were definitely willing guinea pigs.',
    tech: ['Flutter', 'Firebase', 'Cloud Firestore', 'Real-time Chat'],
    github: 'https://github.com/nikhil2004-blip/HAW_app',
    badge: '🥉 wHACKiest \'24 — Top 5',
    stats: ['30+ real users tested', 'Emergency broadcast + vibration alerts', 'Custom map safety zones'],
  },
  {
    name: 'DBTweaker',
    tagline: 'SQL, but make it conversational.',
    description: 'Database management system with a terminal-style interface and NLP pipeline using Gemini API — so you can ask "show me all users from Delhi" and get actual SQL. Zero-config SQLite deployment for lab environments. Secure auth via JWT + bcrypt.',
    tech: ['Node.js', 'Express.js', 'SQLite', 'JWT', 'Gemini API', 'NLP'],
    github: 'https://github.com/nikhil2004-blip/DB_Tweaker',
    stats: ['40+ students tested in lab', 'Prompt-to-SQL NLP pipeline', 'SQL injection prevention'],
  },
  {
    name: 'BMTC Commute App',
    tagline: 'Surviving Bangalore traffic, one screen at a time.',
    description: 'High-fidelity Flutter prototype for a Bangalore commute app — built during MSRIT internship. 10+ interactive screens with simulated booking flows for cabs, autos, and metro. Includes metro maps and functional chat/call interfaces.',
    tech: ['Flutter', 'Dart', 'UI/UX Design', 'Figma'],
    github: 'https://github.com/nikhil2004-blip/BMTC_app',
    badge: '🏢 MSRIT Intern',
    stats: ['10+ interactive screens', 'Metro maps', 'Cab/auto/metro booking flows'],
  },
  {
    name: 'Karni Couriers',
    tagline: 'Freelance delivery, professionally delivered.',
    description: 'Freelance project — a courier/delivery service web application. Real client, real deadline, real money. The rite of passage.',
    tech: ['Web', 'JavaScript', 'Freelance'],
    github: 'https://github.com/nikhil2004-blip/karni_couriers',
    badge: '💼 Freelance',
    stats: [],
  },
  {
    name: 'Drift Deploy',
    tagline: 'Because CI/CD should be boring (in a good way).',
    description: 'Deployment automation and drift detection tool — keeping your infrastructure honest and your 3 AM alerts to a minimum.',
    tech: ['Node.js', 'DevOps', 'CI/CD', 'Automation'],
    github: 'https://github.com/nikhil2004-blip/drift_deploy',
    stats: [],
  },
  {
    name: 'Web Scraper',
    tagline: 'The internet is a database. Change my mind.',
    description: 'A general-purpose web scraping tool. Extract, parse, repeat. Robots.txt always respected (mostly).',
    tech: ['Python', 'BeautifulSoup', 'Requests', 'Automation'],
    github: 'https://github.com/nikhil2004-blip/web_scraper',
    stats: [],
  },
  {
    name: 'This Portfolio',
    tagline: 'Yes, it\'s a Minecraft village. No, I\'m not sorry.',
    description: 'First-person 3D portfolio built as a Minecraft-style voxel village using React Three Fiber. Walk around, enter buildings, read content. The most overengineered portfolio resume known to CS students.',
    tech: ['Next.js', 'React Three Fiber', 'Three.js', 'Zustand', 'Framer Motion', 'TypeScript'],
    github: 'https://github.com/nikhil2004-blip/portfolio',
    stats: ['6 interactive buildings', 'Custom voxel architecture', 'Day/night cycle'],
  },
];
