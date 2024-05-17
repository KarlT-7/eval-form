"use server";
import { Database } from "@/types/supabase";
import { createAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

//backend call for retrieving the number of evaluations belonging to a certain form
export async function getEvals(id: String) {
  const supabase = createClient();
  const res = await supabase.from("evaluations").select("*").eq("form_id", id);

  return res.data?.length;
}

//backend call for calling admin
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

//backend call for logging out
export async function signOut() {
  const supabase = createClient();
  const res = await supabase.auth.signOut();
  if (!res.error) {
    redirect("./");
  }
}

//backend call for retrieving a list of options belonging to a given question
export async function getOptions(id: String) {
  const supabase = createClient();
  const options = await supabase
    .from("options")
    .select("*")
    .eq("question_id", id);

  return {
    options: [options],
  };
}

//backend call for updating an option value
export async function updateValue(id: string, value: string) {
  const supabase = createClient();

  const update = await supabase
    .from("options")
    .update({ option_value: value })
    .eq("id", id);

  return update;
}

//backend call for retrieving a list of forms from a given user id
export async function getForms() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const res = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", user.data.user?.id);

  return res;
}

//backend call for deleting a form
export async function deleteForm(id: String) {
  const supabase = createClient();
  const res = await supabase.from("forms").delete().eq("id", id);
  return res;
}


//backend call for updating a form's status
export async function changeStatus(id: string, status: string) {
  const supabase = createClient();
  const stat = await supabase
    .from("forms")
    .update({ status: status })
    .eq("id", id);

  return stat;
}

//backend call for retrieving questions for a given form
export async function getQuestions(id: String) {
  const supabase = createClient();

  const questions = await supabase
    .from("questions")
    .select("*")
    .eq("form_id", id);

  return questions;
}

//backend call to create a question
export async function addQuestion(id: string) {
  const supabase = createClient();

  const question = await supabase
    .from("questions")
    .insert({ content: "[no question content]", form_id: id, type: "fixed" })
    .select();

  return question;
}

//backend call to update form title
export async function updateTitle(id: String, title: String) {
  const supabase = createClient();

  const update = await supabase
    .from("forms")
    .update({ title: title })
    .eq("id", id);
  return update;
}

//backend call to update form description
export async function updateDescription(id: String, description: String) {
  const supabase = createClient();

  const update = await supabase
    .from("forms")
    .update({ description: description })
    .eq("id", id);
  return update;
}

//backend call for updating question content for a given question
export async function updateContent(id: String, content: string | null) {
  const supabase = createClient();
  const update = await supabase
    .from("questions")
    .update({ content: content })
    .eq("id", id)
    .select();

  console.log(update);
  return update;
}

//backend call for retrieving a set of options belonging to a certain question
export async function fetchOptions(question_id: String) {
  const supabase = createClient();
  const options = await supabase
    .from("options")
    .select("*")
    .eq("question_id", question_id);

  return options;
}

//backend call for creating an option on a given question
export async function addOption(question_id: String) {
  const supabase = createClient();

  const option = await supabase
    .from("options")
    .insert({ option_value: "[no option value]", question_id: question_id })
    .select();

  console.log(option);

  return option;
}

//backend call for deleting a given option
export async function deleteOption(id: String) {
  const supabase = createClient();
  const res = await supabase.from("options").delete().eq("id", id);
  console.log(res);

  return res;
}

//backend call for removing a use from auth and profile tables
export async function deleteUser(id: string) {
  const supabase = createClient();
  const admin = createAdmin();

  const del = await admin.auth.admin.deleteUser(id);

  if (!del.error) {
    await supabase.from("profiles").delete().eq("id", id);
  }

  return del;
}

//backend call for updating a user's information
export async function updateUser(id: string, email: string) {
  const supabase = createClient();
  const admin = createAdmin();

  const update = await admin.auth.admin.updateUserById(id, { email: email });

  if (!update.error) {
    await supabase.from("profiles").update({ email: email }).eq("id", id);
  }

  return update;
}

//backend call for creating a new user
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

//backend call for updating/inserting an evaluation
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

//backend call for creating a form from attributes
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

//backend call for inserting/updating evaluation responses
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

//backend call for updating the type for a given form
export async function updateType(question_id: string, type: string) {
  const supabase = createClient();
  const res = await supabase
    .from("questions")
    .update({ type: type })
    .eq("id", question_id);
  if (!res.error || type == "text") {
    await supabase.from("options").delete().in("question_id", [question_id]);
  }
  return res;
}

//backend call for deleting a question
export async function deleteQuestion(question_id: string) {
  const supabase = createClient();
  const res = await supabase.from("questions").delete().eq("id", question_id);
  return res;
}
