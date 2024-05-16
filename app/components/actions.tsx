"use server";
import { Database } from "@/types/supabase";
import { createAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type FormType = Database["public"]["Tables"]["forms"]["Row"];

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
    redirect("./");
  }
}

export async function getOptions(id: String) {
  const supabase = createClient();
  const options = await supabase
    .from("options")
    .select("*")
    .eq("question_id", id);

  return {
    options: [],
  };
}

export async function updateValue(id: string, value: string) {
  const supabase = createClient();

  const update = await supabase
    .from("options")
    .update({ option_value: value })
    .eq("id", id);

  return update;
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
  const id = uuidv4();
  const res = await supabase
    .from("forms")
    .insert({ id: id, user_id: user_id, title, description, status })
    .select();
  return res;
}

export async function deleteForm(id: String) {
  const supabase = createClient();
  const res = await supabase.from("forms").delete().eq("id", id);
  return res;
}

export async function getFormInfo(id: String): Promise<FormType> {
  const supabase = createClient();
  const { data } = await supabase
    .from("forms")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}

export async function changeStatus(id: string, status: string) {
  const supabase = createClient();
  const stat = await supabase
    .from("forms")
    .update({ status: status })
    .eq("id", id);

  return stat;
}

export async function getQuestions(id: String) {
  const supabase = createClient();

  const questions = await supabase
    .from("questions")
    .select("*")
    .eq("form_id", id);

  return questions;
}

export async function addQuestion(id: string) {
  const supabase = createClient();

  const question = await supabase
    .from("questions")
    .insert({ content: "[no question content]", form_id: id, type: "fixed" })
    .select();

  return question;
}

export async function updateTitle(id: String, title: String) {
  const supabase = createClient();

  const update = await supabase
    .from("forms")
    .update({ title: title })
    .eq("id", id);
  return update;
}

export async function updateContent(id: String, content: string | null) {
  const supabase = createClient();
  const update = await supabase
    .from("questions")
    .update({ content: content })
    .eq("id", id).select();

    console.log(update);
  return update;
}

export async function fetchOptions(question_id: String) {
  const supabase = createClient();
  const options = await supabase
    .from("options")
    .select("*")
    .eq("question_id", question_id);

  return options;
}

export async function addOption(question_id: String) {
  const supabase = createClient();

  const option = await supabase
    .from("options")
    .insert({ option_value: "[no option value]", question_id: question_id })
    .select();

  console.log(option);

  return option;
}

export async function deleteOption(id: String) {
  const supabase = createClient();
  const res = await supabase.from("options").delete().eq("id", id);
  console.log(res);

  return res;
}

export async function deleteUser(id: string) {
  const supabase = createClient();
  const admin = createAdmin();

  const del = await admin.auth.admin.deleteUser(id);

  if (!del.error) {
    await supabase.from("profiles").delete().eq("id", id);
  }

  return del;
}

export async function updateUser(id: string, email: string) {
  const supabase = createClient();
  const admin = createAdmin();

  const update = await admin.auth.admin.updateUserById(id, { email: email });

  if (!update.error) {
    await supabase.from("profiles").update({ email: email }).eq("id", id);
  }

  return update;
}

export async function addUser(email: string, password: string) {
  const supabase = createClient();
  const admin = createAdmin();
  const add = await admin.auth.admin.createUser({ email, password });
  if (!add.error) {
    await supabase
      .from("profiles")
      .insert({ id: add.data.user?.id, email: email });
  }
  return add;
}

export async function upsertEval(
  id: string,
  form_id: string,
  evalName: string
) {
  const supabase = createClient();
  const upsert = await supabase
    .from("evaluations")
    .upsert({ id: id, form_id: form_id, name: evalName })
    .select();

  console.log(upsert);
  return upsert;
}

export async function upsertEvalResponse(
  id: string,
  evaluation_id: string,
  question_id: string,
  form_id: string,
  options_ids: any[],
  response_text: string
) {
  const supabase = createClient();
  const res = supabase
    .from("evaluation_responses")
    .upsert({
      id: id,
      evaluation_id: evaluation_id,
      question_id: question_id,
      form_id: form_id,
      option_ids: options_ids,
      response_text: response_text,
    })
    .select();

  console.log(res);

  return res;
}
