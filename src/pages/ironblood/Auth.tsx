import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ironblood/Logo";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function Auth() {
  const nav = useNavigate();
  const { user, profile, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) nav(profile?.onboarded ? "/dashboard" : "/onboarding", { replace: true });
  }, [user, profile, loading, nav]);

  const oauth = async (provider: "google" | "apple") => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin + "/auth" });
    if (result.error) { toast.error(result.error.message ?? "OAuth failed"); setBusy(false); return; }
    if (result.redirected) return;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/auth", data: { full_name: name } },
        });
        if (error) throw error;
        toast.success("Welcome to the arena. Forging your profile…");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err.message ?? "Auth failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center bg-deep grain px-4 py-10">
      <div className="w-full max-w-md border border-hair bg-card p-8">
        <Logo />
        <h1 className="mt-8 display-md text-iron">
          {mode === "signup" ? "ENTER THE ARENA." : "WELCOME BACK."}
        </h1>
        <p className="mt-2 text-sm text-bone">No tourists. No spectators. Athletes only.</p>

        <div className="mt-6 space-y-2">
          <Button onClick={() => oauth("google")} disabled={busy} variant="outline" size="lg" className="w-full">
            Continue with Google
          </Button>
          <Button onClick={() => oauth("apple")} disabled={busy} variant="outline" size="lg" className="w-full">
            Continue with Apple
          </Button>
        </div>

        <div className="my-6 flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-bone">
          <span className="h-px flex-1 bg-hair" /> or email <span className="h-px flex-1 bg-hair" />
        </div>

        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <Input value={name} onChange={e => setName(e.target.value)} required placeholder="Full name" className="bg-deep border-hair rounded-none h-11" />
          )}
          <Input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Email" className="bg-deep border-hair rounded-none h-11" />
          <Input value={password} onChange={e => setPassword(e.target.value)} type="password" required minLength={6} placeholder="Password (min 6 chars)" className="bg-deep border-hair rounded-none h-11" />
          <Button type="submit" disabled={busy} variant="blood" size="lg" className="w-full">
            {busy ? "…" : mode === "signup" ? "Forge My Profile" : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-bone">
          {mode === "signup" ? "Already in the circle? " : "New to IRONBLOOD? "}
          <button onClick={() => setMode(mode === "signup" ? "signin" : "signup")} className="text-blood hover:underline">
            {mode === "signup" ? "Sign in" : "Forge a profile"}
          </button>
        </p>
        <p className="mt-4 text-center text-[10px] font-mono uppercase tracking-widest text-bone">
          <Link to="/" className="hover:text-iron">← Back to home</Link>
        </p>
      </div>
    </main>
  );
}