export function SectionHeading({
  eyebrow, title, subtitle, align = "left",
}: { eyebrow?: string; title: string; subtitle?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <div className={`flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-blood ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-6 bg-blood" />{eyebrow}<span className="h-px w-6 bg-blood" />
        </div>
      )}
      <h2 className="display-md mt-3 text-iron">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-bone text-base">{subtitle}</p>}
    </div>
  );
}