import { useCallback } from 'react';
import { motion } from 'motion/react';
import { NormalNav } from './NormalNav';
import { NormalHero } from './NormalHero';
import { NormalAbout } from './NormalAbout';
import { NormalProjects } from './NormalProjects';
import { NormalSkills } from './NormalSkills';
import { NormalServices } from './NormalServices';
import { NormalTestimonials } from './NormalTestimonials';
import { NormalContact } from './NormalContact';
import { NormalFooter } from './NormalFooter';
import { Terminal } from 'lucide-react';

interface Props {
  onSwitchMode: () => void;
}

const sectionIds: Record<string, string> = {
  hero: 'hero',
  about: 'about',
  projects: 'projects',
  skills: 'skills',
  services: 'services',
  testimonials: 'testimonials',
  contact: 'contact',
};

export function NormalPage({ onSwitchMode }: Props) {
  const navigateTo = useCallback((section: string) => {
    const id = sectionIds[section] || section;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ background: '#000', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Navigation */}
      <NormalNav onNavigate={navigateTo} onSwitchMode={onSwitchMode} />

      {/* Main Content */}
      <main>
        <NormalHero onNavigate={navigateTo} />
        <NormalAbout onNavigate={navigateTo} />
        <NormalProjects onContact={() => navigateTo('contact')} />
        <NormalSkills />
        <NormalServices onContact={() => navigateTo('contact')} />
        <NormalTestimonials />
        <NormalContact />
      </main>

      {/* Footer */}
      <NormalFooter onNavigate={navigateTo} onSwitchMode={onSwitchMode} />

      {/* Floating Code Mode pill — always visible */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={onSwitchMode}
        whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-6 right-6 z-[900] flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{
          background: 'rgba(8,8,12,0.96)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11.5px',
          color: 'rgba(255,255,255,0.45)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
          cursor: 'pointer',
        }}
        title="Switch to Developer Mode"
      >
        <Terminal size={12} style={{ color: 'rgba(255,255,255,0.45)' }} />
        <span>Code Mode</span>
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }}
        />
      </motion.button>
    </motion.div>
  );
}
