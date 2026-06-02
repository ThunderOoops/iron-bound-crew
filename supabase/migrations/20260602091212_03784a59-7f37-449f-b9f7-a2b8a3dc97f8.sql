
-- Recreate view as security_invoker (no SECURITY DEFINER semantics)
DROP VIEW IF EXISTS public.event_counts;
CREATE VIEW public.event_counts WITH (security_invoker = true) AS
  SELECT event_id, COUNT(*)::int AS registered_count
  FROM public.event_registrations
  GROUP BY event_id;
GRANT SELECT ON public.event_counts TO anon, authenticated;

-- Lock down SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;

-- Touch function uses no schema lookups but set search_path anyway
ALTER FUNCTION public.touch_updated_at() SET search_path = public;
