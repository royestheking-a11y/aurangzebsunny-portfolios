import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BootSequence } from '../components/BootSequence';
import { Navigation } from '../components/Navigation';
import { CommandPalette } from '../components/CommandPalette';
import { HeroSection } from '../components/HeroSection';
import { ProjectsDashboard } from '../components/ProjectsDashboard';
import { ArchitectureVisualizer } from '../components/ArchitectureVisualizer';
import { PerformanceMetrics } from '../components/PerformanceMetrics';
import { DeploymentTimeline } from '../components/DeploymentTimeline';
import { SkillsModules } from '../components/SkillsModules';
import { SystemStatus } from '../components/SystemStatus';
import { ClientTrust } from '../components/ClientTrust';
import { ServicePackages } from '../components/ServicePackages';
import { ProjectEstimator } from '../components/ProjectEstimator';
import { ContactSection } from '../components/ContactSection';
import { MouseTrail } from '../components/MouseTrail';
import { DeveloperMode } from '../components/DeveloperMode';
import { Footer } from '../components/Footer';
import { NormalPage } from '../components/normal/NormalPage';
import { ModeSwitcherToast } from '../components/normal/ModeSwitcherToast';

const BOOT_KEY = 'portfolio_boot_shown';
const MODE_KEY = 'portfolio_view_mode';

const sectionIds: Record<string, string> = {
  hero: 'hero',
  projects: 'projects',
  architecture: 'architecture',
  metrics: 'metrics',
  timeline: 'timeline',
  skills: 'skills',
  contact: 'contact',
  services: 'services',
  estimator: 'estimator',
};

export function Home() {
  const [bootComplete, setBoot] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [devMode, setDevMode] = useState(false);
  // viewMode: 'normal' | 'code' — default is 'normal' for non-technical users
  const [viewMode, setViewMode] = useState<'normal' | 'code'>(() => {
    try {
      const saved = localStorage.getItem(MODE_KEY);
      return (saved === 'code' || saved === 'normal') ? saved : 'code';
    } catch {
      return 'code';
    }
  });

  const switchToCode = useCallback(() => {
    setViewMode('code');
    try { localStorage.setItem(MODE_KEY, 'code'); } catch {}
    window.scrollTo({ top: 0 });
  }, []);

  const switchToNormal = useCallback(() => {
    setViewMode('normal');
    try { localStorage.setItem(MODE_KEY, 'normal'); } catch {}
    window.scrollTo({ top: 0 });
  }, []);

  // Skip boot if already shown in this session (only relevant for code mode)
  useEffect(() => {
    const shown = sessionStorage.getItem(BOOT_KEY);
    if (shown || viewMode === 'normal') setBoot(true);
  }, [viewMode]);

  const handleBootComplete = () => {
    sessionStorage.setItem(BOOT_KEY, '1');
    setBoot(true);
  };

  const navigateTo = useCallback((section: string) => {
    const id = sectionIds[section] || section;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Keyboard shortcuts (code mode only)
  useEffect(() => {
    if (!bootComplete || viewMode !== 'code') return;
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowPalette((p) => !p);
        return;
      }
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      switch (e.key.toLowerCase()) {
        case 'p': navigateTo('projects'); break;
        case 's': navigateTo('skills'); break;
        case 'c': navigateTo('contact'); break;
        case 'r': navigateTo('contact'); break;
        case 'a': navigateTo('architecture'); break;
        case 't': navigateTo('timeline'); break;
        case 'h': navigateTo('hero'); break;
        case 'm': navigateTo('metrics'); break;
        case 'd': setDevMode((d) => !d); break;
        case 'escape': setShowPalette(false); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [bootComplete, navigateTo, viewMode]);

  // ─── NORMAL MODE ───────────────────────────────────────────────────────────
  if (viewMode === 'normal') {
    return (
      <>
        <NormalPage onSwitchMode={switchToCode} />
        <ModeSwitcherToast currentMode="normal" onSwitch={switchToCode} />
      </>
    );
  }

  // ─── CODE / TERMINAL MODE ──────────────────────────────────────────────────
  return (
    <div
      className="relative"
      style={{ background: '#000', minHeight: '100vh', fontFamily: 'JetBrains Mono, monospace' }}
    >
      {/* Boot sequence */}
      {!bootComplete && <BootSequence onComplete={handleBootComplete} />}

      <AnimatePresence>
        {bootComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Mouse trail */}
            <MouseTrail />

            {/* Developer mode overlay */}
            <AnimatePresence>
              {devMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <DeveloperMode onClose={() => setDevMode(false)} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Command palette */}
            <AnimatePresence>
              {showPalette && (
                <CommandPalette
                  onClose={() => setShowPalette(false)}
                  onNavigate={navigateTo}
                />
              )}
            </AnimatePresence>

            {/* Navigation */}
            <Navigation
              onCommandPalette={() => setShowPalette(true)}
              onDeveloperMode={() => setDevMode((d) => !d)}
              devMode={devMode}
              onNavigate={navigateTo}
              onSwitchMode={switchToNormal}
            />

            {/* Keyboard shortcut hint */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="fixed bottom-4 right-4 z-50 text-[10px] tracking-widest hidden lg:flex items-center gap-2"
              style={{
                color: 'rgba(255,255,255,0.2)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <kbd className="px-1.5 py-0.5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>P</kbd>
              <span>Projects</span>
              <kbd className="px-1.5 py-0.5 ml-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>S</kbd>
              <span>Skills</span>
              <kbd className="px-1.5 py-0.5 ml-2" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>C</kbd>
              <span>Contact</span>
              <kbd className="px-1.5 py-0.5 ml-2" style={{ background: 'rgba(255,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)', color: '#00ff88' }}>Ctrl+K</kbd>
            </motion.div>

            {/* Main content */}
            <main>
              <HeroSection onNavigate={navigateTo} />
              <ProjectsDashboard onProjectClick={(id) => { navigateTo('architecture'); }} />
              <ArchitectureVisualizer />
              <PerformanceMetrics />
              <DeploymentTimeline />
              <SkillsModules />
              <SystemStatus />
              <ClientTrust />
              <ServicePackages onContact={() => navigateTo('contact')} />
              <ProjectEstimator onContact={() => navigateTo('contact')} />
              <ContactSection />
            </main>

            {/* Footer */}
            <Footer onNavigate={navigateTo} />

            {/* Mode Switcher Toast */}
            <ModeSwitcherToast currentMode="code" onSwitch={switchToNormal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}