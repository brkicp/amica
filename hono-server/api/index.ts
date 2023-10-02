import { handle } from "hono/vercel";
import { honoNonAuth } from "./config/instances/hono";
export const config = { runtime: "edge" };

export default handle(
  honoNonAuth.get("/", (c) => c.json({ message: "Hello Hono!" }))
);
