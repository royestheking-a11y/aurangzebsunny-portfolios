import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { clients, testimonials } from '../data/portfolio';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export function ClientTrust() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((t) => (t + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="trust"
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
          className="mb-12 text-center"
        >
          <div className="text-[11px] tracking-widest mb-3" style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>
            MODULE_08 — CLIENT TRUST
          </div>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Trusted by Industry Leaders
          </h2>
          <p className="mt-3 mx-auto max-w-lg" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            Collaborated with leading organizations across multiple industries.
          </p>
        </motion.div>

        {/* Client logo wall */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 overflow-hidden relative"
        >
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, #000, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, #000, transparent)' }} />

          <motion.div
            className="flex gap-8"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            style={{ width: 'max-content' }}
          >
            {[...clients, ...clients].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-8 py-4 flex items-center justify-center"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.01)',
                  minWidth: '160px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                {client}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="relative p-8"
            style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            <Quote size={24} style={{ color: 'rgba(0,255,136,0.2)', marginBottom: '16px' }} />

            <div className="relative min-h-[120px]">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: i === activeTestimonial ? 1 : 0,
                    y: i === activeTestimonial ? 0 : 10,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  {i === activeTestimonial && (
                    <>
                      <p
                        className="mb-6 max-w-2xl"
                        style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}
                      >
                        "{t.text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 flex items-center justify-center"
                          style={{
                            background: 'rgba(0,255,136,0.1)',
                            border: '1px solid rgba(0,255,136,0.3)',
                            color: '#00ff88',
                            fontSize: '13px',
                            fontWeight: 700,
                          }}
                        >
                          {t.avatar}
                        </div>
                        <div>
                          <div className="text-white font-medium">{t.name}</div>
                          <div className="text-[11px] text-gray-500">{t.role}</div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => setActiveTestimonial((t) => (t - 1 + testimonials.length) % testimonials.length)}
                className="p-2 transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <ChevronLeft size={14} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className="transition-all"
                    style={{
                      width: i === activeTestimonial ? '24px' : '6px',
                      height: '6px',
                      background: i === activeTestimonial ? '#00ff88' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveTestimonial((t) => (t + 1) % testimonials.length)}
                className="p-2 transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}