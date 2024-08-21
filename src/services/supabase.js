import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jnqpobsqbpxpqdkthsdb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpucXBvYnNxYnB4cHFka3Roc2RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwNTYxMTYsImV4cCI6MjAzNzYzMjExNn0.H8uiMtoj7rBtyprkcIx-V4Tp5h_HczekXHe9Gxm4reQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
