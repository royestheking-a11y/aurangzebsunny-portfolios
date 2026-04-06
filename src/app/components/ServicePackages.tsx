import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { servicePackages } from '../data/portfolio';
import { Check, Zap } from 'lucide-react';

export function ServicePackages({ onContact }: { onContact: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
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
          className="mb-12 text-center"
        >
          <div className="text-[11px] tracking-widest mb-3" style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>
            MODULE_09 — SERVICE PACKAGES
          </div>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Choose Your Package
          </h2>
          <p className="mt-3 mx-auto max-w-lg" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            Transparent pricing for premium engineering work. All packages include clean code, documentation, and post-delivery support.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {servicePackages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative"
              style={{
                background: pkg.highlight ? 'rgba(0,255,136,0.04)' : 'rgba(255,255,255,0.01)',
                border: `1px solid ${pkg.highlight ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.08)'}`,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {/* Popular badge */}
              {pkg.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] tracking-widest flex items-center gap-1.5"
                  style={{ background: '#00ff88', color: '#000', fontWeight: 700 }}
                >
                  <Zap size={10} />
                  MOST POPULAR
                </div>
              )}

              {/* Top accent */}
              <div className="h-[2px]" style={{ background: pkg.color, opacity: pkg.highlight ? 1 : 0.4 }} />

              <div className="p-6">
                {/* Plan name */}
                <div className="mb-6">
                  <div
                    className="text-[10px] tracking-widest mb-2"
                    style={{ color: pkg.color }}
                  >
                    PLAN_{pkg.name.toUpperCase()}
                  </div>
                  <h3
                    className="text-white mb-1"
                    style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}
                  >
                    {pkg.name}
                  </h3>
                  <p className="text-[12px] text-gray-500">{pkg.description}</p>
                </div>

                {/* Price */}
                <div
                  className="mb-6 pb-6"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <span
                    style={{
                      fontSize: '36px',
                      fontWeight: 700,
                      color: pkg.highlight ? '#00ff88' : '#fff',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    {pkg.price}
                  </span>
                  <span className="text-gray-600 text-[12px] ml-2">/ {pkg.period}</span>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check
                        size={12}
                        style={{ color: pkg.color, flexShrink: 0, marginTop: 2 }}
                      />
                      <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onContact}
                  className="w-full py-3 text-[12px] tracking-wider flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: pkg.highlight ? '#00ff88' : 'transparent',
                    color: pkg.highlight ? '#000' : 'rgba(255,255,255,0.6)',
                    border: `1px solid ${pkg.highlight ? '#00ff88' : 'rgba(255,255,255,0.15)'}`,
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: pkg.highlight ? 700 : 400,
                  }}
                >
                  {pkg.price === 'Custom' ? 'GET QUOTE →' : 'GET STARTED →'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-[11px] text-gray-600"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          All projects include source code ownership, Git repository, and deployment guide.
          <br />
          <span style={{ color: 'rgba(0,255,136,0.5)' }}>Custom requirements? Let's discuss →</span>
        </motion.div>
      </div>
    </section>
  );
}
