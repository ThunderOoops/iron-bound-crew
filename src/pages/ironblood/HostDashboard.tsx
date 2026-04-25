import { EVENTS } from "@/data/events";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, IndianRupee, MessageSquare, X } from "lucide-react";

export default function HostDashboard() {
  const myEvents = EVENTS.slice(0, 3);
  const totalRevenue = myEvents.reduce((acc, e) => acc + e.fee * e.registered, 0);
  const platformFee = totalRevenue * 0.1;
  const earnings = totalRevenue - platformFee;

  return (
    <main className="bg-deep min-h-screen">
      <section className="border-b border-hair bg-card grain">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-blood">Host Dashboard</div>
          <h1 className="mt-2 display-lg text-iron">YOUR <span className="text-blood">ARENAS</span></h1>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { label: "Active Events", value: myEvents.length },
              { label: "Total Registrations", value: myEvents.reduce((a,e) => a+e.registered, 0) },
              { label: "Earnings", value: `₹${earnings.toLocaleString()}`, gold: true },
            ].map((s,i) => (
              <div key={i} className="border border-hair bg-deep p-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-bone">{s.label}</div>
                <div className={`mt-2 font-display text-4xl ${s.gold ? "text-gold" : "text-iron"}`}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl text-iron">YOUR EVENTS</h2>
          <Button asChild variant="blood"><Link to="/host">+ Create Event</Link></Button>
        </div>

        {myEvents.map(e => {
          const pct = Math.round((e.registered/e.spots)*100);
          return (
            <div key={e.id} className="border border-hair bg-card p-5 grid gap-4 md:grid-cols-[1fr_auto] glow-red-hover">
              <div className="space-y-3">
                <Link to={`/events/${e.slug}`} className="font-display text-2xl text-iron hover:text-blood transition-colors">{e.name.toUpperCase()}</Link>
                <div className="text-[11px] font-mono uppercase tracking-widest text-bone">
                  {e.venue} · {new Date(e.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                </div>
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-bone">
                    <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {e.registered}/{e.spots}</span>
                    <span className="text-iron">{pct}% filled</span>
                  </div>
                  <div className="mt-1 h-[3px] bg-hair"><div className="h-full bg-blood" style={{ width: `${pct}%` }} /></div>
                </div>
                {e.fee > 0 && (
                  <div className="text-xs font-mono uppercase tracking-widest text-gold inline-flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" /> {(e.fee * e.registered * 0.9).toLocaleString()} after platform fee
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 md:flex-col md:items-end">
                <Button variant="outline" size="sm"><MessageSquare className="h-3.5 w-3.5" /> Message All</Button>
                <Button variant="bloodOutline" size="sm">Mark Complete</Button>
                <Button variant="ghost" size="sm" className="text-bone hover:text-blood"><X className="h-3.5 w-3.5" /> Cancel</Button>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}