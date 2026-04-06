import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { testimonials, clients } from '../../data/portfolio';
import { Star, Quote } from 'lucide-react';

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.07) {
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

const avatarGradients = [
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #ec4899, #f43f5e)',
  'linear-gradient(135deg, #f59e0b, #f97316)',
  'linear-gradient(135deg, #10b981, #06b6d4)',
  'linear-gradient(135deg, #3b82f6, #6366f1)',
];

const statItems = [
  { value: '100%', label: 'Completion Rate' },
  { value: '5.0★', label: 'Avg. Client Rating' },
  { value: '<24h', label: 'Response Time' },
  { value: '10+', label: 'Happy Clients' },
];

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

export function NormalTestimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-28 sm:py-36 relative overflow-hidden"
      style={{ background: '#07070a', fontFamily: 'Inter, sans-serif' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionTag label="Client Testimonials" />
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            What Clients Say
          </h2>
          <p
            className="mt-5 mx-auto max-w-lg"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.8 }}
          >
            Don't just take my word for it — here's what the people I've worked with have to say.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.65 }}
              className="p-7 rounded-2xl flex flex-col relative overflow-hidden group transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              {/* Decorative corner gradient */}
              <div
                className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 100% 0%, ${avatarGradients[i % avatarGradients.length].split(',')[1]?.trim()?.replace(')', '')?.replace(')', '0.06)')} 0%, transparent 70%)`,
                  filter: 'blur(4px)',
                }}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={13} style={{ color: '#fbbf24' }} fill="#fbbf24" />
                ))}
              </div>

              {/* Quote mark */}
              <Quote size={22} style={{ color: 'rgba(255,255,255,0.08)', marginBottom: '10px' }} />

              {/* Text */}
              <p
                className="flex-1 mb-6"
                style={{ fontSize: '14px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.85, fontStyle: 'italic' }}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: avatarGradients[i % avatarGradients.length] }}
                >
                  <span style={{ color: '#fff', fontSize: '13px', fontWeight: 800 }}>{t.avatar}</span>
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginTop: '1px' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.42 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {statItems.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.01em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Clients / Brands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.58 }}
        >
          <p
            className="text-center mb-8"
            style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.14em', textTransform: 'uppercase' }}
          >
            Worked with companies & organizations including
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {clients.map((client, i) => (
              <motion.div
                key={client}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.62 + i * 0.04 }}
                className="px-5 py-2.5 rounded-xl transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.38)',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.38)';
                }}
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
