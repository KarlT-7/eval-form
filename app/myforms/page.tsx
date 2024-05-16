import Image from "next/image";

import Navbar from "../components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import MyForms from "@/app/components/MyFormsComponent";

export default async function HomePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    redirect("./login");
  }

  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", user.data.user?.id);

  return <MyForms MyForms={data}></MyForms>;
}
