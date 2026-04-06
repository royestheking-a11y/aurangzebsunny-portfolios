import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { servicePackages } from '../../data/portfolio';
import { Check, Sparkles, MessageCircle, ChevronDown, ChevronUp, Shield, FileText, Rocket } from 'lucide-react';

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

const packageBestFor: Record<string, string> = {
  Starter: 'Landing pages, portfolios, small business websites',
  Professional: 'Web apps, SaaS products, e-commerce, dashboards',
  Enterprise: 'Complex systems, microservices, large-scale platforms',
};

const faqs = [
  {
    q: 'How long does a project take?',
    a: 'Starter projects: 2–3 weeks. Professional apps: 4–8 weeks. Enterprise systems: 2–6 months depending on complexity.',
  },
  {
    q: 'Do I own the code after delivery?',
    a: 'Yes, 100%. You get full source code, Git repository access, and complete ownership. No lock-in, ever.',
  },
  {
    q: 'What happens if something breaks after delivery?',
    a: 'Every package includes a support period. Any bugs related to my work are fixed for free during that window.',
  },
  {
    q: 'Can I request changes during development?',
    a: 'Absolutely. Each package includes revision rounds, and I do regular check-ins so we stay perfectly aligned.',
  },
];

const guarantees = [
  { icon: Shield, label: 'Full Code Ownership', desc: 'You own 100% of the source code' },
  { icon: FileText, label: 'Clean Documentation', desc: 'Detailed docs so you understand your system' },
  { icon: Rocket, label: 'Deployment Included', desc: 'I handle getting your app live on the internet' },
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

export function NormalServices({ onContact }: { onContact: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-28 sm:py-36 relative"
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
          <SectionTag label="Transparent Pricing" />
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            Pick the Right Package
          </h2>
          <p
            className="mt-5 mx-auto max-w-lg"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.8 }}
          >
            No hidden fees, no surprise invoices. Everything defined upfront so you know exactly what you're getting.
          </p>
        </motion.div>

        {/* Packages */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {servicePackages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.65 }}
              className="relative rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: pkg.highlight
                  ? 'linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%)'
                  : 'rgba(255,255,255,0.03)',
                border: pkg.highlight
                  ? '1px solid rgba(255,255,255,0.22)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: pkg.highlight ? '0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.4)' : 'none',
              }}
            >
              {/* Most popular banner */}
              {pkg.highlight && (
                <div
                  className="flex items-center justify-center gap-1.5 py-2.5 text-xs"
                  style={{
                    background: '#fff',
                    color: '#000',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                  }}
                >
                  <Sparkles size={11} />
                  MOST POPULAR
                </div>
              )}

              <div className={`p-7 flex flex-col flex-1 ${pkg.highlight ? '' : ''}`}>
                {/* Package label */}
                <div className="mb-5">
                  <div
                    style={{
                      fontSize: '10.5px',
                      color: 'rgba(255,255,255,0.32)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '5px',
                    }}
                  >
                    {pkg.name} Plan
                  </div>
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: '#fff',
                      letterSpacing: '-0.03em',
                      marginBottom: '8px',
                    }}
                  >
                    {pkg.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65 }}>
                    {pkg.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-1">
                  <span
                    style={{
                      fontSize: '42px',
                      fontWeight: 800,
                      color: '#fff',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    {pkg.price}
                  </span>
                  {pkg.price !== 'Custom' && (
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.32)', marginLeft: '7px' }}>
                      / {pkg.period}
                    </span>
                  )}
                </div>
                <div
                  style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', marginBottom: '22px', fontStyle: 'italic', lineHeight: 1.5 }}
                >
                  Best for: {packageBestFor[pkg.name]}
                </div>

                {/* Divider */}
                <div className="mb-6" style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />

                {/* Features */}
                <div className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: pkg.highlight ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)',
                          border: pkg.highlight ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        <Check size={10} style={{ color: pkg.highlight ? '#fff' : 'rgba(255,255,255,0.55)' }} />
                      </div>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.55 }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: pkg.highlight ? '0 6px 28px rgba(255,255,255,0.2)' : '0 4px 16px rgba(255,255,255,0.05)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onContact}
                  className="w-full py-3.5 rounded-xl text-sm"
                  style={{
                    background: pkg.highlight ? '#fff' : 'rgba(255,255,255,0.07)',
                    color: pkg.highlight ? '#000' : 'rgba(255,255,255,0.72)',
                    fontWeight: 700,
                    border: pkg.highlight ? 'none' : '1px solid rgba(255,255,255,0.1)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {pkg.price === 'Custom' ? 'Get a Free Quote →' : 'Get Started →'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="grid sm:grid-cols-3 gap-4 mb-16"
        >
          {guarantees.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                <Icon size={17} style={{ color: 'rgba(255,255,255,0.65)' }} />
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                  {label}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', marginTop: '2px' }}>{desc}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3
            className="mb-8"
            style={{ fontSize: '22px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}
          >
            Common Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: openFaq === i ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${openFaq === i ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span style={{ fontSize: '14px', fontWeight: 600, color: openFaq === i ? '#fff' : 'rgba(255,255,255,0.75)' }}>
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 ml-4 transition-transform duration-300" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>
                    {openFaq === i ? (
                      <ChevronUp size={16} style={{ color: 'rgba(255,255,255,0.5)' }} />
                    ) : (
                      <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 pb-5"
                        style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div
            className="mt-8 p-7 rounded-2xl flex flex-col sm:flex-row items-center gap-6"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            >
              <MessageCircle size={20} style={{ color: 'rgba(255,255,255,0.55)' }} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '5px', letterSpacing: '-0.02em' }}>
                Still have questions?
              </div>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65 }}>
                Every project is unique. Let's talk about your specific needs and find the right solution together.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 6px 24px rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onContact}
              className="flex-shrink-0 px-6 py-3 rounded-xl text-sm"
              style={{ background: '#fff', color: '#000', fontWeight: 700 }}
            >
              Chat with me →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
