import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function DeveloperMode({ onClose }: Props) {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState<string>('N/A');
  const [loadTime, setLoadTime] = useState<string>('N/A');
  const [uptime, setUptime] = useState(0);
  const lastFrameRef = useRef<number>(performance.now());
  const frameCountRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      setLoadTime(`${(navEntry.loadEventEnd - navEntry.startTime).toFixed(0)}ms`);
    }

    const tick = () => {
      const now = performance.now();
      frameCountRef.current++;
      if (now - lastFrameRef.current >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / (now - lastFrameRef.current)));
        frameCountRef.current = 0;
        lastFrameRef.current = now;
        setUptime(Math.floor((Date.now() - startRef.current) / 1000));
        const perf = performance as any;
        if (perf.memory) {
          setMemory(`${(perf.memory.usedJSHeapSize / 1024 / 1024).toFixed(1)} MB`);
        }
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div
      className="fixed bottom-4 left-4 z-[9998] font-mono text-xs"
      style={{
        background: 'rgba(0,0,0,0.9)',
        border: '1px solid rgba(0,255,136,0.3)',
        padding: '12px 16px',
        minWidth: '200px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span style={{ color: '#00ff88' }} className="text-[10px] tracking-widest">
          DEV MODE
        </span>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
          <X size={12} />
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">FPS</span>
          <span style={{ color: fps >= 55 ? '#00ff88' : fps >= 30 ? '#f59e0b' : '#ef4444' }}>
            {fps}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Memory</span>
          <span className="text-white">{memory}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Load</span>
          <span className="text-white">{loadTime}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Uptime</span>
          <span style={{ color: '#00ff88' }}>{uptime}s</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Env</span>
          <span style={{ color: '#3b82f6' }}>production</span>
        </div>
      </div>
    </div>
  );
}
