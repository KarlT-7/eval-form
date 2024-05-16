import { createClient } from '@supabase/supabase-js'

export function createAdmin() { 
    return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}