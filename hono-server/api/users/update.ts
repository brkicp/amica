import { handle } from "hono/vercel";
import { HonoAuthEnv, honoAuth } from "../config/instances/hono";
import { supabase } from "../config/instances/supabase";
import { InsertTable } from "../config/types/supabase-helpers";

export const config = { runtime: "edge" };

export default handle(
  honoAuth.put("/users/update", async (c) => {
    const { uid } = c.env as HonoAuthEnv;
    let { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", uid)
      .single();

    const userFromRequest = await c.req.json<InsertTable<"users">>();

    if (!user) throw new Error("User not found");

    console.log("userFromRequest", userFromRequest);

    Object.assign(user, userFromRequest);

    const { error, data: updatedUser } = await supabase
      .from("users")
      .upsert(user);

    if (error) {
      throw new Error(error.message);
    }

    return c.json({ user: updatedUser });
  })
);
