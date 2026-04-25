import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SportsMarquee } from "@/components/ironblood/SportsMarquee";
import { CountUp } from "@/components/ironblood/CountUp";
import { SectionHeading } from "@/components/ironblood/SectionHeading";
import { EventCard } from "@/components/ironblood/EventCard";
import { EVENTS } from "@/data/events";
import { ArrowRight, MapPin, Swords, Users, Trophy, Flame, Quote } from "lucide-react";

export default function Landing() {
  const featured = EVENTS.slice(0, 3);

  return (
    <main className="bg-deep">
      {/* HERO */}
      <section className="relative isolate overflow-hidden grain min-h-[88vh] flex items-center">
        {/* Background particles */}
        <div aria-hidden className="absolute inset-0">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blood/10 blur-3xl animate-drift" />
          <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-blood/[0.07] blur-3xl animate-drift" style={{ animationDelay: "-6s" }} />
          <div className="absolute inset-0 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:80px_80px] opacity-[0.18]" />
          {/* Floating geometric */}
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i}
              className="absolute block bg-hair animate-drift"
              style={{
                left: `${(i*53) % 100}%`,
                top: `${(i*37) % 100}%`,
                width: `${4 + (i%4)*3}px`,
                height: `${4 + (i%4)*3}px`,
                animationDelay: `${-i * 1.7}s`,
                opacity: 0.35,
              }} />
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.4em] text-blood">
            <span className="h-px w-8 bg-blood" /> Underground sports network
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-6 display-xl text-iron">
            FIND YOUR<br />
            <span className="text-blood">IRON CIRCLE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-6 max-w-xl text-base md:text-lg text-bone">
            Connect with athletes near you. Train together. Compete harder. <span className="text-iron">No excuses.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild variant="blood" size="lg" className="group">
              <Link to="/discover">Find a Training Partner <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/host">Host a Competition</Link>
            </Button>
          </motion.div>

          <button
            onClick={() => navigator.geolocation && navigator.geolocation.getCurrentPosition(() => {})}
            className="mt-6 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-bone hover:text-blood transition-colors">
            <MapPin className="h-3.5 w-3.5" /> Allow location to find athletes near you
          </button>

          {/* Side ornament */}
          <div className="absolute right-6 bottom-6 hidden md:flex flex-col items-end gap-2 text-right">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-bone">Forged for</span>
            <span className="font-display text-3xl text-iron leading-none">THE PACK<br /><span className="text-blood">— NOT THE CROWD.</span></span>
          </div>
        </div>

        {/* bottom edge ticker */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blood to-transparent" />
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-hair bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-hair">
          {[
            { v: 12400, suffix: "+", label: "Athletes" },
            { v: 880,   suffix: "+", label: "Events Hosted" },
            { v: 32,    suffix: "+", label: "Sports & Disciplines" },
            { v: 95,    suffix: "%", label: "Show Up Rate" },
          ].map((s, i) => (
            <div key={i} className="px-6 py-8 md:py-10">
              <div className="text-4xl md:text-5xl text-blood"><CountUp to={s.v} suffix={s.suffix} /></div>
              <div className="mt-1 text-[11px] font-mono uppercase tracking-[0.25em] text-bone">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
        <SectionHeading eyebrow="How It Works" title="TWO PATHS. ONE ARENA." subtitle="Find your training partner. Or build the next battle ground. Either way — you stop training alone." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              icon: Users, title: "FIND A PARTNER",
              steps: [
                "Build your athlete profile",
                "Share your location (city-level only)",
                "Get matched with nearby athletes",
                "Connect and train IRL",
              ],
            },
            {
              icon: Swords, title: "HOST A COMPETITION",
              steps: [
                "Create your event listing",
                "Set your entry fee & rules",
                "Accept registrations & payments",
                "Run the event. Winner takes glory.",
              ],
            },
          ].map(({ icon: Icon, title, steps }) => (
            <div key={title} className="relative border border-hair bg-card p-8 glow-red-hover">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center border border-blood/40 bg-blood/10 text-blood"><Icon className="h-5 w-5" /></div>
                <h3 className="font-display text-3xl text-iron">{title}</h3>
              </div>
              <ol className="mt-8 space-y-4">
                {steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-mono text-blood text-sm w-6 shrink-0 pt-0.5">0{i+1}</span>
                    <span className="text-iron">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* SPORTS MARQUEE */}
      <SportsMarquee />

      {/* FEATURED EVENTS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow="Featured" title="UPCOMING BATTLES NEAR YOU" />
          <Link to="/events" className="hidden md:inline-flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-blood hover:text-iron transition-colors">
            View All Events <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map(e => <EventCard key={e.id} event={e} />)}
        </div>
        <div className="mt-8 md:hidden">
          <Button asChild variant="bloodOutline" size="lg" className="w-full">
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative grain border-y border-hair bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.22),transparent_70%)] py-24 md:py-36">
        <div className="mx-auto max-w-5xl px-4 md:px-6 text-center">
          <Flame className="mx-auto h-8 w-8 text-blood" />
          <h2 className="mt-6 display-xl text-iron leading-[0.9]">
            THE WEAK TRAIN ALONE.<br />
            <span className="text-blood">THE STRONG FIND THEIR PACK.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-bone">
            IRONBLOOD connects real athletes for real sessions. No DMs that go nowhere.
            No missed gym days. Just iron and results.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Button asChild variant="blood" size="lg"><Link to="/discover">Enter the Arena</Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/events">Browse Battles</Link></Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
        <SectionHeading eyebrow="From the Pack" title="WHAT ATHLETES SAY" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { name: "Rahul M.", sport: "MMA Fighter", city: "Hyderabad", q: "Found my sparring partner in 48 hours. We train 5x a week now. This app changed my prep." },
            { name: "Aisha K.", sport: "Powerlifter", city: "Mumbai", q: "Hosted my first deadlift meet through IRONBLOOD. Sold out in 4 days. Payouts hit clean." },
            { name: "Vikram R.", sport: "Marathoner", city: "Bangalore", q: "Sunday long runs used to be solo. Now we're a pack of seven, 35k every week. No drop-offs." },
          ].map((t, i) => (
            <figure key={i} className="border border-hair bg-card p-6 glow-red-hover">
              <Quote className="h-5 w-5 text-blood" />
              <blockquote className="mt-4 text-iron leading-relaxed">"{t.q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="inline-flex h-9 w-9 items-center justify-center border border-hair bg-elev font-mono text-xs text-iron">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-bold text-iron">{t.name}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-bone">{t.sport} · {t.city}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-hair bg-card">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-blood">
              <Trophy className="h-3.5 w-3.5" /> Free to join
            </div>
            <h3 className="mt-3 display-md text-iron">YOU. TRAINING. NOW.</h3>
          </div>
          <Button asChild variant="blood" size="xl">
            <Link to="/onboarding">Enter the Arena</Link>
          </Button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-hair bg-deep">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-display text-2xl text-iron">IRON<span className="text-blood">BLOOD</span></div>
            <p className="mt-2 text-xs font-mono uppercase tracking-widest text-bone">© 2025 IRONBLOOD. Built for athletes.</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest text-bone">
            <Link to="/discover" className="hover:text-blood">Discover</Link>
            <Link to="/events" className="hover:text-blood">Events</Link>
            <Link to="/host" className="hover:text-blood">Host</Link>
            <Link to="/leaderboard" className="hover:text-blood">Leaderboard</Link>
            <a href="#" className="hover:text-blood">Safety</a>
            <a href="#" className="hover:text-blood">Terms</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}