import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import EditPage from "@/app/components/EditPageComponent";

export default async function HomePage() {

  const supabase = createClient()
  const user = await supabase.auth.getUser()

  if(!user.data.user){
    redirect('./login')
  } 

  return (
    <EditPage></EditPage>
  );
}
