import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2 ${className}`}>
      <span className="relative inline-flex h-7 w-7 items-center justify-center border border-blood/70 bg-blood/10">
        <span className="font-display text-blood text-xl leading-none">I</span>
        <span className="absolute -right-0.5 -bottom-0.5 h-1 w-1 bg-blood" />
      </span>
      <span className="font-display text-2xl tracking-wider text-iron group-hover:text-blood transition-colors">
        IRON<span className="text-blood">BLOOD</span>
      </span>
    </Link>
  );
}