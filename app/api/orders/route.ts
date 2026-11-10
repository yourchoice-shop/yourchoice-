import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const address = String(body.address || "").trim();
  const paymentMethod = String(body.payment_method || "cod");
  const items = Array.isArray(body.items) ? body.items : [];
  if (!name || !phone || !address || items.length === 0) {
    return NextResponse.json({ error: "Name, phone, address and items are required." }, { status: 400 });
  }
  if (!["cod","bkash","nagad","card"].includes(paymentMethod)) {
    return NextResponse.json({ error: "Unsupported payment method." }, { status: 400 });
  }
  // Prices are recalculated from database; never trust client-submitted prices.
  const ids = items.map((item:any) => Number(item.product_id)).filter(Number.isInteger);
  const { data: products, error: productError } = await supabase.from("products").select("id,price,is_active").in("id", ids);
  if (productError || !products || products.length !== ids.length || products.some(p=>!p.is_active)) {
    return NextResponse.json({ error: "One or more products are unavailable." }, { status: 400 });
  }
  const quantities = new Map<number,number>();
  for (const item of items) {
    const id = Number(item.product_id), qty = Math.max(1, Math.min(20, Number(item.quantity) || 1));
    quantities.set(id, (quantities.get(id)||0)+qty);
  }
  const total = products.reduce((sum,p)=>sum + Number(p.price)*(quantities.get(p.id)||0),0);
  const { data: order, error } = await supabase.from("orders").insert({
    customer_name:name, customer_phone:phone, delivery_address:address,
    payment_method:paymentMethod, total_amount:total, status:"pending"
  }).select("id").single();
  if (error || !order) return NextResponse.json({ error:"Could not create order." }, { status:500 });
  const orderItems = products.map(p=>({order_id:order.id,product_id:p.id,quantity:quantities.get(p.id)||1,unit_price:p.price}));
  const { error: itemError } = await supabase.from("order_items").insert(orderItems);
  if (itemError) return NextResponse.json({ error:"Order created but item save failed. Contact store support." }, { status:500 });
  return NextResponse.json({ order_id:order.id, total_amount:total, status:"pending" }, { status:201 });
}
