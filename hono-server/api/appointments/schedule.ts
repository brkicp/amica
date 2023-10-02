import { handle } from "hono/vercel";
import { HonoAuthEnv, honoAuth } from "../config/instances/hono";
import { supabase } from "../config/instances/supabase";
import { InsertTable } from "../config/types/supabase-helpers";

export const config = { runtime: "edge" };

type DateRange = {
  startDateTime: string;
  endDateTime: string;
};

function isOverlapping(range: DateRange, overlappingRange: DateRange) {
  const start1 = new Date(range.startDateTime);
  const end1 = new Date(range.endDateTime);
  const start2 = new Date(overlappingRange.startDateTime);
  const end2 = new Date(overlappingRange.endDateTime);

  return start1 <= end2 && end1 >= start2;
}

export default handle(
  honoAuth.post("/appointments/schedule", async (c) => {
    const appointmentFromRequest = await c.req.json<
      InsertTable<"appointment">
    >();

    const { uid: userId } = c.env as HonoAuthEnv;

    const { data: appointments } = await supabase
      .from("appointment")
      .select("*")
      .eq("psychologistId", appointmentFromRequest.psychologistId);

    if (appointments) {
      for (const appointment of appointments) {
        const datesAreOverlapped = isOverlapping(
          appointmentFromRequest,
          appointment
        );

        if (datesAreOverlapped) {
          throw new Error("Appointment already taken 😔");
        }
      }
    }

    appointmentFromRequest.userId = userId;
    const { error } = await supabase
      .from("appointment")
      .insert(appointmentFromRequest);

    if (error) {
      throw new Error(error.message);
    }

    return c.json(appointmentFromRequest);
  })
);
