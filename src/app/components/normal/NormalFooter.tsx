import { motion } from 'motion/react';
import { personalInfo } from '../../data/portfolio';
import { Github, Linkedin, MessageCircle, Mail, Terminal, ArrowUp } from 'lucide-react';

const navSections = [
  { label: 'About Me', section: 'about' },
  { label: 'Projects', section: 'projects' },
  { label: 'Skills', section: 'skills' },
  { label: 'Services', section: 'services' },
  { label: 'Testimonials', section: 'testimonials' },
  { label: 'Contact', section: 'contact' },
];

interface Props {
  onNavigate: (section: string) => void;
  onSwitchMode: () => void;
}

export function NormalFooter({ onNavigate, onSwitchMode }: Props) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      style={{
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: '#fff', boxShadow: '0 4px 16px rgba(255,255,255,0.1)' }}
              >
                <span style={{ color: '#000', fontWeight: 800, fontSize: '14px', letterSpacing: '-0.02em' }}>AS</span>
              </div>
              <div>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Aurangzeb Sunny
                </div>
                <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px' }}>Full-Stack Developer</div>
              </div>
            </div>

            <p
              style={{
                color: 'rgba(255,255,255,0.38)',
                fontSize: '13.5px',
                lineHeight: 1.85,
                maxWidth: '320px',
                marginBottom: '22px',
              }}
            >
              Building production-grade web applications for businesses and startups — from landing pages to complex SaaS platforms.
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {[
                { icon: Github, href: personalInfo.github, label: 'GitHub' },
                { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: MessageCircle, href: personalInfo.whatsapp, label: 'WhatsApp' },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  title={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.45)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              Navigation
            </h4>
            <div className="space-y-3">
              {navSections.map((link) => (
                <button
                  key={link.section}
                  onClick={() => onNavigate(link.section)}
                  className="block text-sm transition-colors duration-200 text-left"
                  style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.42)')}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.28)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '18px',
              }}
            >
              Get in Touch
            </h4>
            <div className="space-y-3.5">
              <a
                href={`mailto:${personalInfo.email}`}
                style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.52)', display: 'block' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.52)')}
              >
                {personalInfo.email}
              </a>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.32)' }}>
                {personalInfo.location}
              </p>
              <div className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'pulse 2s infinite' }}
                />
                <span style={{ fontSize: '12.5px', color: '#4ade80', fontWeight: 500 }}>
                  Available for projects
                </span>
              </div>
            </div>

            {/* Switch Mode */}
            <button
              onClick={onSwitchMode}
              className="mt-6 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.28)',
                fontFamily: 'JetBrains Mono, monospace',
                background: 'rgba(255,255,255,0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.58)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.28)';
              }}
            >
              <Terminal size={11} />
              Switch to Code Mode
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.22)' }}>
            © {new Date().getFullYear()} Aurangzeb Sunny. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.18)' }}>
              Built with React & Tailwind CSS
            </p>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.38)',
                background: 'rgba(255,255,255,0.04)',
              }}
              title="Scroll to top"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.38)';
              }}
            >
              <ArrowUp size={13} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
