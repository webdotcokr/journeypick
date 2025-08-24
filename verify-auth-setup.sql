-- Verification queries to check auth setup after fixes

-- 1. Check if profiles table exists and RLS is enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'profiles';

-- 2. Check all RLS policies on profiles table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'profiles'
ORDER BY policyname;

-- 3. Check if helper functions exist
SELECT routine_name, routine_type, routine_definition
FROM information_schema.routines
WHERE routine_schema = 'public' 
AND routine_name IN ('get_user_role', 'is_role', 'is_admin', 'handle_new_user');

-- 4. Check if trigger exists
SELECT trigger_name, event_manipulation, event_object_table, action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'auth' AND trigger_name = 'on_auth_user_created';

-- 5. Test helper function (if needed)
-- SELECT public.get_user_role();
-- SELECT public.is_role('tourist');
-- SELECT public.is_admin();

-- 6. Check profiles table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;