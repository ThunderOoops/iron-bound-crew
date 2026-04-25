import { useState } from "react";
import { ATHLETES } from "@/data/athletes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Check, X, Send } from "lucide-react";
import { Link } from "react-router-dom";

const ICEBREAKERS = [
  "Let's run drills this week. Same schedule, same hunger. You in?",
  "Your deadlift numbers look serious. Train together Thursday?",
  "Sparring round Saturday morning?",
];

export default function Messages() {
  const [tab, setTab] = useState<"messages"|"challenges">("messages");
  const [active, setActive] = useState(ATHLETES[0]);
  const conversations = ATHLETES.slice(0, 6);
  const challenges = ATHLETES.slice(6, 10);

  return (
    <main className="bg-deep min-h-screen">
      <section className="border-b border-hair bg-card grain">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-blood">Inbox</div>
          <h1 className="mt-2 display-lg text-iron">YOUR <span className="text-blood">CIRCLE</span></h1>
          <div className="mt-6 inline-flex border border-hair">
            {[
              { id: "messages",   label: "Messages" },
              { id: "challenges", label: "Challenges" },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id as any)}
                className={`px-5 h-11 text-xs font-bold uppercase tracking-widest ${
                  tab === t.id ? "bg-blood text-white" : "bg-card text-bone hover:text-iron"
                }`}>{t.label}</button>
            ))}
          </div>
        </div>
      </section>

      {tab === "messages" ? (
        <section className="mx-auto max-w-7xl grid gap-0 md:grid-cols-[320px_1fr] border-l border-r border-hair">
          {/* List */}
          <aside className="border-r border-hair bg-card">
            {conversations.map(c => (
              <button key={c.id} onClick={() => setActive(c)}
                className={`w-full flex items-center gap-3 p-4 border-b border-hair text-left transition-colors ${
                  active.id === c.id ? "bg-elev" : "hover:bg-elev/50"
                }`}>
                <img src={c.photo} alt="" className="h-10 w-10 object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-iron truncate">{c.name}</div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-bone truncate">{c.tagline}</div>
                </div>
                {c.activeToday && <span className="h-2 w-2 bg-blood" />}
              </button>
            ))}
          </aside>

          {/* Chat */}
          <div className="flex flex-col bg-deep min-h-[60vh]">
            <div className="flex items-center gap-3 border-b border-hair p-4 bg-card">
              <img src={active.photo} alt="" className="h-9 w-9 object-cover" />
              <div>
                <div className="text-sm font-bold text-iron">{active.name}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-bone">{active.area} · {active.distanceKm} km</div>
              </div>
              <div className="ml-auto"><Button variant="bloodOutline" size="sm" asChild><Link to={`/athlete/${active.username}`}>Profile</Link></Button></div>
            </div>

            <div className="flex-1 p-4 space-y-3">
              <div className="max-w-xs border border-hair bg-card p-3 text-sm text-iron">Yo. Saw your profile. You sparring this week?</div>
              <div className="ml-auto max-w-xs bg-blood text-white p-3 text-sm">Tuesday 7pm. Bring headgear.</div>
              {/* Session proposal card */}
              <div className="max-w-md border border-blood/40 bg-card p-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-blood mb-2">Session Proposal</div>
                <div className="font-display text-xl text-iron">SPARRING · TUE 7PM</div>
                <div className="text-xs text-bone">South Side Boxing Club · Jubilee Hills</div>
                <div className="mt-3 flex gap-2">
                  <Button variant="blood" size="sm"><Check className="h-3.5 w-3.5" /> Accept</Button>
                  <Button variant="outline" size="sm"><X className="h-3.5 w-3.5" /> Decline</Button>
                </div>
              </div>
            </div>

            <div className="border-t border-hair p-3 bg-card space-y-2">
              <div className="flex flex-wrap gap-2">
                {ICEBREAKERS.map((q,i) => (
                  <button key={i} className="text-[11px] font-mono uppercase tracking-widest border border-hair bg-deep text-bone px-2 py-1 hover:border-blood/60 hover:text-blood">
                    {q.length > 40 ? q.slice(0,40)+"…" : q}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm"><Calendar className="h-3.5 w-3.5" /> Propose Session</Button>
                <Input placeholder="Send a message…" className="bg-deep border-hair rounded-none h-10" />
                <Button variant="blood" size="sm"><Send className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-4 md:px-6 py-10 space-y-3">
          {challenges.map(c => (
            <div key={c.id} className="border border-hair bg-card p-4 flex items-center gap-4 glow-red-hover">
              <img src={c.photo} alt="" className="h-14 w-14 object-cover" />
              <div className="flex-1">
                <div className="font-bold text-iron">{c.name} <span className="text-bone font-normal">· {c.area}</span></div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-bone">{c.sports[0]} · Compatibility {c.match}%</div>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <Button variant="blood" size="sm"><Check className="h-3.5 w-3.5" /> Accept</Button>
                <Button variant="outline" size="sm"><X className="h-3.5 w-3.5" /> Decline</Button>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}