import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Command, Code2, Cpu, ExternalLink, User } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface Props {
  onCommandPalette: () => void;
  onDeveloperMode: () => void;
  devMode: boolean;
  onNavigate: (section: string) => void;
  onSwitchMode?: () => void;
}

const navLinks = [
  { label: 'Projects', shortcut: 'P', section: 'projects' },
  { label: 'Skills', shortcut: 'S', section: 'skills' },
  { label: 'Architecture', shortcut: 'A', section: 'architecture' },
  { label: 'Timeline', shortcut: 'T', section: 'timeline' },
  { label: 'Contact', shortcut: 'C', section: 'contact' },
  { label: 'Resume', isDownload: true, href: '/Aurangzeb_Sunny resume.pdf' },
];

export function Navigation({ onCommandPalette, onDeveloperMode, devMode, onNavigate, onSwitchMode }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-[800] transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0.8)',
        borderBottom: scrolled ? '1px solid rgba(0,255,136,0.15)' : '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-6 h-6 flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(0,255,136,0.1)',
                border: '1px solid rgba(0,255,136,0.3)',
              }}
            >
              <Terminal size={12} style={{ color: '#00ff88' }} />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-[10px] sm:text-[11px] font-bold tracking-tight leading-none uppercase whitespace-nowrap">
                {personalInfo.name}
              </span>
              <span className="text-[8px] sm:text-[9px] mt-0.5 whitespace-nowrap" style={{ color: '#00ff88', opacity: 0.8 }}>
                Full-Stack Engineer
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              link.isDownload ? (
                <a
                  key={link.label}
                  href={link.href}
                  download
                  className="text-[11px] tracking-widest uppercase transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.section}
                  onClick={() => onNavigate(link.section!)}
                  className="relative text-[11px] tracking-widest uppercase transition-colors hover:text-white group"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {link.label}
                  <span
                    className="ml-1 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#00ff88' }}
                  >
                    [{link.shortcut}]
                  </span>
                </button>
              )
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Switch to Normal Mode */}
            {onSwitchMode && (
              <button
                onClick={onSwitchMode}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] transition-all"
                style={{
                  color: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
                title="Switch to Normal Mode"
              >
                <User size={11} />
                <span className="hidden sm:inline">Normal</span>
              </button>
            )}

            {/* Command Palette */}
            <button
              onClick={onCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 text-[11px] transition-all hover:border-opacity-100"
              style={{
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
              title="Command Palette (Ctrl+K)"
            >
              <Command size={11} />
              <span className="hidden sm:inline">Ctrl+K</span>
            </button>

            {/* Developer Mode toggle */}
            <button
              onClick={onDeveloperMode}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] transition-all"
              style={{
                color: devMode ? '#00ff88' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${devMode ? 'rgba(0,255,136,0.4)' : 'rgba(255,255,255,0.1)'}`,
                background: devMode ? 'rgba(0,255,136,0.08)' : 'transparent',
                fontFamily: 'JetBrains Mono, monospace',
              }}
              title="Toggle Developer Mode"
            >
              <Cpu size={11} />
              <span className="hidden sm:inline">DEV</span>
            </button>

            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px]" style={{ color: '#00ff88' }}>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#00ff88',
                  boxShadow: '0 0 6px #00ff88',
                  animation: 'pulse 2s infinite',
                }}
              />
              <span className="tracking-wider">AVAILABLE</span>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}