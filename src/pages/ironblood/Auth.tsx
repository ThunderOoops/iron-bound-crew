import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ironblood/Logo";

export default function Auth() {
  const nav = useNavigate();
  return (
    <main className="min-h-screen grid place-items-center bg-deep grain px-4">
      <div className="w-full max-w-md border border-hair bg-card p-8">
        <Logo />
        <h1 className="mt-8 display-md text-iron">ENTER THE ARENA.</h1>
        <p className="mt-2 text-sm text-bone">No tourists. No spectators. Athletes only.</p>

        <Button onClick={() => nav("/onboarding")} variant="outline" size="lg" className="mt-8 w-full">
          Continue with Google
        </Button>

        <div className="my-6 flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-bone">
          <span className="h-px flex-1 bg-hair" /> or email <span className="h-px flex-1 bg-hair" />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); nav("/onboarding"); }} className="space-y-3">
          <Input type="email" required placeholder="Email" className="bg-deep border-hair rounded-none h-11" />
          <Input type="password" required placeholder="Password" className="bg-deep border-hair rounded-none h-11" />
          <Button variant="blood" size="lg" className="w-full">Forge My Profile</Button>
        </form>

        <p className="mt-6 text-center text-xs text-bone">
          Already in the circle? <Link to="/dashboard" className="text-blood hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
}