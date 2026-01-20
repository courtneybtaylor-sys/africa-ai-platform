-- Upgrade admin user to Pioneer tier (highest tier) for full access
-- This gives the admin access to all paid features

UPDATE profiles
SET 
  subscription_tier = 'pioneer',
  is_admin = true
WHERE email = 'courtneybtaylor@kheperllc.com';

-- Verify the update
SELECT id, email, full_name, subscription_tier, is_admin 
FROM profiles 
WHERE email = 'courtneybtaylor@kheperllc.com';
