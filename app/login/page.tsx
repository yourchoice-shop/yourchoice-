import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) redirect("/login?error=invalid");
    redirect("/admin");
  }
  return <main className="wrap" style={{maxWidth:480}}><h1>Admin Login</h1><form action={login}><label>Email<input name="email" type="email" required/></label><label>Password<input name="password" type="password" required/></label><button className="btn">Sign in</button></form></main>;
}
