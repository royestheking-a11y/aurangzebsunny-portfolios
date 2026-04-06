import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ChevronRight, RotateCcw, Check } from 'lucide-react';

const PROJECT_TYPES = [
  { id: 'landing', label: 'Landing Page', base: 500, desc: 'Marketing site / portfolio' },
  { id: 'webapp', label: 'Web Application', base: 2000, desc: 'Full-stack SaaS / dashboard' },
  { id: 'ecommerce', label: 'E-commerce', base: 3000, desc: 'Shop with payments' },
  { id: 'api', label: 'API / Backend', base: 1500, desc: 'REST API / microservice' },
  { id: 'mobile', label: 'Mobile App', base: 4000, desc: 'React Native / cross-platform' },
];

const FEATURES = [
  { id: 'auth', label: 'Authentication System', cost: 300, desc: 'Login, register, JWT' },
  { id: 'payment', label: 'Payment Integration', cost: 500, desc: 'Stripe / PayPal' },
  { id: 'admin', label: 'Admin Dashboard', cost: 600, desc: 'Management panel' },
  { id: 'api', label: 'REST API', cost: 400, desc: '3rd party integrations' },
  { id: 'realtime', label: 'Real-time Features', cost: 700, desc: 'WebSockets / live updates' },
  { id: 'ai', label: 'AI Integration', cost: 900, desc: 'OpenAI / ML features' },
  { id: 'email', label: 'Email System', cost: 200, desc: 'Transactional emails' },
  { id: 'analytics', label: 'Analytics Dashboard', cost: 500, desc: 'Custom metrics & charts' },
];

const TIMELINES = [
  { id: 'rush', label: 'Rush (1–2 weeks)', multiplier: 1.5, desc: '+50% for priority delivery' },
  { id: 'standard', label: 'Standard (3–4 weeks)', multiplier: 1, desc: 'Recommended timeline' },
  { id: 'flexible', label: 'Flexible (6–8 weeks)', multiplier: 0.9, desc: '10% discount' },
];

