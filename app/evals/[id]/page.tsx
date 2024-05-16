import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { EvalComponent } from "@/app/components/EvalComponent";
import { getFormInfo, getQuestions } from "../../edit/actions";

export default async function HomePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createClient();


  const formData = await getFormInfo(id);
  const fetchQuestions = await getQuestions(id);

  return (
    <div className="font-sans bg-white p-0 min-h-full m-0 w-full justify-between">
      <EvalComponent form={formData} questionData={fetchQuestions}></EvalComponent>
    </div>
  );
}
