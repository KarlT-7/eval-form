"use server";
import { createClient } from "@/utils/supabase/server";
import { v4 } from "uuid";

interface NewForm {
  title: String;
  desc: String;
  status: String;
}

export async function getForms() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const res = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", user.data.user?.id);

  return res;
}

export async function createForm(
  title: String,
  description: String,
  status: String
) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const user_id = user.data.user?.id;
  const id = v4();
  const res = await supabase
    .from("forms")
    .insert({ id: id, user_id: user_id, title, description, status });
    
  return res;
}

export async function deleteForm(id: String) {
  const supabase = createClient();
  const res = await supabase.from("forms").delete().eq("id", id);
  return res;
}
