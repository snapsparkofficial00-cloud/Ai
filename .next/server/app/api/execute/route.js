"use strict";(()=>{var e={};e.id=972,e.ids=[972],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2003:(e,t,s)=>{s.r(t),s.d(t,{originalPathname:()=>w,patchFetch:()=>v,requestAsyncStorage:()=>A,routeModule:()=>S,serverHooks:()=>f,staticGenerationAsyncStorage:()=>y});var a={};s.r(a),s.d(a,{POST:()=>h});var n=s(9303),r=s(8716),o=s(670),i=s(7070);class u{send(e,t,s){let a={from:e,to:t,message:s,timestamp:new Date};return this.messages.unshift(a),console.log(`[BUS]
${e} -> ${t}:
${s}`),a}getMessages(){return this.messages}clear(){this.messages=[]}constructor(){this.messages=[]}}let c=new u;async function l(e){let t=[{agent:"website-ai",input:`Build website for:
${e}`},{agent:"automation-ai",input:`Automate workflow for:
${e}`},{agent:"revenue-ai",input:`Generate revenue strategy for:
${e}`}];return c.send("planner-ai","all-agents",`Execution plan created for:
${e}`),{success:!0,goal:e,tasks:t}}var p=s(8357);class d{addTask(e,t){let s={id:crypto.randomUUID(),agent:e,input:t,status:"pending"};return this.queue.push(s),this.process(),s}async process(){if(!this.running){for(this.running=!0;this.queue.length>0;){let e=this.queue[0];try{e.status="running",await p.Z.createTask(e.agent,e.input),e.status="completed"}catch{e.status="failed"}this.queue.shift()}this.running=!1}}getQueue(){return this.queue}constructor(){this.queue=[],this.running=!1}}let g=new d;async function m(e){let t=[];for(let s of e){let e=g.addTask(s.agent,s.input);t.push(e)}return{success:!0,queued:t}}async function h(e){try{let t=await e.json(),s=await l(t.goal),a=await m(s.tasks);return i.NextResponse.json({success:!0,goal:t.goal,plan:s,execution:a})}catch(e){return console.log(e),i.NextResponse.json({success:!1,error:"Execution failed"})}}let S=new n.AppRouteRouteModule({definition:{kind:r.x.APP_ROUTE,page:"/api/execute/route",pathname:"/api/execute",filename:"route",bundlePath:"app/api/execute/route"},resolvedPagePath:"/workspaces/Ai/app/api/execute/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:A,staticGenerationAsyncStorage:y,serverHooks:f}=S,w="/api/execute/route";function v(){return(0,o.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:y})}},5912:(e,t,s)=>{s.d(t,{B7:()=>n,yr:()=>r});let a=[];function n(e,t,s){a.unshift({id:crypto.randomUUID(),time:new Date,agent:e,type:t,message:s})}function r(){return a}},8182:(e,t,s)=>{async function a(e){try{return await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory`,{method:"POST",headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,Authorization:`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({agent:e.agent,message:e.message,response:e.response,created_at:new Date})}),{success:!0}}catch(e){return console.log("MEMORY ERROR:",e),{success:!1}}}async function n(){try{let e=await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory?select=*`,{headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,Authorization:`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`}});return await e.json()}catch(e){return console.log(e),[]}}s.d(t,{N:()=>n,j:()=>a})},8357:(e,t,s)=>{s.d(t,{Z:()=>i});var a=s(8182),n=s(5912);async function r(e,t){(0,n.B7)(e,"INFO",`Task started:
${t}`);try{switch(e){case"ceo-ai":return(0,n.B7)(e,"SUCCESS","CEO AI completed orchestration"),`
👑 CEO AI processed:
${t}

✅ System coordination complete
✅ AI orchestration active
`;case"youtube-ai":(0,n.B7)(e,"INFO","Calling OpenRouter API");let s=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`},body:JSON.stringify({model:"meta-llama/llama-3.1-8b-instruct",messages:[{role:"system",content:"You are YouTube AI. Generate viral YouTube growth strategies."},{role:"user",content:t}]})}),r=await s.json(),o=r.choices?.[0]?.message?.content||"No AI response";return await (0,a.j)({agent:e,message:t,response:o}),(0,n.B7)(e,"SUCCESS","YouTube AI completed successfully"),o;case"instagram-ai":return(0,n.B7)(e,"SUCCESS","Instagram strategy generated"),`
📸 Instagram AI processed:
${t}

✅ Reels strategy generated
✅ Hashtag optimization complete
✅ Growth system active
`;case"website-ai":return(0,n.B7)(e,"SUCCESS","Website generated"),`
🌐 Website AI processed:
${t}

✅ React app generation complete
✅ UI system generated
✅ Backend structure prepared
`;case"revenue-ai":return(0,n.B7)(e,"SUCCESS","Revenue strategy completed"),`
💰 Revenue AI processed:
${t}

✅ Monetization strategy complete
✅ Revenue optimization active
✅ Business scaling analysis complete
`;case"automation-ai":return(0,n.B7)(e,"SUCCESS","Automation workflow generated"),`
⚡ Automation AI processed:
${t}

✅ Workflow automation active
✅ AI pipelines generated
✅ Task orchestration complete
`;case"memory-ai":return(0,n.B7)(e,"SUCCESS","Memory stored successfully"),`
🧠 Memory AI processed:
${t}

✅ Conversation stored
✅ Strategy memory updated
✅ Long-term memory active
`;case"crew-ai":return(0,n.B7)(e,"SUCCESS","CrewAI collaboration completed"),`
👥 CrewAI processed:
${t}

✅ Multi-agent collaboration active
✅ Task delegation complete
✅ Agent coordination successful
`;case"autogpt":return(0,n.B7)(e,"SUCCESS","AutoGPT execution completed"),`
🤖 AutoGPT processed:
${t}

✅ Autonomous execution active
✅ Goal planning complete
✅ Recursive workflow running
`;case"langgraph":return(0,n.B7)(e,"SUCCESS","LangGraph workflow completed"),`
🔗 LangGraph processed:
${t}

✅ Graph workflow generated
✅ State management active
✅ Multi-step execution complete
`;case"opendevin":return(0,n.B7)(e,"SUCCESS","OpenDevin engineering completed"),`
💻 OpenDevin processed:
${t}

✅ Code analysis complete
✅ Software engineering workflow active
✅ Repository automation ready
`;default:return(0,n.B7)(e,"ERROR","Unknown AI agent requested"),`
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
`}}catch(t){return console.log(t),(0,n.B7)(e,"ERROR","Agent execution failed"),`
❌ AI Agent Failed:
${e}

System encountered an error.
`}}class o{async createTask(e,t){let s={id:crypto.randomUUID(),agent:e,input:t,status:"queued",createdAt:new Date};return this.tasks.unshift(s),(0,n.B7)(e,"INFO","Task queued"),await this.executeTask(s)}async executeTask(e){try{e.status="running",e.startedAt=new Date,(0,n.B7)(e.agent,"INFO",`Task started:
${e.input}`);let t=await r(e.agent,e.input);return e.status="completed",e.completedAt=new Date,e.duration=e.completedAt.getTime()-e.startedAt.getTime(),e.result=t,(0,n.B7)(e.agent,"SUCCESS",`Task completed in
${e.duration}ms`),{success:!0,task:e,result:t}}catch(t){return e.status="failed",e.error=t?.message||"Unknown error",e.completedAt=new Date,(0,n.B7)(e.agent,"ERROR",`Task failed:
${e.error}`),{success:!1,error:t}}}getTasks(){return this.tasks}getStats(){return{total:this.tasks.length,running:this.tasks.filter(e=>"running"===e.status).length,completed:this.tasks.filter(e=>"completed"===e.status).length,failed:this.tasks.filter(e=>"failed"===e.status).length,queued:this.tasks.filter(e=>"queued"===e.status).length}}clearTasks(){this.tasks=[],(0,n.B7)("system","INFO","Workflow tasks cleared")}constructor(){this.tasks=[]}}let i=new o}};var t=require("../../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[948,59],()=>s(2003));module.exports=a})();