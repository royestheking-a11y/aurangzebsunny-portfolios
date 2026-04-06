import { personalInfo } from '../data/portfolio';
import { Terminal, ArrowUp } from 'lucide-react';

export function Footer({ onNavigate }: { onNavigate: (s: string) => void }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 px-4"
      style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.06)', fontFamily: 'JetBrains Mono, monospace' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}
            >
              <Terminal size={14} style={{ color: '#00ff88' }} />
            </div>
            <div>
              <div className="text-white text-sm font-medium">{personalInfo.name}</div>
              <div className="text-[11px]" style={{ color: '#00ff88' }}>Full-Stack Engineer</div>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            {['hero', 'projects', 'architecture', 'skills', 'timeline', 'contact'].map((s) => (
              <button
                key={s}
                onClick={() => onNavigate(s)}
                className="text-[11px] tracking-widest uppercase transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-2 text-[11px] tracking-widest transition-colors hover:text-white group"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            BACK TO TOP
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {year} {personalInfo.name}. All rights reserved.
          </div>
          <div className="text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Built with React · TypeScript · Tailwind CSS
          </div>
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'rgba(0,255,136,0.4)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88', animation: 'pulse 2s infinite' }} />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
