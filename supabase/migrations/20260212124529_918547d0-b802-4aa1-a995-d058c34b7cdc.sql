
-- Add database-level validation constraints for bookings
-- Note: email format is lenient to allow synthetic import emails like "yescapa@import"
ALTER TABLE public.bookings ADD CONSTRAINT customer_name_length
  CHECK (length(customer_name) BETWEEN 1 AND 500);

ALTER TABLE public.bookings ADD CONSTRAINT customer_email_length
  CHECK (length(customer_email) BETWEEN 1 AND 255);

ALTER TABLE public.bookings ADD CONSTRAINT total_price_non_negative
  CHECK (total_price >= 0);

ALTER TABLE public.bookings ADD CONSTRAINT valid_date_range
  CHECK (end_date >= start_date);