export function ProjectEstimator({ onContact }: { onContact: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string | null>('standard');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const baseCost = PROJECT_TYPES.find((t) => t.id === projectType)?.base || 0;
  const featureCost = selectedFeatures.reduce((sum, f) => {
    return sum + (FEATURES.find((feat) => feat.id === f)?.cost || 0);
  }, 0);
  const multiplier = TIMELINES.find((t) => t.id === timeline)?.multiplier || 1;
  const totalMin = Math.round((baseCost + featureCost) * multiplier);
  const totalMax = Math.round(totalMin * 1.4);

  const reset = () => {
    setStep(0);
    setProjectType(null);
    setSelectedFeatures([]);
    setTimeline('standard');
    setShowResult(false);
  };

  const steps = ['Project Type', 'Features', 'Timeline', 'Estimate'];

  return (
    <section
      id="estimator"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: '#000' }}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="text-[11px] tracking-widest mb-3" style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>
            MODULE_10 — PROJECT ESTIMATOR
          </div>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Instant Cost Estimator
          </h2>
          <p className="mt-3 mx-auto max-w-lg" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            Get an instant estimate for your project. Select your requirements and see the cost breakdown.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          {/* Progress steps */}
          <div
            className="px-6 py-4 flex items-center gap-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className="flex items-center gap-2 text-[10px] tracking-wider cursor-pointer"
                  onClick={() => i < step && setStep(i)}
                  style={{ color: i === step ? '#00ff88' : i < step ? 'rgba(0,255,136,0.5)' : 'rgba(255,255,255,0.2)' }}
                >
                  <div
                    className="w-5 h-5 flex items-center justify-center text-[9px]"
                    style={{
                      background: i === step ? '#00ff88' : i < step ? 'rgba(0,255,136,0.2)' : 'rgba(255,255,255,0.05)',
                      color: i === step ? '#000' : i < step ? '#00ff88' : 'rgba(255,255,255,0.3)',
                      border: `1px solid ${i === step ? '#00ff88' : i < step ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    {i < step ? <Check size={9} /> : i + 1}
                  </div>
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-8 h-[1px] mx-2" style={{ background: 'rgba(255,255,255,0.1)' }} />
                )}
              </div>
            ))}

            <button
              onClick={reset}
              className="ml-auto text-[10px] flex items-center gap-1.5 text-gray-600 hover:text-white transition-colors"
            >
              <RotateCcw size={10} />
              Reset
            </button>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Step 0: Project Type */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[11px] text-gray-500 mb-4 tracking-widest">
                    01 / SELECT PROJECT TYPE
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {PROJECT_TYPES.map((pt) => (
                      <button
                        key={pt.id}
                        onClick={() => {
                          setProjectType(pt.id);
                          setTimeout(() => setStep(1), 200);
                        }}
                        className="p-4 text-left transition-all"
                        style={{
                          background: projectType === pt.id ? 'rgba(0,255,136,0.06)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${projectType === pt.id ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.07)'}`,
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm">{pt.label}</span>
                          <span style={{ color: '#00ff88', fontSize: '12px' }}>from ${pt.base}</span>
                        </div>
                        <div className="text-[11px] text-gray-600">{pt.desc}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 1: Features */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[11px] text-gray-500 mb-4 tracking-widest">
                    02 / SELECT FEATURES (optional)
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {FEATURES.map((f) => {
                      const selected = selectedFeatures.includes(f.id);
                      return (
                        <button
                          key={f.id}
                          onClick={() => toggleFeature(f.id)}
                          className="p-4 text-left transition-all"
                          style={{
                            background: selected ? 'rgba(0,255,136,0.06)' : 'rgba(255,255,255,0.02)',
                            border: `1px solid ${selected ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.07)'}`,
                          }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 flex items-center justify-center"
                                style={{
                                  background: selected ? '#00ff88' : 'transparent',
                                  border: `1px solid ${selected ? '#00ff88' : 'rgba(255,255,255,0.2)'}`,
                                }}
                              >
                                {selected && <Check size={9} style={{ color: '#000' }} />}
                              </div>
                              <span className="text-white text-[12px]">{f.label}</span>
                            </div>
                            <span style={{ color: selected ? '#00ff88' : '#555', fontSize: '11px' }}>+${f.cost}</span>
                          </div>
                          <div className="text-[10px] text-gray-600 ml-6">{f.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 text-[12px] tracking-wider flex items-center gap-2"
                    style={{ background: '#00ff88', color: '#000', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    CONTINUE <ChevronRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* Step 2: Timeline */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[11px] text-gray-500 mb-4 tracking-widest">
                    03 / SELECT TIMELINE
                  </div>
                  <div className="space-y-3 mb-6">
                    {TIMELINES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTimeline(t.id);
                          setTimeout(() => setStep(3), 200);
                        }}
                        className="w-full p-4 text-left transition-all"
                        style={{
                          background: timeline === t.id ? 'rgba(0,255,136,0.06)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${timeline === t.id ? 'rgba(0,255,136,0.3)' : 'rgba(255,255,255,0.07)'}`,
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm">{t.label}</span>
                          <span className="text-[11px]" style={{ color: t.multiplier > 1 ? '#ef4444' : t.multiplier < 1 ? '#00ff88' : 'rgba(255,255,255,0.3)' }}>
                            {t.desc}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Result */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[11px] text-gray-500 mb-6 tracking-widest">
                    04 / COST ESTIMATE
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-2 mb-6 p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex justify-between text-[12px]">
                      <span className="text-gray-500">Base ({PROJECT_TYPES.find((t) => t.id === projectType)?.label})</span>
                      <span className="text-white">${baseCost.toLocaleString()}</span>
                    </div>
                    {selectedFeatures.map((f) => {
                      const feat = FEATURES.find((feat) => feat.id === f);
                      return (
                        <div key={f} className="flex justify-between text-[12px]">
                          <span className="text-gray-500">+ {feat?.label}</span>
                          <span className="text-white">${feat?.cost.toLocaleString()}</span>
                        </div>
                      );
                    })}
                    {timeline !== 'standard' && (
                      <div className="flex justify-between text-[12px]">
                        <span className="text-gray-500">Timeline adjustment</span>
                        <span style={{ color: multiplier > 1 ? '#ef4444' : '#00ff88' }}>
                          {multiplier > 1 ? `+${((multiplier - 1) * 100).toFixed(0)}%` : `-${((1 - multiplier) * 100).toFixed(0)}%`}
                        </span>
                      </div>
                    )}
                    <div className="h-[1px] bg-white/10 my-2" />
                    <div className="flex justify-between">
                      <span className="text-white text-sm">Estimated Range</span>
                      <span style={{ color: '#00ff88', fontSize: '18px', fontWeight: 700 }}>
                        ${totalMin.toLocaleString()} – ${totalMax.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onContact}
                      className="flex-1 py-3 text-[12px] tracking-wider"
                      style={{ background: '#00ff88', color: '#000', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      DISCUSS PROJECT →
                    </motion.button>
                    <button
                      onClick={reset}
                      className="px-4 py-3 text-[12px] text-gray-500 hover:text-white transition-colors"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      RESET
                    </button>
                  </div>

                  <p className="mt-3 text-[10px] text-gray-600 text-center">
                    * Final price depends on specific requirements. This is a rough estimate only.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
