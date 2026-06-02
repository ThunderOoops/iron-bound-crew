import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { IbEvent } from "@/data/events";

type DbEvent = {
  id: string;
  slug: string;
  host_id: string | null;
  host_name: string;
  host_rating: number;
  host_verified: boolean;
  name: string;
  type: string;
  sport: string;
  date: string;
  city: string;
  venue: string;
  address: string;
  fee: number;
  prize_pool: number | null;
  spots: number;
  format: string | null;
  level: string | null;
  description: string | null;
  rules: string | null;
  schedule: any;
  banner_url: string | null;
};

export function dbToIbEvent(e: DbEvent, registeredCount = 0): IbEvent & { host_id: string | null } {
  return {
    id: e.id,
    slug: e.slug,
    name: e.name,
    type: e.type as IbEvent["type"],
    sport: e.sport,
    date: e.date,
    city: e.city,
    venue: e.venue,
    address: e.address,
    distanceKm: 0,
    fee: e.fee,
    prizePool: e.prize_pool ?? undefined,
    spots: e.spots,
    registered: registeredCount,
    format: e.format ?? "",
    level: e.level ?? "",
    hostId: e.host_id ?? "system",
    hostName: e.host_name,
    hostRating: Number(e.host_rating),
    hostVerified: e.host_verified,
    description: e.description ?? "",
    rules: e.rules ?? "",
    schedule: Array.isArray(e.schedule) ? e.schedule : [],
    banner: e.banner_url ?? "",
    host_id: e.host_id,
  };
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const [evRes, ctRes] = await Promise.all([
        supabase.from("events").select("*").eq("is_published", true).order("date", { ascending: true }),
        supabase.from("event_counts").select("*"),
      ]);
      if (evRes.error) throw evRes.error;
      const counts = new Map<string, number>((ctRes.data ?? []).map((c: any) => [c.event_id, c.registered_count]));
      return (evRes.data as DbEvent[]).map(e => dbToIbEvent(e, counts.get(e.id) ?? 0));
    },
  });
}

export function useEvent(slug: string | undefined) {
  return useQuery({
    queryKey: ["event", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").eq("slug", slug!).maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const { data: ct } = await supabase.from("event_counts").select("registered_count").eq("event_id", data.id).maybeSingle();
      return dbToIbEvent(data as DbEvent, ct?.registered_count ?? 0);
    },
  });
}