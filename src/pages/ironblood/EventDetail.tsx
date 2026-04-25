import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { eventBySlug } from "@/data/events";
import { sportBySlug } from "@/data/sports";
import { ATHLETES } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Trophy, ShieldCheck, Clock, Check } from "lucide-react";

export default function EventDetail() {
  const { slug } = useParams();
  const event = slug ? eventBySlug(slug) : undefined;
  const [paid, setPaid] = useState(false);

  if (!event) {
    return (
      <main className="min-h-screen grid place-items-center bg-deep">
        <div className="text-center">
          <p className="font-display text-4xl text-iron">EVENT NOT FOUND.</p>
          <Button asChild variant="blood" className="mt-6"><Link to="/events">Browse Events</Link></Button>
        </div>
      </main>
    );
  }

  const sport = sportBySlug(event.sport);
  const isFree = event.fee === 0;
  const remaining = event.spots - event.registered;
  const fillPct = Math.round((event.registered / event.spots) * 100);
  const registered = ATHLETES.slice(0, Math.min(6, event.registered));

  return (
    <main className="bg-deep min-h-screen pb-16">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-hair">
        <img src={event.banner} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/60 via-deep/80 to-deep" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-28 grain">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-blood">
            <span className="h-px w-6 bg-blood" /> {event.type}
          </div>
          <h1 className="mt-4 display-xl text-iron leading-[0.9]">{event.name.toUpperCase()}</h1>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono uppercase tracking-widest text-bone">
            <span className="flex items-center gap-2 text-iron"><span className="text-blood">{sport?.emoji}</span> {sport?.name}</span>
            <span className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-blood" /> {new Date(event.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</span>
            <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-blood" /> {event.venue} · {event.city}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-14 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Left */}
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-2xl text-iron">DESCRIPTION</h2>
            <p className="mt-3 text-bone leading-relaxed">{event.description}</p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-iron">RULES & FORMAT</h2>
            <div className="mt-3 border border-hair bg-card p-4 text-sm text-iron">{event.rules}</div>
            <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-bone">
              Format · <span className="text-iron">{event.format}</span>
            </div>
          </div>

          {event.prizePool ? (
            <div className="border border-gold/40 bg-[radial-gradient(ellipse_at_top,hsl(var(--gold)/0.12),transparent_70%)] bg-card p-6">
              <div className="text-[11px] font-mono uppercase tracking-widest text-gold flex items-center gap-2"><Trophy className="h-3.5 w-3.5" /> Prize Pool</div>
              <div className="mt-2 font-display text-4xl text-gold">₹{event.prizePool.toLocaleString()}</div>
              <p className="mt-2 text-sm text-bone">Winner takes 60% · Runner-up 25% · 3rd 15%.</p>
            </div>
          ) : null}

          <div>
            <h2 className="font-display text-2xl text-iron">SCHEDULE</h2>
            <ol className="mt-3 border border-hair bg-card divide-y divide-hair">
              {event.schedule.map((s,i) => (
                <li key={i} className="flex items-center gap-4 px-4 py-3">
                  <Clock className="h-3.5 w-3.5 text-blood" />
                  <span className="font-mono text-xs text-iron tabular-nums w-14">{s.time}</span>
                  <span className="text-sm text-bone">{s.item}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="font-display text-2xl text-iron">REGISTERED ATHLETES</h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {registered.map(a => (
                <Link key={a.id} to={`/athlete/${a.username}`} className="flex items-center gap-2 border border-hair bg-card pr-3 hover:border-blood/60 transition-colors">
                  <img src={a.photo} alt="" className="h-9 w-9 object-cover" />
                  <span className="text-xs text-iron">{a.name}</span>
                </Link>
              ))}
              {event.registered > registered.length && (
                <span className="text-xs font-mono uppercase tracking-widest text-bone">+ {event.registered - registered.length} others</span>
              )}
            </div>
          </div>

          <div className="border border-hair bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center bg-elev border border-hair font-mono text-iron">
                {event.hostName.split(" ").map(n=>n[0]).join("")}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-iron font-bold">{event.hostName}{event.hostVerified && <ShieldCheck className="h-4 w-4 text-gold" />}</div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-bone">★ {event.hostRating.toFixed(1)} · Verified Host</div>
              </div>
              <Button variant="outline" size="sm">Message</Button>
            </div>
          </div>
        </div>

        {/* Right — sticky register */}
        <aside className="lg:sticky lg:top-24 h-fit border border-hair bg-card p-6">
          {paid ? (
            <div className="space-y-4 text-center py-6">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center border border-blood/60 bg-blood/10 text-blood">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="font-display text-3xl text-iron">YOU'RE IN.</h3>
              <p className="text-sm text-bone">Your spot is locked. Show up. Compete.</p>
              <Button asChild variant="bloodOutline" className="w-full"><Link to="/dashboard">View in Dashboard</Link></Button>
            </div>
          ) : (
            <>
              <div className="text-[11px] font-mono uppercase tracking-widest text-bone">Entry Fee</div>
              <div className="mt-1 font-display text-4xl text-iron">
                {isFree ? <span className="text-gold">FREE</span> : `₹${event.fee}`}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-bone">
                  <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {event.registered}/{event.spots} Locked In</span>
                  <span className="text-iron">{remaining} left</span>
                </div>
                <div className="mt-2 h-[3px] bg-hair">
                  <div className="h-full bg-blood" style={{ width: `${fillPct}%` }} />
                </div>
              </div>

              <Button variant="blood" size="lg" className="mt-6 w-full" onClick={() => setPaid(true)}>
                {isFree ? "Join Session" : "Register & Pay"}
              </Button>
              <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-bone text-center">
                {isFree ? "No payment required" : "Secured by mock checkout · Refunds per host policy"}
              </p>
            </>
          )}
        </aside>
      </section>
    </main>
  );
}