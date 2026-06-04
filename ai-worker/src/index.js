export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === "/ai" && request.method === "POST") {
      try {
        const { prompt } = await request.json();
        
        const response = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
          messages: [{ role: "user", content: prompt }]
        });
        
        return Response.json({ success: true, result: response.response });
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }
    
    if (url.pathname === "/" && request.method === "GET") {
      return Response.json({ status: "AI Worker Online", timestamp: Date.now() });
    }
    
    return Response.json({ error: "Not found" }, { status: 404 });
  }
}
