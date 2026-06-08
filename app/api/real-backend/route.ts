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

async function registerUser(data: any) {
  const { email, password, name } = data;
  
  const res = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, password, name, created_at: new Date().toISOString() }),
  });
  
  return NextResponse.json({ success: true, message: "User registered!" });
}

async function loginUser(data: any) {
  const { email, password } = data;
  
  const res = await fetch(`${SUPABASE_URL}/rest/v1/users?email=eq.${email}&password=eq.${password}`, {
    headers: headers(),
  });
  const users = await res.json();
  
  if (users.length > 0) {
    return NextResponse.json({ success: true, user: users[0], token: "user_" + Date.now() });
  }
  return NextResponse.json({ success: false, error: "Invalid credentials" });
}

async function submitContact(data: any) {
  const { name, email, phone, message, website_niche } = data;
  
  await fetch(`${SUPABASE_URL}/rest/v1/contacts`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ name, email, phone, message, website_niche, created_at: new Date().toISOString() }),
  });
  
  return NextResponse.json({ success: true, message: "Message sent! We'll contact you soon." });
}

async function getContacts(data: any) {
  const { website_niche } = data;
  
  const res = await fetch(`${SUPABASE_URL}/rest/v1/contacts?website_niche=eq.${website_niche}&order=created_at.desc`, {
    headers: headers(),
  });
  const contacts = await res.json();
  
  return NextResponse.json({ success: true, contacts });
}

async function subscribeEmail(data: any) {
  const { email, website_niche } = data;
  
  await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, website_niche, created_at: new Date().toISOString() }),
  });
  
  return NextResponse.json({ success: true, message: "Subscribed successfully!" });
}

async function addToCart(data: any) {
  const { user_id, product_id, product_name, price, quantity } = data;
  
  await fetch(`${SUPABASE_URL}/rest/v1/cart_items`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ user_id, product_id, product_name, price, quantity, created_at: new Date().toISOString() }),
  });
  
  return NextResponse.json({ success: true, message: "Added to cart!" });
}

async function getCart(data: any) {
  const { user_id } = data;
  
  const res = await fetch(`${SUPABASE_URL}/rest/v1/cart_items?user_id=eq.${user_id}`, {
    headers: headers(),
  });
  const items = await res.json();
  
  const total = (items || []).reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  
  return NextResponse.json({ success: true, items, total });
}

async function placeOrder(data: any) {
  const { user_id, items, total, address } = data;
  
  await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ user_id, items, total, address, status: "pending", created_at: new Date().toISOString() }),
  });
  
  return NextResponse.json({ success: true, message: "Order placed!" });
}

async function postComment(data: any) {
  const { website_niche, user_name, comment } = data;
  
  await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ website_niche, user_name, comment, created_at: new Date().toISOString() }),
  });
  
  return NextResponse.json({ success: true, message: "Comment posted!" });
}

async function getComments(data: any) {
  const { website_niche } = data;
  
  const res = await fetch(`${SUPABASE_URL}/rest/v1/comments?website_niche=eq.${website_niche}&order=created_at.desc`, {
    headers: headers(),
  });
  const comments = await res.json();
  
  return NextResponse.json({ success: true, comments });
}

async function trackVisit(data: any) {
  const { website_niche, page } = data;
  
  await fetch(`${SUPABASE_URL}/rest/v1/visits`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ website_niche, page, created_at: new Date().toISOString() }),
  });
  
  return NextResponse.json({ success: true });
}

async function getAnalytics(data: any) {
  const { website_niche } = data;
  
  const res = await fetch(`${SUPABASE_URL}/rest/v1/visits?website_niche=eq.${website_niche}&order=created_at.desc&limit=100`, {
    headers: headers(),
  });
  const visits = await res.json();
  
  return NextResponse.json({ 
    success: true, 
    totalVisits: (visits || []).length,
    visits 
  });
}

function headers() {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };
}
