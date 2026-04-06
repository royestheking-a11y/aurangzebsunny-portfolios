import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onComplete: () => void;
}

const bootLines = [
  { text: '> Initializing Portfolio...', delay: 0, color: '#00ff88' },
  { text: '> Loading Systems...', delay: 400, color: '#ffffff' },
  { text: '> Connecting Database...', delay: 800, color: '#ffffff' },
  { text: '> Authenticating Session...', delay: 1100, color: '#ffffff' },
  { text: '> Mounting Components...', delay: 1400, color: '#ffffff' },
  { text: '> Deployment Successful.', delay: 1750, color: '#00ff88' },
  { text: '', delay: 2000, color: '#ffffff' },
  { text: '  ╔══════════════════════════════════╗', delay: 2100, color: '#00ff88' },
  { text: '  ║     AURANGZEB SUNNY              ║', delay: 2200, color: '#00ff88' },
  { text: '  ║     Full-Stack Engineer          ║', delay: 2300, color: '#00ff88' },
  { text: '  ║     System Architect             ║', delay: 2400, color: '#00ff88' },
  { text: '  ╚══════════════════════════════════╝', delay: 2500, color: '#00ff88' },
  { text: '', delay: 2600, color: '' },
  { text: '> Welcome. Press any key to continue...', delay: 2800, color: '#ffffff' },
];

export function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    bootLines.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1);
      }, line.delay);
      timers.push(t);
    });
    const doneTimer = setTimeout(() => setDone(true), 3200);
    timers.push(doneTimer);
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onComplete(), 600);
  };

  useEffect(() => {
    if (!done) return;
    const handleKey = () => handleSkip();
    window.addEventListener('keydown', handleKey);
    window.addEventListener('click', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('click', handleKey);
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: '#000000' }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
              zIndex: 1,
            }}
          />

          <div className="relative z-10 w-full max-w-2xl px-8">
            {/* Terminal header */}
            <div
              className="mb-6 flex items-center gap-2 pb-3"
              style={{ borderBottom: '1px solid rgba(0,255,136,0.2)' }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full" style={{ background: '#00ff88' }} />
              <span
                className="ml-4 text-xs tracking-widest"
                style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}
              >
                AURANGZEB_SUNNY — portfolio.sh
              </span>
            </div>

            {/* Boot lines */}
            <div
              className="space-y-1"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}
            >
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ color: line.color || 'transparent', minHeight: '21px' }}
                >
                  {line.text}
                  {i === visibleLines - 1 && !done && (
                    <span style={{ opacity: blink ? 1 : 0, color: '#00ff88' }}>█</span>
                  )}
                </motion.div>
              ))}
              {done && (
                <div style={{ color: 'rgba(255,255,255,0.3)', marginTop: '8px', fontSize: '11px' }}>
                  Click or press any key to continue{' '}
                  <span style={{ opacity: blink ? 1 : 0, color: '#00ff88' }}>█</span>
                </div>
              )}
            </div>
          </div>

          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-xs tracking-widest hover:opacity-100 transition-opacity"
            style={{
              color: 'rgba(255,255,255,0.3)',
              fontFamily: 'JetBrains Mono, monospace',
              opacity: done ? 0.6 : 0.3,
            }}
          >
            [SKIP →]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
