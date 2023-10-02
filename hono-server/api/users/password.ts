import { handle } from "hono/vercel";
import { HonoAuthEnv, honoAuth } from "../config/instances/hono";
import { supabase } from "../config/instances/supabase";
import { InsertTable } from "../config/types/supabase-helpers";
import { useHash } from "../auth/composables/use-hash";

export const config = { runtime: "edge" };

export default handle(
  honoAuth.put("/users/password", async (c) => {
    const { uid } = c.env as HonoAuthEnv;
    let { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", uid)
      .single();

    if (!user) throw new Error("User not found");

    const { oldPassword, newPassword } = await c.req.json<{
      oldPassword: string;
      newPassword: string;
    }>();

    const { verifyPassword, hashPassword } = useHash();

    if (!verifyPassword(oldPassword, user.password))
      throw new Error("Please enter your current password correctly.");

    user.password = hashPassword(newPassword);

    const { error, data: updatedUser } = await supabase
      .from("users")
      .upsert(user);

    if (error) {
      throw new Error(error.message);
    }

    return c.json({ user: updatedUser });
  })
);
