import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Check, X, Send } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ICEBREAKERS = [
  "Let's run drills this week. Same schedule, same hunger. You in?",
  "Your deadlift numbers look serious. Train together Thursday?",
  "Sparring round Saturday morning?",
];

type Msg = { id: string; sender_id: string; recipient_id: string; content: string; created_at: string };
type Thread = { other: { id: string; name: string; photo: string | null; area: string | null }; last: Msg };

export default function Messages() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const { user, loading } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(params.get("to"));
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (!loading && !user) nav("/auth", { replace: true }); }, [user, loading, nav]);

  // Load threads
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: msgs } = await supabase.from("messages").select("*")
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order("created_at", { ascending: false }).limit(200);
      if (!msgs) return;
      const byOther = new Map<string, Msg>();
      for (const m of msgs as Msg[]) {
        const other = m.sender_id === user.id ? m.recipient_id : m.sender_id;
        if (!byOther.has(other)) byOther.set(other, m);
      }
      const ids = [...byOther.keys()];
      if (ids.length === 0) { setThreads([]); return; }
      const { data: profs } = await supabase.from("profiles").select("id, full_name, photo_url, area").in("id", ids);
      const profMap = new Map((profs ?? []).map((p: any) => [p.id, p]));
      setThreads(ids.map(oid => ({
        other: { id: oid, name: profMap.get(oid)?.full_name ?? "Athlete", photo: profMap.get(oid)?.photo_url ?? null, area: profMap.get(oid)?.area ?? null },
        last: byOther.get(oid)!,
      })));
      if (!activeId && ids.length) setActiveId(ids[0]);
    })();
  }, [user]);

  // Load active thread + realtime
  useEffect(() => {
    if (!user || !activeId) return;
    (async () => {
      const { data } = await supabase.from("messages").select("*")
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${activeId}),and(sender_id.eq.${activeId},recipient_id.eq.${user.id})`)
        .order("created_at", { ascending: true });
      setMessages((data ?? []) as Msg[]);
    })();
    const ch = supabase.channel(`thread-${activeId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        const m = payload.new as Msg;
        if ((m.sender_id === user.id && m.recipient_id === activeId) || (m.sender_id === activeId && m.recipient_id === user.id)) {
          setMessages(prev => [...prev, m]);
        }
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user, activeId]);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }); }, [messages]);

  const active = useMemo(() => threads.find(t => t.other.id === activeId), [threads, activeId]);

  const send = async () => {
    if (!user || !activeId || !text.trim()) return;
    const content = text.trim();
    setText("");
    const { error } = await supabase.from("messages").insert({ sender_id: user.id, recipient_id: activeId, content });
    if (error) toast.error(error.message);
  };

  return (
    <main className="bg-deep min-h-screen">
      <section className="border-b border-hair bg-card grain">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-blood">Inbox</div>
          <h1 className="mt-2 display-lg text-iron">YOUR <span className="text-blood">CIRCLE</span></h1>
          <p className="mt-3 text-sm text-bone">Direct messages with athletes. Realtime. Encrypted in transit.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl grid gap-0 md:grid-cols-[320px_1fr] border-l border-r border-hair">
          {/* List */}
          <aside className="border-r border-hair bg-card">
            {threads.length === 0 ? (
              <div className="p-6 text-center">
                <p className="font-display text-xl text-iron">NO THREADS YET.</p>
                <p className="mt-2 text-xs text-bone">Find an athlete and start a session proposal.</p>
                <Button asChild variant="blood" size="sm" className="mt-4"><Link to="/discover">Discover →</Link></Button>
              </div>
            ) : threads.map(t => (
              <button key={t.other.id} onClick={() => setActiveId(t.other.id)}
                className={`w-full flex items-center gap-3 p-4 border-b border-hair text-left transition-colors ${
                  activeId === t.other.id ? "bg-elev" : "hover:bg-elev/50"
                }`}>
                {t.other.photo
                  ? <img src={t.other.photo} alt="" className="h-10 w-10 object-cover" />
                  : <div className="h-10 w-10 bg-elev border border-hair grid place-items-center text-xs font-mono text-iron">{t.other.name[0]}</div>}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-iron truncate">{t.other.name}</div>
                  <div className="text-[11px] font-mono text-bone truncate">{t.last.content}</div>
                </div>
              </button>
            ))}
          </aside>

          {/* Chat */}
          <div className="flex flex-col bg-deep min-h-[60vh]">
            {active ? (
              <>
                <div className="flex items-center gap-3 border-b border-hair p-4 bg-card">
                  {active.other.photo
                    ? <img src={active.other.photo} alt="" className="h-9 w-9 object-cover" />
                    : <div className="h-9 w-9 bg-elev border border-hair grid place-items-center text-xs font-mono text-iron">{active.other.name[0]}</div>}
                  <div>
                    <div className="text-sm font-bold text-iron">{active.other.name}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-bone">{active.other.area ?? "—"}</div>
                  </div>
                </div>

                <div ref={scrollRef} className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[60vh]">
                  {messages.map(m => (
                    <div key={m.id} className={m.sender_id === user!.id
                      ? "ml-auto max-w-xs bg-blood text-white p-3 text-sm"
                      : "max-w-xs border border-hair bg-card p-3 text-sm text-iron"}>
                      {m.content}
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p className="text-center text-xs font-mono uppercase tracking-widest text-bone">Send the first message. Set the tone.</p>
                  )}
                </div>

                <div className="border-t border-hair p-3 bg-card">
                  <div className="flex items-center gap-2">
                    <Input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Send a message…" className="bg-deep border-hair rounded-none h-10" />
                    <Button variant="blood" size="sm" onClick={send}><Send className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid place-items-center flex-1 text-center p-10">
                <div>
                  <p className="font-display text-3xl text-iron">PICK A THREAD.</p>
                  <p className="mt-2 text-bone">Or start one from an athlete's profile.</p>
                </div>
              </div>
            )}
          </div>
        </section>
    </main>
  );
}