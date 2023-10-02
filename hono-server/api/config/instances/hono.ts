import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { cors } from "hono/cors";
import { jwtVerify } from "jose";
import { JWT_SECRET_KEY } from "../../auth/constants";

export const honoNonAuth = new Hono()
  .basePath("/api")
  .use("*", cors())
  .onError((e, c) => {
    return c.json({ error: e.message }, 400);
  });

export type HonoAuthEnv = { uid: number };

export const honoAuth = new Hono()
  .basePath("/api")
  .use("*", cors())
  .onError((e, c) => {
    return c.json({ error: e.message }, 400);
  })
  .use("*", async (c, next) => {
    const token = c.req.header("authorization");
    if (!token) throw new Error("No token");

    const encode = new TextEncoder().encode(JWT_SECRET_KEY);
    const verified = await jwtVerify(token, encode);
    if (!verified.payload.jti) throw new Error("Invalid token");
    c.env = { uid: +verified.payload.jti } as HonoAuthEnv;

    await next();
  });
