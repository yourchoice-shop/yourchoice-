import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase.from("products").select("id,name,category,price,image_url").eq("is_active", true).order("created_at", { ascending: false });
  return <><header className="top"><div className="brand">YOUR CHOICE.</div><a href="/admin">Admin</a></header>
    <section className="hero"><p className="muted">THE NEW SEASON COLLECTION</p><h1>Find your own style.</h1><p>আপনার পছন্দের ফ্যাশন, এখন এক জায়গায়।</p><a className="btn" href="#shop">SHOP COLLECTION</a></section>
    <main className="wrap" id="shop"><h2>Shop the collection</h2><p className="muted">বাংলাদেশি ফ্যাশন স্টোর</p>
      <div className="grid">{(products ?? []).map((p:any)=><article className="card" key={p.id}>{p.image_url ? <img src={p.image_url} alt={p.name}/> : <div style={{height:240,background:"#eee"}}/>}<h3>{p.name}</h3><p className="muted">{p.category}</p><p className="price">৳{Number(p.price).toLocaleString("en-BD")}</p></article>)}</div>
      {!products?.length && <p className="muted">পণ্য শিগগিরই যোগ করা হবে। Admin থেকে পণ্য যোগ করুন।</p>}
    </main><footer>YOUR CHOICE. · Fashion • Comfort • Confidence</footer></>;
}
