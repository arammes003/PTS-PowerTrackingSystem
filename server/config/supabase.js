import { createClient } from "@supabase/supabase-js";

// CARGAMOS LOS DATOS DEL FICHERO .env
process.loadEnvFile();

const { SUPABASE_URL: SUPABASE_URL, SUPABASE_ANON_KEY: SUPABASE_ANON_KEY } =
  process.env;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
