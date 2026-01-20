-- Make a user an admin by their email address
-- Replace 'courtneybtaylor@kheperllc.com' with your email if different

UPDATE profiles
SET is_admin = true
WHERE email = 'courtneybtaylor@kheperllc.com';

-- Verify the update
SELECT id, email, full_name, is_admin, subscription_tier 
FROM profiles 
WHERE email = 'courtneybtaylor@kheperllc.com';
