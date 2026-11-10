import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return <main className="wrap"><h1>Access denied</h1><p>Your account is not an administrator.</p></main>;
  const [{count: productCount},{count: orderCount}] = await Promise.all([
    supabase.from("products").select("*",{count:"exact",head:true}),
    supabase.from("orders").select("*",{count:"exact",head:true})
  ]);
  return <main className="wrap"><h1>Your Choice Admin</h1><p>Signed in as {user.email}</p><div className="grid"><div className="card"><h2>Products</h2><p>{productCount ?? 0}</p></div><div className="card"><h2>Orders</h2><p>{orderCount ?? 0}</p></div></div><p className="muted">Admin product/order CRUD screens are the next implementation step after connecting your Supabase project.</p></main>;
}
