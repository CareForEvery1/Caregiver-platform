/*
  # Caregiver Platform Database Schema

  1. New Tables
    - qualifications
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - verification_required (boolean)
      - created_at (timestamp)
    
    - caregivers
      - id (uuid, primary key)
      - name (text)
      - email (text, unique)
      - phone (text)
      - bio (text)
      - profile_image (text)
      - years_experience (integer)
      - background_check_verified (boolean)
      - languages (text[])
      - created_at (timestamp)
    
    - caregiver_qualifications
      - id (uuid, primary key)
      - caregiver_id (uuid, foreign key)
      - qualification_id (uuid, foreign key)
      - verification_status (text)
      - verification_date (timestamp)
      - document_url (text)
      - expiry_date (timestamp)
      - created_at (timestamp)
    
    - service_areas
      - id (uuid, primary key)
      - caregiver_id (uuid, foreign key)
      - city (text)
      - state (text)
      - zip_code (text)
      - max_travel_distance (integer)
      - created_at (timestamp)
    
    - services
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - created_at (timestamp)
    
    - caregiver_services
      - id (uuid, primary key)
      - caregiver_id (uuid, foreign key)
      - service_id (uuid, foreign key)
      - hourly_rate (decimal)
      - holiday_rate (decimal)
      - currency (text)
      - created_at (timestamp)
    
    - availability
      - id (uuid, primary key)
      - caregiver_id (uuid, foreign key)
      - day_of_week (integer)
      - date (date)
      - start_time (time)
      - end_time (time)
      - is_holiday (boolean)
      - created_at (timestamp)
    
    - review_categories
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - created_at (timestamp)
    
    - reviews
      - id (uuid, primary key)
      - caregiver_id (uuid, foreign key)
      - client_id (uuid, foreign key)
      - positive_feedback (text)
      - created_at (timestamp)
    
    - review_ratings
      - id (uuid, primary key)
      - review_id (uuid, foreign key)
      - category_id (uuid, foreign key)
      - rating (integer)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for public read access where appropriate
    - Add policies for caregiver-specific access
*/

-- Create enum types
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');

-- Create tables
CREATE TABLE IF NOT EXISTS qualifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  verification_required boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS caregivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  bio text,
  profile_image text,
  years_experience integer,
  background_check_verified boolean DEFAULT false,
  languages text[],
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS caregiver_qualifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id uuid REFERENCES caregivers(id) ON DELETE CASCADE,
  qualification_id uuid REFERENCES qualifications(id) ON DELETE CASCADE,
  verification_status verification_status DEFAULT 'pending',
  verification_date timestamptz,
  document_url text,
  expiry_date timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS service_areas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id uuid REFERENCES caregivers(id) ON DELETE CASCADE,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  max_travel_distance integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS caregiver_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id uuid REFERENCES caregivers(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  hourly_rate decimal(10,2) NOT NULL,
  holiday_rate decimal(10,2),
  currency text DEFAULT 'USD',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id uuid REFERENCES caregivers(id) ON DELETE CASCADE,
  day_of_week integer CHECK (day_of_week >= 0 AND day_of_week <= 6),
  date date,
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_holiday boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_time_range CHECK (start_time < end_time)
);

CREATE TABLE IF NOT EXISTS review_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caregiver_id uuid REFERENCES caregivers(id) ON DELETE CASCADE,
  client_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  positive_feedback text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS review_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES reviews(id) ON DELETE CASCADE,
  category_id uuid REFERENCES review_categories(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Insert default review categories
INSERT INTO review_categories (name, description) VALUES
  ('Quality of Service', 'Overall quality of care provided'),
  ('Punctuality', 'Timeliness and reliability'),
  ('Courteousness', 'Politeness and respectful behavior'),
  ('Overall Behavior', 'General conduct and professionalism');

-- Enable Row Level Security
ALTER TABLE qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregiver_qualifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregiver_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_ratings ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Qualifications (public read)
CREATE POLICY "Qualifications are viewable by everyone"
  ON qualifications FOR SELECT
  TO public
  USING (true);

-- Caregivers (public read, auth write)
CREATE POLICY "Caregivers are viewable by everyone"
  ON caregivers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Caregivers can update their own profile"
  ON caregivers FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Caregiver Qualifications (public read, owner write)
CREATE POLICY "Caregiver qualifications are viewable by everyone"
  ON caregiver_qualifications FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Caregivers can manage their qualifications"
  ON caregiver_qualifications FOR ALL
  TO authenticated
  USING (auth.uid() = caregiver_id)
  WITH CHECK (auth.uid() = caregiver_id);

-- Service Areas (public read, owner write)
CREATE POLICY "Service areas are viewable by everyone"
  ON service_areas FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Caregivers can manage their service areas"
  ON service_areas FOR ALL
  TO authenticated
  USING (auth.uid() = caregiver_id)
  WITH CHECK (auth.uid() = caregiver_id);

-- Services (public read)
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  TO public
  USING (true);

-- Caregiver Services (public read, owner write)
CREATE POLICY "Caregiver services are viewable by everyone"
  ON caregiver_services FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Caregivers can manage their services"
  ON caregiver_services FOR ALL
  TO authenticated
  USING (auth.uid() = caregiver_id)
  WITH CHECK (auth.uid() = caregiver_id);

-- Availability (public read, owner write)
CREATE POLICY "Availability is viewable by everyone"
  ON availability FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Caregivers can manage their availability"
  ON availability FOR ALL
  TO authenticated
  USING (auth.uid() = caregiver_id)
  WITH CHECK (auth.uid() = caregiver_id);

-- Review Categories (public read)
CREATE POLICY "Review categories are viewable by everyone"
  ON review_categories FOR SELECT
  TO public
  USING (true);

-- Reviews (public read, authenticated write)
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

-- Review Ratings (public read, authenticated write)
CREATE POLICY "Review ratings are viewable by everyone"
  ON review_ratings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create review ratings"
  ON review_ratings FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM reviews
    WHERE reviews.id = review_id
    AND reviews.client_id = auth.uid()
  ));

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_caregivers_email ON caregivers(email);
CREATE INDEX IF NOT EXISTS idx_service_areas_location ON service_areas(city, state, zip_code);
CREATE INDEX IF NOT EXISTS idx_availability_caregiver ON availability(caregiver_id, day_of_week, date);
CREATE INDEX IF NOT EXISTS idx_reviews_caregiver ON reviews(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_caregiver_services_rates ON caregiver_services(caregiver_id, hourly_rate);