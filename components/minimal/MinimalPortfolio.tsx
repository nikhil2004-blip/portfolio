'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  GitBranch,
  Briefcase,
  Mail,
  ArrowLeft,
  Terminal,
  Cpu,
  Layers,
  Check,
  Copy
} from 'lucide-react';
import { about } from '@/content/about';
import { experience, hackathons, contact } from '@/content/experience';
import { projects } from '@/content/projects';
import { skills } from '@/content/skills';
import Link from 'next/link';

const sections = ['about', 'experience', 'projects', 'skills'];

const SectionHeader = ({ title, index }: { title: string; index: string }) => (
  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 mb-12 group">
    <span className="text-sm font-medium text-zinc-500 tracking-widest uppercase w-12">{index}</span>
    <h2 className="text-3xl md:text-4xl font-display font-semibold text-zinc-100 tracking-tight flex items-center gap-4">
      {title}
      <div className="h-[1px] flex-grow bg-gradient-to-r from-zinc-800 to-transparent"></div>
    </h2>
  </div>
);

const BackgroundGraphics = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Graphical SVG Lines */}
      <svg className="absolute w-full h-full opacity-[0.12]">
        {/* Curved connection lines */}
        <path d="M-100,200 C300,100 400,600 1200,400" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M-100,800 C400,900 600,300 1200,500" fill="none" stroke="#a3e635" strokeWidth="0.5" />
        <path d="M200,-100 C300,400 800,200 1000,1000" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" strokeDasharray="8 8" />

        {/* Geometric Nodes & Constellations */}
        <circle cx="20%" cy="25%" r="4" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="20%" cy="25%" r="12" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="20%" cy="25%" r="30" fill="none" stroke="white" strokeWidth="0.2" />

        <circle cx="80%" cy="65%" r="4" fill="none" stroke="#a3e635" strokeWidth="1" />
        <circle cx="80%" cy="65%" r="16" fill="none" stroke="#a3e635" strokeWidth="0.5" />
        <circle cx="80%" cy="65%" r="40" fill="none" stroke="#a3e635" strokeWidth="0.2" strokeDasharray="4 4" />

        <circle cx="65%" cy="20%" r="2" fill="white" />
        <path d="M 65% 20% L 65% 100%" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="10 10" opacity="0.5" />
        <path d="M 0 65% L 80% 65%" fill="none" stroke="#a3e635" strokeWidth="0.5" strokeDasharray="5 15" opacity="0.3" />
      </svg>

      {/* Floating Mathematical Formulas & Tech Symbols */}
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[10%] font-mono text-sm text-zinc-300"
      >
        ∇ × B = μ₀(J + ε₀ ∂E/∂t)
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] left-[5%] font-mono text-sm text-zinc-300 rotate-90 origin-left"
      >
        f(x) = (1 / σ√(2π)) * e^(-(x-μ)² / 2σ²)
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[15%] font-mono text-xs text-lime-400/50"
      >
        <span className="opacity-50">SYS.INIT // </span> 0x8F4A2B
      </motion.div>

      <motion.div
        animate={{ y: [0, 5, 0], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[60%] left-[25%] font-mono text-sm text-zinc-400"
      >
        e^(iπ) + 1 = 0
      </motion.div>

      <motion.div
        animate={{ x: [0, 10, 0], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[25%] left-[30%] font-mono text-sm text-zinc-500"
      >
        F(ω) = ∫ f(t)e^(-iωt) dt
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[30%] left-[10%] font-mono text-sm text-zinc-500"
      >
        iℏ ∂Ψ/∂t = ĤΨ
      </motion.div>
    </div>
  );
};

export default function MinimalPortfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!contact?.email) return;
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setMounted(true);
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Clean, geometric sans-serif fonts */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
      `}} />

      <div className="bg-[#09090b] min-h-screen text-zinc-400 font-sans selection:bg-lime-400/30 selection:text-lime-100 pb-12 relative">

        {/* Abstract Background Elements */}
        <BackgroundGraphics />

        {/* Content Wrapper to ensure z-index sits above background */}
        <div className="relative z-10">

          {/* Top Navigation / Back Button */}
          <div className="fixed top-8 left-8 z-50">
            <button
              onClick={() => window.location.replace('/')}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 hover:border-zinc-700 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>
          </div>

          {/* Stark, Flat Navigation Pill */}
          <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800/80 rounded-full p-1.5 flex items-center gap-1 shadow-2xl">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    const el = document.getElementById(section);
                    if (el) {
                      setActiveSection(section);
                      el.scrollIntoView({ behavior: 'smooth' });
                      window.history.replaceState(null, '', `#${section}`);
                    }
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${activeSection === section
                    ? 'bg-zinc-100 text-zinc-900 shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
                    }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </nav>

          <main className="max-w-4xl mx-auto px-6 md:px-8 pt-32 md:pt-48">

            {/* Hero Area */}
            <section className="mb-48 relative">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>

                <div className="flex items-center gap-3 mb-10">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                  </div>
                  <span className="text-xs font-semibold text-lime-500/80 tracking-widest uppercase">System Online // Available</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-display font-bold text-zinc-100 tracking-tight leading-[1.1] mb-8 relative inline-block">
                  Nikhil Kumar Yadav.
                  <div className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-zinc-800/0 via-zinc-800/10 to-zinc-800/0 blur-2xl -z-10 rounded-full"></div>
                </h1>

                <h2 className="text-xl md:text-2xl text-zinc-500 font-display font-medium tracking-wide mb-8 flex items-center gap-3">
                  <Terminal size={24} className="text-zinc-700" />
                  Software Engineer.
                </h2>

                <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-12 font-light">
                  Crafting high-performance systems, interactive experiences, and robust architectures. Focused on pure logic and elegant design.
                </p>

                <div className="flex flex-wrap items-center gap-8">
                  <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-zinc-100 border-b border-zinc-700 pb-1 hover:border-zinc-300 hover:text-white transition-colors group">
                    View Resume <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-zinc-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                  <div className="flex items-center gap-5 text-zinc-500">
                    <a href={contact.github} target="_blank" rel="noreferrer" className="hover:text-zinc-100 hover:scale-110 transition-all"><GitBranch size={20} /></a>
                    <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-100 hover:scale-110 transition-all"><Briefcase size={20} /></a>
                    <button 
                      onClick={handleCopyEmail}
                      className="hover:text-zinc-100 hover:scale-110 transition-all relative group/mail"
                      title="Copy Email"
                    >
                      <AnimatePresence mode="wait">
                        {copied ? (
                          <motion.div key="check" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                            <Check size={20} className="text-lime-500" />
                          </motion.div>
                        ) : (
                          <motion.div key="mail" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                            <Mail size={20} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {copied && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: -30 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-1/2 -translate-x-1/2 px-2 py-1 bg-lime-500 text-zinc-950 text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap pointer-events-none rounded"
                          >
                            Copied!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* About */}
            <section id="about" className="mb-40 scroll-mt-32">
              <SectionHeader title="About" index="01" />
              <div className="space-y-6 text-zinc-400 leading-relaxed font-light md:text-lg max-w-3xl">
                {about.bio.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
                <div className="p-6 md:p-8 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu size={16} className="text-zinc-500" />
                    <div className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Currently Building</div>
                  </div>
                  <div className="text-sm text-zinc-300 leading-relaxed">{about.currentlyBuilding}</div>
                </div>
                <div className="p-6 md:p-8 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center gap-3 mb-4">
                    <Layers size={16} className="text-zinc-500" />
                    <div className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase">Currently Learning</div>
                  </div>
                  <div className="text-sm text-zinc-300 leading-relaxed">{about.currentlyLearning}</div>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section id="experience" className="mb-40 scroll-mt-32">
              <SectionHeader title="Experience" index="02" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                {[...experience, ...hackathons].map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="group flex flex-col p-6 md:p-8 rounded-3xl bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/30 hover:bg-zinc-900/60 hover:border-zinc-700/80 transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Subtle hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/0 to-zinc-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">
                          {exp.period}
                        </div>
                        {exp.badge && (
                          <span className="text-[9px] font-bold px-2.5 py-1 border border-zinc-700/50 bg-zinc-800/30 text-zinc-400 tracking-widest uppercase rounded-md shadow-inner">
                            {exp.badge}
                          </span>
                        )}
                      </div>

                      <div className="mb-6">
                        <h3 className="text-xl font-display font-semibold text-zinc-100 group-hover:text-white transition-colors mb-1">{exp.role}</h3>
                        <div className="text-sm text-lime-500/70 font-medium tracking-wide">{exp.org}</div>
                      </div>

                      <ul className="space-y-3 mt-auto">
                        {exp.bullets.map((b, bi) => (
                          <li key={bi} className="text-sm text-zinc-400 leading-relaxed flex gap-4 font-light">
                            <span className="text-zinc-700 mt-0.5 font-mono">→</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="mb-40 scroll-mt-32">
              <SectionHeader title="Projects" index="03" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="group flex flex-col p-6 md:p-8 bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/30 rounded-3xl hover:bg-zinc-900/60 hover:border-zinc-700/80 transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Subtle hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/0 to-zinc-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-display font-semibold text-zinc-100 group-hover:text-white transition-colors">{project.name}</h3>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-lime-400 bg-zinc-800/30 hover:bg-zinc-800 p-2 rounded-full transition-all shrink-0 ml-4 border border-zinc-800/50 hover:border-lime-900/50">
                          <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>

                    <p className="relative z-10 text-zinc-400 leading-relaxed mb-8 font-light">
                      {project.description}
                    </p>

                    <div className="relative z-10 mt-auto flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-zinc-950/50 border border-zinc-800/80 text-zinc-500 rounded-lg group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section id="skills" className="mb-40 scroll-mt-32">
              <SectionHeader title="Skills" index="04" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-14 gap-x-12">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="space-y-6">
                    <h4 className="text-xs font-bold text-zinc-300 tracking-widest uppercase flex items-center gap-4">
                      {category}
                      <div className="h-[1px] flex-grow bg-gradient-to-r from-zinc-800 to-transparent"></div>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {items.map(item => (
                        <span
                          key={item}
                          className="text-sm text-zinc-400 font-medium px-4 py-2 bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/50 rounded-xl hover:border-zinc-600 hover:text-zinc-100 hover:bg-zinc-800/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.03)] transition-all cursor-default"
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
            <footer className="pt-12 pb-32 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div className="text-xs text-zinc-600 tracking-wide font-medium flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
                © {mounted ? new Date().getFullYear() : '2026'} Nikhil Kumar Yadav.
              </div>
              <div className="flex items-center gap-6 text-xs font-bold text-zinc-500 tracking-widest uppercase">
                <a href={contact.github} className="hover:text-zinc-100 transition-colors">GitHub</a>
                <a href={contact.linkedin} className="hover:text-zinc-100 transition-colors">LinkedIn</a>
                <button 
                  onClick={handleCopyEmail}
                  className="hover:text-zinc-100 transition-colors relative group/footer-mail"
                >
                  {copied ? 'Email Copied!' : 'Email'}
                  {copied && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-lime-500 rounded-full"
                    />
                  )}
                </button>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </>
  );
}