import { useEffect, useRef, useState } from "react";

export function CountUp({ to, suffix = "", duration = 1500 }: { to: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref} className="font-display tabular-nums">{n.toLocaleString()}{suffix}</span>;
}