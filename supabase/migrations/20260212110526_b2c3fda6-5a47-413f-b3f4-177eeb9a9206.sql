
-- Replace overly permissive anon insert policy with a more restrictive one
DROP POLICY "Anyone can create a booking" ON public.bookings;

CREATE POLICY "Anyone can create a pending booking"
ON public.bookings FOR INSERT
TO anon
WITH CHECK (
  status = 'pending'
  AND customer_name IS NOT NULL
  AND customer_email IS NOT NULL
  AND start_date IS NOT NULL
  AND end_date IS NOT NULL
  AND camper_id IS NOT NULL
);
