import { supabase } from "./supabase";

export const fetchTemplate = async (
  templateName: string,
): Promise<ArrayBuffer> => {
  const { data, error } = await supabase.storage
    .from("limra_bucket")
    .download(templateName);

  if (error) throw error;

  return await data.arrayBuffer();
};
