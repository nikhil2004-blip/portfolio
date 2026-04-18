'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  GitBranch,
  Briefcase,
  Mail,
  FileText
} from 'lucide-react';
import { about } from '@/content/about';
import { experience, hackathons, contact } from '@/content/experience';
import { projects } from '@/content/projects';
import { skills } from '@/content/skills';
import Link from 'next/link';

const sections = ['about', 'experience', 'projects', 'skills'];

const SectionHeader = ({ title, index }: { title: string; index: string }) => (
  <div className="flex items-center gap-6 mb-12 group">
    <span className="text-sm font-medium text-zinc-500">{index}</span>
    <h2 className="text-2xl font-medium tracking-tight text-zinc-100">
      {title}
    </h2>
    <div className="flex-1 h-[1px] bg-zinc-800/50 group-hover:bg-zinc-700 transition-colors duration-500"></div>
  </div>
);

export default function MinimalPortfolio() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
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
    <div className="bg-[#09090B] min-h-screen text-zinc-400 font-sans selection:bg-zinc-800 selection:text-zinc-100 pb-32">

      {/* Floating Pill Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-[#18181B]/80 backdrop-blur-xl border border-zinc-800/80 rounded-full px-2 py-2 flex items-center gap-1 shadow-2xl">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`px-5 py-2.5 rounded-full text-xs font-medium capitalize transition-all duration-300 ${activeSection === section
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
            >
              {section}
            </a>
          ))}
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 md:px-8 pt-24 md:pt-32">

        {/* Hero Area */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse"></div>
              <span className="text-xs font-medium text-zinc-500 tracking-wide uppercase">Available for work</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-zinc-100 leading-tight mb-8">
              Nikhil Yadav. <br />
              <span className="text-zinc-500">Software Engineer.</span>
            </h1>

            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-10">
              Crafting high-performance systems, interactive experiences, and robust full-stack architectures. Focused on clean code and elegant design.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-zinc-100 border-b border-zinc-700 pb-1 hover:border-zinc-300 transition-colors">
                View Resume <ArrowUpRight size={14} className="text-zinc-500" />
              </a>
              <div className="flex items-center gap-4 text-zinc-500">
                <a href={contact.github} target="_blank" rel="noreferrer" className="hover:text-zinc-200 transition-colors p-2 hover:bg-zinc-900 rounded-md"><GitBranch size={18} /></a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-200 transition-colors p-2 hover:bg-zinc-900 rounded-md"><Briefcase size={18} /></a>
                <a href={`mailto:${contact.email}`} className="hover:text-zinc-200 transition-colors p-2 hover:bg-zinc-900 rounded-md"><Mail size={18} /></a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className="mb-32 scroll-mt-32">
          <SectionHeader title="About" index="01" />
          <div className="space-y-6 text-zinc-400 leading-relaxed">
            {about.bio.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
              <div className="text-xs font-medium text-zinc-500 mb-2">Currently Building</div>
              <div className="text-sm text-zinc-300 leading-relaxed">{about.currentlyBuilding}</div>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
              <div className="text-xs font-medium text-zinc-500 mb-2">Currently Learning</div>
              <div className="text-sm text-zinc-300 leading-relaxed">{about.currentlyLearning}</div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-32 scroll-mt-32">
          <SectionHeader title="Experience" index="02" />
          <div className="space-y-12">
            {[...experience, ...hackathons].map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8"
              >
                <div className="text-sm font-medium text-zinc-500 md:w-32 shrink-0">
                  {exp.period}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-medium text-zinc-100">{exp.role}</h3>
                    {exp.badge && (
                      <span className="text-[10px] font-medium px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded-full">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-zinc-400 mb-4">{exp.org}</div>
                  <ul className="space-y-3">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="text-sm text-zinc-400 leading-relaxed relative pl-4">
                        <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-zinc-700"></span>
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
        <section id="projects" className="mb-32 scroll-mt-32">
          <SectionHeader title="Projects" index="03" />
          <div className="flex flex-col gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                className="group flex flex-col p-6 md:p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium text-zinc-100">{project.name}</h3>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-100 transition-colors">
                      <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-medium px-3 py-1 bg-zinc-800/50 text-zinc-300 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-32 scroll-mt-32">
          <SectionHeader title="Skills" index="04" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="space-y-4">
                <h4 className="text-sm font-medium text-zinc-100">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span
                      key={item}
                      className="text-sm text-zinc-400 px-3 py-1.5 border border-zinc-800/50 rounded-lg hover:border-zinc-700 hover:text-zinc-200 transition-colors"
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
        <footer className="pt-12 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Nikhil Yadav. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-500">
            <a href={contact.github} className="hover:text-zinc-200 transition-colors">GitHub</a>
            <a href={contact.linkedin} className="hover:text-zinc-200 transition-colors">LinkedIn</a>
            <a href={`mailto:${contact.email}`} className="hover:text-zinc-200 transition-colors">Email</a>
          </div>
        </footer>
      </main>
    </div>
  );
}