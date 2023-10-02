// https://supabase.com/dashboard/project/hlqqbpvskmybkuuerehh/api?page=tables-intro
import { Database } from "./supabase";

export type Tables = Database["public"]["Tables"];
export type TableNames = keyof Tables;

export type InsertTable<T extends TableNames> = Tables[T]["Insert"];
export type UpdateTable<T extends TableNames> = Tables[T]["Update"];
export type SelectTable<T extends TableNames> = Tables[T]["Row"];

export type AppointmentWithPsychologist = SelectTable<"appointment"> & {
  psychologist: SelectTable<"psychologist">;
};
