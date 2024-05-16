import Image from "next/image";

import Navbar from "../components/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import MyForms from "@/app/components/MyFormsComponent";
import Footer from "../components/Footer";

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

  const { data: forms, error: formError } = await supabase
    .from("forms")
    .select("*")
    .eq("user_id", user.data.user?.id);


  return (
    <div className="font-sans bg-white p-0 min-h-full m-0 w-full justify-between">
      <Navbar page='forms'></Navbar>
      <MyForms MyForms={forms}></MyForms>
      <Footer></Footer>
    </div>
  );
}
