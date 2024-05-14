'use server'
import { createClient } from "@/utils/supabase/server";

export async function getEvals(id: String) {
    const supabase = createClient();
    const res = await supabase
      .from("evaluations")
      .select("*")
      .eq("form_id", id);

    return res.data?.length;
  }

export async function deleteForm(id: String) {
    const supabase = createClient();
    const res = await supabase.from("forms").delete().eq('id', id);
    return res
}