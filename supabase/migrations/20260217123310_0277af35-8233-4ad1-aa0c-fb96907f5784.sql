
-- Add new columns to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS terms_accepted_at timestamptz,
ADD COLUMN IF NOT EXISTS terms_accepted_ip text,
ADD COLUMN IF NOT EXISTS payment_type text CHECK (payment_type IN ('deposit', 'full', NULL)),
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'partial', 'paid')),
ADD COLUMN IF NOT EXISTS stripe_session_id text,
ADD COLUMN IF NOT EXISTS amount_paid numeric DEFAULT 0;

-- Update the anonymous insert policy to allow the new fields
DROP POLICY IF EXISTS "Anyone can create a pending booking" ON public.bookings;

CREATE POLICY "Anyone can create a pending booking"
ON public.bookings
FOR INSERT
WITH CHECK (
  status = 'pending'
  AND customer_name IS NOT NULL
  AND customer_email IS NOT NULL
  AND start_date IS NOT NULL
  AND end_date IS NOT NULL
  AND camper_id IS NOT NULL
  AND terms_accepted_at IS NOT NULL
);
