'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';

import { AboutPanel } from './panels/AboutPanel';
import { ProjectsPanel } from './panels/ProjectsPanel';
import { SkillsPanel } from './panels/SkillsPanel';
import { ExperiencePanel } from './panels/ExperiencePanel';
import { ContactPanel } from './panels/ContactPanel';

/**
 * OverlayPanel — Main container for 2D UI when "inside" a building.
 * Captures mouse/keyboard. Renders specific panel based on current building.
 */
export function OverlayPanel() {
  const { overlayOpen, activeBuilding, closeBuilding } = useGameStore();
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus the panel when opened so ESC key works immediately
  useEffect(() => {
    if (overlayOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [overlayOpen]);

  // Handle ESC or clicking outside
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeBuilding();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeBuilding();
  };

  return (
    <AnimatePresence>
      {overlayOpen && activeBuilding && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          onClick={handleBackdropClick}
          className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black"
        >
          {/* Main Panel Content Box */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            initial={{ scale: 0.92, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 15, opacity: 0 }}
            transition={{ 
              delay: 0.25,
              duration: 0.35,
              ease: "easeOut" 
            }}
            className="mc-panel relative flex flex-col w-full max-w-4xl max-h-[85vh] outline-none overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeBuilding}
              className="absolute top-4 flex items-center justify-center -right-0 mc-btn text-white z-10 w-8 h-8 font-monocraft"
              style={{ fontSize: 14 }}
              title="Close (ESC)"
            >
              X
            </button>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4 custom-scrollbar">
              {activeBuilding === 'about' && <AboutPanel />}
              {activeBuilding === 'projects' && <ProjectsPanel />}
              {activeBuilding === 'skills' && <SkillsPanel />}
              {activeBuilding === 'experience' && <ExperiencePanel />}
              {activeBuilding === 'leadership' && <ExperiencePanel type="hackathon" />}
              {activeBuilding === 'contact' && <ContactPanel />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
