-- JBNet43 Database Schema
-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  address TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default services
INSERT INTO public.services (name, description, icon) VALUES
  ('Nettoyage de bureaux', 'Entretien complet de vos espaces professionnels', 'building'),
  ('Nettoyage de vitres', 'Vitres impeccables pour une vue parfaite', 'sparkles'),
  ('Service à la personne', 'Aide à domicile personnalisée', 'heart'),
  ('Fin de chantier', 'Nettoyage après travaux de construction', 'hard-hat')
ON CONFLICT DO NOTHING;

-- Appointments/Bookings table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'quote_requested', 'quote_sent', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  scheduled_date DATE,
  scheduled_time TIME,
  duration_hours DECIMAL(4,2),
  price DECIMAL(10,2),
  address TEXT NOT NULL,
  notes TEXT,
  photos TEXT[], -- Array of photo URLs
  is_first_time BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote requests table (for first-time clients)
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id),
  address TEXT NOT NULL,
  description TEXT NOT NULL,
  photos TEXT[],
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'quoted', 'accepted', 'rejected')),
  proposed_price DECIMAL(10,2),
  proposed_duration_hours DECIMAL(4,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  pdf_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Services policies (public read)
CREATE POLICY "Anyone can view services" ON public.services
  FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Appointments policies
CREATE POLICY "Clients can view their own appointments" ON public.appointments
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Clients can insert their own appointments" ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update their own appointments" ON public.appointments
  FOR UPDATE USING (auth.uid() = client_id);

CREATE POLICY "Admins can view all appointments" ON public.appointments
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can manage all appointments" ON public.appointments
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Quote requests policies
CREATE POLICY "Clients can view their own quote requests" ON public.quote_requests
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Clients can insert their own quote requests" ON public.quote_requests
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Admins can view all quote requests" ON public.quote_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can manage all quote requests" ON public.quote_requests
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Invoices policies
CREATE POLICY "Clients can view their own invoices" ON public.invoices
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Admins can view all invoices" ON public.invoices
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can manage all invoices" ON public.invoices
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
