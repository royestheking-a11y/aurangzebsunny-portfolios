import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { projects } from '../data/portfolio';
import { Activity, Users, Clock, Zap, ExternalLink, ChevronRight, Filter } from 'lucide-react';

function useCountUp(target: number, duration = 1500, start = false) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, start]);
  return value;
}

const STATUS_COLORS: Record<string, string> = {
  Production: '#00ff88',
  Running: '#3b82f6',
  Live: '#a78bfa',
};

const FILTERS = ['All', 'SaaS', 'Automation', 'AI', 'Ecommerce', 'Messaging', 'Social', 'Healthcare'];

interface LiveCardProps {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
  onClick: () => void;
}

function LiveCard({ project, index, inView, onClick }: LiveCardProps) {
  const users = useCountUp(project.users, 1800, inView);
  const requests = useCountUp(project.requestsToday, 1800, inView);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      className="relative cursor-pointer"
      style={{
        background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
        border: `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.08)'}`,
        transition: 'all 0.3s ease',
        fontFamily: 'JetBrains Mono, monospace',
      }}
      onClick={onClick}
    >
      {/* Top accent line */}
      <div className="h-[2px]" style={{ background: project.color, opacity: hovered ? 1 : 0.4 }} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: STATUS_COLORS[project.status] || '#00ff88',
                  boxShadow: `0 0 6px ${STATUS_COLORS[project.status] || '#00ff88'}`,
                  animation: 'pulse 2s infinite',
                }}
              />
              <span
                className="text-[10px] tracking-widest"
                style={{ color: STATUS_COLORS[project.status] || '#00ff88' }}
              >
                {project.status.toUpperCase()}
              </span>
            </div>
            <h3
              className="text-white"
              style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}
            >
              {project.name}
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">{project.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <a
              href={(project as any).liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg transition-all"
              style={{ 
                color: hovered ? project.color : 'rgba(255,255,255,0.2)',
                background: hovered ? `${project.color}15` : 'transparent',
                border: `1px solid ${hovered ? `${project.color}30` : 'transparent'}`
              }}
              title="Launch System"
            >
              <ExternalLink size={16} />
            </a>
            <ChevronRight
              size={16}
              style={{ color: hovered ? project.color : '#333', transition: 'all 0.3s' }}
            />
          </div>
        </div>

        {/* Live metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            className="p-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Users size={10} style={{ color: '#666' }} />
              <span className="text-[10px] text-gray-600">Users</span>
            </div>
            <div className="text-white" style={{ fontSize: '20px', fontWeight: 700 }}>
              {users.toLocaleString()}
            </div>
          </div>
          <div
            className="p-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Activity size={10} style={{ color: '#666' }} />
              <span className="text-[10px] text-gray-600">Req/Today</span>
            </div>
            <div className="text-white" style={{ fontSize: '20px', fontWeight: 700 }}>
              {requests.toLocaleString()}
            </div>
          </div>
          <div
            className="p-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Zap size={10} style={{ color: '#666' }} />
              <span className="text-[10px] text-gray-600">Uptime</span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#00ff88' }}>
              {project.uptime}%
            </div>
          </div>
          <div
            className="p-3"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Clock size={10} style={{ color: '#666' }} />
              <span className="text-[10px] text-gray-600">Load Time</span>
            </div>
            <div className="text-white" style={{ fontSize: '20px', fontWeight: 700 }}>
              {project.loadTime}
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] tracking-wide"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Category tag */}
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] tracking-widest px-2 py-1"
            style={{
              color: project.color,
              background: `${project.color}10`,
              border: `1px solid ${project.color}30`,
            }}
          >
            {project.category.toUpperCase()}
          </span>
          <span className="text-[10px] text-gray-600">
            Deployed {project.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsDashboard({ onProjectClick }: { onProjectClick: (id: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: '#000' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div
            className="text-[11px] tracking-widest mb-3"
            style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}
          >
            MODULE_02 — ACTIVE SYSTEMS
          </div>
          <h2
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            Full-Stack Systems Portfolio
          </h2>
          <p
            className="mt-3 max-w-lg"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.8,
            }}
          >
            Real production systems currently running. All metrics are live-simulated from actual
            system benchmarks.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            <Filter size={12} style={{ color: '#666', marginTop: 2 }} />
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-1.5 text-[11px] tracking-wider transition-all"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  background: filter === f ? '#00ff88' : 'transparent',
                  color: filter === f ? '#000' : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${filter === f ? '#00ff88' : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {filtered.map((project, i) => (
            <LiveCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
              onClick={() => onProjectClick(project.id)}
            />
          ))}
        </div>

        {/* System summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 p-4 flex flex-wrap items-center justify-between gap-4"
          style={{
            background: 'rgba(0,255,136,0.03)',
            border: '1px solid rgba(0,255,136,0.15)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88', animation: 'pulse 2s infinite' }}
            />
            <span style={{ color: '#00ff88' }}>ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-6 text-gray-500">
            <span>4 Active Systems</span>
            <span>12,700+ Total Users</span>
            <span>99.9% Avg Uptime</span>
            <span style={{ color: 'rgba(0,255,136,0.5)' }}>Updated: Live</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
