"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(email: string, password: string) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password,
  };

  const res = await supabase.auth.signInWithPassword(data);

  if (res.error) {
    if (res.error.message === "Invalid login credentials") {
      throw new Error("Invalid login credentials.");
    } else {
      throw new Error("An error occurred, please try again.");
    }
  } else {
    revalidatePath("/", "layout");
    redirect("/myforms");
  }
}

export async function signup(email: string, password: string) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: email,
    password: password,
  };

  const res = await supabase.auth.signUp(data);

  if (res.error) {
    throw new Error("An error occured, please try again.");
  } else {
    if (res.data.user) {
      
      await supabase.from("profiles").insert({id: res.data.user.id, email: email});
      revalidatePath("/", "layout");
      redirect("/myforms");
    }
  }
}
