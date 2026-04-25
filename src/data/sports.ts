// All sports & fitness disciplines on IRONBLOOD.
// Expanded per user: walks, marathons, calisthenics, gym, cardio + more.
export type Sport = {
  slug: string;
  name: string;
  emoji: string;
  group: "combat" | "strength" | "endurance" | "team" | "lifestyle";
};

export const SPORTS: Sport[] = [
  { slug: "mma",            name: "MMA",                 emoji: "⚔️", group: "combat" },
  { slug: "boxing",         name: "Boxing",              emoji: "🥊", group: "combat" },
  { slug: "bjj",            name: "BJJ",                 emoji: "🥋", group: "combat" },
  { slug: "wrestling",      name: "Wrestling",           emoji: "🤼", group: "combat" },
  { slug: "muay-thai",      name: "Muay Thai",           emoji: "🦵", group: "combat" },
  { slug: "powerlifting",   name: "Powerlifting",        emoji: "🏋️", group: "strength" },
  { slug: "weightlifting",  name: "Olympic Lifting",     emoji: "🏋️‍♂️", group: "strength" },
  { slug: "bodybuilding",   name: "Bodybuilding",        emoji: "💪", group: "strength" },
  { slug: "gym",            name: "Gym / Hypertrophy",   emoji: "🏟️", group: "strength" },
  { slug: "calisthenics",   name: "Calisthenics",        emoji: "🤸", group: "strength" },
  { slug: "crossfit",       name: "CrossFit",            emoji: "🔥", group: "strength" },
  { slug: "running",        name: "Running",             emoji: "🏃", group: "endurance" },
  { slug: "marathon",       name: "Marathon",            emoji: "🏅", group: "endurance" },
  { slug: "trail-running",  name: "Trail Running",       emoji: "⛰️", group: "endurance" },
  { slug: "sprinting",      name: "Sprinting",           emoji: "💨", group: "endurance" },
  { slug: "walking",        name: "Power Walking",       emoji: "🚶", group: "lifestyle" },
  { slug: "hiking",         name: "Hiking",              emoji: "🥾", group: "lifestyle" },
  { slug: "cardio",         name: "Cardio HIIT",         emoji: "❤️‍🔥", group: "endurance" },
  { slug: "cycling",        name: "Cycling",             emoji: "🚴", group: "endurance" },
  { slug: "swimming",       name: "Swimming",            emoji: "🏊", group: "endurance" },
  { slug: "triathlon",      name: "Triathlon",           emoji: "🏆", group: "endurance" },
  { slug: "rowing",         name: "Rowing",              emoji: "🚣", group: "endurance" },
  { slug: "climbing",       name: "Climbing",            emoji: "🧗", group: "lifestyle" },
  { slug: "yoga",           name: "Yoga / Mobility",     emoji: "🧘", group: "lifestyle" },
  { slug: "football",       name: "Football",            emoji: "⚽", group: "team" },
  { slug: "basketball",     name: "Basketball",          emoji: "⛹️", group: "team" },
  { slug: "american-football", name: "American Football", emoji: "🏈", group: "team" },
  { slug: "tennis",         name: "Tennis",              emoji: "🎾", group: "team" },
  { slug: "badminton",      name: "Badminton",           emoji: "🏸", group: "team" },
  { slug: "volleyball",     name: "Volleyball",          emoji: "🏐", group: "team" },
  { slug: "cricket",        name: "Cricket",             emoji: "🏏", group: "team" },
  { slug: "table-tennis",   name: "Table Tennis",        emoji: "🏓", group: "team" },
];

export const sportBySlug = (slug: string) => SPORTS.find(s => s.slug === slug);

export const LEVELS = [
  { slug: "beginner",     name: "Beginner",      icon: "🔰", token: "level-beginner" },
  { slug: "intermediate", name: "Intermediate",  icon: "⚡", token: "level-intermediate" },
  { slug: "advanced",     name: "Advanced",      icon: "💪", token: "level-advanced" },
  { slug: "athlete",      name: "Competitive Athlete", icon: "🏆", token: "level-athlete" },
] as const;

export type LevelSlug = typeof LEVELS[number]["slug"];

export const TIMES = [
  { slug: "early",   name: "Early Morning",  range: "4–7am",  icon: "☀️" },
  { slug: "morning", name: "Morning",        range: "7–10am", icon: "🌅" },
  { slug: "midday",  name: "Midday",         range: "10–2pm", icon: "🕛" },
  { slug: "evening", name: "Evening",        range: "5–8pm",  icon: "🌇" },
  { slug: "night",   name: "Night",          range: "8–11pm", icon: "🌙" },
  { slug: "flex",    name: "Flexible",       range: "anytime", icon: "⚡" },
];

export const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] as const;
export type Day = typeof DAYS[number];

export const MANIFESTOS = [
  "Comfort is the enemy of progress.",
  "Champions train. Legends compete.",
  "Pain is temporary. Your PR is forever.",
  "The grind doesn't care about your mood.",
  "Iron sharpens iron. Find yours.",
  "Excuses don't lift the bar.",
  "Soft minds build soft bodies.",
  "The work is the reward.",
  "Show up. Or stay average.",
  "No one is coming. Train.",
  "Discipline outlasts motivation.",
  "Your only opponent is yesterday.",
  "Sweat now. Glory later.",
  "Rest is for the dead.",
  "Earn the right to be tired.",
  "Every rep is a vote for who you become.",
  "The arena doesn't lie.",
  "Quiet mind. Loud body.",
  "Train so the world has to deal with you.",
  "Hard work has no shortcut.",
  "Build the body the mind deserves.",
  "Failure is data. Use it.",
  "Pressure is a privilege.",
  "The grind is the gift.",
  "Outwork your doubt.",
  "Comfortable people don't make history.",
  "You vs. you. Always.",
  "The pack runs harder.",
  "No mood is bigger than the mission.",
  "Iron in. Iron out.",
];