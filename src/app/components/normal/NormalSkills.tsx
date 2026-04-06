import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { skills } from '../../data/portfolio';
import { Layers, Server, Database, Cloud, CreditCard, Wrench } from 'lucide-react';

const categoryIcons: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Frontend: Layers,
  Backend: Server,
  Database: Database,
  DevOps: Cloud,
  Payments: CreditCard,
  Tools: Wrench,
};

const categoryDescriptions: Record<string, string> = {
  Frontend: 'Beautiful, fast interfaces that work on every device.',
  Backend: 'Powerful APIs and business logic that scale with growth.',
  Database: 'Efficient data structures for speed and reliability.',
  DevOps: 'Cloud infrastructure with CI/CD pipelines and zero downtime.',
  Payments: 'Secure payment systems and financial transaction handling.',
  Tools: 'Professional workflow with industry-standard tooling.',
};

const categoryColors: Record<string, string> = {
  Frontend: 'rgba(147,197,253,0.7)',
  Backend: 'rgba(167,243,208,0.7)',
  Database: 'rgba(253,186,116,0.7)',
  DevOps: 'rgba(196,181,253,0.7)',
  Payments: 'rgba(252,165,165,0.7)',
  Tools: 'rgba(253,224,71,0.7)',
};

const whyMatters = [
  { num: '01', label: 'Full-Stack Capability', desc: 'One developer for both frontend & backend — less coordination, lower cost, faster delivery.' },
  { num: '02', label: 'Modern Tech Stack', desc: 'The same tools that power Airbnb, Shopify, and Netflix.' },
  { num: '03', label: 'Cloud-Native', desc: 'Built for cloud deployment with automatic scaling and 99.9% uptime.' },
  { num: '04', label: 'Secure by Default', desc: 'Authentication, data protection, and PCI-compliant payment handling.' },
];

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

export function NormalSkills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 sm:py-36 relative"
      style={{ background: '#000', fontFamily: 'Inter, sans-serif' }}
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
          className="mb-16"
        >
          <SectionTag label="Technology & Expertise" />
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            Tools I Use to{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Build Your Product
            </span>
          </h2>
          <p
            className="mt-5 max-w-xl"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.8 }}
          >
            I work with the most in-demand, battle-tested technologies — no experimental tools, no dead-end frameworks.
            Your product is built on foundations that last.
          </p>
        </motion.div>

        {/* Click hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="mb-7"
          style={{ fontSize: '12px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.05em' }}
        >
          Click a category to highlight
        </motion.p>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {skills.map((skillGroup, i) => {
            const Icon = categoryIcons[skillGroup.category] || Layers;
            const isActive = activeCategory === skillGroup.category;
            const accentColor = categoryColors[skillGroup.category] || 'rgba(255,255,255,0.7)';

            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 22 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                onClick={() => setActiveCategory(isActive ? null : skillGroup.category)}
                className="p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                style={{
                  background: isActive
                    ? 'rgba(255,255,255,0.07)'
                    : 'rgba(255,255,255,0.03)',
                  border: isActive
                    ? '1px solid rgba(255,255,255,0.18)'
                    : '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  }
                }}
              >
                {/* Active glow */}
                {isActive && (
                  <div
                    className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 100% 0%, ${accentColor.replace('0.7', '0.06')} 0%, transparent 70%)`,
                    }}
                  />
                )}

                {/* Icon + Category */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)',
                    }}
                  >
                    <Icon size={18} style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.55)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                      {skillGroup.category}
                    </div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>
                      {skillGroup.items.length} technologies
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, marginBottom: '16px' }}>
                  {categoryDescriptions[skillGroup.category]}
                </p>

                {/* Skills chips */}
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-lg"
                      style={{
                        background: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                        color: isActive ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.4)',
                        border: `1px solid ${isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}`,
                        fontSize: '11.5px',
                        transition: 'all 0.2s',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why It Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div
            className="mb-10 pb-6"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <h3
              style={{ fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', textAlign: 'center' }}
            >
              What this means for your project
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyMatters.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="p-5 rounded-2xl relative overflow-hidden group"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'rgba(255,255,255,0.15)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
                  {item.num}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                  {item.label}
                </div>
                <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
