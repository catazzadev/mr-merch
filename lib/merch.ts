import { supabase } from "./supabase";

export type ActiveMerch = {
  id: string;
  name: string;
  logo_path: string | null;
  chapter_id: string;
};

export async function getActiveMerch(chapterId: string): Promise<ActiveMerch[]> {
  const { data, error } = await supabase
    .from("active_merch")
    .select("id, name, logo_path, chapter_id")
    .eq("chapter_id", chapterId)
    .order("name");

  if (error) throw error;
  return data;
}
