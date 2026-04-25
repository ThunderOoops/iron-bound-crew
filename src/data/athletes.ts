import { LevelSlug } from "./sports";

export type Athlete = {
  id: string;
  username: string;
  name: string;
  age: number;
  city: string;
  area: string;
  distanceKm: number;
  photo: string;
  sports: string[];           // sport slugs
  level: LevelSlug;
  intensity: "casual" | "moderate" | "beast";
  tagline: string;
  bio: string;
  days: string[];             // day abbreviations
  time: string;               // time slug
  frequency: string;
  match: number;              // 0–100
  activeToday: boolean;
  verified: boolean;
  topHost: boolean;
  streak: number;
  challenges: number;
  attended: number;
  hosted: number;
};

const photo = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=600&q=70`;

export const ATHLETES: Athlete[] = [
  {
    id: "a1", username: "ironraj", name: "Rahul Mehta", age: 27,
    city: "Hyderabad", area: "Gachibowli", distanceKm: 2.4,
    photo: photo("photo-1571019613454-1cb2f99b2d8b"),
    sports: ["mma","boxing","powerlifting"], level: "athlete", intensity: "beast",
    tagline: "5AM lifter. 3-plate club. No rest days.",
    bio: "Cage fighter prepping for state-level MMA. Looking for sparring partners and lifting accountability.",
    days: ["Mon","Tue","Wed","Thu","Fri","Sat"], time: "early", frequency: "Daily",
    match: 92, activeToday: true, verified: true, topHost: true, streak: 47, challenges: 28, attended: 14, hosted: 4,
  },
  {
    id: "a2", username: "deadliftqueen", name: "Aisha Khan", age: 24,
    city: "Mumbai", area: "Bandra West", distanceKm: 1.1,
    photo: photo("photo-1517836357463-d25dfeac3438"),
    sports: ["powerlifting","gym"], level: "advanced", intensity: "beast",
    tagline: "180kg deadlift. Built quiet. Lift loud.",
    bio: "Powerlifter chasing nationals 2026. Disciplined programming, no chit-chat between sets.",
    days: ["Mon","Wed","Fri","Sat"], time: "evening", frequency: "5–6x week",
    match: 88, activeToday: true, verified: true, topHost: false, streak: 31, challenges: 17, attended: 9, hosted: 1,
  },
  {
    id: "a3", username: "trailwolf", name: "Vikram Rao", age: 31,
    city: "Bangalore", area: "Indiranagar", distanceKm: 4.8,
    photo: photo("photo-1502767089025-6572583495b9"),
    sports: ["trail-running","marathon","hiking"], level: "athlete", intensity: "beast",
    tagline: "Sub-3 marathon. The hills owe me nothing.",
    bio: "Ultra-runner. Looking for long-run partners on weekends. 25–40k pace 4:30/km.",
    days: ["Tue","Thu","Sat","Sun"], time: "early", frequency: "5–6x week",
    match: 78, activeToday: false, verified: true, topHost: false, streak: 22, challenges: 9, attended: 6, hosted: 2,
  },
  {
    id: "a4", username: "calibeast", name: "Neha Patel", age: 22,
    city: "Delhi", area: "Hauz Khas", distanceKm: 6.2,
    photo: photo("photo-1544005313-94ddf0286df2"),
    sports: ["calisthenics","gym"], level: "advanced", intensity: "moderate",
    tagline: "Bodyweight only. Levers and limits.",
    bio: "Front lever, planche, muscle-ups. Park training crew always welcome.",
    days: ["Mon","Tue","Thu","Sat","Sun"], time: "morning", frequency: "5–6x week",
    match: 81, activeToday: true, verified: false, topHost: false, streak: 19, challenges: 12, attended: 4, hosted: 0,
  },
  {
    id: "a5", username: "ringgeneral", name: "Arjun Sethi", age: 29,
    city: "Hyderabad", area: "Banjara Hills", distanceKm: 5.0,
    photo: photo("photo-1500648767791-00dcc994a43e"),
    sports: ["boxing","cardio"], level: "intermediate", intensity: "beast",
    tagline: "12 rounds. Then we talk.",
    bio: "Amateur boxer. Need a sparring partner who can take work and not skip Mondays.",
    days: ["Mon","Wed","Fri"], time: "evening", frequency: "3–4x week",
    match: 74, activeToday: false, verified: false, topHost: false, streak: 9, challenges: 5, attended: 3, hosted: 0,
  },
  {
    id: "a6", username: "matkiller", name: "Sanya Iyer", age: 26,
    city: "Bangalore", area: "Koramangala", distanceKm: 3.3,
    photo: photo("photo-1438761681033-6461ffad8d80"),
    sports: ["bjj","wrestling"], level: "advanced", intensity: "beast",
    tagline: "Blue belt. No tap. Earn the position.",
    bio: "Daily rolls. Looking for technical partners — drilling first, then live.",
    days: ["Mon","Tue","Wed","Thu","Fri","Sat"], time: "evening", frequency: "Daily",
    match: 85, activeToday: true, verified: true, topHost: false, streak: 38, challenges: 21, attended: 8, hosted: 1,
  },
  {
    id: "a7", username: "spinkings", name: "Rohan Das", age: 33,
    city: "Mumbai", area: "Powai", distanceKm: 9.4,
    photo: photo("photo-1492562080023-ab3db95bfbce"),
    sports: ["cycling","triathlon","swimming"], level: "athlete", intensity: "beast",
    tagline: "200km Sundays. Hills are home.",
    bio: "Triathlete training for Goa Ironman 70.3. Looking for ride and swim partners.",
    days: ["Wed","Fri","Sun"], time: "early", frequency: "5–6x week",
    match: 70, activeToday: false, verified: true, topHost: true, streak: 26, challenges: 14, attended: 11, hosted: 5,
  },
  {
    id: "a8", username: "powerwalk", name: "Priya Singh", age: 41,
    city: "Delhi", area: "Lodhi Garden", distanceKm: 2.0,
    photo: photo("photo-1487412720507-e7ab37603c6f"),
    sports: ["walking","yoga","cardio"], level: "intermediate", intensity: "moderate",
    tagline: "10k steps. Dawn pace. Don't slow me down.",
    bio: "Daily power walker. Looking for women's morning crew at Lodhi Garden.",
    days: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], time: "early", frequency: "Daily",
    match: 66, activeToday: true, verified: false, topHost: false, streak: 88, challenges: 6, attended: 2, hosted: 0,
  },
  {
    id: "a9", username: "courtking", name: "Karan Joshi", age: 25,
    city: "Hyderabad", area: "Madhapur", distanceKm: 3.7,
    photo: photo("photo-1547425260-76bcadfb4f2c"),
    sports: ["basketball","cardio","gym"], level: "advanced", intensity: "moderate",
    tagline: "Pickup at 6. Bring shoes or stay home.",
    bio: "Run pickup five nights a week. Always need 4 more solid players.",
    days: ["Mon","Tue","Wed","Thu","Fri"], time: "evening", frequency: "5–6x week",
    match: 72, activeToday: true, verified: false, topHost: true, streak: 14, challenges: 19, attended: 7, hosted: 6,
  },
  {
    id: "a10", username: "climbher", name: "Maya Reddy", age: 28,
    city: "Bangalore", area: "Whitefield", distanceKm: 11.2,
    photo: photo("photo-1521146764736-56c929d59c83"),
    sports: ["climbing","calisthenics","yoga"], level: "advanced", intensity: "moderate",
    tagline: "V6 boulderer. Crimps over comfort.",
    bio: "Looking for climbing partners — gym mid-week, outdoor weekends. Hampi trips planned.",
    days: ["Tue","Thu","Sat","Sun"], time: "evening", frequency: "3–4x week",
    match: 79, activeToday: false, verified: true, topHost: false, streak: 12, challenges: 8, attended: 5, hosted: 1,
  },
  {
    id: "a11", username: "pitchwolf", name: "Aman Verma", age: 23,
    city: "Delhi", area: "Saket", distanceKm: 8.0,
    photo: photo("photo-1531123897727-8f129e1688ce"),
    sports: ["football","running","gym"], level: "advanced", intensity: "beast",
    tagline: "Box-to-box. Ninety minutes. Every time.",
    bio: "Sunday league regular. Looking for 5-a-side and 7-a-side teams in South Delhi.",
    days: ["Wed","Sat","Sun"], time: "evening", frequency: "3–4x week",
    match: 68, activeToday: true, verified: false, topHost: false, streak: 17, challenges: 11, attended: 4, hosted: 0,
  },
  {
    id: "a12", username: "lanesharkk", name: "Tara Menon", age: 30,
    city: "Mumbai", area: "Andheri West", distanceKm: 5.6,
    photo: photo("photo-1524504388940-b1c1722653e1"),
    sports: ["swimming","triathlon","running"], level: "intermediate", intensity: "moderate",
    tagline: "Lap counter. Don't drift in my lane.",
    bio: "Masters swimmer 4x/week. Pool partner for 5am sets at Otters Club.",
    days: ["Mon","Tue","Thu","Fri"], time: "early", frequency: "5–6x week",
    match: 64, activeToday: false, verified: false, topHost: false, streak: 21, challenges: 4, attended: 2, hosted: 0,
  },
];

export const athleteByUsername = (u: string) => ATHLETES.find(a => a.username === u);