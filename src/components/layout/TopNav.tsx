import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "@/components/ironblood/Logo";
import { Bell, MessageSquare, User } from "lucide-react";

const links = [
  { to: "/discover", label: "Discover" },
  { to: "/events",   label: "Events" },
  { to: "/host",     label: "Host" },
  { to: "/leaderboard", label: "Leaderboard" },
];

export function TopNav() {
  const { pathname } = useLocation();
  if (pathname === "/onboarding" || pathname.startsWith("/auth")) return null;
  return (
    <header className="sticky top-0 z-40 border-b border-hair bg-deep/85 backdrop-blur supports-[backdrop-filter]:bg-deep/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <NavLink key={l.to} to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                  isActive ? "text-blood" : "text-bone hover:text-iron"
                }`
              }>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link to="/messages" className="hidden md:inline-flex h-10 w-10 items-center justify-center text-bone hover:text-blood transition-colors relative">
            <MessageSquare className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 bg-blood" />
          </Link>
          <button className="hidden md:inline-flex h-10 w-10 items-center justify-center text-bone hover:text-blood transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <Link to="/dashboard" className="inline-flex h-10 items-center gap-2 border border-hair bg-elev px-3 text-xs font-mono uppercase tracking-widest text-iron hover:border-blood/60 hover:text-blood transition-colors">
            <User className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </div>
      </div>
    </header>
  );
}