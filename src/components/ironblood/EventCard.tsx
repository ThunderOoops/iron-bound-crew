import { IbEvent } from "@/data/events";
import { sportBySlug } from "@/data/sports";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Trophy, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", hour12: true });
}

export function EventCard({ event }: { event: IbEvent }) {
  const sport = sportBySlug(event.sport);
  const isFree = event.fee === 0;
  const fillPct = Math.round((event.registered / event.spots) * 100);
  return (
    <article className="group relative flex flex-col border border-hair bg-card glow-red-hover">
      <div className="relative aspect-[16/9] overflow-hidden bg-elev">
        <img src={event.banner} alt={event.name} loading="lazy"
          className="h-full w-full object-cover opacity-70 transition-all duration-300 group-hover:opacity-90 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <span className="inline-flex items-center gap-1 bg-blood px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-white">
            {sport?.emoji} {sport?.name}
          </span>
          {isFree ? (
            <span className="inline-flex items-center gap-1 border border-gold/60 bg-black/60 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-gold">FREE</span>
          ) : (
            <span className="inline-flex items-center gap-1 border border-hair bg-black/60 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-iron">
              ₹{event.fee}
            </span>
          )}
        </div>
        {event.prizePool ? (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 border border-gold/60 bg-black/70 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-gold">
            <Trophy className="h-3 w-3" /> ₹{event.prizePool.toLocaleString()}
          </div>
        ) : null}
        <div className="absolute inset-x-3 bottom-3">
          <h3 className="font-display text-2xl md:text-3xl leading-none text-iron">{event.name.toUpperCase()}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono uppercase tracking-widest text-bone">
          <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-blood" /> {formatDate(event.date)}</div>
          <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-blood" /> {event.distanceKm} KM</div>
          <div className="col-span-2 truncate text-iron normal-case tracking-normal">{event.venue} · {event.city}</div>
        </div>

        <div>
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-bone">
            <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {event.registered}/{event.spots} Locked In</span>
            <span className="text-iron">{fillPct}%</span>
          </div>
          <div className="mt-1 h-[3px] w-full bg-hair">
            <div className="h-full bg-blood" style={{ width: `${fillPct}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-bone">
            <span className="inline-flex h-6 w-6 items-center justify-center bg-elev border border-hair font-mono text-[10px] text-iron">
              {event.hostName.split(" ").map(n=>n[0]).join("")}
            </span>
            <span className="truncate">Hosted by <span className="text-iron">{event.hostName}</span></span>
            {event.hostVerified && <ShieldCheck className="h-3.5 w-3.5 text-gold" />}
          </div>
          <span className="font-mono text-[10px] text-bone">★ {event.hostRating.toFixed(1)}</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/events/${event.slug}`}>View Event</Link>
          </Button>
          <Button asChild variant="blood" size="sm" className="flex-1">
            <Link to={`/events/${event.slug}`}>{isFree ? "Join Session" : "Claim Your Spot"}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}