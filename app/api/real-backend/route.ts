import { NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(req: Request) {
  try {
    const { action, data } = await req.json();

    switch (action) {
      // ========== USER SYSTEM ==========
      case "register":
        return await registerUser(data);
      case "login":
        return await loginUser(data);
      case "get-profile":
        return await getProfile(data);
      
      // ========== CONTACT FORM ==========
      case "submit-contact":
        return await submitContact(data);
      case "get-contacts":
        return await getContacts(data);
      
      // ========== NEWSLETTER ==========
      case "subscribe":
        return await subscribeEmail(data);
      case "get-subscribers":
        return await getSubscribers(data);
      
      // ========== E-COMMERCE ==========
      case "add-to-cart":
        return await addToCart(data);
      case "get-cart":
        return await getCart(data);
      case "place-order":
        return await placeOrder(data);
      case "get-orders":
        return await getOrders(data);
      
      // ========== BLOG/COMMENTS ==========
      case "post-comment":
        return await postComment(data);
      case "get-comments":
        return await getComments(data);
      
      // ========== ANALYTICS ==========
      case "track-visit":
        return await trackVisit(data);
      case "get-analytics":
        return await getAnalytics(data);

      default:
        return NextResponse.json({ success: false, error: "Unknown action" });
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

// ========== USER SYSTEM ==========

async function registerUser(data: any) {
  const { email, password, name } = data;
  await supabaseInsert("users", { email, password, name, created_at: new Date().toISOString() });
  return NextResponse.json({ success: true, message: "User registered!" });
}

async function loginUser(data: any) {
  const { email, password } = data;
  const users = await supabaseQuery(`users?email=eq.${email}&password=eq.${password}`);
  if (users.length > 0) {
    return NextResponse.json({ success: true, user: users[0], token: "user_" + Date.now() });
  }
  return NextResponse.json({ success: false, error: "Invalid credentials" });
}

async function getProfile(data: any) {
  const { userId } = data;
  const users = await supabaseQuery(`users?id=eq.${userId}`);
  if (users.length > 0) {
    return NextResponse.json({ success: true, profile: users[0] });
  }
  return NextResponse.json({ success: false, error: "User not found" });
}

// ========== CONTACT FORM ==========

async function submitContact(data: any) {
  const { name, email, phone, message, website_niche } = data;
  await supabaseInsert("contacts", { name, email, phone, message, website_niche, created_at: new Date().toISOString() });
  return NextResponse.json({ success: true, message: "Message sent! We'll contact you soon." });
}

async function getContacts(data: any) {
  const { website_niche } = data;
  const contacts = await supabaseQuery(`contacts?website_niche=eq.${website_niche}&order=created_at.desc`);
  return NextResponse.json({ success: true, contacts });
}

// ========== NEWSLETTER ==========

async function subscribeEmail(data: any) {
  const { email, website_niche } = data;
  await supabaseInsert("subscribers", { email, website_niche, created_at: new Date().toISOString() });
  return NextResponse.json({ success: true, message: "Subscribed successfully!" });
}

async function getSubscribers(data: any) {
  const { website_niche } = data;
  const subscribers = await supabaseQuery(`subscribers?website_niche=eq.${website_niche}&order=created_at.desc`);
  return NextResponse.json({ success: true, subscribers, count: subscribers.length });
}

// ========== E-COMMERCE ==========

async function addToCart(data: any) {
  const { user_id, product_id, product_name, price, quantity } = data;
  await supabaseInsert("cart_items", { user_id, product_id, product_name, price, quantity, created_at: new Date().toISOString() });
  return NextResponse.json({ success: true, message: "Added to cart!" });
}

async function getCart(data: any) {
  const { user_id } = data;
  const items = await supabaseQuery(`cart_items?user_id=eq.${user_id}`);
  const total = (items || []).reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  return NextResponse.json({ success: true, items, total });
}

async function placeOrder(data: any) {
  const { user_id, items, total, address } = data;
  await supabaseInsert("orders", { user_id, items: JSON.stringify(items), total, address, status: "pending", created_at: new Date().toISOString() });
  return NextResponse.json({ success: true, message: "Order placed successfully!" });
}

async function getOrders(data: any) {
  const { user_id } = data;
  const orders = await supabaseQuery(`orders?user_id=eq.${user_id}&order=created_at.desc`);
  return NextResponse.json({ success: true, orders });
}

// ========== BLOG/COMMENTS ==========

async function postComment(data: any) {
  const { website_niche, user_name, comment } = data;
  await supabaseInsert("comments", { website_niche, user_name, comment, created_at: new Date().toISOString() });
  return NextResponse.json({ success: true, message: "Comment posted!" });
}

async function getComments(data: any) {
  const { website_niche } = data;
  const comments = await supabaseQuery(`comments?website_niche=eq.${website_niche}&order=created_at.desc`);
  return NextResponse.json({ success: true, comments });
}

// ========== ANALYTICS ==========

async function trackVisit(data: any) {
  const { website_niche, page } = data;
  await supabaseInsert("visits", { website_niche, page, created_at: new Date().toISOString() });
  return NextResponse.json({ success: true, message: "Visit tracked" });
}

async function getAnalytics(data: any) {
  const { website_niche } = data;
  const visits = await supabaseQuery(`visits?website_niche=eq.${website_niche}&order=created_at.desc&limit=100`);
  
  // Calculate stats
  const today = new Date().toISOString().split("T")[0];
  const todayVisits = (visits || []).filter((v: any) => v.created_at?.startsWith(today)).length;
  
  return NextResponse.json({ 
    success: true, 
    totalVisits: (visits || []).length,
    todayVisits,
    visits: (visits || []).slice(0, 50),
  });
}

// ========== SUPABASE HELPERS ==========

async function supabaseInsert(table: string, data: any) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(data),
    });
  } catch {}
}

async function supabaseQuery(query: string): Promise<any[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
