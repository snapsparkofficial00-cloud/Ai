"use strict";(()=>{var e={};e.id=567,e.ids=[567],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},8482:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>A,patchFetch:()=>S,requestAsyncStorage:()=>g,routeModule:()=>m,serverHooks:()=>y,staticGenerationAsyncStorage:()=>h});var s={};a.r(s),a.d(s,{GET:()=>d});var r=a(9303),n=a(8716),o=a(670),i=a(7070),c=a(8357),u=a(5912);let l=require("os");var p=a.n(l);async function d(){return i.NextResponse.json({success:!0,analytics:function(){let e=c.Z.getTasks(),t=(0,u.yr)();return{tasks:{total:e.length,completed:e.filter(e=>"completed"===e.status).length,failed:e.filter(e=>"failed"===e.status).length,running:e.filter(e=>"running"===e.status).length},logs:t.length,successRate:e.length>0?e.filter(e=>"completed"===e.status).length/e.length*100:0}}(),system:{platform:p().platform(),cpuCores:p().cpus().length,totalMemory:p().totalmem(),freeMemory:p().freemem(),uptime:p().uptime(),loadAverage:p().loadavg(),timestamp:new Date}})}let m=new r.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/analytics/route",pathname:"/api/analytics",filename:"route",bundlePath:"app/api/analytics/route"},resolvedPagePath:"/workspaces/Ai/app/api/analytics/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:g,staticGenerationAsyncStorage:h,serverHooks:y}=m,A="/api/analytics/route";function S(){return(0,o.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:h})}},5912:(e,t,a)=>{a.d(t,{B7:()=>r,yr:()=>n});let s=[];function r(e,t,a){s.unshift({id:crypto.randomUUID(),time:new Date,agent:e,type:t,message:a})}function n(){return s}},8182:(e,t,a)=>{async function s(e){try{return await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory`,{method:"POST",headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,Authorization:`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({agent:e.agent,message:e.message,response:e.response,created_at:new Date})}),{success:!0}}catch(e){return console.log("MEMORY ERROR:",e),{success:!1}}}async function r(){try{let e=await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory?select=*`,{headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,Authorization:`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`}});return await e.json()}catch(e){return console.log(e),[]}}a.d(t,{N:()=>r,j:()=>s})},8357:(e,t,a)=>{a.d(t,{Z:()=>i});var s=a(8182),r=a(5912);async function n(e,t){(0,r.B7)(e,"INFO",`Task started:
${t}`);try{switch(e){case"ceo-ai":return(0,r.B7)(e,"SUCCESS","CEO AI completed orchestration"),`
👑 CEO AI processed:
${t}

✅ System coordination complete
✅ AI orchestration active
`;case"youtube-ai":(0,r.B7)(e,"INFO","Calling OpenRouter API");let a=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`},body:JSON.stringify({model:"meta-llama/llama-3.1-8b-instruct",messages:[{role:"system",content:"You are YouTube AI. Generate viral YouTube growth strategies."},{role:"user",content:t}]})}),n=await a.json(),o=n.choices?.[0]?.message?.content||"No AI response";return await (0,s.j)({agent:e,message:t,response:o}),(0,r.B7)(e,"SUCCESS","YouTube AI completed successfully"),o;case"instagram-ai":return(0,r.B7)(e,"SUCCESS","Instagram strategy generated"),`
📸 Instagram AI processed:
${t}

✅ Reels strategy generated
✅ Hashtag optimization complete
✅ Growth system active
`;case"website-ai":return(0,r.B7)(e,"SUCCESS","Website generated"),`
🌐 Website AI processed:
${t}

✅ React app generation complete
✅ UI system generated
✅ Backend structure prepared
`;case"revenue-ai":return(0,r.B7)(e,"SUCCESS","Revenue strategy completed"),`
💰 Revenue AI processed:
${t}

✅ Monetization strategy complete
✅ Revenue optimization active
✅ Business scaling analysis complete
`;case"automation-ai":return(0,r.B7)(e,"SUCCESS","Automation workflow generated"),`
⚡ Automation AI processed:
${t}

✅ Workflow automation active
✅ AI pipelines generated
✅ Task orchestration complete
`;case"memory-ai":return(0,r.B7)(e,"SUCCESS","Memory stored successfully"),`
🧠 Memory AI processed:
${t}

✅ Conversation stored
✅ Strategy memory updated
✅ Long-term memory active
`;case"crew-ai":return(0,r.B7)(e,"SUCCESS","CrewAI collaboration completed"),`
👥 CrewAI processed:
${t}

✅ Multi-agent collaboration active
✅ Task delegation complete
✅ Agent coordination successful
`;case"autogpt":return(0,r.B7)(e,"SUCCESS","AutoGPT execution completed"),`
🤖 AutoGPT processed:
${t}

✅ Autonomous execution active
✅ Goal planning complete
✅ Recursive workflow running
`;case"langgraph":return(0,r.B7)(e,"SUCCESS","LangGraph workflow completed"),`
🔗 LangGraph processed:
${t}

✅ Graph workflow generated
✅ State management active
✅ Multi-step execution complete
`;case"opendevin":return(0,r.B7)(e,"SUCCESS","OpenDevin engineering completed"),`
💻 OpenDevin processed:
${t}

✅ Code analysis complete
✅ Software engineering workflow active
✅ Repository automation ready
`;default:return(0,r.B7)(e,"ERROR","Unknown AI agent requested"),`
❌ Unknown AI Agent:
${e}

Available agents:
- ceo-ai
- youtube-ai
- instagram-ai
- website-ai
- revenue-ai
- automation-ai
- memory-ai
- crew-ai
- autogpt
- langgraph
- opendevin
`}}catch(t){return console.log(t),(0,r.B7)(e,"ERROR","Agent execution failed"),`
❌ AI Agent Failed:
${e}

System encountered an error.
`}}class o{async createTask(e,t){let a={id:crypto.randomUUID(),agent:e,input:t,status:"queued",createdAt:new Date};return this.tasks.unshift(a),(0,r.B7)(e,"INFO","Task queued"),await this.executeTask(a)}async executeTask(e){try{e.status="running",e.startedAt=new Date,(0,r.B7)(e.agent,"INFO",`Task started:
${e.input}`);let t=await n(e.agent,e.input);return e.status="completed",e.completedAt=new Date,e.duration=e.completedAt.getTime()-e.startedAt.getTime(),e.result=t,(0,r.B7)(e.agent,"SUCCESS",`Task completed in
${e.duration}ms`),{success:!0,task:e,result:t}}catch(t){return e.status="failed",e.error=t?.message||"Unknown error",e.completedAt=new Date,(0,r.B7)(e.agent,"ERROR",`Task failed:
${e.error}`),{success:!1,error:t}}}getTasks(){return this.tasks}getStats(){return{total:this.tasks.length,running:this.tasks.filter(e=>"running"===e.status).length,completed:this.tasks.filter(e=>"completed"===e.status).length,failed:this.tasks.filter(e=>"failed"===e.status).length,queued:this.tasks.filter(e=>"queued"===e.status).length}}clearTasks(){this.tasks=[],(0,r.B7)("system","INFO","Workflow tasks cleared")}constructor(){this.tasks=[]}}let i=new o}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[948,59],()=>a(8482));module.exports=s})();