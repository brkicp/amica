import { handle } from "hono/vercel";
import { honoNonAuth } from "../config/instances/hono";
import { supabase } from "../config/instances/supabase";
import { InsertTable, SelectTable } from "../config/types/supabase-helpers";
import { useHash } from "./composables/use-hash";
import { useJwt } from "./composables/use-jwt";

export const config = { runtime: "edge" };

export default handle(
  honoNonAuth.post("/auth/sign-up", async (c) => {
    const user = await c.req.json<InsertTable<"users">>();

    const { hashPassword } = useHash();
    user.password = hashPassword(user.password);

    const { error } = await supabase.from("users").insert(user);

    if (error) {
      throw new Error(error.message);
    }

    const { data: userFromDb } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email)
      .single();

    if (!userFromDb) throw new Error("User not found");

    const { sign } = useJwt();
    const token = await sign(userFromDb.id);

    return c.json({ token });
  })
);
