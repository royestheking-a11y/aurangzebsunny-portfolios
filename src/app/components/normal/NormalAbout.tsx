import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { personalInfo } from '../../data/portfolio';
import { Briefcase, Code2, Globe, Zap, Users, Award } from 'lucide-react';

const highlights = [
  {
    icon: Briefcase,
    title: 'Business-Focused',
    desc: "I understand your goals and build solutions that drive real, measurable results.",
  },
  {
    icon: Code2,
    title: 'Clean Architecture',
    desc: 'Best practices, clean code, documentation, and room to grow from day one.',
  },
  {
    icon: Globe,
    title: 'End-to-End Delivery',
    desc: 'From initial concept to deployment — I handle the entire product lifecycle.',
  },
  {
    icon: Zap,
    title: 'Fast Turnaround',
    desc: 'Quick without compromising quality. Most projects delivered ahead of schedule.',
  },
  {
    icon: Users,
    title: 'Client-First',
    desc: 'Regular updates, transparent comms, and full ownership transferred at delivery.',
  },
  {
    icon: Award,
    title: 'Production-Grade',
    desc: 'Systems serving thousands of real users with 99.9% uptime — every single time.',
  },
];

const journey = [
  { year: '2020', event: 'Started programming journey with web development fundamentals' },
  { year: '2021', event: 'Delivered first freelance project — a full e-commerce website' },
  { year: '2022', event: 'Built first enterprise CRM system for a business client' },
  { year: '2023', event: 'Expanded into SaaS platforms and complex system architecture' },
  { year: '2024', event: 'Launched automation engine serving 1,800+ active users' },
  { year: '2025', event: 'AI-powered tools and multi-platform systems in production' },
  { year: '2026', event: 'Now building Pengu — a social platform for 3,200+ developers' },
];

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

const SectionTag = ({ label }: { label: string }) => (
  <div
    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full mb-6"
    style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.09)',
      fontSize: '11px',
      color: 'rgba(255,255,255,0.4)',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    }}
  >
    {label}
  </div>
);

export function NormalAbout({ onNavigate }: { onNavigate: (s: string) => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-28 sm:py-36 relative"
      style={{
        background: '#000',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionTag label="About Me" />
          <div className="max-w-4xl">
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
              }}
            >
              A Developer Who Thinks{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Like a Business Owner
              </span>
            </h2>
            <p
              className="mt-6 max-w-2xl"
              style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.85 }}
            >
              Hi, I'm <strong style={{ color: '#fff' }}>Aurangzeb Sunny</strong> — a Full-Stack Developer
              from <strong style={{ color: '#fff' }}>Bangladesh</strong> with {personalInfo.experience} years of
              experience building web applications that actually work in the real world. I specialize in turning
              complex ideas into simple, powerful digital products that businesses rely on daily.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20">
          {/* Left — Highlights Grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="mb-7"
              style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              Why clients choose me
            </motion.h3>
            <div className="grid sm:grid-cols-2 gap-3.5">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.55 }}
                  className="p-5 rounded-2xl group transition-all duration-300 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3.5"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <h.icon size={16} style={{ color: 'rgba(255,255,255,0.75)' }} />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '7px', letterSpacing: '-0.01em' }}>
                    {h.title}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65 }}>
                    {h.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — Journey Timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mb-7"
              style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              My journey so far
            </motion.h3>

            <div className="relative">
              {/* Timeline track */}
              <div
                className="absolute left-[15px] top-2 bottom-2 w-px"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.03))' }}
              />

              <div className="space-y-5">
                {journey.map((item, i) => {
                  const isLast = i === journey.length - 1;
                  return (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -18 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.32 + i * 0.07 }}
                      className="flex items-start gap-5 pl-10 relative"
                    >
                      {/* Dot */}
                      <div
                        className="absolute left-[10px] top-[5px] w-[11px] h-[11px] rounded-full"
                        style={{
                          background: isLast ? '#fff' : 'rgba(255,255,255,0.3)',
                          boxShadow: isLast ? '0 0 0 3px rgba(255,255,255,0.08), 0 0 14px rgba(255,255,255,0.2)' : 'none',
                        }}
                      />

                      <div
                        className="flex-shrink-0 px-2.5 py-0.5 rounded-lg text-xs"
                        style={{
                          background: isLast ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                          color: isLast ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                          fontWeight: 700,
                          minWidth: '44px',
                          textAlign: 'center',
                          fontSize: '11px',
                        }}
                      >
                        {item.year}
                      </div>
                      <p style={{ fontSize: '13.5px', color: isLast ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.48)', lineHeight: 1.65 }}>
                        {item.event}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-10 p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.75, marginBottom: '18px' }}>
                Ready to build something great? Let's discuss your project and turn your vision into reality.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => onNavigate('services')}
                  className="px-5 py-2.5 rounded-xl text-sm transition-all"
                  style={{ background: '#fff', color: '#000', fontWeight: 700 }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  View Services
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 rounded-xl text-sm transition-all"
                  style={{
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.7)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                  }}
                >
                  Get in Touch
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
