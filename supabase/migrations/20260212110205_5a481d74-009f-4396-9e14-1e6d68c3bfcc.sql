
-- Roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: admins can read all, users can read own
CREATE POLICY "Admins can read all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can read own role"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Campers table
CREATE TABLE public.campers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  daily_price NUMERIC NOT NULL DEFAULT 0,
  high_season_price NUMERIC NOT NULL DEFAULT 0,
  deposit NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.campers ENABLE ROW LEVEL SECURITY;

-- Campers: anyone can read active, admins can do everything
CREATE POLICY "Anyone can read active campers"
ON public.campers FOR SELECT
USING (status = 'active');

CREATE POLICY "Admins can read all campers"
ON public.campers FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert campers"
ON public.campers FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update campers"
ON public.campers FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete campers"
ON public.campers FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Bookings table
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  camper_id UUID NOT NULL REFERENCES public.campers(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Bookings: admins full access, anon can insert (public booking form)
CREATE POLICY "Admins can manage all bookings"
ON public.bookings FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create a booking"
ON public.bookings FOR INSERT
TO anon
WITH CHECK (true);

-- Function to prevent double bookings
CREATE OR REPLACE FUNCTION public.check_booking_conflict()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.bookings
    WHERE camper_id = NEW.camper_id
      AND status != 'cancelled'
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000')
      AND NEW.start_date <= end_date
      AND NEW.end_date >= start_date
  ) THEN
    RAISE EXCEPTION 'Date già prenotate per questo camper.';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER check_booking_conflict_trigger
BEFORE INSERT OR UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.check_booking_conflict();

-- Seed campers data
INSERT INTO public.campers (name, description, daily_price, high_season_price, deposit, status) VALUES
  ('Knaus Sun Traveller', 'Camper mansardato 6 posti', 119, 110, 1500, 'active'),
  ('Rimor Europeo NG6', 'Camper mansardato 6 posti spazioso', 99, 110, 1500, 'active'),
  ('Roller Team Autoroller 2', 'Camper mansardato con garage', 89, 110, 1500, 'active');
