import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { personalInfo } from '../../data/portfolio';
import {
  Mail, Github, Linkedin, MessageCircle, Send, CheckCircle, Clock, MapPin
} from 'lucide-react';

const RATE_LIMIT_MS = 60000;
const LS_KEY = 'portfolio_contact_normal';

function isRateLimited(): boolean {
  try {
    const data = localStorage.getItem(LS_KEY);
    if (!data) return false;
    const submissions: number[] = JSON.parse(data);
    return submissions.filter((t) => Date.now() - t < RATE_LIMIT_MS).length >= 3;
  } catch { return false; }
}

function recordSubmission() {
  try {
    const data = localStorage.getItem(LS_KEY);
    const submissions: number[] = data ? JSON.parse(data) : [];
    submissions.push(Date.now());
    localStorage.setItem(LS_KEY, JSON.stringify(submissions.slice(-10)));
  } catch { /**/ }
}

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

const projectTypes = [
  'Website / Landing Page',
  'Web Application',
  'E-commerce Store',
  'Admin Dashboard',
  'API / Backend',
  'AI-Powered Tool',
  'Automation System',
  'Other',
];

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  fontSize: '14px',
  borderRadius: '12px',
  outline: 'none',
  width: '100%',
  padding: '12px 16px',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.2s',
};

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

