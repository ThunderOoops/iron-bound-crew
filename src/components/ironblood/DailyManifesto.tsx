import { useMemo } from "react";
import { MANIFESTOS } from "@/data/sports";

export function DailyManifesto({ className = "" }: { className?: string }) {
  const quote = useMemo(() => {
    const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return MANIFESTOS[day % MANIFESTOS.length];
  }, []);
  return (
    <div className={`relative border border-blood/30 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_70%)] bg-card p-6 md:p-10 grain ${className}`}>
      <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-blood">Today's Manifesto</div>
      <p className="mt-3 font-display text-3xl md:text-5xl leading-[0.95] text-iron">"{quote.toUpperCase()}"</p>
    </div>
  );
}