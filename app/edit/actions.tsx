"use server";
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";

type FormType = Database["public"]["Tables"]["forms"]["Row"];

//backend call for retrieving form info with a given form id
export async function getFormInfo(id: String): Promise<FormType> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", id)
    .single();
    
  return data;
}

//backend call for retrieving questions
export async function getQuestions(id: String): Promise<any>{
  const supabase = createClient();

  const questions = await supabase
    .from("questions")
    .select("*")
    .eq("form_id", id);

  return questions.data;
}
