/*
  # Add test data for caregivers and clients

  1. Test Data
    - Add 50+ caregiver profiles with realistic data
    - Add test client profiles
    - Add sample reviews and ratings
*/

-- Insert test caregivers
INSERT INTO caregivers (name, email, phone, bio, profile_image, years_experience, background_check_verified, languages)
SELECT
  'Caregiver ' || i,
  'caregiver' || i || '@example.com',
  '+1' || (FLOOR(RANDOM() * 900) + 100)::text || (FLOOR(RANDOM() * 900) + 100)::text || (FLOOR(RANDOM() * 9000) + 1000)::text,
  'Experienced caregiver with a passion for helping others. Specialized in ' || 
    CASE (i % 4) 
      WHEN 0 THEN 'elderly care'
      WHEN 1 THEN 'child care'
      WHEN 2 THEN 'special needs care'
      ELSE 'medical care'
    END,
  'https://images.unsplash.com/photo-' || (1500000000 + i * 1000)::text || '?w=400&h=400&fit=crop',
  (FLOOR(RANDOM() * 15) + 2)::integer,
  CASE WHEN RANDOM() > 0.2 THEN true ELSE false END,
  ARRAY[
    'English',
    CASE WHEN i % 3 = 0 THEN 'Spanish' ELSE NULL END,
    CASE WHEN i % 4 = 0 THEN 'French' ELSE NULL END,
    CASE WHEN i % 5 = 0 THEN 'Mandarin' ELSE NULL END
  ]
FROM generate_series(1, 50) i;

-- Insert test caregiver services with rates
INSERT INTO caregiver_services (caregiver_id, service_id, hourly_rate, holiday_rate)
SELECT 
  c.id,
  s.id,
  (FLOOR(RANDOM() * 40) + 20)::decimal,
  (FLOOR(RANDOM() * 60) + 30)::decimal
FROM caregivers c
CROSS JOIN services s;

-- Insert test reviews and ratings
INSERT INTO reviews (caregiver_id, client_id, positive_feedback)
SELECT
  c.id,
  auth.uid(),
  CASE (FLOOR(RANDOM() * 4))::integer
    WHEN 0 THEN 'Excellent service and very professional'
    WHEN 1 THEN 'Very caring and attentive'
    WHEN 2 THEN 'Great with special needs care'
    ELSE 'Highly recommended caregiver'
  END
FROM caregivers c
CROSS JOIN generate_series(1, 3);

-- Insert test review ratings
INSERT INTO review_ratings (review_id, category_id, rating)
SELECT
  r.id,
  rc.id,
  (FLOOR(RANDOM() * 2) + 4)::integer
FROM reviews r
CROSS JOIN review_categories rc;