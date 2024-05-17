"use server";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

type FormType = Database["public"]["Tables"]["forms"]["Row"];

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
  status: String,
  host: String
) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const user_id = user.data.user?.id;
  const id = uuidv4();
  const res = await supabase
    .from("forms")
    .insert({ id: id, user_id: user_id, title, description, status, url: `${host}/evals/${id}`})
    .select();
  return res;
}

export async function deleteForm(id: String) {
  const supabase = createClient();
  const res = await supabase.from("forms").delete().eq("id", id);
  return res;
}
