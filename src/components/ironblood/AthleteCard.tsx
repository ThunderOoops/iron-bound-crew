import { Athlete } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "./LevelBadge";
import { SportPill } from "./SportPill";
import { MapPin, Zap, ShieldCheck, Crown, Flame } from "lucide-react";
import { Link } from "react-router-dom";

export function AthleteCard({ athlete }: { athlete: Athlete }) {
  return (
    <article className="group relative flex flex-col border border-hair bg-card glow-red-hover">
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-elev">
        <img src={athlete.photo} alt={athlete.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {athlete.activeToday && (
            <span className="inline-flex items-center gap-1 bg-blood/90 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-white">
              <Zap className="h-3 w-3" /> Active
            </span>
          )}
          {athlete.match >= 80 && (
            <span className="inline-flex items-center gap-1 bg-black/70 border border-blood/60 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-blood">
              <Flame className="h-3 w-3" /> {athlete.match}% match
            </span>
          )}
        </div>
        <div className="absolute right-3 top-3 flex gap-1.5">
          {athlete.verified && <span title="Verified Athlete" className="inline-flex h-6 w-6 items-center justify-center bg-black/70 border border-blood/60 text-blood"><ShieldCheck className="h-3.5 w-3.5" /></span>}
          {athlete.topHost && <span title="Top Host" className="inline-flex h-6 w-6 items-center justify-center bg-black/70 border border-gold/60 text-gold"><Crown className="h-3.5 w-3.5" /></span>}
        </div>
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
          <div>
            <h3 className="font-display text-2xl leading-none text-iron">{athlete.name} <span className="text-bone text-base">· {athlete.age}</span></h3>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-mono uppercase tracking-widest text-bone">
              <MapPin className="h-3 w-3" /> {athlete.distanceKm} KM · {athlete.area}
            </div>
          </div>
          <LevelBadge level={athlete.level} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-sm italic text-bone">"{athlete.tagline}"</p>

        <div className="flex flex-wrap gap-1.5">
          {athlete.sports.slice(0,3).map(s => <SportPill key={s} slug={s} />)}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-bone">
              <span>Compatibility</span><span className="text-iron">{athlete.match}%</span>
            </div>
            <div className="mt-1 h-[3px] w-full bg-hair">
              <div className="h-full bg-blood" style={{ width: `${athlete.match}%` }} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/athlete/${athlete.username}`}>View Profile</Link>
          </Button>
          <Button variant="blood" size="sm" className="flex-1">Send Challenge</Button>
        </div>
      </div>
    </article>
  );
}