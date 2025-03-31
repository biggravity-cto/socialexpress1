
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tqsdbluknhotwkpjuvvp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxc2RibHVrbmhvdHdrcGp1dnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MjcxNzgsImV4cCI6MjA1ODUwMzE3OH0.v_d3vkdl8U166Rlsj14GKQ9yuTQzX2yoXHdHQ3gPuGQ";

// Create a single instance of the Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});
