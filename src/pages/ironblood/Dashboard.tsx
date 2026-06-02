import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ATHLETES } from "@/data/athletes";
import { AthleteCard } from "@/components/ironblood/AthleteCard";
import { EventCard } from "@/components/ironblood/EventCard";
import { DailyManifesto } from "@/components/ironblood/DailyManifesto";
import { Button } from "@/components/ui/button";
import { Flame, Swords, Calendar, MessageSquare, IndianRupee, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";

export default function Dashboard() {
  const nav = useNavigate();
  const { user, profile, loading } = useAuth();
  const { data: events = [] } = useEvents();

  useEffect(() => {
    if (!loading && !user) nav("/auth", { replace: true });
    else if (!loading && user && profile && !profile.onboarded) nav("/onboarding", { replace: true });
  }, [user, profile, loading, nav]);

  const newMatches = ATHLETES.slice(0, 3);
  const upcoming = events.slice(0, 2);
  const next = events[0];
  const daysToNext = next ? Math.max(1, Math.round((new Date(next.date).getTime() - Date.now()) / 86400000)) : 0;
  const firstName = (profile?.full_name || user?.email?.split("@")[0] || "Athlete").split(" ")[0].toUpperCase();

  return (
    <main className="bg-deep min-h-screen pb-24">
      <section className="border-b border-hair bg-card grain">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-blood">Dashboard</div>
          <h1 className="mt-2 display-lg text-iron">WELCOME BACK, {firstName}. <span className="text-blood">THE IRON WAITS.</span></h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-8 grid gap-4 md:grid-cols-3">
        <div className="border border-hair bg-card p-5 glow-red-hover">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-bone"><Flame className="h-3.5 w-3.5 text-blood" /> Streak</div>
          <div className="mt-2 font-display text-5xl text-blood">{profile?.streak ?? 0}<span className="text-bone text-2xl"> days</span></div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-bone mt-1">Don't break it.</div>
        </div>
        <div className="border border-hair bg-card p-5 glow-red-hover">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-bone"><Swords className="h-3.5 w-3.5 text-blood" /> Active Challenges</div>
          <div className="mt-2 font-display text-5xl text-iron">3</div>
          <Button asChild variant="ghost" size="sm" className="mt-2 text-blood"><Link to="/messages">Open inbox →</Link></Button>
        </div>
        {next && <div className="border border-hair bg-card p-5 glow-red-hover">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-bone"><Calendar className="h-3.5 w-3.5 text-blood" /> Next Event</div>
          <div className="mt-2 font-display text-3xl text-iron leading-none">{next.name.toUpperCase()}</div>
          <div className="mt-2 font-mono text-xs uppercase tracking-widest text-blood">In {daysToNext} days</div>
        </div>}
        <div className="border border-hair bg-card p-5 glow-red-hover md:col-span-2">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-bone"><MessageSquare className="h-3.5 w-3.5 text-blood" /> Messages</div>
          <div className="mt-2 font-display text-5xl text-iron">7 <span className="text-bone text-2xl">unread</span></div>
          <Button asChild variant="bloodOutline" size="sm" className="mt-3"><Link to="/messages">Open Messages</Link></Button>
        </div>
        <div className="border border-gold/30 bg-card p-5 glow-red-hover">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-gold"><IndianRupee className="h-3.5 w-3.5" /> Host Earnings</div>
          <div className="mt-2 font-display text-4xl text-gold">₹14,400</div>
          <Button asChild variant="ghost" size="sm" className="mt-2 text-gold"><Link to="/dashboard/host">Host Dashboard →</Link></Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        <DailyManifesto />
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-iron"><Search className="inline h-5 w-5 text-blood" /> NEW MATCHES NEAR YOU</h2>
          <Button asChild variant="ghost" size="sm" className="text-blood"><Link to="/discover">See all →</Link></Button>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {newMatches.map(a => <AthleteCard key={a.id} athlete={a} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-iron">EVENTS NEAR YOU</h2>
          <Button asChild variant="ghost" size="sm" className="text-blood"><Link to="/events">See all →</Link></Button>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {upcoming.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      </section>
    </main>
  );
}