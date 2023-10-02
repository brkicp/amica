import { handle } from "hono/vercel";
import { honoAuth } from "./config/instances/hono";
import { supabase } from "./config/instances/supabase";

export const config = { runtime: "edge" };

type Filter = {
  appointmentType?: string;
  years?: string;
  gender?: string;
  fromPrice?: number;
  toPrice?: number;
  symptom?: string;
  limit?: number;
  id?: number;
};

export default handle(
  honoAuth.get("/psychologist", async (c) => {
    const query: Filter = c.req.query() as any;

    if (query.id) {
      const { data: psychologist } = await supabase
        .from("psychologist")
        .select("*")
        .eq("id", query.id)
        .single();

      return c.json(psychologist);
    }

    const { data: psychologists } = await supabase
      .from("psychologist")
      .select("*, pshychologist_diagnose (*)")
      .filter("pricePerHour", "gte", query.fromPrice || Number.MIN_SAFE_INTEGER)
      .filter("pricePerHour", "lte", query.toPrice || Number.MAX_SAFE_INTEGER)
      .filter("minAge", "lte", query.years || Number.MAX_SAFE_INTEGER)
      .limit(query.limit || Number.MAX_SAFE_INTEGER);

    const filteredPsychologists = psychologists?.filter((p) => {
      const g = query.gender;
      const aT = query.appointmentType;
      const s = query.symptom;

      if (g && !p.genders?.includes(g)) {
        return false;
      }

      if (aT && !p.sessionType?.includes(aT)) {
        return false;
      }

      if (s) {
        const expertise = p.pshychologist_diagnose?.some((d) =>
          d.did?.includes(s)
        );

        if (!expertise) {
          return false;
        }
      }

      return true;
    });

    return c.json(filteredPsychologists);
  })
);
