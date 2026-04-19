'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  GitBranch,
  Briefcase,
  Mail,
  ArrowLeft
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
    <h2 className="text-3xl md:text-4xl font-display font-semibold text-zinc-100 tracking-tight">
      {title}
    </h2>
  </div>
);

export default function MinimalPortfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [mounted, setMounted] = useState(false);

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

      <div className="bg-zinc-950 min-h-screen text-zinc-400 font-sans selection:bg-zinc-200 selection:text-zinc-900 pb-12">

        {/* Top Navigation / Back Button */}
        <div className="fixed top-8 left-8 z-50">
          <button 
            onClick={() => window.location.replace('/')}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
        </div>

        {/* Stark, Flat Navigation Pill */}
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-full p-1.5 flex items-center gap-1 shadow-2xl">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => {
                  const el = document.getElementById(section);
                  if (el) {
                    setActiveSection(section);
                    el.scrollIntoView({ behavior: 'smooth' });
                    // Use replaceState to avoid polluting history with hashes
                    window.history.replaceState(null, '', `#${section}`);
                  }
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${activeSection === section
                  ? 'bg-zinc-100 text-zinc-900'
                  : 'text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800'
                  }`}
              >
                {section}
              </button>
            ))}
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 md:px-8 pt-32 md:pt-48">

          {/* Hero Area */}
          <section className="mb-48">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <div className="flex items-center gap-3 mb-12">
                <div className="w-2 h-2 rounded-full bg-zinc-300 animate-pulse"></div>
                <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">Available for work</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold text-zinc-100 tracking-tight leading-[1.1] mb-8">
                Nikhil Kumar Yadav.
                <br />
                <span className="text-zinc-600 font-medium tracking-normal">Software Engineer.</span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-12 font-light">
                Crafting high-performance systems, interactive experiences, and robust architectures. Focused on pure logic and elegant design.
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-zinc-100 border-b border-zinc-700 pb-1 hover:border-zinc-300 transition-colors group">
                  View Resume <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-zinc-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
                <div className="flex items-center gap-5 text-zinc-500">
                  <a href={contact.github} target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors"><GitBranch size={20} /></a>
                  <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-100 transition-colors"><Briefcase size={20} /></a>
                  <a href={`mailto:${contact.email}`} className="hover:text-zinc-100 transition-colors"><Mail size={20} /></a>
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
              <div className="p-6 md:p-8 bg-zinc-900/50 border border-zinc-800/50 rounded-3xl">
                <div className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-3">Currently Building</div>
                <div className="text-sm text-zinc-300 leading-relaxed">{about.currentlyBuilding}</div>
              </div>
              <div className="p-6 md:p-8 bg-zinc-900/50 border border-zinc-800/50 rounded-3xl">
                <div className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-3">Currently Learning</div>
                <div className="text-sm text-zinc-300 leading-relaxed">{about.currentlyLearning}</div>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="mb-40 scroll-mt-32">
            <SectionHeader title="Experience" index="02" />
            {/* Grid Layout implemented here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...experience, ...hackathons].map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group flex flex-col p-6 md:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/80 hover:border-zinc-700 transition-colors duration-500"
                >
                  <div className="text-xs font-semibold text-zinc-500 tracking-widest uppercase mb-4">
                    {exp.period}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-display font-semibold text-zinc-100">{exp.role}</h3>
                      {exp.badge && (
                        <span className="text-[9px] font-bold px-2 py-0.5 border border-zinc-700 bg-zinc-800/50 text-zinc-400 tracking-widest uppercase rounded-md">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-zinc-500 mb-6 font-medium">{exp.org}</div>
                    <ul className="space-y-3 mt-auto">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="text-sm text-zinc-400 leading-relaxed flex gap-3 font-light">
                          <span className="text-zinc-600 mt-0.5">—</span>
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
            {/* Grid Layout implemented here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={i}
                  className="group flex flex-col p-6 md:p-8 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl hover:bg-zinc-900/80 hover:border-zinc-700 transition-colors duration-500"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-display font-semibold text-zinc-100 group-hover:text-white transition-colors">{project.name}</h3>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-100 bg-zinc-800/50 hover:bg-zinc-700 p-2 rounded-full transition-colors shrink-0 ml-4">
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>

                  <p className="text-zinc-400 leading-relaxed mb-8 font-light">
                    {project.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-lg group-hover:border-zinc-600 group-hover:text-zinc-300 transition-colors">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="space-y-5">
                  <h4 className="text-xs font-bold text-zinc-300 tracking-widest uppercase border-b border-zinc-800 pb-3">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                      <span
                        key={item}
                        className="text-sm text-zinc-400 font-medium px-4 py-2 bg-zinc-900/40 border border-zinc-800/80 rounded-xl hover:border-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
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
          <footer className="pt-12 pb-32 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-xs text-zinc-500 tracking-wide font-medium">
              © {mounted ? new Date().getFullYear() : '2026'} Nikhil Kumar Yadav.
            </div>
            <div className="flex items-center gap-6 text-xs font-bold text-zinc-500 tracking-widest uppercase">
              <a href={contact.github} className="hover:text-zinc-100 transition-colors">GitHub</a>
              <a href={contact.linkedin} className="hover:text-zinc-100 transition-colors">LinkedIn</a>
              <a href={`mailto:${contact.email}`} className="hover:text-zinc-100 transition-colors">Email</a>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}