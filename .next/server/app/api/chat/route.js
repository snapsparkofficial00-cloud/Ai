"use strict";(()=>{var e={};e.id=744,e.ids=[744],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6716:(e,s,t)=>{t.r(s),t.d(s,{originalPathname:()=>d,patchFetch:()=>A,requestAsyncStorage:()=>p,routeModule:()=>l,serverHooks:()=>m,staticGenerationAsyncStorage:()=>c});var a={};t.r(a),t.d(a,{POST:()=>u});var i=t(9303),o=t(8716),n=t(670),r=t(7070);async function u(e){try{let{message:s}=await e.json();if(!s)return r.NextResponse.json({reply:"❌ Missing message"});let t=s.toLowerCase(),a="\uD83D\uDC51 CEO AI",i="",o="https://api.groq.com/openai/v1/chat/completions",n=process.env.GROQ_API_KEY,u="llama-3.3-70b-versatile";if(t.includes("youtube")||t.includes("shorts")||t.includes("viral")||t.includes("video"))a="\uD83D\uDCFA YouTube AI",u="llama-3.3-70b-versatile",o="https://api.groq.com/openai/v1/chat/completions",n=process.env.GROQ_API_KEY,i=`
You are YouTube AI OS.

Generate:
- Viral titles
- Shorts hooks
- SEO descriptions
- Hashtags
- Scripts
- Monetization plans
- Growth systems
`;else if(t.includes("instagram")||t.includes("reels"))a="\uD83D\uDCF8 Instagram AI",u="openai/gpt-4o-mini",o="https://openrouter.ai/api/v1/chat/completions",n=process.env.OPENROUTER_API_KEY,i=`
You are Instagram AI.

Generate:
- Viral reels
- Captions
- Hashtags
- Growth plans
- Engagement systems
`;else if(t.includes("website")||t.includes("web")||t.includes("code")||t.includes("developer"))a="\uD83C\uDF10 Website AI",o="https://api.groq.com/openai/v1/chat/completions",n=process.env.GROQ_API_KEY,u="llama-3.3-70b-versatile",i=`
You are elite Website Builder AI.

Generate:
- Fullstack apps
- React systems
- SaaS systems
- Landing pages
- Backend architecture
- API systems
- AI dashboards
- Automation systems

Behave like elite autonomous software engineer.
`;else if(t.includes("ui")||t.includes("design")||t.includes("layout")||t.includes("dashboard")){a="\uD83E\uDDE0 Gemini UI AI";let e=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:`You are elite UI AI.

Generate:
- futuristic UI
- app layouts
- dashboard systems
- mobile UI
- animations
- responsive systems

User request:
${s}`}]}]})}),t=await e.json();return r.NextResponse.json({activeAgent:a,model:"gemini-1.5-flash",reply:t?.candidates?.[0]?.content?.parts?.[0]?.text||"⚠️ Gemini failed"})}else t.includes("money")||t.includes("business")||t.includes("revenue")||t.includes("ecommerce")?(a="\uD83D\uDCB0 Revenue AI",u="meta-llama/llama-3.1-8b-instruct",o="https://openrouter.ai/api/v1/chat/completions",n=process.env.OPENROUTER_API_KEY,i=`
You are Revenue AI.

Generate:
- Business systems
- Monetization plans
- Ecommerce plans
- AI income ideas
- Scaling strategies
`):t.includes("game")||t.includes("unity")||t.includes("unreal")?(a="\uD83C\uDFAE Game AI",u="deepseek/deepseek-chat",o="https://openrouter.ai/api/v1/chat/completions",n=process.env.OPENROUTER_API_KEY,i=`
You are elite Game AI.

Generate:
- mobile games
- Unity systems
- Unreal Engine systems
- game monetization
- ad systems
- viral gameplay loops
- addictive mechanics

Behave like elite game developer AI.
`):t.includes("app")||t.includes("apk")||t.includes("android")||t.includes("ios")?(a="\uD83D\uDCF1 App Builder AI",u="anthropic/claude-3.5-sonnet",o="https://openrouter.ai/api/v1/chat/completions",n=process.env.OPENROUTER_API_KEY,i=`
You are elite App Builder AI.

Generate:
- Android apps
- iOS apps
- React Native systems
- Flutter apps
- monetization systems
- ad integrations
- scalable app architecture

Behave like elite mobile software engineer.
`):t.includes("analytics")||t.includes("seo")||t.includes("traffic")?(a="\uD83D\uDCCA Analytics AI",u="gemini-1.5-flash",o="https://openrouter.ai/api/v1/chat/completions",n=process.env.OPENROUTER_API_KEY,i=`
You are Analytics AI.

Analyze:
- traffic
- SEO
- audience growth
- YouTube metrics
- business performance
- monetization metrics

Behave like elite analytics strategist.
`):t.includes("automation")||t.includes("workflow")?(a="⚡ Automation AI",u="mistralai/mistral-7b-instruct",o="https://openrouter.ai/api/v1/chat/completions",n=process.env.OPENROUTER_API_KEY,i=`
You are Automation AI.

Build:
- workflows
- AI pipelines
- automation systems
- autonomous infrastructure
`):(a="\uD83D\uDC51 CEO AI",u="openai/gpt-4o-mini",o="https://openrouter.ai/api/v1/chat/completions",n=process.env.OPENROUTER_API_KEY,i=`
You are CEO AI OS.

You control:
- YouTube AI
- Instagram AI
- Website AI
- Revenue AI
- Memory AI
- Automation AI
- Analytics AI

Behave like futuristic autonomous AI operating system.
`);if(!n)return r.NextResponse.json({activeAgent:a,reply:"❌ Missing API Key"});let l=await fetch(o,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({model:u,temperature:.7,max_tokens:1400,messages:[{role:"system",content:i},{role:"user",content:s}]})}),p=await l.json();console.log("AI RESPONSE:",p);try{await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory`,{method:"POST",headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,Authorization:`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({agent:a,message:s,response:p?.choices?.[0]?.message?.content||"",model:u})})}catch(e){console.log("MEMORY SAVE ERROR:",e)}if(!l.ok)return r.NextResponse.json({activeAgent:a,reply:p?.error?.message||"❌ API ERROR"});return r.NextResponse.json({activeAgent:a,model:u,reply:p?.choices?.[0]?.message?.content||"⚠️ No AI response"})}catch(e){return console.log(e),r.NextResponse.json({reply:"❌ SERVER ERROR",error:String(e)})}}let l=new i.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"/workspaces/Ai/app/api/chat/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:p,staticGenerationAsyncStorage:c,serverHooks:m}=l,d="/api/chat/route";function A(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:c})}}};var s=require("../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),a=s.X(0,[948,59],()=>t(6716));module.exports=a})();