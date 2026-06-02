
# IRONBLOOD — Go Live Plan

Turn the current frontend mock into a fully dynamic, production-ready web app on Lovable Cloud, with real auth, database, realtime messaging, Stripe test-mode payments, polished animations, and seeded demo content so the site never looks empty.

## 1. Backend foundation (Lovable Cloud)

Enable Lovable Cloud, then set up:

- **Auth**: Email/password + Google + Apple (Apple requires the user to later add an Apple Services ID in Cloud → Auth; email + Google work immediately).
- **Storage**: `avatars` and `event-banners` buckets (public read, owner write).
- **Edge Functions** for Stripe (`create-payment`, `verify-payment`, `stripe-webhook`).
- **Realtime** enabled on `messages` table.

## 2. Database schema

All tables in `public` with explicit GRANTs + RLS. Roles live in a separate `user_roles` table with a `has_role()` security-definer (no recursion).

```text
profiles (1:1 auth.users) ── user_roles
   │
   ├── athlete_sports (M:N → sports lookup)
   ├── availability    (days + time blocks)
   ├── connections     (athlete ↔ athlete requests)
   └── messages        (realtime, indexed by thread)

events ── event_registrations ── payments
   │
   └── hosted_by → profiles
```

Lookup tables (`sports`, `levels`) are seeded from `src/data/sports.ts`.

Triggers:
- `handle_new_user` → auto-create `profiles` row + assign `user` role on signup.
- `updated_at` trigger on all mutable tables.

RLS summary:
- `profiles`: anyone authenticated can SELECT (discover feed), owner can UPDATE.
- `events`: public SELECT, host UPDATE/DELETE.
- `event_registrations`: owner SELECT/INSERT, host SELECT for own events.
- `messages`: only sender + recipient can SELECT/INSERT.
- `payments`: owner + service_role only.

## 3. Seed data strategy

**Hybrid (best of both)**:
- **Athletes**: start empty — real signups populate the discover feed. Until ~5 real profiles exist, the discover page auto-fills with the existing mock athletes from `src/data/athletes.ts` (rendered client-side, clearly tagged "Demo athlete — invite real ones") so the page never looks dead.
- **Events**: seed all 8 mock events from `src/data/events.ts` into the DB on first migration, attributed to a system "IRONBLOOD HQ" host. Real users can register/pay test-mode immediately.
- **Sports**: all 32 disciplines seeded as a lookup table.

## 4. Frontend wiring (page by page)

| Page | What changes |
|---|---|
| `Auth` | Real `supabase.auth` calls; Google/Apple OAuth buttons; redirect to `/onboarding` for new users, `/dashboard` for returning |
| `Onboarding` | 5-step wizard writes to `profiles`, `athlete_sports`, `availability` |
| `Discover` | Live query from `profiles` with filters (sport, city, level, intensity, distance); falls back to mock fill |
| `Events` | Live query from `events`; filters by sport/city/date/fee |
| `EventDetail` | Real registration count, capacity bar, Stripe Checkout button for paid events |
| `Host` | Inserts new event row + uploads banner to storage |
| `HostDashboard` | Queries events where `host_id = auth.uid()`, aggregates revenue from `payments` |
| `Messages` | Realtime subscription on `messages`; threads grouped by counterparty |
| `AthleteProfile` | Live profile + "Send connection request" action |
| `Dashboard` | Streak (computed from check-ins), upcoming events, manifesto of the day |
| `Leaderboard` | SQL views: top by attendance, hosting, streak — refreshed live |

## 5. Stripe payments (test mode)

Run `recommend_payment_provider` then enable Lovable's built-in Stripe (`enable_stripe_payments`). Flow:

1. User clicks **Claim Your Spot** on a paid event.
2. Frontend calls `create-payment` edge function → returns Stripe Checkout URL.
3. On success redirect → `verify-payment` confirms session + inserts `event_registrations` + `payments` rows.
4. Free events skip Stripe entirely and insert directly.
5. Refund logic: if host cancels event, webhook triggers Stripe refund on all registrations.

Test card `4242 4242 4242 4242` works out of the box. Real charging requires the user to claim their Stripe account in Cloud later.

## 6. Animation & polish pass

- Hero on `/` — Framer Motion staggered headline + animated SportsMarquee (already exists, refine timing).
- Page transitions — `AnimatePresence` wrapper in `App.tsx` with crossfade + 4px slide.
- Card hover — sharp red 1px border slide-in + scale 1.01 (no soft shadows; stays gritty).
- CountUp on Dashboard stats and Leaderboard ranks.
- Skeleton loaders (`src/components/ui/skeleton.tsx`) on every DB-fetching page so nothing flashes blank.
- Mobile-first: confirmed at 571px viewport; bottom tab bar + sheet-based filters.
- Empty states get the brand voice: "NO ATHLETES IN RANGE. WIDEN YOUR ZONE OR BE THE FIRST." with a CTA.

## 7. Safety + trust features

- Location stored as `city` + `area` strings only (no lat/lng).
- "Going Dark" toggle on profile → sets `is_hidden` boolean, filtered from discover.
- Report + block actions on every profile (writes to `reports` + `blocks` tables).
- Verified host badge driven by `profiles.is_verified` (manually flippable by admin role).

## 8. Deployment readiness

- SEO: per-page `<title>`, meta description, canonical, Open Graph image, JSON-LD `SportsEvent` schema on event detail pages, single H1 per page.
- `robots.txt` + sitemap generation from events list.
- 404 + global error boundaries.
- Lighthouse pass target: 90+ on mobile.
- Final `bunx tsc --noEmit` clean.
- Publish via Lovable (preview already at `ironbloodcrew.lovable.app`).

## Technical notes

- Stack stays Vite + React 18 + Tailwind + shadcn (no framework swap).
- Supabase client at `src/integrations/supabase/client.ts` (auto-generated when Cloud enables).
- Types generated into `src/integrations/supabase/types.ts`.
- All new colors continue to use HSL semantic tokens from `index.css`.
- Mock data files (`src/data/*.ts`) stay in repo as the fallback source for the discover feed and as the seed source for the events migration.
- Apple Sign-In requires the user to register an Apple Developer Services ID and paste it in Cloud → Auth → Apple after the build. Email + Google work without any extra setup.

## What this plan does NOT include

- Native iOS/Android wrapper (Capacitor) — defer to next phase.
- Leaflet map view — still deferred per earlier decision.
- Push notifications — needs the native shell first.
- Going live on Stripe (real charges) — requires the user to claim the Stripe account post-build.

Approve and I'll execute end-to-end in build mode.
