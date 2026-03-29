import { supabase } from "./supabase";

export type Chapter = {
  id: string;
  name: string;
  email: string | null;
};

export async function getChapters(): Promise<Chapter[]> {
  const { data, error } = await supabase
    .from("chapters")
    .select("id, name, email")
    .order("name");

  if (error) throw error;
  return data;
}