export function NormalContact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);

  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email address';
    if (!form.message.trim() || form.message.length < 10)
      e.message = 'Please describe your project (at least 10 characters)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (isRateLimited()) { setStatus('error'); return; }
    
    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: personalInfo.web3formsAccessKey,
          name: form.name,
          email: form.email,
          projectType: form.projectType,
          budget: form.budget,
          message: form.message,
          from_name: 'Portfolio (Normal Mode)',
        }),
      });

      const result = await response.json();

      if (result.success) {
        recordSubmission();
        const saved = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        saved.push({ ...form, date: new Date().toISOString() });
        localStorage.setItem('portfolio_messages', JSON.stringify(saved));
        
        setStatus('success');
        setForm({ name: '', email: '', projectType: '', budget: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
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
          className="text-center mb-16"
        >
          <SectionTag label="Get In Touch" />
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            Let's Build Something
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Great Together
            </span>
          </h2>
          <p
            className="mt-5 mx-auto max-w-lg"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', lineHeight: 1.8 }}
          >
            Tell me about your project and I'll get back to you within 24 hours with a plan and a quote.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 xl:gap-14">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Contact Details */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h3
                style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '18px', letterSpacing: '-0.02em' }}
              >
                Contact Details
              </h3>
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
                  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.07)' }}
                    >
                      <item.icon size={15} style={{ color: 'rgba(255,255,255,0.55)' }} />
                    </div>
                    <div>
                      <div
                        style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.28)', marginBottom: '2px', letterSpacing: '0.07em', textTransform: 'uppercase' }}
                      >
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.72)')}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}>
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <h3
                style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '18px', letterSpacing: '-0.02em' }}
              >
                Connect on Social
              </h3>
              <div className="space-y-2.5">
                {[
                  { icon: Github, label: 'GitHub', href: personalInfo.github, desc: 'See my code & projects' },
                  { icon: Linkedin, label: 'LinkedIn', href: personalInfo.linkedin, desc: 'Professional profile' },
                  { icon: MessageCircle, label: 'WhatsApp', href: personalInfo.whatsapp, desc: 'Quick chat' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded-xl transition-all duration-200 group"
                    style={{
                      border: '1px solid rgba(255,255,255,0.07)',
                      background: 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.07)' }}
                    >
                      <social.icon size={15} style={{ color: 'rgba(255,255,255,0.55)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                        {social.label}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.3)' }}>{social.desc}</div>
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Hint */}
            <div
              className="p-5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.75 }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Not sure what you need?</span>
                {' '}That's totally fine. Describe your idea or problem and I'll help figure out the best solution.
              </p>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.65 }}
            className="lg:col-span-3"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-12 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  minHeight: '400px',
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}
                >
                  <CheckCircle size={28} style={{ color: '#4ade80' }} />
                </div>
                <h3
                  style={{ fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-0.03em' }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.75, maxWidth: '320px' }}>
                  Thanks for reaching out. I'll review your project and get back to you within 24 hours.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStatus('idle')}
                  className="mt-8 px-7 py-3 rounded-xl text-sm"
                  style={{ background: '#fff', color: '#000', fontWeight: 700 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-7 rounded-2xl space-y-5"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="mb-2">
                  <h3
                    style={{ fontSize: '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '5px' }}
                  >
                    Tell Me About Your Project
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.38)' }}>
                    Fill in the details — I'll respond with a plan and quote within 24 hours.
                  </p>
                </div>

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: '7px', letterSpacing: '0.03em' }}
                    >
                      Your Name <span style={{ color: 'rgba(255,255,255,0.28)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Smith"
                      style={{
                        ...inputStyle,
                        borderColor: errors.name ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.28)')}
                      onBlur={(e) => (e.target.style.borderColor = errors.name ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.1)')}
                    />
                    {errors.name && (
                      <p style={{ fontSize: '11px', color: '#f87171', marginTop: '5px' }}>{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label
                      style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: '7px', letterSpacing: '0.03em' }}
                    >
                      Email Address <span style={{ color: 'rgba(255,255,255,0.28)' }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@company.com"
                      style={{
                        ...inputStyle,
                        borderColor: errors.email ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.1)',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.28)')}
                      onBlur={(e) => (e.target.style.borderColor = errors.email ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.1)')}
                    />
                    {errors.email && (
                      <p style={{ fontSize: '11px', color: '#f87171', marginTop: '5px' }}>{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Project Type + Budget */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: '7px', letterSpacing: '0.03em' }}
                    >
                      Project Type
                    </label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      style={{
                        ...inputStyle,
                        color: form.projectType ? '#fff' : 'rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.28)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    >
                      <option value="" style={{ background: '#111' }}>Select a type...</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t} style={{ background: '#111', color: '#fff' }}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: '7px', letterSpacing: '0.03em' }}
                    >
                      Estimated Budget
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      style={{
                        ...inputStyle,
                        color: form.budget ? '#fff' : 'rgba(255,255,255,0.3)',
                        cursor: 'pointer',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.28)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                    >
                      <option value="" style={{ background: '#111' }}>Select a range...</option>
                      {['Under $500', '$500 - $1,000', '$1,000 - $3,000', '$3,000 - $10,000', '$10,000+', "I'm not sure yet"].map((b) => (
                        <option key={b} value={b} style={{ background: '#111', color: '#fff' }}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: '7px', letterSpacing: '0.03em' }}
                  >
                    Tell Me About Your Project <span style={{ color: 'rgba(255,255,255,0.28)' }}>*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    placeholder="Describe your idea, what problem it solves, and any specific features you need. Don't worry about technical details — I'll handle that part."
                    style={{
                      ...inputStyle,
                      borderColor: errors.message ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.1)',
                      resize: 'none',
                      lineHeight: 1.7,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.28)')}
                    onBlur={(e) => (e.target.style.borderColor = errors.message ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.1)')}
                  />
                  {errors.message && (
                    <p style={{ fontSize: '11px', color: '#f87171', marginTop: '5px' }}>{errors.message}</p>
                  )}
                </div>

                {/* Rate limit error */}
                {status === 'error' && (
                  <div
                    className="px-4 py-3 rounded-xl text-sm"
                    style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', color: '#f87171' }}
                  >
                    Too many submissions. Please wait a minute before trying again.
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01, boxShadow: '0 6px 28px rgba(255,255,255,0.18)' }}
                  whileTap={{ scale: 0.99 }}
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2.5 transition-all"
                  style={{
                    background: status === 'loading' ? 'rgba(255,255,255,0.6)' : '#fff',
                    color: '#000',
                    fontWeight: 800,
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send My Project Brief
                    </>
                  )}
                </motion.button>

                <p
                  style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', textAlign: 'center', lineHeight: 1.6 }}
                >
                  By submitting, you agree to be contacted regarding your project inquiry. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
