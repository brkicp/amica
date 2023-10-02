import { handle } from "hono/vercel";
import { HonoAuthEnv, honoAuth } from "../config/instances/hono";
import { supabase } from "../config/instances/supabase";

export const config = { runtime: "edge" };

export default handle(
  honoAuth.get("/users/me", async (c) => {
    const { uid } = c.env as HonoAuthEnv;
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", uid)
      .single();

    return c.json(user);
  })
);
