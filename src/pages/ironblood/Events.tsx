import { useMemo, useState } from "react";
import { SPORTS } from "@/data/sports";
import { EventCard } from "@/components/ironblood/EventCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";

export default function Events() {
  const [tab, setTab] = useState<"competitions" | "sessions">("competitions");
  const [sport, setSport] = useState<string | null>(null);
  const [feeFilter, setFeeFilter] = useState<"any"|"free"|"paid">("any");

  const { data: events = [], isLoading } = useEvents();
  const list = useMemo(() => events.filter(e => {
    const matchesTab = tab === "competitions" ? e.type !== "session" : e.type === "session";
    const matchesSport = !sport || e.sport === sport;
    const matchesFee = feeFilter === "any" || (feeFilter === "free" ? e.fee === 0 : e.fee > 0);
    return matchesTab && matchesSport && matchesFee;
  }), [events, tab, sport, feeFilter]);

  return (
    <main className="bg-deep min-h-screen">
      <section className="border-b border-hair bg-card grain">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-blood">Events</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
            <h1 className="display-lg text-iron">UPCOMING <span className="text-blood">BATTLES</span></h1>
            <Button asChild variant="bloodOutline">
              <Link to="/host">Host Your Own</Link>
            </Button>
          </div>

          <div className="mt-8 inline-flex border border-hair">
            {[
              { id: "competitions", label: "Competitions" },
              { id: "sessions", label: "Open Sessions" },
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id as any)}
                className={`px-5 h-11 text-xs font-bold uppercase tracking-widest transition-colors ${
                  tab === t.id ? "bg-blood text-white" : "bg-card text-bone hover:text-iron"
                }`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-20 border-b border-hair bg-deep/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex flex-wrap items-center gap-3">
          <select value={sport ?? ""} onChange={e => setSport(e.target.value || null)}
            className="h-9 rounded-none border border-hair bg-card px-3 text-xs font-mono uppercase tracking-widest text-iron focus:border-blood outline-none">
            <option value="">All sports</option>
            {SPORTS.map(s => <option key={s.slug} value={s.slug}>{s.emoji} {s.name}</option>)}
          </select>
          <div className="inline-flex border border-hair">
            {(["any","free","paid"] as const).map(f => (
              <button key={f} onClick={() => setFeeFilter(f)}
                className={`px-3 h-9 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                  feeFilter === f ? "bg-blood text-white" : "bg-card text-bone hover:text-iron"
                }`}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-none bg-card" />)}
          </div>
        ) : list.length === 0 ? (
          <div className="border border-hair bg-card p-12 text-center">
            <p className="font-display text-3xl text-iron">NO BATTLES YET.</p>
            <p className="mt-2 text-bone">"Build the arena and they'll come."</p>
            <Button asChild variant="blood" className="mt-6"><Link to="/host">Host the first one</Link></Button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        )}
      </section>
    </main>
  );
}