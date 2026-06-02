
-- ============== ROLES ==============
CREATE TYPE public.app_role AS ENUM ('admin', 'host', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- ============== PROFILES ==============
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  age int,
  city text,
  area text,
  photo_url text,
  sports text[] DEFAULT '{}',
  level text,
  intensity text,
  tagline text,
  bio text,
  days text[] DEFAULT '{}',
  time_pref text,
  frequency text,
  intents text[] DEFAULT '{}',
  is_hidden boolean NOT NULL DEFAULT false,
  is_verified boolean NOT NULL DEFAULT false,
  onboarded boolean NOT NULL DEFAULT false,
  streak int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles visible to all" ON public.profiles FOR SELECT USING (is_hidden = false OR id = auth.uid());
CREATE POLICY "users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- ============== EVENTS ==============
CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  host_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  host_name text NOT NULL,
  host_rating numeric DEFAULT 5.0,
  host_verified boolean DEFAULT false,
  name text NOT NULL,
  type text NOT NULL,
  sport text NOT NULL,
  date timestamptz NOT NULL,
  city text NOT NULL,
  venue text NOT NULL,
  address text NOT NULL,
  fee int NOT NULL DEFAULT 0,
  prize_pool int,
  spots int NOT NULL DEFAULT 20,
  format text,
  level text,
  description text,
  rules text,
  schedule jsonb DEFAULT '[]'::jsonb,
  banner_url text,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX events_date_idx ON public.events(date);
CREATE INDEX events_sport_idx ON public.events(sport);
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events public read" ON public.events FOR SELECT USING (is_published = true);
CREATE POLICY "users create events" ON public.events FOR INSERT TO authenticated WITH CHECK (host_id = auth.uid());
CREATE POLICY "host can update own events" ON public.events FOR UPDATE TO authenticated USING (host_id = auth.uid());
CREATE POLICY "host can delete own events" ON public.events FOR DELETE TO authenticated USING (host_id = auth.uid());

-- ============== EVENT REGISTRATIONS ==============
CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'registered',
  paid_amount int DEFAULT 0,
  stripe_session_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (event_id, user_id)
);
CREATE INDEX reg_event_idx ON public.event_registrations(event_id);
CREATE INDEX reg_user_idx ON public.event_registrations(user_id);
GRANT SELECT, INSERT, DELETE ON public.event_registrations TO authenticated;
GRANT ALL ON public.event_registrations TO service_role;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users see own registrations" ON public.event_registrations FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.events e WHERE e.id = event_id AND e.host_id = auth.uid()));
CREATE POLICY "users register self" ON public.event_registrations FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "users unregister self" ON public.event_registrations FOR DELETE TO authenticated USING (user_id = auth.uid());

-- registration counts view
CREATE OR REPLACE VIEW public.event_counts AS
  SELECT event_id, COUNT(*)::int AS registered_count
  FROM public.event_registrations
  GROUP BY event_id;
GRANT SELECT ON public.event_counts TO anon, authenticated;

-- ============== MESSAGES ==============
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipient_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX messages_pair_idx ON public.messages(sender_id, recipient_id, created_at DESC);
GRANT SELECT, INSERT ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users see own threads" ON public.messages FOR SELECT TO authenticated
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());
CREATE POLICY "users send messages" ON public.messages FOR INSERT TO authenticated
  WITH CHECK (sender_id = auth.uid());

ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- ============== AUTO PROFILE + ROLE TRIGGER ==============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, photo_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER events_touch BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
