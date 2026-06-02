import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ATHLETES } from "@/data/athletes";
import { SPORTS, LEVELS } from "@/data/sports";
import { AthleteCard } from "@/components/ironblood/AthleteCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Filter, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Athlete } from "@/data/athletes";

export default function Discover() {
  const [params] = useSearchParams();
  const initialSport = params.get("sport");
  const [sport, setSport] = useState<string | null>(initialSport);
  const [level, setLevel] = useState<string | null>(null);
  const [maxKm, setMaxKm] = useState(50);
  const [scheduleMatch, setScheduleMatch] = useState(false);
  const [realAthletes, setRealAthletes] = useState<Athlete[]>([]);

  useEffect(() => {
    supabase.from("profiles").select("*").eq("onboarded", true).eq("is_hidden", false).limit(50).then(({ data }) => {
      if (!data) return;
      setRealAthletes(data.map((p: any) => ({
        id: p.id,
        username: p.username ?? p.id.slice(0, 8),
        name: p.full_name ?? "Athlete",
        age: p.age ?? 0,
        city: p.city ?? "",
        area: p.area ?? "",
        distanceKm: 0,
        photo: p.photo_url ?? "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=70",
        sports: p.sports ?? [],
        level: (p.level ?? "intermediate") as any,
        intensity: (p.intensity ?? "moderate") as any,
        tagline: p.tagline ?? "",
        bio: p.bio ?? "",
        days: p.days ?? [],
        time: p.time_pref ?? "flex",
        frequency: "—",
        match: 80,
        activeToday: true,
        verified: p.is_verified,
        topHost: false,
        streak: p.streak ?? 0,
        challenges: 0, attended: 0, hosted: 0,
      })));
    });
  }, []);

  const pool = realAthletes.length >= 4 ? realAthletes : [...realAthletes, ...ATHLETES];

  const filtered = useMemo(() => pool.filter(a =>
    (!sport || a.sports.includes(sport)) &&
    (!level || a.level === level) &&
    a.distanceKm <= maxKm &&
    (!scheduleMatch || a.activeToday)
  ), [pool, sport, level, maxKm, scheduleMatch]);

  const reset = () => { setSport(null); setLevel(null); setMaxKm(50); setScheduleMatch(false); };

  return (
    <main className="bg-deep min-h-screen">
      {/* Header */}
      <section className="border-b border-hair bg-card grain">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-blood">Discover</div>
          <h1 className="mt-2 display-lg text-iron">FIND YOUR <span className="text-blood">OPPONENT</span></h1>
          <p className="mt-3 max-w-xl text-bone">Athletes near you. Real schedules. Real intent. Send a challenge — train this week.</p>
        </div>
      </section>

      {/* Sticky filters */}
      <div className="sticky top-16 z-20 border-b border-hair bg-deep/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-blood">
            <Filter className="h-3.5 w-3.5" /> Filters
          </div>
          <select value={sport ?? ""} onChange={e => setSport(e.target.value || null)}
            className="h-9 rounded-none border border-hair bg-card px-3 text-xs font-mono uppercase tracking-widest text-iron focus:border-blood outline-none">
            <option value="">All sports</option>
            {SPORTS.map(s => <option key={s.slug} value={s.slug}>{s.emoji} {s.name}</option>)}
          </select>
          <select value={level ?? ""} onChange={e => setLevel(e.target.value || null)}
            className="h-9 rounded-none border border-hair bg-card px-3 text-xs font-mono uppercase tracking-widest text-iron focus:border-blood outline-none">
            <option value="">All levels</option>
            {LEVELS.map(l => <option key={l.slug} value={l.slug}>{l.icon} {l.name}</option>)}
          </select>
          <div className="flex items-center gap-3 min-w-[180px]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-bone whitespace-nowrap">Distance</span>
            <Slider value={[maxKm]} onValueChange={(v) => setMaxKm(v[0])} max={50} min={1} step={1} className="w-32" />
            <span className="text-[10px] font-mono text-iron tabular-nums">{maxKm}KM</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={scheduleMatch} onChange={e => setScheduleMatch(e.target.checked)}
              className="h-4 w-4 accent-[hsl(var(--primary))]" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-bone">Active today</span>
          </label>
          <Button variant="ghost" size="sm" onClick={reset} className="ml-auto">
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">
        <div className="mb-6 text-xs font-mono uppercase tracking-widest text-bone">
          {filtered.length} athletes locked in
        </div>
        {filtered.length === 0 ? (
          <div className="border border-hair bg-card p-12 text-center">
            <p className="font-display text-3xl text-iron">NO MATCHES.</p>
            <p className="mt-2 text-bone">"Iron sharpens iron. Widen the search and find yours."</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(a => <AthleteCard key={a.id} athlete={a} />)}
          </div>
        )}
      </section>
    </main>
  );
}