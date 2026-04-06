import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { personalInfo } from '../../data/portfolio';
import { Github, Linkedin, MessageCircle, ArrowRight, Star, CheckCircle, Zap } from 'lucide-react';

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '12K+', label: 'Users Served' },
  { value: '99.9%', label: 'Uptime SLA' },
];

const trustBadges = [
  'Full-Stack Development',
  'SaaS Platforms',
  'E-commerce',
  'AI-Powered Tools',
  'API Integration',
  'Cloud Deployment',
];

const workItems = [
  'Specializes in SaaS & E-commerce platforms',
  'Expert in React, Node.js, Laravel & Python',
  'Clean, documented, maintainable code',
];

export function NormalHero({ onNavigate }: { onNavigate: (s: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      size: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.4})`;
        ctx.fill();

        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const ro = new ResizeObserver(() => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
      style={{ background: '#000', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Deep radial glow at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% -5%, rgba(255,255,255,0.04) 0%, transparent 65%)',
        }}
      />
      {/* Subtle bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

          {/* ── Left Column ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-9"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: '#4ade80',
                  boxShadow: '0 0 0 3px rgba(74,222,128,0.15)',
                  animation: 'pulse 2s infinite',
                }}
              />
              <span style={{ color: '#4ade80', fontSize: '12.5px', fontWeight: 600, letterSpacing: '0.01em' }}>
                Available for new projects
              </span>
              <Zap size={12} style={{ color: '#4ade80', opacity: 0.8 }} />
            </motion.div>

            {/* Name Typing Overlay */}
            <div
              className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                color: '#fff',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.3)' }}>$</span>
              {Array.from(personalInfo.name).map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ color: '#fff' }}
              >
                _
              </motion.span>
            </div>

            {/* Main Headline */}
            <h1
              className="mb-7"
              style={{
                fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.02,
                letterSpacing: '-0.04em',
              }}
            >
              Aurangzeb Sunny —
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.45) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Full-Stack Developer
              </span>
              <br />
              & UI/UX Designer.
            </h1>

            {/* Sub-headline */}
            <p
              className="mb-5"
              style={{ fontSize: '18px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.7, maxWidth: '520px' }}
            >
              Full-Stack Developer & System Architect based in Bangladesh —
              turning your ideas into robust, production-ready web applications.
            </p>

            {/* Subtle tagline */}
            <div
              className="mb-9 pl-4"
              style={{
                borderLeft: '2px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.32)',
                fontSize: '13.5px',
                lineHeight: 1.75,
                maxWidth: '440px',
              }}
            >
              {personalInfo.tagline}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-10">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-3.5 py-1.5 rounded-full text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '0.01em',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(255,255,255,0.18)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('projects')}
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm"
                style={{
                  background: '#fff',
                  color: '#000',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  boxShadow: '0 4px 16px rgba(255,255,255,0.12)',
                }}
              >
                View My Work
                <ArrowRight size={15} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl text-sm transition-all"
                style={{
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                Get In Touch
              </motion.button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              {[
                { icon: Github, href: personalInfo.github, label: 'GitHub' },
                { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: MessageCircle, href: personalInfo.whatsapp, label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm transition-all duration-200 group"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right Column ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.09 }}
                  className="p-5 rounded-2xl relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(1.9rem, 4.5vw, 2.5rem)',
                      fontWeight: 800,
                      color: '#fff',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="mt-1.5"
                    style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.01em' }}
                  >
                    {stat.label}
                  </div>
                  {/* Top-left corner accent */}
                  <div
                    className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 0 0, rgba(255,255,255,0.05) 0%, transparent 70%)',
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: '#fff',
                    boxShadow: '0 0 0 3px rgba(255,255,255,0.1)',
                  }}
                >
                  <span style={{ color: '#000', fontSize: '17px', fontWeight: 800, letterSpacing: '-0.02em' }}>AS</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div style={{ color: '#fff', fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {personalInfo.name}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: '12.5px', marginTop: '2px' }}>
                    {personalInfo.title} · {personalInfo.location}
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={12} style={{ color: '#fbbf24' }} fill="#fbbf24" />
                    ))}
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', marginLeft: '5px' }}>
                      5.0 · 10+ reviews
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-5 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                {workItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle size={13} style={{ color: '#4ade80', marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Email quick CTA */}
            <motion.a
              href={`mailto:${personalInfo.email}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', marginBottom: '2px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Email directly
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}>
                  {personalInfo.email}
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 group-hover:bg-white group-hover:text-black"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '16px',
                }}
              >
                →
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <div
          className="w-px h-8 rounded-full"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)' }}
        />
        <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '10px', letterSpacing: '0.18em' }}>SCROLL</span>
      </motion.div>
    </section>
  );
}
