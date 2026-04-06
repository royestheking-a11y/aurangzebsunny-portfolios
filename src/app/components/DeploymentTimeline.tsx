import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { deploymentHistory } from '../data/portfolio';
import { GitCommit, Rocket, Zap, Star } from 'lucide-react';

const TYPE_ICONS: Record<string, any> = {
  deploy: Rocket,
  update: Zap,
  feature: Star,
};

const years = [...new Set(deploymentHistory.map((d) => d.year))].sort((a, b) => b - a);

export function DeploymentTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [filter, setFilter] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = filter
    ? deploymentHistory.filter((d) => d.year === filter)
    : deploymentHistory;

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: '#040404' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-[11px] tracking-widest mb-3" style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>
            MODULE_05 — DEPLOYMENT HISTORY
          </div>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Code Deployment Timeline
          </h2>
          <p className="mt-3 max-w-lg" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            A history of shipped systems, features, and deployments. Real engineering output.
          </p>

          {/* Year filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setFilter(null)}
              className="px-3 py-1.5 text-[11px] tracking-wider transition-all"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                background: filter === null ? '#00ff88' : 'transparent',
                color: filter === null ? '#000' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${filter === null ? '#00ff88' : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              ALL
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setFilter(y)}
                className="px-3 py-1.5 text-[11px] tracking-wider transition-all"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  background: filter === y ? '#00ff88' : 'transparent',
                  color: filter === y ? '#000' : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${filter === y ? '#00ff88' : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[15px] sm:left-[120px] top-0 bottom-0 w-[1px]"
            style={{ background: 'linear-gradient(to bottom, rgba(0,255,136,0.3), rgba(0,255,136,0.05))' }}
          />

          <div className="space-y-6">
            {filtered.map((entry, i) => {
              const Icon = TYPE_ICONS[entry.type] || GitCommit;
              return (
                <motion.div
                  key={`${entry.year}-${entry.project}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-6 relative"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {/* Year label (hidden on mobile, shows as badge) */}
                  <div
                    className="hidden sm:flex items-center justify-end flex-shrink-0"
                    style={{ width: '100px' }}
                  >
                    <span
                      className="text-xs"
                      style={{ color: i === 0 ? '#00ff88' : 'rgba(255,255,255,0.3)' }}
                    >
                      {entry.year}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="relative flex-shrink-0" style={{ marginTop: '4px' }}>
                    <div
                      className="w-8 h-8 flex items-center justify-center"
                      style={{
                        background: `${entry.color}15`,
                        border: `1px solid ${entry.color}40`,
                        boxShadow: `0 0 12px ${entry.color}20`,
                      }}
                    >
                      <Icon size={12} style={{ color: entry.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 p-4"
                    style={{
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="text-[9px] px-2 py-0.5 tracking-widest"
                            style={{
                              background: `${entry.color}10`,
                              border: `1px solid ${entry.color}30`,
                              color: entry.color,
                            }}
                          >
                            {entry.type.toUpperCase()}
                          </span>
                          <span className="sm:hidden text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            {entry.year}
                          </span>
                        </div>
                        <div className="text-white text-sm font-medium mb-0.5">{entry.project}</div>
                        <div className="text-[12px] text-gray-500">{entry.event}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
