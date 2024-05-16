import Image from "next/image";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import MyForms from "@/app/components/MyFormsComponent";
import { getFormInfo, getQuestions } from "./actions";
import EditPageComponent from "@/app/components/EditPageComponent";

export default async function EditPage({
  params: { id },
}: {
  params: { id: string };
}) {

  console.log(id)
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    redirect("./login");
  }

  const formData = await getFormInfo(id);
  const fetchQuestions = await getQuestions(id);

  return <EditPageComponent form={formData} questionData={fetchQuestions}></EditPageComponent>;
}
