import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X } from 'lucide-react';

interface Props {
  onNavigate: (section: string) => void;
  onSwitchMode: () => void;
}

const navLinks = [
  { label: 'About', section: 'about' },
  { label: 'Projects', section: 'projects' },
  { label: 'Skills', section: 'skills' },
  { label: 'Services', section: 'services' },
  { label: 'Resume', isDownload: true, href: '/Aurangzeb_Sunny resume.pdf' },
  { label: 'Contact', section: 'contact' },
];

export function NormalNav({ onNavigate, onSwitchMode }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['hero', 'about', 'projects', 'skills', 'services', 'testimonials', 'contact'];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[800] transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(2,2,4,0.92)'
            : 'rgba(0,0,0,0)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <button
              onClick={() => onNavigate('hero')}
              className="flex items-center gap-3 group"
            >
              <div
                className="relative w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.85) 100%)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.12), 0 4px 16px rgba(0,0,0,0.4)',
                }}
              >
                <span style={{ color: '#000', fontSize: '13px', fontWeight: 800, letterSpacing: '-0.02em' }}>AS</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span style={{ color: '#fff', fontSize: '15px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  Aurangzeb Sunny
                </span>
                <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: '10.5px', letterSpacing: '0.06em', lineHeight: 1 }}>
                  Full-Stack Developer
                </span>
              </div>
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.section;
                if (link.isDownload) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      download
                      className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <button
                    key={link.section}
                    onClick={() => onNavigate(link.section!)}
                    className="relative px-4 py-2 rounded-lg text-sm transition-all duration-200"
                    style={{
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                      background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: '#fff' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2.5">
              {/* Code Mode toggle */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSwitchMode}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all"
                style={{
                  color: 'rgba(255,255,255,0.38)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontFamily: 'JetBrains Mono, monospace',
                  background: 'rgba(255,255,255,0.03)',
                }}
                title="Switch to Developer Mode"
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.38)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <Terminal size={11} />
                <span>Code Mode</span>
              </motion.button>

              {/* Hire Me CTA */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 4px 24px rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('contact')}
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: '#fff',
                  color: '#000',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  boxShadow: '0 2px 12px rgba(255,255,255,0.1)',
                }}
              >
                Hire Me
              </motion.button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-all"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[68px] left-0 right-0 z-[799] md:hidden"
            style={{
              background: 'rgba(4,4,8,0.98)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(32px)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                link.isDownload ? (
                  <a
                    key={link.label}
                    href={link.href}
                    download
                    onClick={() => setMobileOpen(false)}
                    className="text-left py-3 px-4 rounded-xl transition-all text-sm"
                    style={{
                      color: 'rgba(255,255,255,0.55)',
                      background: 'transparent',
                    }}
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={link.section}
                    onClick={() => { onNavigate(link.section!); setMobileOpen(false); }}
                    className="text-left py-3 px-4 rounded-xl transition-all text-sm"
                    style={{
                      color: activeSection === link.section ? '#fff' : 'rgba(255,255,255,0.55)',
                      background: activeSection === link.section ? 'rgba(255,255,255,0.07)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </button>
                )
              ))}
              <div className="mt-3 pt-4 flex flex-col gap-2.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => { onNavigate('contact'); setMobileOpen(false); }}
                  className="py-3.5 px-4 text-sm rounded-xl text-center"
                  style={{ background: '#fff', color: '#000', fontWeight: 700 }}
                >
                  Hire Me
                </button>
                <button
                  onClick={onSwitchMode}
                  className="py-3 px-4 text-xs rounded-xl text-center flex items-center justify-center gap-2"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'JetBrains Mono, monospace',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <Terminal size={11} />
                  Switch to Code Mode
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
