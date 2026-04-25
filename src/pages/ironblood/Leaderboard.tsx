import { useState } from "react";
import { ATHLETES } from "@/data/athletes";
import { Link } from "react-router-dom";

type Tab = "attended" | "hosts" | "streak";

const tabs: { id: Tab; label: string; key: keyof typeof ATHLETES[number] }[] = [
  { id: "attended", label: "Most Events Attended", key: "attended" },
  { id: "hosts",    label: "Top Hosts",            key: "hosted" },
  { id: "streak",   label: "Longest Streak",       key: "streak" },
];

export default function Leaderboard() {
  const [tab, setTab] = useState<Tab>("attended");
  const meta = tabs.find(t => t.id === tab)!;
  const sorted = [...ATHLETES].sort((a,b) => (b[meta.key] as number) - (a[meta.key] as number));

  return (
    <main className="bg-deep min-h-screen">
      <section className="border-b border-hair bg-card grain">
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-10 md:py-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-blood">Leaderboard</div>
          <h1 className="mt-2 display-lg text-iron">THE <span className="text-blood">RANKINGS</span></h1>

          <div className="mt-6 inline-flex border border-hair flex-wrap">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-4 h-11 text-xs font-bold uppercase tracking-widest ${
                  tab === t.id ? "bg-blood text-white" : "bg-card text-bone hover:text-iron"
                }`}>{t.label}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 md:px-6 py-10">
        <div className="border border-hair bg-card divide-y divide-hair">
          {sorted.map((a, i) => {
            const tone = i === 0 ? "border-l-gold" : i === 1 ? "border-l-bone" : i === 2 ? "border-l-[#a06434]" : "border-l-transparent";
            return (
              <Link key={a.id} to={`/athlete/${a.username}`}
                className={`flex items-center gap-4 p-4 border-l-4 ${tone} hover:bg-elev/40 transition-colors`}>
                <span className="font-mono w-8 text-iron tabular-nums">#{i+1}</span>
                <img src={a.photo} alt="" className="h-10 w-10 object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-iron truncate">{a.name}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-bone">{a.city} · {a.sports[0]}</div>
                </div>
                <div className="font-display text-2xl text-blood tabular-nums">{a[meta.key] as number}</div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}