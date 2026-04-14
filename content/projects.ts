export interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  thumbnail?: string;
}

export const projects: Project[] = [
  {
    name: 'FireGrid AI',
    description: 'Real-time wildfire prediction dashboard with AI-powered spread simulation and resource optimization.',
    tech: ['Next.js', 'Canvas API', 'Python', 'WebSocket'],
    github: 'https://github.com/nikhilkumar',
    demo: '#',
  },
  {
    name: 'CI Observability Dashboard',
    description: 'GitHub Actions monitoring platform with flaky test detection, anomaly scoring, and multi-project support.',
    tech: ['Next.js', 'GitHub API', 'TypeScript', 'PostgreSQL'],
    github: 'https://github.com/nikhilkumar',
    demo: '#',
  },
  {
    name: 'Bet Your Friend',
    description: 'Decentralized betting dApp on Ethereum — create, accept and settle bets via smart contracts.',
    tech: ['Solidity', 'Hardhat', 'React', 'MetaMask', 'ethers.js'],
    github: 'https://github.com/nikhilkumar',
  },
  {
    name: 'Crawlxr',
    description: '3D graph visualization tool for web crawl data — explore site structure in an interactive force graph.',
    tech: ['React Three Fiber', 'Three.js', 'Node.js', 'Cheerio'],
    github: 'https://github.com/nikhilkumar',
    demo: '#',
  },
  {
    name: 'Minecraft Portfolio',
    description: 'This very site — a first-person 3D portfolio built as a Minecraft village. You are looking at it right now.',
    tech: ['Next.js', 'React Three Fiber', 'Three.js', 'Zustand', 'Framer Motion'],
    github: 'https://github.com/nikhilkumar',
  },
];
