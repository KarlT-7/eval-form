'use server'
import { createClient } from "@/utils/supabase/server";

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

    return res
}

export async function createForm(title: String, description: String , status: String) {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const id = user.data.user?.id
    const res = await supabase.from('forms').insert({'user_id': id, title, description, status})

    console.log(res)

    return res
}
