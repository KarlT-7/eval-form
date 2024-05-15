"use server";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";

type FormType = Database['public']['Tables']['forms']['Row'];

export async function getFormInfo(id: String): Promise<FormType> {

  const supabase = createClient();
  const{data, error} = 
    await supabase
    .from("forms")
    .select("*")
    .eq("id", id)
    .single();

  return data
}

export async function getQuestions(id: String) {
  const supabase = createClient();

  const questions = ( 
    await supabase
    .from("questions")
    .select("*")
    .eq("form_id", id)
  )

  console.log(questions);

  return questions;
}

export async function addQuestion(content: String) {
    const supabase = createClient();

  const question = ( 
    await supabase
    .from("questions")
    .insert({content: content})
  )

  return question;
}

export async function updateTitle(id: String, title: String) {
    const supabase = createClient();

  const update = ( 
    await supabase
    .from("forms")
    .update({title: title}).eq('id', id)
  )

  return update
}
