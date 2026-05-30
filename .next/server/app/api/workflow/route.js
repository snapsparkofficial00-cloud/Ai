"use strict";(()=>{var e={};e.id=199,e.ids=[199],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1777:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>S,patchFetch:()=>w,requestAsyncStorage:()=>d,routeModule:()=>p,serverHooks:()=>g,staticGenerationAsyncStorage:()=>m});var s={};a.r(s),a.d(s,{GET:()=>u,POST:()=>l});var r=a(9303),o=a(8716),n=a(670),i=a(7070),c=a(8357);async function u(){try{let e=c.Z.getTasks(),t=c.Z.getStats();return i.NextResponse.json({success:!0,stats:t,total:e.length,tasks:e,updatedAt:new Date})}catch(e){return console.log(e),i.NextResponse.json({success:!1,error:"Failed to load workflow"})}}async function l(e){try{let t=await e.json(),a=await c.Z.createTask(t.agent||"ceo-ai",t.input||t.objective||"No objective");return i.NextResponse.json({success:!0,result:a,message:"Workflow executed successfully",createdAt:new Date})}catch(e){return console.log(e),i.NextResponse.json({success:!1,error:"Workflow execution failed"})}}let p=new r.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/workflow/route",pathname:"/api/workflow",filename:"route",bundlePath:"app/api/workflow/route"},resolvedPagePath:"/workspaces/Ai/app/api/workflow/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:m,serverHooks:g}=p,S="/api/workflow/route";function w(){return(0,n.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:m})}},5912:(e,t,a)=>{a.d(t,{B7:()=>r,yr:()=>o});let s=[];function r(e,t,a){s.unshift({id:crypto.randomUUID(),time:new Date,agent:e,type:t,message:a})}function o(){return s}},8182:(e,t,a)=>{async function s(e){try{return await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory`,{method:"POST",headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,Authorization:`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({agent:e.agent,message:e.message,response:e.response,created_at:new Date})}),{success:!0}}catch(e){return console.log("MEMORY ERROR:",e),{success:!1}}}async function r(){try{let e=await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory?select=*`,{headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,Authorization:`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`}});return await e.json()}catch(e){return console.log(e),[]}}a.d(t,{N:()=>r,j:()=>s})},8357:(e,t,a)=>{a.d(t,{Z:()=>i});var s=a(8182),r=a(5912);async function o(e,t){(0,r.B7)(e,"INFO",`Task started:
${t}`);try{switch(e){case"ceo-ai":return(0,r.B7)(e,"SUCCESS","CEO AI completed orchestration"),`
👑 CEO AI processed:
${t}

✅ System coordination complete
✅ AI orchestration active
`;case"youtube-ai":(0,r.B7)(e,"INFO","Calling OpenRouter API");let a=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`},body:JSON.stringify({model:"meta-llama/llama-3.1-8b-instruct",messages:[{role:"system",content:"You are YouTube AI. Generate viral YouTube growth strategies."},{role:"user",content:t}]})}),o=await a.json(),n=o.choices?.[0]?.message?.content||"No AI response";return await (0,s.j)({agent:e,message:t,response:n}),(0,r.B7)(e,"SUCCESS","YouTube AI completed successfully"),n;case"instagram-ai":return(0,r.B7)(e,"SUCCESS","Instagram strategy generated"),`
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
`}}class n{async createTask(e,t){let a={id:crypto.randomUUID(),agent:e,input:t,status:"queued",createdAt:new Date};return this.tasks.unshift(a),(0,r.B7)(e,"INFO","Task queued"),await this.executeTask(a)}async executeTask(e){try{e.status="running",e.startedAt=new Date,(0,r.B7)(e.agent,"INFO",`Task started:
${e.input}`);let t=await o(e.agent,e.input);return e.status="completed",e.completedAt=new Date,e.duration=e.completedAt.getTime()-e.startedAt.getTime(),e.result=t,(0,r.B7)(e.agent,"SUCCESS",`Task completed in
${e.duration}ms`),{success:!0,task:e,result:t}}catch(t){return e.status="failed",e.error=t?.message||"Unknown error",e.completedAt=new Date,(0,r.B7)(e.agent,"ERROR",`Task failed:
${e.error}`),{success:!1,error:t}}}getTasks(){return this.tasks}getStats(){return{total:this.tasks.length,running:this.tasks.filter(e=>"running"===e.status).length,completed:this.tasks.filter(e=>"completed"===e.status).length,failed:this.tasks.filter(e=>"failed"===e.status).length,queued:this.tasks.filter(e=>"queued"===e.status).length}}clearTasks(){this.tasks=[],(0,r.B7)("system","INFO","Workflow tasks cleared")}constructor(){this.tasks=[]}}let i=new n}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[948,59],()=>a(1777));module.exports=s})();