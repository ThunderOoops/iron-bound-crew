import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SPORTS } from "@/data/sports";
import { ArrowLeft, ArrowRight, Check, Swords, Users, Trophy, ListChecks } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const STEPS = ["Type","Details","Date & Place","Pricing","Review"] as const;

const TYPES = [
  { id: "competition", label: "Competition", desc: "Paid or free, structured, ranked.", Icon: Swords },
  { id: "session",     label: "Group Session", desc: "Casual training. Free or paid.",  Icon: Users },
  { id: "tournament",  label: "Tournament", desc: "Multi-round bracket battle.",        Icon: Trophy },
  { id: "tryout",      label: "Tryout / Selection", desc: "Open or invite-based.",      Icon: ListChecks },
];

export default function Host() {
  const nav = useNavigate();
  const { user, profile, loading } = useAuth();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({
    type: "competition", paid: true, fee: 500, prizePool: 0,
    name: "", sport: "", short: "", description: "", format: "",
    date: "", time: "", venue: "", address: "", spots: 30,
  });
  const [published, setPublished] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) nav("/auth", { replace: true });
  }, [user, loading, nav]);

  const publish = async () => {
    if (!user) return;
    if (!data.name || !data.sport || !data.date) {
      toast.error("Name, sport, and date are required.");
      return;
    }
    setBusy(true);
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) + "-" + Date.now().toString(36);
    const dateIso = new Date(`${data.date}T${data.time || "10:00"}`).toISOString();
    const { error } = await supabase.from("events").insert({
      slug,
      host_id: user.id,
      host_name: profile?.full_name ?? "Host",
      host_verified: profile?.is_verified ?? false,
      name: data.name,
      type: data.type,
      sport: data.sport,
      date: dateIso,
      city: data.venue.split(",").pop()?.trim() || "—",
      venue: data.venue || "TBD",
      address: data.address || data.venue || "TBD",
      fee: data.paid ? Number(data.fee) || 0 : 0,
      prize_pool: data.paid && data.prizePool ? Number(data.prizePool) : null,
      spots: Number(data.spots) || 30,
      format: data.format || null,
      description: data.description || null,
      rules: data.short || null,
      schedule: [],
      banner_url: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=1400&q=70",
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    setPublishedSlug(slug);
    setPublished(true);
    toast.success("Your arena is live.");
  };

  if (published) {
    return (
      <main className="min-h-screen grid place-items-center bg-deep grain px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center border border-blood/60 bg-blood/10 text-blood mb-6">
            <Check className="h-7 w-7" />
          </div>
          <h1 className="display-lg text-iron">YOUR ARENA <span className="text-blood">IS OPEN.</span></h1>
          <p className="mt-3 text-bone">Share the link. Fill the spots. Run the day.</p>
          <div className="mt-6 flex items-center gap-2 border border-hair bg-card px-3 py-3">
            <code className="flex-1 text-xs font-mono text-iron truncate">{window.location.origin}/events/{publishedSlug}</code>
            <Button size="sm" variant="bloodOutline" onClick={() => navigator.clipboard.writeText(`${window.location.origin}/events/${publishedSlug}`)}>Copy</Button>
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <Button asChild variant="blood"><Link to="/dashboard/host">Open Host Dashboard</Link></Button>
            <Button asChild variant="outline"><Link to={`/events/${publishedSlug}`}>View Event</Link></Button>
          </div>
        </div>
      </main>
    );
  }

  const pct = ((step + 1) / STEPS.length) * 100;

  if (step === -1) { setStep(0); }

  return (
    <main className="min-h-screen bg-deep">
      {/* Intro */}
      {step === 0 ? (
        <section className="relative grain border-b border-hair bg-card">
          <div className="mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-24">
            <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-blood">Host</div>
            <h1 className="mt-4 display-xl text-iron leading-[0.9]">YOU SET THE RULES.<br /><span className="text-blood">WE FILL THE ARENA.</span></h1>
            <p className="mt-6 max-w-2xl text-bone">Create your competition or group session. Set your entry fee. Collect payments. IRONBLOOD handles registrations.</p>
            <p className="mt-3 text-xs font-mono uppercase tracking-widest text-bone">Platform retains 10% of entry fees · You receive 90%.</p>
          </div>
        </section>
      ) : null}

      <div className="sticky top-16 z-20 border-b border-hair bg-deep/90 backdrop-blur">
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-4 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-bone">Step {step+1}/{STEPS.length} · {STEPS[step]}</span>
          <Button asChild variant="ghost" size="sm"><Link to="/dashboard/host">Host Dashboard →</Link></Button>
        </div>
        <div className="h-[2px] bg-hair">
          <div className="h-full bg-blood transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 md:px-6 py-12 space-y-8">
        {step === 0 && (
          <div>
            <h2 className="display-md text-iron">CHOOSE YOUR <span className="text-blood">FORMAT</span></h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {TYPES.map(t => (
                <button key={t.id} onClick={() => setData({ ...data, type: t.id })}
                  className={`flex items-start gap-4 border bg-card p-5 text-left transition-all ${
                    data.type === t.id ? "border-blood shadow-[0_0_22px_hsl(var(--primary)/0.35)]" : "border-hair hover:border-iron/40"
                  }`}>
                  <div className="inline-flex h-10 w-10 items-center justify-center border border-blood/40 bg-blood/10 text-blood"><t.Icon className="h-4 w-4" /></div>
                  <div>
                    <div className="font-display text-2xl text-iron leading-none">{t.label.toUpperCase()}</div>
                    <p className="mt-1 text-xs text-bone">{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <h2 className="display-md text-iron">EVENT <span className="text-blood">DETAILS</span></h2>
            <Input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} placeholder="Event name (e.g. Mumbai Iron Cup)" className="bg-card border-hair h-12 rounded-none" />
            <select value={data.sport} onChange={e => setData({ ...data, sport: e.target.value })} className="w-full h-12 rounded-none border border-hair bg-card px-3 text-sm text-iron focus:border-blood outline-none">
              <option value="">Select sport</option>
              {SPORTS.map(s => <option key={s.slug} value={s.slug}>{s.emoji} {s.name}</option>)}
            </select>
            <Input value={data.short} onChange={e => setData({ ...data, short: e.target.value })} placeholder="Rules / one-line summary" className="bg-card border-hair h-12 rounded-none" />
            <Textarea value={data.description} onChange={e => setData({ ...data, description: e.target.value })} placeholder="Full description, what to bring..." className="bg-card border-hair rounded-none min-h-32" />
            <Input value={data.format} onChange={e => setData({ ...data, format: e.target.value })} placeholder="Format (1v1 · Team · Open)" className="bg-card border-hair h-12 rounded-none" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="display-md text-iron">DATE & <span className="text-blood">PLACE</span></h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input value={data.date} onChange={e => setData({ ...data, date: e.target.value })} type="date" className="bg-card border-hair h-12 rounded-none" />
              <Input value={data.time} onChange={e => setData({ ...data, time: e.target.value })} type="time" className="bg-card border-hair h-12 rounded-none" />
            </div>
            <Input value={data.venue} onChange={e => setData({ ...data, venue: e.target.value })} placeholder="Venue name + city" className="bg-card border-hair h-12 rounded-none" />
            <Input value={data.address} onChange={e => setData({ ...data, address: e.target.value })} placeholder="Full address" className="bg-card border-hair h-12 rounded-none" />
            <Input value={data.spots} onChange={e => setData({ ...data, spots: e.target.value })} type="number" min={2} max={500} placeholder="Max participants (2–500)" className="bg-card border-hair h-12 rounded-none" />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="display-md text-iron">SET YOUR <span className="text-blood">PRICE</span></h2>
            <div className="inline-flex border border-hair">
              {[
                { id: false, label: "Free Event" },
                { id: true,  label: "Paid Entry" },
              ].map(o => (
                <button key={String(o.id)} onClick={() => setData({ ...data, paid: o.id })}
                  className={`px-5 h-11 text-xs font-bold uppercase tracking-widest ${
                    data.paid === o.id ? "bg-blood text-white" : "bg-card text-bone hover:text-iron"
                  }`}>{o.label}</button>
              ))}
            </div>
            {data.paid && (
              <>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-widest text-bone">Entry fee (₹)</label>
                    <Input type="number" defaultValue={data.fee} onChange={e => setData({ ...data, fee: +e.target.value })} className="mt-2 bg-card border-hair h-12 rounded-none" />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-widest text-bone">Prize pool (₹) — optional</label>
                    <Input type="number" placeholder="0" value={data.prizePool} onChange={e => setData({ ...data, prizePool: +e.target.value })} className="mt-2 bg-card border-hair h-12 rounded-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-widest text-bone">Refund policy</label>
                  <select className="mt-2 w-full h-12 rounded-none border border-hair bg-card px-3 text-sm text-iron focus:border-blood outline-none">
                    <option>No refund</option>
                    <option>24h refund window</option>
                    <option>48h refund window</option>
                  </select>
                </div>
                <div className="border border-blood/30 bg-card p-4 text-xs text-bone">
                  <span className="text-blood font-bold uppercase tracking-widest">Platform fee:</span> IRONBLOOD retains <span className="text-iron">10%</span> of entry fees. You receive <span className="text-iron">90%</span>.
                </div>
                <Input placeholder="Payout UPI / bank account" className="bg-card border-hair h-12 rounded-none" />
              </>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h2 className="display-md text-iron">REVIEW & <span className="text-blood">PUBLISH</span></h2>
            <div className="border border-hair bg-card p-6 space-y-3">
              <div className="font-display text-3xl text-iron">YOUR EVENT, YOUR ARENA.</div>
              <p className="text-sm text-bone">Once published, registrations open immediately. You can edit details until 24 hours before start.</p>
              <ul className="text-xs font-mono uppercase tracking-widest text-bone space-y-1">
                <li>Type · <span className="text-iron">{data.type}</span></li>
                <li>Pricing · <span className="text-iron">{data.paid ? `₹${data.fee}` : "FREE"}</span></li>
              </ul>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <Button variant="ghost" onClick={() => setStep(Math.max(0, step-1))}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button variant="blood" size="lg" onClick={() => setStep(step+1)}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="blood" size="lg" disabled={busy} onClick={publish}>
              {busy ? "Publishing…" : "Publish Event"}
            </Button>
          )}
        </div>
      </section>
    </main>
  );
}