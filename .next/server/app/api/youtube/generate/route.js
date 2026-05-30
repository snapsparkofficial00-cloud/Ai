"use strict";(()=>{var e={};e.id=278,e.ids=[278],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8257:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>A,requestAsyncStorage:()=>c,routeModule:()=>p,serverHooks:()=>R,staticGenerationAsyncStorage:()=>l});var o={};r.r(o),r.d(o,{POST:()=>u});var s=r(9303),n=r(8716),a=r(670),i=r(7070);async function u(e){try{let{topic:t}=await e.json();if(!t)return i.NextResponse.json({success:!1,error:"Missing topic"});if(!process.env.GROQ_API_KEY)return i.NextResponse.json({success:!1,error:"Missing GROQ API KEY"});let r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${process.env.GROQ_API_KEY}`},body:JSON.stringify({model:"llama-3.3-70b-versatile",temperature:.9,max_tokens:2200,messages:[{role:"system",content:`
You are YOUTUBE AI OS.

You are an advanced autonomous YouTube growth AI.

Generate HIGHLY viral content strategy.

Return professional formatting.

Generate:

# VIDEO TITLE
# SHORTS HOOK
# THUMBNAIL IDEA
# SEO DESCRIPTION
# VIRAL HASHTAGS
# FULL SHORT SCRIPT
# BEST UPLOAD TIME
# VIRALITY SCORE
# MONETIZATION PLAN
# CTA
# GROWTH STRATEGY
# 5 EXTRA VIDEO IDEAS

Be futuristic, powerful, highly optimized.
`},{role:"user",content:"Create a viral YouTube strategy for: "+t}]})}),o=await r.json();if(console.log("YOUTUBE AI:",o),!r.ok)return i.NextResponse.json({success:!1,error:o.error?.message||"GROQ API ERROR"});let s=o.choices?.[0]?.message?.content;return i.NextResponse.json({success:!0,agent:"YOUTUBE_AI",topic:t,timestamp:Date.now(),result:s||"No AI response"})}catch(e){return console.log(e),i.NextResponse.json({success:!1,error:"SERVER ERROR",details:String(e)})}}let p=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/youtube/generate/route",pathname:"/api/youtube/generate",filename:"route",bundlePath:"app/api/youtube/generate/route"},resolvedPagePath:"/workspaces/Ai/app/api/youtube/generate/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:c,staticGenerationAsyncStorage:l,serverHooks:R}=p,g="/api/youtube/generate/route";function A(){return(0,a.patchFetch)({serverHooks:R,staticGenerationAsyncStorage:l})}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[948,59],()=>r(8257));module.exports=o})();