import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Terminal, Layers, Mail, Code, BarChart2, Clock, User, Download, Cpu } from 'lucide-react';

interface Props {
  onClose: () => void;
  onNavigate: (section: string) => void;
}

const commands = [
  { id: 'hero', label: 'System Status', desc: 'View my profile & status', icon: User, shortcut: 'H', section: 'hero' },
  { id: 'projects', label: 'Projects Dashboard', desc: 'View all production systems', icon: Layers, shortcut: 'P', section: 'projects' },
  { id: 'architecture', label: 'Architecture Visualizer', desc: 'Interactive system diagrams', icon: Cpu, shortcut: 'A', section: 'architecture' },
  { id: 'metrics', label: 'Performance Metrics', desc: 'Real-time performance data', icon: BarChart2, shortcut: 'M', section: 'metrics' },
  { id: 'timeline', label: 'Deployment Timeline', desc: 'Code deployment history', icon: Clock, shortcut: 'T', section: 'timeline' },
  { id: 'skills', label: 'Skills Modules', desc: 'Installed technology stack', icon: Code, shortcut: 'S', section: 'skills' },
  { id: 'contact', label: 'Contact', desc: 'Send a message or book a call', icon: Mail, shortcut: 'C', section: 'contact' },
  { id: 'terminal', label: 'Open Terminal', desc: 'Interactive command line', icon: Terminal, shortcut: '', section: 'hero' },
  { id: 'resume', label: 'Download Resume', desc: 'Get my latest CV', icon: Download, shortcut: 'R', section: 'contact' },
];

export function CommandPalette({ onClose, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selected]) {
          onNavigate(filtered[selected].section);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [filtered, selected, onClose, onNavigate]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9000] flex items-start justify-center pt-[15vh]"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl mx-4"
          style={{
            background: '#0a0a0a',
            border: '1px solid rgba(0,255,136,0.2)',
            boxShadow: '0 0 60px rgba(0,255,136,0.1), 0 20px 60px rgba(0,0,0,0.8)',
            fontFamily: 'JetBrains Mono, monospace',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <Search size={14} style={{ color: '#00ff88' }} className="mr-3 flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-600"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            />
            <kbd
              className="hidden sm:flex text-[10px] px-2 py-1"
              style={{
                color: 'rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="py-2 max-h-80 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-600 text-sm">No commands found</div>
            ) : (
              filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                    style={{
                      background: i === selected ? 'rgba(0,255,136,0.08)' : 'transparent',
                      borderLeft: i === selected ? '2px solid #00ff88' : '2px solid transparent',
                    }}
                    onMouseEnter={() => setSelected(i)}
                    onClick={() => {
                      onNavigate(cmd.section);
                      onClose();
                    }}
                  >
                    <div
                      className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                      style={{
                        background: i === selected ? 'rgba(0,255,136,0.15)' : 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <Icon size={12} style={{ color: i === selected ? '#00ff88' : '#666' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm truncate"
                        style={{ color: i === selected ? '#fff' : '#aaa' }}
                      >
                        {cmd.label}
                      </div>
                      <div className="text-[11px] text-gray-600 truncate">{cmd.desc}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {cmd.shortcut && (
                        <kbd
                          className="text-[10px] px-1.5 py-0.5"
                          style={{
                            color: 'rgba(0,255,136,0.6)',
                            background: 'rgba(0,255,136,0.08)',
                            border: '1px solid rgba(0,255,136,0.2)',
                          }}
                        >
                          {cmd.shortcut}
                        </kbd>
                      )}
                      {i === selected && <ArrowRight size={12} style={{ color: '#00ff88' }} />}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div
            className="px-4 py-2.5 flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-4 text-[10px] text-gray-600">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
            <div className="text-[10px]" style={{ color: 'rgba(0,255,136,0.4)' }}>
              {filtered.length} commands
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
