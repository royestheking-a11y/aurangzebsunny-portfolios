import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { personalInfo } from '../data/portfolio';
import { ArrowDown, Github, Linkedin, MessageCircle } from 'lucide-react';

const COMMANDS: Record<string, string[]> = {
  help: [
    '> Available commands:',
    '  projects    — View live production systems',
    '  skills      — Browse technology stack',
    '  architecture— System architecture diagrams',
    '  contact     — Send me a message',
    '  resume      — View/download resume',
    '  timeline    — Deployment history',
    '  whoami      — About Aurangzeb Sunny',
    '  clear       — Clear terminal',
    '  sudo hire   — 😏',
  ],
  projects: ['> Navigating to Projects Dashboard...', '> Loading production systems...'],
  skills: ['> Navigating to Skills Modules...', '> Loading installed packages...'],
  architecture: ['> Navigating to Architecture Visualizer...', '> Loading system diagrams...'],
  contact: ['> Navigating to Contact...', '> Opening communication channel...'],
  resume: ['> Navigating to Contact section...', '> Resume available for download...'],
  timeline: ['> Navigating to Deployment Timeline...', '> Loading commit history...'],
  whoami: [
    '> USER: Aurangzeb Sunny',
    '> ROLE: Full-Stack Engineer & System Architect',
    '> EXPERIENCE: 4+ Years',
    '> SYSTEMS BUILT: 10+',
    '> LOCATION: Bangladesh',
    '> STATUS: Available for Projects',
    '> SPECIALTIES: SaaS, Ecommerce, CRM, AI Tools, Automation',
  ],
  clear: [],
  'sudo hire': [
    '> Authenticating credentials...',
    '> Verifying engineering skills... ✓',
    '> Checking system architecture knowledge... ✓',
    '> Running background check... ✓',
    '',
    '██████████████████████████████████████',
    '  ACCESS GRANTED — Welcome aboard! 🚀  ',
    '  Contact: aurangzebsunnyy@gmail.com  ',
    '██████████████████████████████████████',
  ],
};

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error';
}

const METRICS = [
  { label: 'Experience', value: '4+', unit: 'Years' },
  { label: 'Systems Built', value: '10+', unit: 'Products' },
  { label: 'Total Users', value: '12K+', unit: 'Users' },
  { label: 'Uptime', value: '99.9%', unit: 'Average' },
];

