import { useParams, Link } from "react-router-dom";
import { athleteByUsername } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { LevelBadge } from "@/components/ironblood/LevelBadge";
import { SportPill } from "@/components/ironblood/SportPill";
import { DAYS } from "@/data/sports";
import { MapPin, Flame, Trophy, ShieldCheck, Crown } from "lucide-react";

const ACHIEVEMENTS = [
  { id: "first",    icon: "🏆", title: "First Blood",     desc: "First event registered" },
  { id: "streak",   icon: "⚡", title: "Iron Consistent", desc: "10-day training streak" },
  { id: "host",     icon: "👑", title: "Arena Host",      desc: "Hosted first event" },
  { id: "beast",    icon: "💀", title: "Beast",           desc: "5+ paid competitions attended" },
  { id: "pack",     icon: "🔥", title: "Pack Leader",     desc: "10 challenges accepted" },
];

export default function AthleteProfile() {
  const { username } = useParams();
  const a = username ? athleteByUsername(username) : undefined;

  if (!a) {
    return (
      <main className="min-h-screen grid place-items-center bg-deep">
        <div className="text-center">
          <p className="font-display text-4xl text-iron">ATHLETE NOT FOUND.</p>
          <Button asChild variant="blood" className="mt-6"><Link to="/discover">Find an Opponent</Link></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-deep min-h-screen pb-24">
      {/* Top */}
      <section className="border-b border-hair bg-card grain">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-14 grid gap-8 md:grid-cols-[260px_1fr]">
          <img src={a.photo} alt={a.name} className="aspect-square w-full object-cover border border-hair" />
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="display-lg text-iron">{a.name.toUpperCase()} <span className="text-bone text-3xl">· {a.age}</span></h1>
              {a.verified && <span title="Verified" className="inline-flex h-7 w-7 items-center justify-center bg-elev border border-blood/60 text-blood"><ShieldCheck className="h-4 w-4" /></span>}
              {a.topHost && <span title="Top Host" className="inline-flex h-7 w-7 items-center justify-center bg-elev border border-gold/60 text-gold"><Crown className="h-4 w-4" /></span>}
            </div>
            <p className="font-display italic text-2xl text-bone">"{a.tagline}"</p>
            <div className="flex flex-wrap gap-1.5">
              {a.sports.map(s => <SportPill key={s} slug={s} />)}
              <LevelBadge level={a.level} />
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-bone">
              <MapPin className="h-3.5 w-3.5 text-blood" /> {a.city} · {a.area}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { l: "Challenges", v: a.challenges },
                { l: "Attended",   v: a.attended },
                { l: "Hosted",     v: a.hosted },
                { l: "Streak",     v: `🔥 ${a.streak}d` },
              ].map((s,i) => (
                <div key={i} className="border border-hair bg-deep px-3 py-3">
                  <div className="font-mono text-2xl text-iron tabular-nums">{s.v}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-bone">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="pt-2 hidden md:block">
              <Button variant="blood" size="lg">Send Challenge</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-iron">ABOUT</h2>
          <p className="mt-3 text-bone leading-relaxed">{a.bio}</p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-iron">AVAILABILITY</h2>
          <div className="mt-4 grid grid-cols-7 gap-1 text-center">
            {DAYS.map(d => {
              const on = a.days.includes(d);
              return (
                <div key={d} className={`border ${on ? "border-blood/60 bg-blood/15 text-iron" : "border-hair bg-card text-bone"}`}>
                  <div className="text-[10px] font-mono uppercase tracking-widest py-2">{d}</div>
                  <div className={`text-[10px] font-mono uppercase py-2 border-t ${on ? "border-blood/40" : "border-hair"}`}>
                    {on ? a.time : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        <h2 className="font-display text-2xl text-iron">ACHIEVEMENTS</h2>
        <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {ACHIEVEMENTS.map(b => (
            <div key={b.id} className="border border-hair bg-card p-4 text-center glow-red-hover">
              <div className="text-3xl">{b.icon}</div>
              <div className="mt-2 font-display text-base text-gold">{b.title.toUpperCase()}</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-bone mt-1">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-16 inset-x-0 z-30 p-3 bg-deep/95 border-t border-hair">
        <Button variant="blood" size="lg" className="w-full">Send Challenge</Button>
      </div>
    </main>
  );
}