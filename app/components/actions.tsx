"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getEvals(id: String) {
  const supabase = createClient();
  const res = await supabase.from("evaluations").select("*").eq("form_id", id);

  return res.data?.length;
}



export async function checkAdmin(): Promise<string> {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (user?.data?.user) {
    const res = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.data.user.id)
      .single();
    if (res.data) {
      return res.data.role;
    }
  }
  return "";
}

export async function signOut() {
  const supabase = createClient();
  const res = await supabase.auth.signOut();
  if (!res.error) {
    redirect('./')
  }
}

export async function getOptions(id: String) {
  const supabase = createClient();
  const options = await supabase.from('options').select('*').eq('question_id', id)

  return {
    options: [],
  }
}
