import { handle } from "hono/vercel";
import { HonoAuthEnv, honoAuth } from "../config/instances/hono";
import { supabase } from "../config/instances/supabase";

export const config = { runtime: "edge" };

export default handle(
  honoAuth.put("/appointments/done", async (c) => {
    const { id, done } = await c.req.json<{ id: number; done: boolean }>();

    const { data: appointment } = await supabase
      .from("appointment")
      .select("*")
      .eq("id", id)
      .single();

    if (!appointment) throw new Error("Appointment not found");

    appointment.done = done;

    const { error } = await supabase
      .from("appointment")
      .update(appointment)
      .eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return c.json(appointment);
  })
);
