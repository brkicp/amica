import { handle } from "hono/vercel";
import { honoAuth, honoNonAuth } from "../config/instances/hono";
import { SignJWT, jwtVerify } from "jose";
import { setCookie, getCookie } from "hono/cookie";
import { JWT_SECRET_KEY } from "./constants";
import { supabase } from "../config/instances/supabase";
import { useHash } from "./composables/use-hash";
import { useJwt } from "./composables/use-jwt";
export const config = { runtime: "edge" };

export type LoginRequest = {
  email: string;
  password: string;
};

export default handle(
  honoNonAuth.post("/auth/login", async (c) => {
    const loginReq = await c.req.json<LoginRequest>();

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("email", loginReq.email)
      .single();

    if (!user) throw new Error("User not found");

    const { verifyPassword } = useHash();

    if (!verifyPassword(loginReq.password, user.password))
      throw new Error("Invalid password");

    const { sign } = useJwt();
    const token = await sign(user.id);

    return c.json({ token });
  })
);
