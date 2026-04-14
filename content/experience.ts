export interface Experience {
  role: string;
  org: string;
  period: string;
  bullets: string[];
  type: 'work' | 'hackathon' | 'open-source';
}

export const experience: Experience[] = [
  {
    role: 'Full Stack Developer Intern',
    org: 'Startup XYZ',
    period: 'Jun 2024 – Aug 2024',
    bullets: [
      'Built real-time dashboard for monitoring CI pipelines (GitHub Actions API)',
      'Reduced page load by 40% through code splitting and lazy loading',
      'Led a 3-person team to ship a customer analytics feature in 2 weeks',
    ],
    type: 'work',
  },
  {
    role: 'Smart India Hackathon 2024',
    org: 'Ministry of Education',
    period: 'Sep 2024',
    bullets: [
      'Led 6-member team to build an AI-powered wildfire prediction system',
      'Won regional round — advanced to national finals',
    ],
    type: 'hackathon',
  },
  {
    role: 'Open Source Contributor',
    org: 'Various Projects',
    period: '2023 – Present',
    bullets: [
      'Contributed WASD movement fixes to a popular Three.js starter template',
      'Submitted PRs improving TypeScript types in a React component library',
    ],
    type: 'open-source',
  },
];

export const contact = {
  email: 'nikhil@example.com',
  github: 'https://github.com/nikhilkumar',
  linkedin: 'https://linkedin.com/in/nikhilkumar',
  twitter: 'https://twitter.com/nikhilkumar',
  status: 'Open to opportunities 🟢',
};
