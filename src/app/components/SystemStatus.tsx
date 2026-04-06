import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { apiEndpoints } from '../data/portfolio';
import { Activity, AlertTriangle, RefreshCw, RotateCcw, CheckCircle } from 'lucide-react';

interface LogEntry {
  time: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

const SAMPLE_LOGS: LogEntry[] = [
  { time: '', level: 'SUCCESS', message: 'Deployment pipeline completed successfully' },
  { time: '', level: 'INFO', message: 'Database connection pool: 12/20 active' },
  { time: '', level: 'INFO', message: 'Authentication API: 45ms response time' },
  { time: '', level: 'INFO', message: 'Cache hit ratio: 94.2%' },
  { time: '', level: 'INFO', message: 'Payment API health check: OK' },
  { time: '', level: 'SUCCESS', message: 'Auto-scaling: 2 instances spawned' },
  { time: '', level: 'INFO', message: 'CDN cache warmed: 1,240 assets' },
  { time: '', level: 'INFO', message: 'Session cleanup: 340 expired tokens removed' },
  { time: '', level: 'WARN', message: 'High memory usage on worker-3: 78%' },
  { time: '', level: 'INFO', message: 'Backup completed: 2.4GB snapshot saved' },
  { time: '', level: 'SUCCESS', message: 'SSL certificate renewed: valid for 90 days' },
  { time: '', level: 'INFO', message: 'Rate limiter: 12 requests blocked (bot detection)' },
];

function getTime(): string {
  return new Date().toLocaleTimeString('en-US', { hour12: false });
}

export function SystemStatus() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [endpoints, setEndpoints] = useState(apiEndpoints);
  const [errorSim, setErrorSim] = useState<null | 'running' | 'error' | 'recovering' | 'restored'>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    // Add initial logs
    const initial = SAMPLE_LOGS.slice(0, 5).map((l) => ({ ...l, time: getTime() }));
    setLogs(initial);

