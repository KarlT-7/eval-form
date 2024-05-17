import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { createAdmin } from "@/utils/supabase/admin";
import AdminComponent from "../components/AdminComponent";

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

  //const users = await supabase.auth.admin.listUsers();

  const admin = createAdmin();

  const {
    data: { users },
    error,
  } = await admin.auth.admin.listUsers();
  
  if (error) {
    console.log(error)
    return <div></div>;
  }

  return <AdminComponent users={users}></AdminComponent>;
}
