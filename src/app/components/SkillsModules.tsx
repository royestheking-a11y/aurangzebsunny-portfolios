import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { skills } from '../data/portfolio';
import { Package, Check } from 'lucide-react';

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: '#00ff88',
  Backend: '#3b82f6',
  Database: '#a78bfa',
  DevOps: '#f59e0b',
  Payments: '#ef4444',
  Tools: '#666',
};

const TECH_LEVELS: Record<string, number> = {
  React: 95, 'Next.js': 90, 'Vue.js': 85, TypeScript: 88, 'Tailwind CSS': 95, 'HTML/CSS': 98,
  'Node.js': 92, Laravel: 90, Python: 78, FastAPI: 80, 'Express.js': 88, 'REST APIs': 95,
  MongoDB: 88, PostgreSQL: 85, MySQL: 87, Redis: 80, Firebase: 75,
  AWS: 75, Vercel: 90, Docker: 72, Nginx: 78, 'CI/CD': 70, Linux: 80,
  Stripe: 90, PayPal: 78, 'Payment Gateway': 88, 'PCI DSS': 75,
  Git: 95, GitHub: 95, Postman: 92, Figma: 78, 'VS Code': 98, Jira: 80,
};

export function SkillsModules() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
      id="skills"
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
          className="mb-12"
        >
          <div className="text-[11px] tracking-widest mb-3" style={{ color: '#00ff88', fontFamily: 'JetBrains Mono, monospace' }}>
            MODULE_06 — INSTALLED PACKAGES
          </div>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Skills as System Modules
          </h2>
          <p className="mt-3 max-w-lg" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
            Technology stack organized as installed modules. Click a category to explore proficiency levels.
          </p>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-3 py-1.5 text-[11px] tracking-wider transition-all"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                background: selectedCategory === null ? '#00ff88' : 'transparent',
                color: selectedCategory === null ? '#000' : 'rgba(255,255,255,0.4)',
                border: `1px solid ${selectedCategory === null ? '#00ff88' : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              ALL
            </button>
            {skills.map((s) => (
              <button
                key={s.category}
                onClick={() => setSelectedCategory(s.category === selectedCategory ? null : s.category)}
                className="px-3 py-1.5 text-[11px] tracking-wider transition-all"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  background: selectedCategory === s.category ? CATEGORY_COLORS[s.category] : 'transparent',
                  color: selectedCategory === s.category ? '#000' : 'rgba(255,255,255,0.4)',
                  border: `1px solid ${selectedCategory === s.category ? CATEGORY_COLORS[s.category] : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                {s.category.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills
            .filter((s) => !selectedCategory || s.category === selectedCategory)
            .map((skillGroup, gi) => {
              const color = CATEGORY_COLORS[skillGroup.category] || '#00ff88';
              return (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: gi * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="p-5"
                  style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: `1px solid ${color}20`,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-4">
                    <Package size={12} style={{ color }} />
                    <span className="text-[10px] tracking-widest" style={{ color }}>
                      {skillGroup.category.toUpperCase()}
                    </span>
                    <span
                      className="ml-auto text-[9px] px-1.5 py-0.5"
                      style={{ background: `${color}10`, border: `1px solid ${color}20`, color: `${color}80` }}
                    >
                      v{skillGroup.items.length}.0.0
                    </span>
                  </div>

                  {/* Skills list with proficiency */}
                  <div className="space-y-3">
                    {skillGroup.items.map((skill, si) => {
                      const level = TECH_LEVELS[skill] || 80;
                      const isHovered = hoveredSkill === skill;
                      return (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: gi * 0.1 + si * 0.05 }}
                          onHoverStart={() => setHoveredSkill(skill)}
                          onHoverEnd={() => setHoveredSkill(null)}
                          className="cursor-default"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Check size={10} style={{ color: `${color}80` }} />
                              <span className="text-[12px]" style={{ color: isHovered ? '#fff' : 'rgba(255,255,255,0.7)' }}>
                                {skill}
                              </span>
                            </div>
                            <span className="text-[10px]" style={{ color: isHovered ? color : 'rgba(255,255,255,0.2)' }}>
                              {level}%
                            </span>
                          </div>
                          {/* Proficiency bar */}
                          <div
                            className="h-[2px] w-full"
                            style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${level}%` } : { width: 0 }}
                              transition={{ duration: 1, delay: gi * 0.1 + si * 0.05 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full"
                              style={{
                                background: color,
                                boxShadow: isHovered ? `0 0 6px ${color}` : 'none',
                                borderRadius: 2,
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
