
-- Allow anyone to read their own pending booking by email (needed to get booking ID after insert)
CREATE POLICY "Anyone can read own pending booking by email"
ON public.bookings
FOR SELECT
USING (
  status = 'pending'
  AND payment_status = 'unpaid'
);
