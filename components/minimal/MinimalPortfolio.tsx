'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Code2, 
  User, 
  Briefcase,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { about } from '@/content/about';
import { experience, hackathons, achievements, contact } from '@/content/experience';
import { projects } from '@/content/projects';
import { skills, skillColors } from '@/content/skills';
import Link from 'next/link';
import { RealTimeClock } from '@/components/ui/RealTimeClock';

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <div className="flex items-center gap-4 mb-2">
      <div className="w-8 h-[1px] bg-w14-cyan" />
      <span className="text-[10px] uppercase tracking-[0.3em] text-w14-cyan font-bold">{subtitle || "Section"}</span>
    </div>
    <h2 className="text-4xl md:text-6xl font-black italic uppercase italic tracking-tighter">{title}</h2>
  </div>
);

export default function MinimalPortfolio() {
  const [activeSection, setActiveSection] = useState('about');

  // Simple scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'skills'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white selection:bg-w14-cyan selection:text-black">
      {/* Sidebar Navigation */}
      <aside className="md:fixed md:w-64 h-screen border-r border-white/5 p-8 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="mb-12">
             <div className="text-2xl font-black italic w14-neon-text leading-none">W14</div>
             <div className="text-[9px] uppercase tracking-[0.2em] text-white/40 mt-1 mb-4">Nikhil K. Yadav</div>
             <RealTimeClock className="text-[10px] font-bold text-w14-cyan/80 tracking-widest border-l border-w14-cyan/30 pl-3 py-1" />
          </div>
          
          <nav className="space-y-4">
            {['about', 'experience', 'projects', 'skills'].map((section) => (
              <a 
                key={section}
                href={`#${section}`}
                className={`group flex items-center gap-3 text-xs uppercase tracking-widest font-bold transition-all ${
                  activeSection === section ? 'text-w14-cyan' : 'text-white/40 hover:text-white'
                }`}
              >
                <div className={`h-[1px] transition-all duration-300 ${
                  activeSection === section ? 'w-8 bg-w14-cyan' : 'w-0 bg-white/20 group-hover:w-4'
                }`} />
                {section}
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <Link href="/immersive">
            <button className="flex items-center gap-2 text-[10px] uppercase font-black text-white/50 hover:text-w14-cyan transition-colors group">
              <Monitor size={14} />
              <span>Switch to Immersive</span>
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <div className="flex gap-4">
            <a href={contact.github} target="_blank" className="text-white/40 hover:text-white transition-colors"><Github size={18} /></a>
            <a href={contact.linkedin} target="_blank" className="text-white/40 hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href={`mailto:${contact.email}`} className="text-white/40 hover:text-white transition-colors"><Mail size={18} /></a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 px-6 md:px-16 py-12 md:py-24 max-w-5xl">
        
        {/* About Section */}
        <section id="about" className="mb-32 pt-20">
          <SectionHeader title="The Engineer" subtitle="Overview" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6 text-lg text-white/70 leading-relaxed font-light">
              {about.bio.map((p, i) => <p key={i}>{p}</p>)}
              <div className="pt-4 flex flex-wrap gap-4">
                 <a href={about.resumeUrl} target="_blank" className="w14-btn">Download Resume</a>
                 <div className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-sm text-xs font-bold bg-white/5 uppercase tracking-tighter">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Available for internship
                 </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="w14-stat-box">
                <div className="text-[10px] uppercase text-w14-cyan font-bold mb-2">Current Focus</div>
                <p className="text-xs text-white/60 leading-relaxed">{about.currentlyBuilding}</p>
              </div>
              <div className="w14-stat-box border-l-white/20">
                <div className="text-[10px] uppercase text-white/60 font-bold mb-2">Learning Path</div>
                <p className="text-xs text-white/40 leading-relaxed">{about.currentlyLearning}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32">
          <SectionHeader title="Track Record" subtitle="Experience" />
          <div className="space-y-12">
            {[...experience, ...hackathons].map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border border-white/5 hover:border-w14-cyan/30 transition-all hover:bg-white/[0.01]"
              >
                <div className="text-xs font-bold text-white/40 tracking-widest pt-1">{exp.period}</div>
                <div className="md:col-span-3">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold uppercase tracking-tight">{exp.role}</h3>
                    {exp.badge && (
                      <span className="text-[9px] px-2 py-0.5 border border-w14-cyan/50 text-w14-cyan font-black italic rounded-sm">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-w14-cyan/80 text-sm font-bold mb-4 flex items-center gap-2">
                    <Briefcase size={14} />
                    {exp.org}
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="text-xs text-white/50 flex gap-3 leading-normal">
                        <span className="text-w14-cyan text-[8px] pt-1">/</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <SectionHeader title="Engineering" subtitle="Projects" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="w14-neon-border p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black italic leading-none truncate pr-2 uppercase">{project.name}</h3>
                    {project.github && (
                      <a href={project.github} target="_blank" className="text-white/40 hover:text-w14-cyan transition-colors">
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mb-6 leading-relaxed line-clamp-3">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map(t => (
                    <span key={t} className="text-[9px] px-2 py-1 bg-white/5 border border-white/10 font-bold uppercase tracking-tighter text-white/40">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-32">
          <SectionHeader title="Arsenal" subtitle="Capabilities" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h4 className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em] border-b border-white/10 pb-2">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span 
                      key={item} 
                      className="text-xs font-bold px-3 py-1 bg-white/[0.02] border border-white/5 hover:border-w14-cyan/30 transition-colors"
                      style={{ borderLeftColor: skillColors[category] }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-24 border-t border-white/5 flex flex-col items-center text-center">
            <p className="text-3xl font-black italic tracking-tighter mb-8 uppercase">Let's build the future.</p>
            <div className="flex flex-wrap justify-center gap-8 mb-12">
               <div className="text-center">
                  <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Email</div>
                  <a href={`mailto:${contact.email}`} className="text-sm font-bold hover:text-w14-cyan transition-colors">{contact.email}</a>
               </div>
               <div className="text-center">
                  <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Phone</div>
                  <div className="text-sm font-bold">{contact.phone}</div>
               </div>
            </div>
            <div className="text-[9px] text-white/20 uppercase tracking-[0.4em]">
              © 2026 Nikhil Kumar Yadav • W14 E-Performance UI
            </div>
        </footer>
      </main>
    </div>
  );
}
