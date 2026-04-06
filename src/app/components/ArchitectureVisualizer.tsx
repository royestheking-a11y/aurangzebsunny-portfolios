import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data/portfolio';
import { ChevronDown, ExternalLink } from 'lucide-react';

const LAYER_ICONS: Record<string, string> = {
  Frontend: '⬡',
  'API Gateway': '⟐',
  'Cache Layer': '◈',
  Database: '⬢',
  Storage: '◉',
  Backend: '⬡',
  'Queue Engine': '⟐',
  'AI Layer': '◈',
  Payment: '◉',
  Cache: '◈',
  Export: '▣',
  'Webhooks': '⟐',
  'Messaging Engine': '◈',
  'Voice/Video': '◎',
  'Mobile Wrapper': '▣',
  'Auth/Data': '⬢',
  'Matching': '⟐',
  'Images': '◉',
  'Styling': '⬡',
  'Portal': '⬡',
  'Medical Engine': '⬢',
  'AI Service': '◈',
};

export function ArchitectureVisualizer() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSelectProject = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setAnimKey((k) => k + 1);
  };

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: '#040404' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-[11px] tracking-widest mb-3" style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>
            MODULE_03 — SYSTEM ARCHITECTURE
          </div>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Architecture Visualizer
          </h2>
          <p className="mt-3 max-w-lg" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            Click a project to explore its system architecture. Interactive diagrams showing real engineering decisions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            <div className="text-[10px] tracking-widest text-gray-600 mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              SELECT PROJECT
            </div>
            {projects.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectProject(p)}
                className="w-full text-left p-4 transition-all"
                style={{
                  background: selectedProject.id === p.id ? `${p.color}0d` : 'rgba(255,255,255,0.01)',
                  border: `1px solid ${selectedProject.id === p.id ? p.color + '40' : 'rgba(255,255,255,0.06)'}`,
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-medium">{p.name}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: selectedProject.id === p.id ? p.color : '#333' }} />
                </div>
                <div className="text-[10px] text-gray-600">{p.tagline}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#666' }}>{s}</span>
                  ))}
                </div>
              </button>
            ))}
          </motion.div>

          {/* Architecture diagram */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={animKey}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-6"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: `1px solid ${selectedProject.color}20`,
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {/* Project header */}
                <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: selectedProject.color, boxShadow: `0 0 8px ${selectedProject.color}` }} />
                      <span className="text-[10px] tracking-widest" style={{ color: selectedProject.color }}>
                        {selectedProject.status.toUpperCase()} — {selectedProject.year}
                      </span>
                    </div>
                    <h3 className="text-white mt-1" style={{ fontSize: '20px', fontWeight: 700 }}>{selectedProject.name}</h3>
                    <a
                      href={(selectedProject as any).liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-[10px] tracking-widest transition-all"
                      style={{ 
                        color: 'rgba(255,255,255,0.4)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '4px 8px',
                        background: 'rgba(255,255,255,0.02)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = selectedProject.color;
                        e.currentTarget.style.borderColor = selectedProject.color + '40';
                        e.currentTarget.style.background = selectedProject.color + '10';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                      }}
                    >
                      VIEW LIVE SYSTEM <ExternalLink size={10} />
                    </a>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-gray-600 mb-1">STACK</div>
                    <div className="flex flex-wrap justify-end gap-1">
                      {selectedProject.stack.map((s) => (
                        <span key={s} className="text-[9px] px-1.5 py-0.5" style={{ background: `${selectedProject.color}10`, border: `1px solid ${selectedProject.color}25`, color: selectedProject.color }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Architecture layers */}
                <div className="space-y-2">
                  {selectedProject.architecture.map((layer, i) => (
                    <div key={layer.layer} className="flex items-stretch gap-0">
                      {/* Connection line */}
                      <div className="flex flex-col items-center mr-4 relative" style={{ width: '24px' }}>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: i * 0.1 + 0.2 }}
                          className="w-6 h-6 flex items-center justify-center flex-shrink-0 z-10"
                          style={{
                            background: `${selectedProject.color}15`,
                            border: `1px solid ${selectedProject.color}40`,
                            color: selectedProject.color,
                            fontSize: '10px',
                          }}
                        >
                          {i + 1}
                        </motion.div>
                        {i < selectedProject.architecture.length - 1 && (
                          <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: i * 0.1 + 0.4, duration: 0.3 }}
                            className="flex-1 w-[1px] origin-top"
                            style={{ background: `${selectedProject.color}20`, marginTop: '2px', marginBottom: '2px' }}
                          />
                        )}
                        {i < selectedProject.architecture.length - 1 && (
                          <ChevronDown size={10} style={{ color: `${selectedProject.color}40`, position: 'absolute', bottom: 0 }} />
                        )}
                      </div>

                      {/* Layer card */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 p-3 mb-2"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-gray-600 mb-0.5">{layer.layer.toUpperCase()}</div>
                            <div className="text-white text-sm font-medium">{layer.tech}</div>
                          </div>
                          <div className="text-[11px] text-gray-500 max-w-[200px] text-right hidden sm:block">{layer.desc}</div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Challenges */}
                <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-[10px] tracking-widest text-gray-600 mb-3">ENGINEERING CHALLENGES SOLVED</div>
                  {selectedProject.challenges.map((c, i) => (
                    <motion.div
                      key={c}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.6 }}
                      className="flex items-start gap-2 mb-2"
                    >
                      <span style={{ color: selectedProject.color, fontSize: '10px', marginTop: 2 }}>✓</span>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{c}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
