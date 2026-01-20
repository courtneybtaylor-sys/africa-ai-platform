-- Add onboarding fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS interests text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS favorite_countries text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS travel_goals text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '{}';
