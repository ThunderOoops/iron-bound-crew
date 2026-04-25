import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SPORTS, LEVELS, TIMES, DAYS } from "@/data/sports";
import { ArrowLeft, ArrowRight, MapPin, Upload, Check } from "lucide-react";
import { Logo } from "@/components/ironblood/Logo";

const STEPS = ["Identity", "Battlefield", "Schedule", "Location", "Intent"] as const;

function Tile({ active, children, onClick }: any) {
  return (
    <button type="button" onClick={onClick}
      className={`group flex flex-col items-start gap-1 border bg-card p-3 text-left transition-all ${
        active ? "border-blood shadow-[0_0_18px_hsl(var(--primary)/0.35)]" : "border-hair hover:border-iron/40"
      }`}>
      {children}
    </button>
  );
}

export default function Onboarding() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({
    sports: [] as string[],
    days: [] as string[],
    intents: [] as string[],
    level: "",
    time: "",
    intensity: "",
  });

  const toggle = (k: string, v: string) => setData((d: any) => ({
    ...d, [k]: d[k].includes(v) ? d[k].filter((x: string) => x !== v) : [...d[k], v],
  }));

  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <main className="min-h-screen bg-deep grain">
      <div className="border-b border-hair bg-deep/80 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-4 flex items-center justify-between">
          <Logo />
          <span className="text-[10px] font-mono uppercase tracking-widest text-bone">
            Step {step+1} / {STEPS.length} · {STEPS[step]}
          </span>
        </div>
        <div className="h-[2px] bg-hair">
          <div className="h-full bg-blood transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 md:px-6 py-12">
        {step === 0 && (
          <section className="space-y-6">
            <h1 className="display-lg text-iron">WHO ARE YOU, <span className="text-blood">ATHLETE?</span></h1>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Full name" className="bg-card border-hair h-12 rounded-none" />
              <Input placeholder="Age" type="number" className="bg-card border-hair h-12 rounded-none" />
            </div>
            <label className="flex items-center gap-3 border border-dashed border-hair bg-card p-6 cursor-pointer hover:border-blood/60 transition-colors">
              <Upload className="h-5 w-5 text-blood" />
              <div>
                <div className="text-sm font-bold uppercase tracking-widest text-iron">Upload profile photo</div>
                <div className="text-xs text-bone">Square. No filters. Show up real.</div>
              </div>
              <input type="file" className="hidden" />
            </label>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-bone mb-2">Tagline</div>
              <Input placeholder='e.g. "5AM lifter. 3-plate club. No rest days."'
                className="bg-card border-hair h-12 rounded-none" />
              <div className="mt-1 text-xs text-bone">One line. Who are you in the gym?</div>
            </div>
          </section>
        )}

        {step === 1 && (
          <section className="space-y-6">
            <h1 className="display-lg text-iron">YOUR <span className="text-blood">BATTLEFIELD</span></h1>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-bone mb-3">Sports — pick all that apply</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {SPORTS.map(s => (
                  <Tile key={s.slug} active={data.sports.includes(s.slug)} onClick={() => toggle("sports", s.slug)}>
                    <span className="text-xl">{s.emoji}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-iron">{s.name}</span>
                  </Tile>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-bone mb-3">Experience level</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {LEVELS.map(l => (
                  <Tile key={l.slug} active={data.level === l.slug} onClick={() => setData((d:any) => ({ ...d, level: l.slug }))}>
                    <span className="text-xl">{l.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-iron">{l.name}</span>
                  </Tile>
                ))}
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-6">
            <h1 className="display-lg text-iron">YOUR <span className="text-blood">SCHEDULE</span></h1>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-bone mb-3">Training days</div>
              <div className="flex flex-wrap gap-2">
                {DAYS.map(d => {
                  const on = data.days.includes(d);
                  return (
                    <button key={d} type="button" onClick={() => toggle("days", d)}
                      className={`px-4 h-10 text-xs font-bold uppercase tracking-widest border transition-all ${
                        on ? "bg-blood text-white border-blood" : "bg-card text-bone border-hair hover:text-iron"
                      }`}>{d}</button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-bone mb-3">Preferred time</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {TIMES.map(t => (
                  <Tile key={t.slug} active={data.time === t.slug} onClick={() => setData((d:any) => ({ ...d, time: t.slug }))}>
                    <span className="text-xl">{t.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-iron">{t.name}</span>
                    <span className="text-[10px] font-mono text-bone">{t.range}</span>
                  </Tile>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-bone mb-3">Frequency</div>
              <div className="flex flex-wrap gap-2">
                {["Daily","5–6x week","3–4x week","1–2x week"].map(f => (
                  <button key={f} type="button"
                    className="px-4 h-10 text-xs font-bold uppercase tracking-widest border bg-card text-bone border-hair hover:border-blood/60 hover:text-iron">
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="space-y-6">
            <h1 className="display-lg text-iron">WHERE DO YOU <span className="text-blood">TRAIN?</span></h1>
            <div className="border border-blood/40 bg-card p-6 grain">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center border border-blood/60 bg-blood/10 text-blood">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl text-iron">ALLOW LOCATION</h3>
                  <p className="mt-1 text-sm text-bone">
                    We use your location to find athletes and competitions in your area.
                    We only store city-level data — never your exact address.
                  </p>
                  <Button variant="blood" className="mt-4"
                    onClick={() => navigator.geolocation && navigator.geolocation.getCurrentPosition(()=>{})}>
                    Allow Location Access
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input placeholder="City / area" className="bg-card border-hair h-12 rounded-none" />
              <Input placeholder="Preferred venue (optional)" className="bg-card border-hair h-12 rounded-none" />
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="space-y-6">
            <h1 className="display-lg text-iron">YOUR <span className="text-blood">INTENT</span></h1>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-bone mb-3">What are you here for?</div>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { id: "partner", label: "Find a Training Partner", icon: "🤝" },
                  { id: "compete", label: "Find Local Competitions", icon: "⚔️" },
                  { id: "host", label: "Host My Own Event", icon: "🏟️" },
                  { id: "community", label: "Join a Sports Community", icon: "💬" },
                ].map(o => (
                  <Tile key={o.id} active={data.intents.includes(o.id)} onClick={() => toggle("intents", o.id)}>
                    <span className="text-xl">{o.icon}</span>
                    <span className="text-sm font-bold uppercase tracking-wider text-iron">{o.label}</span>
                  </Tile>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-bone mb-3">Intensity match</div>
              <div className="grid grid-cols-3 gap-2">
                {["Casual","Moderate","Beast Mode"].map(i => (
                  <Tile key={i} active={data.intensity === i} onClick={() => setData((d:any) => ({ ...d, intensity: i }))}>
                    <span className="text-sm font-bold uppercase tracking-wider text-iron">{i}</span>
                  </Tile>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Nav */}
        <div className="mt-12 flex items-center justify-between">
          <Button variant="ghost" onClick={() => step === 0 ? nav("/") : setStep(step-1)}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button variant="blood" size="lg" onClick={() => setStep(step+1)}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="blood" size="lg" onClick={() => nav("/dashboard?welcome=1")}>
              <Check className="h-4 w-4" /> Enter the Circle
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}