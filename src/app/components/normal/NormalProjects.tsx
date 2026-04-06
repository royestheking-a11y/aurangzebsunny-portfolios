import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../../data/portfolio';
import { Users, Clock, TrendingUp, ExternalLink, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';

const projectImages: Record<string, string> = {
  pengu: 'https://images.unsplash.com/photo-1642132652866-6fa262d3161f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYWFTJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzJTIwc29mdHdhcmUlMjBwbGF0Zm9ybXxlbnwxfHx8fDE3NzUxMTE2Mzd8MA&ixlib=rb-4.1.0&q=80&w=800',
  'get-project': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzc1MTA4NzgyfDA&ixlib=rb-4.1.0&q=80&w=800',
  elevatecv: 'https://images.unsplash.com/photo-1695048475432-b7c21fb21e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJvZHVjdCUyMGRlc2lnbiUyMG1pbmltYWwlMjBkYXJrJTIwcHJlbWl1bXxlbnwxfHx8fDE3NzUxMTE2Mzd8MA&ixlib=rb-4.1.0&q=80&w=800',
  'auraz-ecommerce': 'https://images.unsplash.com/photo-1592179900359-06f0ea0b0c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwc2hvcHBpbmclMjBhcHAlMjBtb2JpbGV8ZW58MXx8fHwxNzc1MTExNjM3fDA&ixlib=rb-4.1.0&q=80&w=800',
  'voca-messenger': '/images/projects/voca-messenger.png',
  'velvii': '/images/projects/velvii.png',
  'jeevita': '/images/projects/jeevita.png',
};

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  Production: { color: '#4ade80', bg: 'rgba(74,222,128,0.1)', dot: '#4ade80' },
  Running: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', dot: '#60a5fa' },
  Live: { color: '#c4b5fd', bg: 'rgba(196,181,253,0.1)', dot: '#c4b5fd' },
};

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.05) {
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

export function NormalProjects({ onContact }: { onContact: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-28 sm:py-36 relative"
      style={{
        background: '#07070a',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }}
      />
      {/* Subtle bg glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <SectionTag label="Real Projects · Live in Production" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                }}
              >
                Full-Stack Web Development Projects
              </h2>
              <p className="mt-4" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', maxWidth: '500px', lineHeight: 1.75 }}>
                Real production systems built by Aurangzeb Sunny — top-tier web development and UI/UX design for global clients.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 6px 28px rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onContact}
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl text-sm"
              style={{ background: '#fff', color: '#000', fontWeight: 700 }}
            >
              Start Your Project
              <ArrowUpRight size={14} />
            </motion.button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const isExpanded = expanded === project.id;
            const sc = statusConfig[project.status] || { color: '#fff', bg: 'rgba(255,255,255,0.08)', dot: '#fff' };
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.65 }}
                className="rounded-2xl overflow-hidden group transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={projectImages[project.id]}
                    alt={`Aurangzeb Sunny Portfolio — ${project.name} Web Application`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ opacity: 0.5 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(7,7,10,0.2) 0%, rgba(7,7,10,0.85) 85%, rgba(7,7,10,1) 100%)',
                    }}
                  />

                  {/* Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs"
                      style={{
                        background: 'rgba(7,7,10,0.7)',
                        color: 'rgba(255,255,255,0.55)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '11px',
                        fontWeight: 500,
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs"
                      style={{
                        background: sc.bg,
                        color: sc.color,
                        border: `1px solid ${sc.color}22`,
                        backdropFilter: 'blur(8px)',
                        fontSize: '11px',
                        fontWeight: 600,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: sc.dot, boxShadow: `0 0 6px ${sc.dot}` }}
                      />
                      {project.status}
                    </span>
                  </div>

                  {/* Year badge */}
                  <div className="absolute bottom-3.5 right-3.5">
                    <span
                      className="px-2.5 py-1 rounded-lg text-xs"
                      style={{
                        background: 'rgba(7,7,10,0.7)',
                        color: 'rgba(255,255,255,0.35)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '11px',
                      }}
                    >
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 style={{ fontSize: '19px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: '5px' }}>
                      {project.name}
                    </h3>
                    <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.01em' }}>
                      {project.tagline}
                    </p>
                  </div>

                  <p
                    className="mb-5"
                    style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}
                  >
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { icon: Users, value: project.users.toLocaleString(), label: 'Users' },
                      { icon: TrendingUp, value: `${project.uptime}%`, label: 'Uptime' },
                      { icon: Clock, value: project.loadTime, label: 'Load Time' },
                    ].map(({ icon: Icon, value, label }) => (
                      <div
                        key={label}
                        className="p-3 rounded-xl text-center"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <Icon size={12} style={{ color: 'rgba(255,255,255,0.3)', margin: '0 auto 5px' }} />
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                          {value}
                        </div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', marginTop: '1px' }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.45)',
                          border: '1px solid rgba(255,255,255,0.07)',
                          fontSize: '11.5px',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expand / Collapse */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setExpanded(isExpanded ? null : project.id)}
                      className="flex items-center gap-1.5 text-xs transition-all"
                      style={{ color: 'rgba(255,255,255,0.38)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                    >
                      {isExpanded ? <><ChevronUp size={12} /> Less details</> : <><ChevronDown size={12} /> More details</>}
                    </button>

                    <a
                      href={(project as any).liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs transition-all ml-auto"
                      style={{ 
                        color: 'rgba(255,255,255,0.6)', 
                        padding: '6px 12px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      }}
                    >
                      View Live <ArrowUpRight size={12} />
                    </a>
                  </div>

                  {/* Expanded */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Architecture Layers
                          </h4>
                          <div className="space-y-2.5 mb-5">
                            {project.architecture.map((layer) => (
                              <div key={layer.layer} className="flex items-start gap-3">
                                <span
                                  className="flex-shrink-0 px-2 py-0.5 rounded-md"
                                  style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    color: 'rgba(255,255,255,0.38)',
                                    fontSize: '10px',
                                    fontWeight: 600,
                                    minWidth: '52px',
                                    textAlign: 'center',
                                  }}
                                >
                                  {layer.layer}
                                </span>
                                <div>
                                  <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                                    {layer.tech}
                                  </span>
                                  <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.32)', marginLeft: '7px' }}>
                                    — {layer.desc}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Challenges Solved
                          </h4>
                          <div className="space-y-2">
                            {project.challenges.map((c) => (
                              <div key={c} className="flex items-start gap-2.5">
                                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', marginTop: '-1px' }}>→</span>
                                <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{c}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          className="mt-12 p-8 rounded-2xl text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 120%, rgba(255,255,255,0.04) 0%, transparent 60%)',
            }}
          />
          <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '15px', marginBottom: '18px', lineHeight: 1.7 }}>
            Have a project in mind? I'd love to hear about it.
          </p>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onContact}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm"
            style={{ background: '#fff', color: '#000', fontWeight: 700 }}
          >
            <ExternalLink size={14} />
            Let's Build Together
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
