import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, User, X, ArrowLeftRight } from 'lucide-react';

interface Props {
  currentMode: 'normal' | 'code';
  onSwitch: () => void;
}

export function ModeSwitcherToast({ currentMode, onSwitch }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const key = 'mode_switcher_dismissed_v2';
    if (localStorage.getItem(key)) {
      setDismissed(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem('mode_switcher_dismissed_v2', '1');
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[900] flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: currentMode === 'normal' ? 'rgba(8,8,12,0.97)' : 'rgba(0,0,0,0.97)',
            border: currentMode === 'normal'
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(0,255,136,0.18)',
            backdropFilter: 'blur(32px)',
            fontFamily: 'Inter, sans-serif',
            boxShadow: currentMode === 'normal'
              ? '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)'
              : '0 20px 60px rgba(0,255,136,0.08), 0 0 0 1px rgba(0,255,136,0.04)',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Mode label */}
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{
                background: currentMode === 'normal' ? 'rgba(255,255,255,0.08)' : 'rgba(0,255,136,0.12)',
              }}
            >
              {currentMode === 'normal' ? (
                <User size={12} style={{ color: 'rgba(255,255,255,0.6)' }} />
              ) : (
                <Terminal size={12} style={{ color: '#00ff88' }} />
              )}
            </div>
            <span
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.48)',
                fontFamily: currentMode === 'code' ? 'JetBrains Mono, monospace' : 'Inter, sans-serif',
              }}
            >
              {currentMode === 'normal' ? 'Normal Mode' : 'Code Mode'}
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.08)' }} />

          {/* Switch button */}
          <button
            onClick={() => { setVisible(false); onSwitch(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{
              background: currentMode === 'normal' ? 'rgba(255,255,255,0.07)' : 'rgba(0,255,136,0.08)',
              color: currentMode === 'normal' ? 'rgba(255,255,255,0.72)' : '#00ff88',
              border: currentMode === 'normal'
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid rgba(0,255,136,0.18)',
              fontFamily: currentMode === 'code' ? 'JetBrains Mono, monospace' : 'Inter, sans-serif',
              fontWeight: 600,
            }}
          >
            <ArrowLeftRight size={11} />
            {currentMode === 'normal' ? 'Switch to Code Mode' : 'Switch to Normal View'}
          </button>

          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            className="p-1 rounded-md transition-all"
            style={{ color: 'rgba(255,255,255,0.22)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
          >
            <X size={13} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