export function HeroSection({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: '> System initialized. Type "help" for commands.', type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [blink, setBlink] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [...lines, { text: `$ ${cmd}`, type: 'input' }];

    if (trimmed === 'clear') {
      setLines([]);
      return;
    }

    const response = COMMANDS[trimmed];
    if (response) {
      response.forEach((l) => newLines.push({ text: l, type: 'output' }));
      // Navigate if needed
      if (['projects', 'skills', 'architecture', 'contact', 'resume', 'timeline'].includes(trimmed)) {
        setTimeout(() => onNavigate(trimmed === 'resume' ? 'contact' : trimmed), 600);
      }
    } else if (trimmed === '') {
      // do nothing
    } else {
      newLines.push({ text: `> Command not found: "${trimmed}". Type "help" for commands.`, type: 'error' });
    }
    setLines(newLines);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setHistory((h) => [input, ...h].slice(0, 50));
      setHistIdx(-1);
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(newIdx);
      if (history[newIdx]) setInput(history[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx]);
    }
  };

  // Particle canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let mouse = { x: width / 2, y: height / 2 };

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
    }));

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', handleMove);

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
        ctx.fillStyle = 'rgba(0,255,136,0.4)';
        ctx.fill();

        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,255,136,${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resizeObs = new ResizeObserver(() => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });
    resizeObs.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', handleMove);
      resizeObs.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-14 overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.5 }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,255,136,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — System Status */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-2 py-1 mb-6 text-[10px] sm:text-[11px] tracking-widest max-w-fit"
              style={{
                border: '1px solid rgba(0,255,136,0.3)',
                color: '#00ff88',
                background: 'rgba(0,255,136,0.05)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88', animation: 'pulse 2s infinite' }}
              />
              SYSTEM STATUS — ONLINE
            </div>

            {/* Name */}
            <h1
              className="mb-2"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
              title="Aurangzeb Sunny — Best Full-Stack Web Developer & UI/UX Designer in Bangladesh"
            >
              {Array.from(personalInfo.name).map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ color: '#00ff88' }}
              >
                _
              </motion.span>
            </h1>

            <div
              className="mb-6"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                color: '#00ff88',
                letterSpacing: '0.1em',
              }}
            >
              &gt; {personalInfo.title}
            </div>

            <p
              className="mb-8 max-w-md"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.8,
              }}
            >
              {personalInfo.tagline}
            </p>

            {/* System info table */}
            <div
              className="mb-8 p-4 space-y-2"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
              }}
            >
              {[
                ['Name', personalInfo.name],
                ['Role', personalInfo.title],
                ['Experience', `${personalInfo.experience} Years`],
                ['Systems Built', personalInfo.systemsBuilt],
                ['Location', personalInfo.location],
                ['Status', personalInfo.status],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-3">
                  <span style={{ color: 'rgba(255,255,255,0.3)', minWidth: '100px' }}>{k}:</span>
                  <span
                    style={{
                      color: k === 'Status' ? '#00ff88' : '#fff',
                      fontWeight: k === 'Name' ? 600 : 400,
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>

            {/* Metric badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {METRICS.map((m) => (
                <motion.div
                  key={m.label}
                  whileHover={{ scale: 1.03 }}
                  className="p-3 text-center"
                  style={{
                    background: 'rgba(0,255,136,0.04)',
                    border: '1px solid rgba(0,255,136,0.15)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  <div
                    className="text-xl"
                    style={{ color: '#00ff88', fontWeight: 700 }}
                  >
                    {m.value}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">{m.unit}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,255,136,0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('projects')}
                className="px-6 py-3 text-sm tracking-wider font-medium"
                style={{
                  background: '#00ff88',
                  color: '#000',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                VIEW PROJECTS →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 text-sm tracking-wider"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                HIRE ME
              </motion.button>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
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
                  className="flex items-center gap-1.5 text-[11px] transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(0,255,136,0.2)',
                boxShadow: '0 0 60px rgba(0,255,136,0.08)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#060606' }}
              >
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(0,255,136,0.6)' }} />
                <span className="ml-3 text-xs text-gray-600 tracking-wider">portfolio — bash — 80×24</span>
              </div>

              {/* Terminal body */}
              <div
                ref={terminalRef}
                className="p-4 space-y-1 overflow-y-auto"
                style={{ height: '360px', fontSize: '12px' }}
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      color:
                        line.type === 'input'
                          ? '#00ff88'
                          : line.type === 'error'
                          ? '#ef4444'
                          : 'rgba(255,255,255,0.7)',
                      whiteSpace: 'pre',
                      lineHeight: 1.6,
                    }}
                  >
                    {line.text || '\u00A0'}
                  </div>
                ))}

                {/* Input line */}
                <div className="flex items-center" style={{ color: '#00ff88' }}>
                  <span>$ </span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none ml-1"
                    style={{
                      color: '#00ff88',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '12px',
                      caretColor: '#00ff88',
                    }}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <span style={{ opacity: blink ? 1 : 0, color: '#00ff88' }}>█</span>
                </div>
              </div>

              {/* Terminal footer */}
              <div
                className="px-4 py-2 flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: '#060606' }}
              >
                <div className="flex gap-3 text-[10px] text-gray-700">
                  <span>try: <span style={{ color: 'rgba(0,255,136,0.5)' }}>help</span></span>
                  <span>try: <span style={{ color: 'rgba(0,255,136,0.5)' }}>whoami</span></span>
                  <span>try: <span style={{ color: 'rgba(0,255,136,0.5)' }}>sudo hire</span></span>
                </div>
                <div className="text-[10px]" style={{ color: 'rgba(0,255,136,0.4)' }}>
                  interactive
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span
          className="text-[10px] tracking-widest"
          style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'JetBrains Mono, monospace' }}
        >
          SCROLL
        </span>
        <ArrowDown size={14} style={{ color: 'rgba(255,255,255,0.2)' }} />
      </motion.div>
    </section>
  );
}
