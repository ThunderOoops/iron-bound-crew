import { sportBySlug } from "@/data/sports";

export function SportPill({ slug, size = "sm" }: { slug: string; size?: "sm" | "md" }) {
  const s = sportBySlug(slug);
  if (!s) return null;
  const cls = size === "md" ? "text-xs px-2.5 py-1.5" : "text-[11px] px-2 py-1";
  return (
    <span className={`inline-flex items-center gap-1.5 border border-hair bg-elev text-bone font-mono uppercase tracking-wider ${cls}`}>
      <span aria-hidden>{s.emoji}</span>
      <span>{s.name}</span>
    </span>
  );
}