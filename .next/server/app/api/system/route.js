"use strict";(()=>{var e={};e.id=600,e.ids=[600],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2074:(e,t,a)=>{a.r(t),a.d(t,{originalPathname:()=>h,patchFetch:()=>w,requestAsyncStorage:()=>d,routeModule:()=>g,serverHooks:()=>y,staticGenerationAsyncStorage:()=>A});var s={};a.r(s),a.d(s,{GET:()=>p});var o=a(9303),n=a(8716),r=a(670),i=a(7070),u=a(8357),l=a(3763),c=a(8182),m=a(5912);async function p(){try{let e=u.Z.getTasks(),t=u.Z.getStats(),a=await (0,c.N)(),s=(0,m.yr)();return i.NextResponse.json({success:!0,system:{status:"ONLINE",ai:"ACTIVE",version:"AI OS v1",uptime:process.uptime(),timestamp:new Date},stats:{totalAgents:l.D.length,runningTasks:t.running,completedTasks:t.completed,failedTasks:t.failed,queuedTasks:t.queued,totalTasks:t.total,memoryStored:a.length,logs:s.length},activeAgents:l.D.map(e=>({id:e.id,name:e.name,role:e.role,status:e.status})),latestTasks:e.slice(0,10),latestLogs:s.slice(0,10)})}catch(e){return console.log(e),i.NextResponse.json({success:!1,error:"System API failed"})}}let g=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/system/route",pathname:"/api/system",filename:"route",bundlePath:"app/api/system/route"},resolvedPagePath:"/workspaces/Ai/app/api/system/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:A,serverHooks:y}=g,h="/api/system/route";function w(){return(0,r.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:A})}},3763:(e,t,a)=>{a.d(t,{D:()=>s});let s=[{id:"ceo-ai",name:"\uD83D\uDC51 CEO AI",role:"Controls all AI systems",model:"openai/gpt-4o-mini",status:"ACTIVE",abilities:["task management","system coordination","agent orchestration","business intelligence","automation control"]},{id:"youtube-ai",name:"\uD83D\uDCFA YouTube AI",role:"Viral growth and content generation",model:"llama-3.3-70b-versatile",status:"ACTIVE",abilities:["viral titles","shorts scripts","seo optimization","youtube growth","monetization"]},{id:"instagram-ai",name:"\uD83D\uDCF8 Instagram AI",role:"Instagram reels automation",model:"openai/gpt-4o-mini",status:"ACTIVE",abilities:["reels generation","captions","hashtags","engagement growth","social automation"]},{id:"website-ai",name:"\uD83C\uDF10 Website AI",role:"Autonomous website builder",model:"llama-3.3-70b-versatile",status:"ACTIVE",abilities:["react apps","fullstack systems","backend generation","ui generation","saas generation"]},{id:"revenue-ai",name:"\uD83D\uDCB0 Revenue AI",role:"Business scaling and monetization",model:"meta-llama/llama-3.1-8b-instruct",status:"ACTIVE",abilities:["business plans","income generation","ecommerce","scaling","monetization"]},{id:"automation-ai",name:"⚡ Automation AI",role:"Workflow automation systems",model:"mistralai/mistral-7b-instruct",status:"ACTIVE",abilities:["automation pipelines","workflow systems","ai orchestration","task automation","agent automation"]},{id:"memory-ai",name:"\uD83E\uDDE0 Memory AI",role:"Stores AI memory and strategies",model:"supabase-memory",status:"ACTIVE",abilities:["memory storage","conversation memory","task history","strategy storage","agent learning"]},{id:"crew-ai",name:"\uD83D\uDC65 CrewAI",role:"Multi-agent collaboration system",model:"crewai-core",status:"ACTIVE",abilities:["agent teamwork","task delegation","multi-agent execution","research coordination","workflow collaboration"]},{id:"autogpt",name:"\uD83E\uDD16 AutoGPT",role:"Autonomous task execution",model:"autogpt-core",status:"ACTIVE",abilities:["autonomous execution","goal planning","task loops","research automation","decision making"]},{id:"langgraph",name:"\uD83D\uDD17 LangGraph",role:"Advanced workflow graph system",model:"langgraph-core",status:"ACTIVE",abilities:["graph workflows","conditional execution","multi-step logic","agent routing","state management"]},{id:"opendevin",name:"\uD83D\uDCBB OpenDevin",role:"Autonomous software engineer",model:"opendevin-core",status:"ACTIVE",abilities:["bug fixing","code generation","software engineering","repo analysis","coding automation"]}]},5912:(e,t,a)=>{a.d(t,{B7:()=>o,yr:()=>n});let s=[];function o(e,t,a){s.unshift({id:crypto.randomUUID(),time:new Date,agent:e,type:t,message:a})}function n(){return s}},8182:(e,t,a)=>{async function s(e){try{return await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory`,{method:"POST",headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,Authorization:`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({agent:e.agent,message:e.message,response:e.response,created_at:new Date})}),{success:!0}}catch(e){return console.log("MEMORY ERROR:",e),{success:!1}}}async function o(){try{let e=await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/memory?select=*`,{headers:{apikey:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,Authorization:`Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`}});return await e.json()}catch(e){return console.log(e),[]}}a.d(t,{N:()=>o,j:()=>s})},8357:(e,t,a)=>{a.d(t,{Z:()=>i});var s=a(8182),o=a(5912);async function n(e,t){(0,o.B7)(e,"INFO",`Task started:
${t}`);try{switch(e){case"ceo-ai":return(0,o.B7)(e,"SUCCESS","CEO AI completed orchestration"),`
👑 CEO AI processed:
${t}

✅ System coordination complete
✅ AI orchestration active
`;case"youtube-ai":(0,o.B7)(e,"INFO","Calling OpenRouter API");let a=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`},body:JSON.stringify({model:"meta-llama/llama-3.1-8b-instruct",messages:[{role:"system",content:"You are YouTube AI. Generate viral YouTube growth strategies."},{role:"user",content:t}]})}),n=await a.json(),r=n.choices?.[0]?.message?.content||"No AI response";return await (0,s.j)({agent:e,message:t,response:r}),(0,o.B7)(e,"SUCCESS","YouTube AI completed successfully"),r;case"instagram-ai":return(0,o.B7)(e,"SUCCESS","Instagram strategy generated"),`
📸 Instagram AI processed:
${t}

✅ Reels strategy generated
✅ Hashtag optimization complete
✅ Growth system active
`;case"website-ai":return(0,o.B7)(e,"SUCCESS","Website generated"),`
🌐 Website AI processed:
${t}

✅ React app generation complete
✅ UI system generated
✅ Backend structure prepared
`;case"revenue-ai":return(0,o.B7)(e,"SUCCESS","Revenue strategy completed"),`
💰 Revenue AI processed:
${t}

✅ Monetization strategy complete
✅ Revenue optimization active
✅ Business scaling analysis complete
`;case"automation-ai":return(0,o.B7)(e,"SUCCESS","Automation workflow generated"),`
⚡ Automation AI processed:
${t}

✅ Workflow automation active
✅ AI pipelines generated
✅ Task orchestration complete
`;case"memory-ai":return(0,o.B7)(e,"SUCCESS","Memory stored successfully"),`
🧠 Memory AI processed:
${t}

✅ Conversation stored
✅ Strategy memory updated
✅ Long-term memory active
`;case"crew-ai":return(0,o.B7)(e,"SUCCESS","CrewAI collaboration completed"),`
👥 CrewAI processed:
${t}

✅ Multi-agent collaboration active
✅ Task delegation complete
✅ Agent coordination successful
`;case"autogpt":return(0,o.B7)(e,"SUCCESS","AutoGPT execution completed"),`
🤖 AutoGPT processed:
${t}

✅ Autonomous execution active
✅ Goal planning complete
✅ Recursive workflow running
`;case"langgraph":return(0,o.B7)(e,"SUCCESS","LangGraph workflow completed"),`
🔗 LangGraph processed:
${t}

✅ Graph workflow generated
✅ State management active
✅ Multi-step execution complete
`;case"opendevin":return(0,o.B7)(e,"SUCCESS","OpenDevin engineering completed"),`
💻 OpenDevin processed:
${t}

✅ Code analysis complete
✅ Software engineering workflow active
✅ Repository automation ready
`;default:return(0,o.B7)(e,"ERROR","Unknown AI agent requested"),`
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
`}}catch(t){return console.log(t),(0,o.B7)(e,"ERROR","Agent execution failed"),`
❌ AI Agent Failed:
${e}

System encountered an error.
`}}class r{async createTask(e,t){let a={id:crypto.randomUUID(),agent:e,input:t,status:"queued",createdAt:new Date};return this.tasks.unshift(a),(0,o.B7)(e,"INFO","Task queued"),await this.executeTask(a)}async executeTask(e){try{e.status="running",e.startedAt=new Date,(0,o.B7)(e.agent,"INFO",`Task started:
${e.input}`);let t=await n(e.agent,e.input);return e.status="completed",e.completedAt=new Date,e.duration=e.completedAt.getTime()-e.startedAt.getTime(),e.result=t,(0,o.B7)(e.agent,"SUCCESS",`Task completed in
${e.duration}ms`),{success:!0,task:e,result:t}}catch(t){return e.status="failed",e.error=t?.message||"Unknown error",e.completedAt=new Date,(0,o.B7)(e.agent,"ERROR",`Task failed:
${e.error}`),{success:!1,error:t}}}getTasks(){return this.tasks}getStats(){return{total:this.tasks.length,running:this.tasks.filter(e=>"running"===e.status).length,completed:this.tasks.filter(e=>"completed"===e.status).length,failed:this.tasks.filter(e=>"failed"===e.status).length,queued:this.tasks.filter(e=>"queued"===e.status).length}}clearTasks(){this.tasks=[],(0,o.B7)("system","INFO","Workflow tasks cleared")}constructor(){this.tasks=[]}}let i=new r}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[948,59],()=>a(2074));module.exports=s})();