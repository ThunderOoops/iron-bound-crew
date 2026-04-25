import { Link } from "react-router-dom";
import { SPORTS } from "@/data/sports";

export function SportsMarquee() {
  const row = [...SPORTS, ...SPORTS]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden border-y border-hair bg-card py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-deep to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-deep to-transparent z-10" />
      <div className="flex w-max animate-marquee gap-3">
        {row.map((s, i) => (
          <Link key={`${s.slug}-${i}`} to={`/discover?sport=${s.slug}`}
            className="inline-flex shrink-0 items-center gap-2 border border-hair bg-elev px-4 py-2 text-xs font-mono uppercase tracking-widest text-bone hover:border-blood/60 hover:text-blood transition-colors">
            <span aria-hidden>{s.emoji}</span>{s.name}
          </Link>
        ))}
      </div>
    </div>
  );
}