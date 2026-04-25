import { NavLink, useLocation } from "react-router-dom";
import { Home, Search, Swords, MessageSquare, User } from "lucide-react";

const tabs = [
  { to: "/dashboard",  label: "Home",     Icon: Home },
  { to: "/discover",   label: "Athletes", Icon: Search },
  { to: "/events",     label: "Events",   Icon: Swords },
  { to: "/messages",   label: "Messages", Icon: MessageSquare },
  { to: "/dashboard",  label: "Profile",  Icon: User, end: false, alt: true },
];

export function MobileTabBar() {
  const { pathname } = useLocation();
  if (pathname === "/" || pathname === "/onboarding" || pathname.startsWith("/auth")) return null;
  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-hair bg-deep/95 backdrop-blur">
      <ul className="grid grid-cols-5">
        {tabs.map(({ to, label, Icon }) => (
          <li key={label}>
            <NavLink to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                  isActive ? "text-blood" : "text-bone"
                }`
              }>
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}