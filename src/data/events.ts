export type IbEvent = {
  id: string;
  slug: string;
  name: string;
  type: "competition" | "session" | "tournament" | "tryout";
  sport: string;             // sport slug
  date: string;              // ISO
  endTime?: string;
  city: string;
  venue: string;
  address: string;
  distanceKm: number;
  fee: number;               // 0 = free
  prizePool?: number;
  spots: number;
  registered: number;
  format: string;
  level: string;             // open / advanced etc
  hostId: string;            // athlete id
  hostName: string;
  hostRating: number;
  hostVerified: boolean;
  description: string;
  rules: string;
  schedule: { time: string; item: string }[];
  banner: string;            // gradient/photo url
};

const banner = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=70`;

export const EVENTS: IbEvent[] = [
  {
    id: "e1", slug: "hyderabad-iron-cup-deadlift",
    name: "Hyderabad Iron Cup — Deadlift Showdown",
    type: "competition", sport: "powerlifting",
    date: "2026-05-18T08:00:00",
    city: "Hyderabad", venue: "Iron Asylum Gym", address: "Plot 14, Madhapur",
    distanceKm: 3.2, fee: 500, prizePool: 15000, spots: 30, registered: 22,
    format: "Individual · 3 attempts · Max single lift",
    level: "Intermediate–Advanced",
    hostId: "a1", hostName: "Rahul Mehta", hostRating: 4.9, hostVerified: true,
    description: "Pure deadlift battle. Three attempts. Heaviest single wins. Strict judging — touch-and-go is a no lift.",
    rules: "IPF rules · Singlet optional · Belt + chalk allowed · No straps · 3 white lights required for a good lift.",
    schedule: [
      { time: "08:00", item: "Weigh-in opens" },
      { time: "09:00", item: "Warmups" },
      { time: "10:00", item: "Round 1" },
      { time: "12:00", item: "Round 2" },
      { time: "14:00", item: "Final attempts" },
      { time: "16:00", item: "Awards" },
    ],
    banner: banner("photo-1534438327276-14e5300c3a48"),
  },
  {
    id: "e2", slug: "mumbai-marathon-pack-run",
    name: "Mumbai Sea-Link 21K Pack Run",
    type: "competition", sport: "marathon",
    date: "2026-05-25T05:30:00",
    city: "Mumbai", venue: "Bandra Worli Sea-Link", address: "Bandra Promenade",
    distanceKm: 1.4, fee: 300, prizePool: 10000, spots: 200, registered: 137,
    format: "Pack run · Chip timed · Sub-2:00 cutoff",
    level: "Intermediate–Athlete",
    hostId: "a3", hostName: "Vikram Rao", hostRating: 4.8, hostVerified: true,
    description: "Half marathon along the sea-link before sunrise. Chip timed. Pace groups for 4:30/5:00/5:30 per km.",
    rules: "Closed road · Aid every 3km · Cutoff 2:00:00 · No headphones in the lead pack.",
    schedule: [
      { time: "05:00", item: "Bib pickup" },
      { time: "05:30", item: "Flag off" },
      { time: "07:30", item: "Cutoff" },
      { time: "08:00", item: "Awards + breakfast" },
    ],
    banner: banner("photo-1552674605-db6ffd4facb5"),
  },
  {
    id: "e3", slug: "bangalore-bjj-open-mat",
    name: "Bangalore BJJ Open Mat — Gi Only",
    type: "session", sport: "bjj",
    date: "2026-05-12T18:00:00",
    city: "Bangalore", venue: "Crosstrain Fight Club", address: "Indiranagar 100ft Rd",
    distanceKm: 2.1, fee: 0, spots: 40, registered: 27,
    format: "Open mat · 3 hours rolls",
    level: "All levels",
    hostId: "a6", hostName: "Sanya Iyer", hostRating: 4.9, hostVerified: true,
    description: "Free open mat. Bring a clean gi. Rolls are 6 minutes. Drilling corner runs the full session.",
    rules: "Gi only · Clean uniform · No shoes on mat · Tap early, tap often.",
    schedule: [
      { time: "18:00", item: "Warmup + drilling" },
      { time: "18:45", item: "Live rolls" },
      { time: "20:30", item: "Cooldown" },
    ],
    banner: banner("photo-1555597673-b21d5c935865"),
  },
  {
    id: "e4", slug: "delhi-calisthenics-throwdown",
    name: "Delhi Calisthenics Throwdown",
    type: "competition", sport: "calisthenics",
    date: "2026-06-02T16:00:00",
    city: "Delhi", venue: "Lodhi Garden Bar Park", address: "Lodhi Garden, Gate 3",
    distanceKm: 4.7, fee: 250, prizePool: 6000, spots: 24, registered: 9,
    format: "Skills + reps · 4 stations",
    level: "Intermediate–Advanced",
    hostId: "a4", hostName: "Neha Patel", hostRating: 4.7, hostVerified: false,
    description: "Pull-ups, dips, muscle-ups, and a static skill freestyle. Highest combined score wins.",
    rules: "Strict form · Two judges per station · No chalk on bars.",
    schedule: [
      { time: "16:00", item: "Check-in" },
      { time: "16:30", item: "Round 1 — pull-ups" },
      { time: "17:30", item: "Round 2 — muscle-ups" },
      { time: "18:30", item: "Freestyle" },
      { time: "19:30", item: "Awards" },
    ],
    banner: banner("photo-1518611012118-696072aa579a"),
  },
  {
    id: "e5", slug: "hyderabad-boxing-sparring",
    name: "Hyderabad Sparring Night — Amateur Boxing",
    type: "competition", sport: "boxing",
    date: "2026-05-22T19:00:00",
    city: "Hyderabad", venue: "South Side Boxing Club", address: "Jubilee Hills",
    distanceKm: 6.0, fee: 400, prizePool: 8000, spots: 16, registered: 11,
    format: "1v1 · 3 rounds × 2 minutes · Headgear required",
    level: "Intermediate–Advanced",
    hostId: "a5", hostName: "Arjun Sethi", hostRating: 4.6, hostVerified: true,
    description: "Controlled sparring night. 8oz gloves, headgear, mouthguard. Matched by weight. Coaches in corner.",
    rules: "Headgear + mouthguard mandatory · 3×2 rounds · Matched within 4kg · Stoppages respected immediately.",
    schedule: [
      { time: "19:00", item: "Weigh-in + matching" },
      { time: "19:30", item: "Bouts begin" },
      { time: "21:30", item: "Final card" },
    ],
    banner: banner("photo-1593079831268-3381b0db4a77"),
  },
  {
    id: "e6", slug: "mumbai-sunrise-walk",
    name: "Marine Drive Sunrise Power Walk",
    type: "session", sport: "walking",
    date: "2026-05-10T05:30:00",
    city: "Mumbai", venue: "Marine Drive — NCPA end", address: "Marine Drive Promenade",
    distanceKm: 2.9, fee: 0, spots: 60, registered: 34,
    format: "Group walk · 8km · Conversation pace",
    level: "All levels",
    hostId: "a8", hostName: "Priya Singh", hostRating: 4.8, hostVerified: false,
    description: "Free 8km sunrise power walk. Steady pace. Bring water. Coffee after at Kyani's.",
    rules: "Stay in pairs · No headphones · Cross only at signals.",
    schedule: [
      { time: "05:30", item: "Meet at NCPA end" },
      { time: "05:45", item: "Walk start" },
      { time: "07:00", item: "Coffee at Kyani's" },
    ],
    banner: banner("photo-1502904550040-7534597429ae"),
  },
  {
    id: "e7", slug: "bangalore-pickup-hoops",
    name: "Indiranagar Pickup Hoops — 5v5 Open Run",
    type: "session", sport: "basketball",
    date: "2026-05-15T18:30:00",
    city: "Bangalore", venue: "Indiranagar Club Court", address: "Indiranagar 12th Main",
    distanceKm: 4.0, fee: 0, spots: 20, registered: 13,
    format: "5v5 · Winner stays · 11 by 1s and 2s",
    level: "All levels",
    hostId: "a9", hostName: "Karan Joshi", hostRating: 4.7, hostVerified: false,
    description: "Free pickup. Show up, shoot for teams, run until the lights cut. No drama.",
    rules: "Call your own fouls · Winners stay · No ego.",
    schedule: [
      { time: "18:30", item: "Warmup + shoot for teams" },
      { time: "19:00", item: "Run start" },
      { time: "21:30", item: "Last game" },
    ],
    banner: banner("photo-1546519638-68e109498ffc"),
  },
  {
    id: "e8", slug: "delhi-crossfit-throwdown",
    name: "Delhi CrossFit Throwdown — 4 WODs",
    type: "tournament", sport: "crossfit",
    date: "2026-06-09T08:00:00",
    city: "Delhi", venue: "CrossFit DLF", address: "DLF Cyber City, Gurugram",
    distanceKm: 12.0, fee: 1200, prizePool: 30000, spots: 50, registered: 41,
    format: "Individual · 4 WODs · Top 8 final",
    level: "Advanced–Athlete",
    hostId: "a7", hostName: "Rohan Das", hostRating: 4.9, hostVerified: true,
    description: "Four programmed WODs across the day. Top 8 men + top 8 women advance to a final chipper. RX division only.",
    rules: "RX weights · Movement standards strict · Two judges per athlete.",
    schedule: [
      { time: "08:00", item: "Briefing" },
      { time: "09:00", item: "WOD 1" },
      { time: "11:00", item: "WOD 2" },
      { time: "13:30", item: "WOD 3" },
      { time: "16:00", item: "WOD 4" },
      { time: "18:00", item: "Final + awards" },
    ],
    banner: banner("photo-1517963879433-6ad2b056d712"),
  },
];

export const eventBySlug = (slug: string) => EVENTS.find(e => e.slug === slug);