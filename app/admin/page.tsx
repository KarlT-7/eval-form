import FormPageComponent from "@/app/components/FormPageComponent";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import AdminUserCard from "../components/AdminUserCard";
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

  const { data, error } = await admin.auth.admin.listUsers();

  if (error) {
    return;
  } else {
    return <AdminComponent users={data.users}></AdminComponent>;
  }
}