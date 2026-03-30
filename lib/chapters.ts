import { supabase } from "./supabase";

export type Chapter = {
  id: string;
  name: string;
  email: string | null;
  logo_path: string | null;
};

export function getImageUrl(storagePath: string): string {
  const [bucket, ...rest] = storagePath.split("/");
  const { data } = supabase.storage.from(bucket).getPublicUrl(rest.join("/"));
  return data.publicUrl;
}

export async function getChapters(): Promise<Chapter[]> {
  const { data, error } = await supabase
    .from("chapters")
    .select("id, name, email, logo_path")
    .order("name");

  if (error) throw error;
  return data;
}
