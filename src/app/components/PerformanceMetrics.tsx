import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { performanceStats, lightscoreMetrics } from '../data/portfolio';
import { TrendingUp, Shield, Zap, Globe } from 'lucide-react';

function AnimatedNumber({ target, suffix = '', duration = 2000, start = false, decimals = 0 }: {
  target: number;
  suffix?: string;
  duration?: number;
  start?: boolean;
  decimals?: number;
}) {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      const current = eased * target;
      setVal(current);
      if (t < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, start]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return <>{display}{suffix}</>;
}

function ScoreRing({ score, label, color, delay, start }: {
  score: number;
  label: string;
  color: string;
  delay: number;
  start: boolean;
}) {
  const size = 100;
  const strokeW = 4;
  const r = (size - strokeW) / 2;
  const circumference = 2 * Math.PI * r;
  const [progress, setProgress] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const dur = 1500;
    const animate = (now: number) => {
      const t = Math.min((now - startTime) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * score);
      if (t < 1) raf.current = requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => {
      raf.current = requestAnimationFrame(animate);
    }, delay * 1000);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf.current); };
  }, [score, delay, start]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeW}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeW}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color})`, transition: 'stroke-dashoffset 0.05s linear' }}
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          style={{ transform: 'rotate(90deg)', transformOrigin: `${size / 2}px ${size / 2}px`, fontFamily: 'JetBrains Mono, monospace', fontSize: '20px', fontWeight: 700 }}
        >
          {Math.round(progress)}
        </text>
      </svg>
      <span className="text-[10px] tracking-widest text-gray-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
        {label.toUpperCase()}
      </span>
    </div>
  );
}

export function PerformanceMetrics() {
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

  const statConfig = [
    { icon: Zap, label: 'Avg Load Time', value: 1.3, unit: 's', decimals: 1, color: '#00ff88', desc: 'Sub-2s on all projects' },
    { icon: TrendingUp, label: 'Avg Uptime', value: 99.9, unit: '%', decimals: 1, color: '#3b82f6', desc: 'High availability systems' },
    { icon: Globe, label: 'API Response', value: 120, unit: 'ms', decimals: 0, color: '#a78bfa', desc: 'Average response time' },
    { icon: Shield, label: 'Systems Deployed', value: 10, unit: '+', decimals: 0, color: '#f59e0b', desc: 'Production systems' },
    { icon: TrendingUp, label: 'Total Users', value: 12700, unit: '', decimals: 0, color: '#00ff88', desc: 'Across all platforms' },
    { icon: Zap, label: 'Code Commits', value: 2400, unit: '+', decimals: 0, color: '#3b82f6', desc: 'GitHub contributions' },
  ];

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: '#000' }}
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
            MODULE_04 — PERFORMANCE
          </div>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Real Performance Metrics
          </h2>
          <p className="mt-3 max-w-lg" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            Numbers that matter. Every system is optimized for speed, reliability, and scale.
          </p>
        </motion.div>

        {/* Big metric counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {statConfig.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-5 text-center"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                <Icon size={14} style={{ color: stat.color, margin: '0 auto 8px' }} />
                <div style={{ fontSize: '28px', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
                  <AnimatedNumber
                    target={stat.value}
                    suffix={stat.unit}
                    decimals={stat.decimals}
                    start={inView}
                    duration={1800}
                  />
                </div>
                <div className="text-[10px] text-gray-600 mt-2 leading-tight">{stat.label}</div>
                <div className="text-[9px] text-gray-700 mt-1">{stat.desc}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Lighthouse scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="p-6"
            style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="px-3 py-1 text-[10px] tracking-widest"
                style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88' }}
              >
                LIGHTHOUSE AUDIT
              </div>
              <span className="text-[11px] text-gray-600">Average scores across all projects</span>
            </div>
            <div className="flex justify-around flex-wrap gap-6">
              {lightscoreMetrics.map((m, i) => (
                <ScoreRing
                  key={m.label}
                  score={m.score}
                  label={m.label}
                  color={m.color}
                  delay={i * 0.2}
                  start={inView}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
