
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://aqywjpptfstmssgflose.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxeXdqcHB0ZnN0bXNzZ2Zsb3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNTgxNzgsImV4cCI6MjA2MTgzNDE3OH0.8jamWUWdQ4YLH1C3tz-VzGysgKazFOIeAuep0Moh0xM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
