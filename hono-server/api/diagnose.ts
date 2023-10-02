import { handle } from "hono/vercel";
import { honoAuth } from "./config/instances/hono";
import { supabase } from "./config/instances/supabase";
export const config = { runtime: "edge" };

export default handle(
  honoAuth.get("/diagnose", async (c) => {
    const { data: diagnoses } = await supabase.from("diagnose").select("*");

    return c.json(diagnoses);
  })
);
