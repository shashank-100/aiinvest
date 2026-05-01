// Lightweight client for server components — use createClient() from utils/supabase/server for SSR with cookies
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "placeholder";

export const supabase = createSupabaseClient<Database>(supabaseUrl, supabaseKey);
