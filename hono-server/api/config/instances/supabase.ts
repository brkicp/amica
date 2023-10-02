import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

//https://supabase.com/dashboard/project/hlqqbpvskmybkuuerehh/settings/api
export const supabase = createClient<Database>(
  "https://hlqqbpvskmybkuuerehh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhscXFicHZza215Ymt1dWVyZWhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDg2ODcxMiwiZXhwIjoyMDEwNDQ0NzEyfQ.Tyhmoq0KRUQ7jkxo4ZYELVfL1BxH-ZwEm__wp5MMRaw",
  {
    auth: {
      persistSession: false,
    },
  }
);
