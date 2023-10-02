import { handle } from "hono/vercel";
import { HonoAuthEnv, honoAuth } from "../config/instances/hono";
import { supabase } from "../config/instances/supabase";

export const config = { runtime: "edge" };

export default handle(
  honoAuth.get("/appointments/my", async (c) => {
    const { uid } = c.env as HonoAuthEnv;

    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", uid)
      .single();

    if (!user) throw new Error("User not found");

    const { data: appointments } = await supabase
      .from("appointment")
      .select("*")
      .eq("userId", user.id);

    const { data: psychologists } = await supabase
      .from("psychologist")
      .select("*");

    const appointmentsPsychologist = appointments?.map((appointment) => {
      const psychologist = psychologists?.find(
        (p) => p.id === appointment.psychologistId
      );

      return {
        ...appointment,
        psychologist,
      };
    });

    return c.json(appointmentsPsychologist);
  })
);