    const interval = setInterval(() => {
      const randomLog = SAMPLE_LOGS[Math.floor(Math.random() * SAMPLE_LOGS.length)];
      setLogs((prev) => [...prev.slice(-30), { ...randomLog, time: getTime() }]);
    }, 2500);
    return () => clearInterval(interval);
  }, [inView]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const runErrorSim = () => {
    if (errorSim === 'running') return;
    setErrorSim('running');
    setTimeout(() => {
      setErrorSim('error');
      setEndpoints((prev) =>
        prev.map((e) => (e.name === 'Payment API' ? { ...e, status: 'error', latency: '—' } : e))
      );
      setLogs((prev) => [
        ...prev,
        { time: getTime(), level: 'ERROR', message: 'Payment API: Connection timeout after 5000ms' },
        { time: getTime(), level: 'WARN', message: 'Initiating automatic failover...' },
      ]);
    }, 1000);
    setTimeout(() => {
      setErrorSim('recovering');
      setLogs((prev) => [
        ...prev,
        { time: getTime(), level: 'WARN', message: 'Payment API: Restarting service...' },
      ]);
    }, 2500);
    setTimeout(() => {
      setErrorSim('restored');
      setEndpoints(apiEndpoints);
      setLogs((prev) => [
        ...prev,
        { time: getTime(), level: 'SUCCESS', message: 'Payment API: Service restored. Response: 120ms' },
      ]);
      setTimeout(() => setErrorSim(null), 2000);
    }, 4500);
  };

  const levelColor: Record<string, string> = {
    INFO: 'rgba(255,255,255,0.4)',
    WARN: '#f59e0b',
    ERROR: '#ef4444',
    SUCCESS: '#00ff88',
  };

  const statusColor: Record<string, string> = {
    online: '#00ff88',
    connected: '#3b82f6',
    error: '#ef4444',
    checking: '#f59e0b',
  };

  return (
    <section
      id="system-status"
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
            MODULE_07 — LIVE SYSTEM MONITOR
          </div>
          <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            API Status &amp; System Logs
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* API Status Monitor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#060606' }}
              >
                <div className="flex items-center gap-2">
                  <Activity size={12} style={{ color: '#00ff88' }} />
                  <span className="text-[11px] tracking-widest text-white">API STATUS MONITOR</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px]" style={{ color: '#00ff88' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88', animation: 'pulse 2s infinite' }} />
                  LIVE
                </div>
              </div>

              <div className="p-5 space-y-3">
                {endpoints.map((ep, i) => (
                  <motion.div
                    key={ep.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.08 + 0.3 }}
                    className="flex items-center justify-between p-3"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: statusColor[ep.status] || '#666',
                          boxShadow: ep.status !== 'error' ? `0 0 6px ${statusColor[ep.status]}` : 'none',
                          animation: ep.status !== 'error' ? 'pulse 2s infinite' : 'none',
                        }}
                      />
                      <span className="text-[12px] text-white">{ep.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{ep.latency}</span>
                      <span
                        className="text-[10px] px-2 py-0.5 tracking-wider"
                        style={{
                          color: statusColor[ep.status],
                          background: `${statusColor[ep.status]}15`,
                          border: `1px solid ${statusColor[ep.status]}30`,
                        }}
                      >
                        {ep.status.toUpperCase()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Error simulation */}
              <div className="px-5 pb-5">
                <div
                  className="p-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] tracking-widest text-gray-600">ERROR SIMULATION LAB</span>
                    <AlertTriangle size={12} style={{ color: '#666' }} />
                  </div>
                  <p className="text-[11px] text-gray-600 mb-3">
                    Simulate a service failure and watch the auto-recovery system respond.
                  </p>
                  <button
                    onClick={runErrorSim}
                    disabled={errorSim !== null}
                    className="w-full py-2.5 text-[11px] tracking-wider flex items-center justify-center gap-2 transition-all"
                    style={{
                      background:
                        errorSim === null ? 'rgba(239,68,68,0.1)' :
                        errorSim === 'restored' ? 'rgba(0,255,136,0.1)' :
                        'rgba(255,255,255,0.04)',
                      border: `1px solid ${
                        errorSim === null ? 'rgba(239,68,68,0.3)' :
                        errorSim === 'restored' ? 'rgba(0,255,136,0.3)' :
                        'rgba(255,255,255,0.1)'
                      }`,
                      color:
                        errorSim === null ? '#ef4444' :
                        errorSim === 'restored' ? '#00ff88' :
                        'rgba(255,255,255,0.4)',
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {errorSim === null && <><AlertTriangle size={12} /> TEST FAILURE</>}
                    {errorSim === 'running' && <><RefreshCw size={12} className="animate-spin" /> INJECTING ERROR...</>}
                    {errorSim === 'error' && <><AlertTriangle size={12} /> ERROR DETECTED</>}
                    {errorSim === 'recovering' && <><RotateCcw size={12} className="animate-spin" /> RESTARTING SERVICE...</>}
                    {errorSim === 'restored' && <><CheckCircle size={12} /> SERVICE RESTORED</>}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* System Logs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#060606' }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(0,255,136,0.5)' }} />
                  </div>
                  <span className="text-[11px] tracking-widest text-white ml-2">SYSTEM LOGS</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px]" style={{ color: 'rgba(0,255,136,0.6)' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88', animation: 'pulse 2s infinite' }} />
                  STREAMING
                </div>
              </div>

              <div
                ref={logRef}
                className="p-4 overflow-y-auto"
                style={{ height: '380px', fontSize: '11px' }}
              >
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 mb-1.5"
                    style={{ lineHeight: 1.5 }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{log.time}</span>
                    <span
                      className="flex-shrink-0 text-[9px] tracking-wider"
                      style={{
                        color: levelColor[log.level],
                        minWidth: '52px',
                        paddingTop: '1px',
                      }}
                    >
                      [{log.level}]
                    </span>
                    <span style={{ color: levelColor[log.level] === 'rgba(255,255,255,0.4)' ? 'rgba(255,255,255,0.55)' : levelColor[log.level] }}>
                      {log.message}
                    </span>
                  </motion.div>
                ))}
                <div className="flex items-center gap-1" style={{ color: 'rgba(0,255,136,0.5)' }}>
                  <span>▌</span>
                  <span className="text-[10px]">waiting for events...</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
