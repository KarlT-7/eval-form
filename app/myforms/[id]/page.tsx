import FormPageComponent from "@/app/components/FormPageComponent";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default async function EditPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    redirect("./login");
  }

  const { data: form, error: formError } = await supabase
    .from("forms")
    .select("*")
    .eq("id", id)
    .single();

  const { data: responses, error: responseError } = await supabase
    .from("evaluation_responses")
    .select(
      `
  id,
  option_ids,
  response_text,
  questions:question_id(content)
`
    )
    .eq("form_id", id);

  return (
    <FormPageComponent form={form} responses={responses}></FormPageComponent>
  );
}
