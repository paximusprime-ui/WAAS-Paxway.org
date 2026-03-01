// ─── Supabase Client (Service Role — server-only) ─────────────
import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
        '⚠️  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — database operations will fail.'
    );
}

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    {
        auth: { persistSession: false, autoRefreshToken: false },
    }
);

export default supabase;
