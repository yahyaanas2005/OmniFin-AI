import { createClient } from '@supabase/supabase-js';
/**
 * Supabase client helper.
 * Make sure to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  // In dev we warn; in production fail fast so misconfigured deploys are obvious.
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Supabase credentials are not set. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
  } else {
    // Friendly warning during local development
    // eslint-disable-next-line no-console
    console.warn('Supabase credentials are not set. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
