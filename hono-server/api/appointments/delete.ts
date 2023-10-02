import { handle } from "hono/vercel";
import { honoAuth } from "../config/instances/hono";
import { supabase } from "../config/instances/supabase";

export const config = { runtime: "edge" };

export default handle(
  honoAuth.delete("/appointments/delete", async (c) => {
    const { id } = await c.req.json<{ id: number }>();

    const { data: appointment } = await supabase
      .from("appointment")
      .select("*")
      .eq("id", id)
      .single();

    if (!appointment) throw new Error("Appointment not found");

    const { error } = await supabase.from("appointment").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return c.json({ message: "Appointment deleted" });
  })
);
