import { LEVELS, LevelSlug } from "@/data/sports";

const tones: Record<LevelSlug, string> = {
  beginner:     "border-level-beginner/60 text-level-beginner bg-level-beginner/10",
  intermediate: "border-level-intermediate/60 text-[hsl(var(--level-intermediate))] bg-[hsl(var(--level-intermediate)/0.12)]",
  advanced:     "border-level-advanced/60 text-[hsl(var(--level-advanced))] bg-[hsl(var(--level-advanced)/0.12)]",
  athlete:      "border-level-athlete/60 text-[hsl(var(--level-athlete))] bg-[hsl(var(--level-athlete)/0.15)]",
};

export function LevelBadge({ level }: { level: LevelSlug }) {
  const meta = LEVELS.find(l => l.slug === level)!;
  return (
    <span className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${tones[level]}`}>
      <span aria-hidden>{meta.icon}</span>{meta.name}
    </span>
  );
}