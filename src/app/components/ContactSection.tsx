import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data/portfolio';
import { Send, Github, Linkedin, MessageCircle, Calendar, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const RATE_LIMIT_MS = 60000; // 1 minute
const LS_KEY = 'portfolio_contact_submissions';

function isRateLimited(): boolean {
  const data = localStorage.getItem(LS_KEY);
  if (!data) return false;
  const submissions: number[] = JSON.parse(data);
  const recent = submissions.filter((t) => Date.now() - t < RATE_LIMIT_MS);
  return recent.length >= 3;
}

function recordSubmission() {
  const data = localStorage.getItem(LS_KEY);
  const submissions: number[] = data ? JSON.parse(data) : [];
  submissions.push(Date.now());
  localStorage.setItem(LS_KEY, JSON.stringify(submissions.slice(-10)));
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Valid email required';
    if (!form.message.trim() || form.message.length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (isRateLimited()) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: personalInfo.web3formsAccessKey,
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio Inquiry',
          message: form.message,
          from_name: 'Portfolio System',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        
        // Also save to history for user
        const stored = localStorage.getItem('portfolio_messages') || '[]';
        const messages = JSON.parse(stored);
        messages.push({ ...form, timestamp: new Date().toISOString() });
        localStorage.setItem('portfolio_messages', JSON.stringify(messages));
        recordSubmission();

        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const fieldStyle = (name: string): React.CSSProperties => ({
    background: focused === name ? 'rgba(0,255,136,0.03)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${errors[name as keyof FormData] ? '#ef4444' : focused === name ? 'rgba(0,255,136,0.4)' : 'rgba(255,255,255,0.08)'}`,
    color: '#ffffff',
    outline: 'none',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '13px',
    transition: 'all 0.2s',
    padding: '12px 14px',
    width: '100%',
  });

  return (
    <section
      id="contact"
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
          className="mb-12"
        >
          <div className="text-[11px] tracking-widest mb-3" style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>
            MODULE_11 — CONTACT
          </div>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Start a Project
          </h2>
          <p className="mt-3 max-w-lg" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            Looking for an expert **Full-Stack Web Developer based in Bangladesh**? Let's build your vision into a high-performance reality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#00ff88' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat directly', href: personalInfo.whatsapp, color: '#25D366' },
              { icon: Github, label: 'GitHub', value: 'View repositories', href: personalInfo.github, color: '#fff' },
              { icon: Linkedin, label: 'LinkedIn', value: 'Connect with me', href: personalInfo.linkedin, color: '#0A66C2' },
              { icon: Calendar, label: 'Book a Call', value: 'Schedule 30-min call', href: '#', color: '#a78bfa' },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <a
                key={label}
                href={href}
                target={href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 group transition-all"
                style={{
                  background: 'rgba(255,255,255,0.01)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  fontFamily: 'JetBrains Mono, monospace',
                  textDecoration: 'none',
                }}
              >
                <div
                  className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon size={14} style={{ color }} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-600 mb-0.5">{label}</div>
                  <div className="text-white text-[13px]">{value}</div>
                </div>
              </a>
            ))}

            {/* Availability info */}
            <div
              className="p-4 mt-4"
              style={{ background: 'rgba(0,255,136,0.04)', border: '1px solid rgba(0,255,136,0.15)', fontFamily: 'JetBrains Mono, monospace' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88', animation: 'pulse 2s infinite' }} />
                <span className="text-[11px] tracking-widest" style={{ color: '#00ff88' }}>CURRENTLY AVAILABLE</span>
              </div>
              <p className="text-[12px] text-gray-500">
                Taking on new projects. Typical response within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              {/* Terminal header */}
              <div
                className="px-5 py-3 flex items-center gap-2"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#060606' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(0,255,136,0.6)' }} />
                </div>
                <span className="text-xs text-gray-600 ml-2 tracking-wider">send_message.sh</span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Status messages */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4"
                      style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.3)' }}
                    >
                      <CheckCircle size={16} style={{ color: '#00ff88' }} />
                      <div>
                        <div className="text-[12px]" style={{ color: '#00ff88' }}>Message sent successfully!</div>
                        <div className="text-[11px] text-gray-500">I'll respond within 24 hours.</div>
                      </div>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}
                    >
                      <AlertCircle size={16} style={{ color: '#ef4444' }} />
                      <div className="text-[12px]" style={{ color: '#ef4444' }}>
                        Rate limit exceeded. Please wait before sending again.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-widest text-gray-600 mb-2">NAME *</label>
                    <input
                      ref={nameRef}
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="Your name"
                      style={fieldStyle('name') as any}
                    />
                    {errors.name && (
                      <div className="text-[10px] mt-1" style={{ color: '#ef4444' }}>{errors.name}</div>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-widest text-gray-600 mb-2">EMAIL *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="your@email.com"
                      style={fieldStyle('email') as any}
                    />
                    {errors.email && (
                      <div className="text-[10px] mt-1" style={{ color: '#ef4444' }}>{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-600 mb-2">SUBJECT</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    placeholder="Project type or topic"
                    style={fieldStyle('subject') as any}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-600 mb-2">MESSAGE *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Describe your project, requirements, and timeline..."
                    rows={5}
                    style={{ ...fieldStyle('message'), resize: 'vertical' } as any}
                  />
                  {errors.message && (
                    <div className="text-[10px] mt-1" style={{ color: '#ef4444' }}>{errors.message}</div>
                  )}
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-gray-600">
                    Press <kbd className="px-1.5 py-0.5 text-[9px]" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#00ff88' }}>ENTER</kbd> to submit
                  </span>
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,255,136,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 text-[12px] tracking-wider"
                    style={{
                      background: status === 'loading' ? 'rgba(0,255,136,0.5)' : '#00ff88',
                      color: '#000',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 700,
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        SENDING...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        SEND MESSAGE
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}