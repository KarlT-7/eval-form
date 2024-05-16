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

  const {data, error} = await supabase.from("forms").select("*").eq("id", id).single();

  return <FormPageComponent form={data}></FormPageComponent>;
}
