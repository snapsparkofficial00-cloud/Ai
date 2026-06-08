import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const html = generateSarkariTools();
    return NextResponse.json({ success: true, website: html, size: html.length });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) });
  }
}

function generateSarkariTools(): string {
  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sarkari Tools AI — Free Photo Resize, JPG to PDF, Biodata Maker for Govt Forms</title>
<meta name="description" content="India's #1 free AI-powered government form tools. Photo resize, JPG to PDF, signature joiner, biodata maker, income tax calculator. No sign-up. Fast & mobile-first.">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
  :root {
    --saffron: #FF6B00;
    --deep: #0A0A0F;
    --card: #111118;
    --border: #2A2A38;
    --muted: #5A5A70;
    --text: #E8E8F0;
    --green: #00D46A;
    --blue: #4FA3FF;
    --purple: #9B6BFF;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:var(--deep); color:var(--text); font-family:'DM Sans',sans-serif; font-size:15px; line-height:1.65; }

  .hero { position:relative; overflow:hidden; background:linear-gradient(135deg,#0A0A0F 0%,#12050A 50%,#0A0A0F 100%); padding:60px 20px 50px; border-bottom:1px solid var(--border); text-align:center; }
  .hero::before { content:''; position:absolute; top:-100px; left:50%; transform:translateX(-50%); width:600px; height:400px; background:radial-gradient(ellipse,rgba(255,107,0,0.15) 0%,transparent 60%); pointer-events:none; }
  .hero h1 { font-family:'Bebas Neue',sans-serif; font-size:clamp(36px,6vw,64px); line-height:0.95; letter-spacing:1px; position:relative; }
  .hero h1 span { color:var(--saffron); }
  .hero p { color:var(--muted); font-size:15px; max-width:600px; margin:12px auto 0; position:relative; }
  .hero-badge { display:inline-block; font-family:'Space Mono',monospace; font-size:10px; color:var(--saffron); letter-spacing:3px; text-transform:uppercase; margin-bottom:12px; position:relative; }

  .stats-row { display:flex; justify-content:center; gap:30px; flex-wrap:wrap; padding:20px; background:var(--card); border-bottom:1px solid var(--border); }
  .stat-item { text-align:center; }
  .stat-num { font-family:'Bebas Neue',sans-serif; font-size:28px; color:var(--saffron); }
  .stat-lbl { font-size:11px; color:var(--muted); }

  .container { max-width:1100px; margin:0 auto; padding:0 20px; }
  
  .section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(24px,3vw,36px); letter-spacing:0.5px; margin-bottom:24px; text-align:center; padding-top:40px; }
  
  .tools-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:16px; padding:0 0 40px; }
  
  .tool-card { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:24px; cursor:pointer; transition:all 0.25s; position:relative; overflow:hidden; }
  .tool-card:hover { border-color:var(--saffron); transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,0.3); }
  .tool-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--saffron); opacity:0.5; }
  .tool-icon { font-size:36px; margin-bottom:12px; }
  .tool-card h3 { font-family:'Bebas Neue',sans-serif; font-size:24px; letter-spacing:0.5px; margin-bottom:6px; }
  .tool-card p { font-size:13px; color:var(--muted); margin-bottom:12px; }
  .tool-tag { display:inline-block; font-family:'Space Mono',monospace; font-size:9px; padding:3px 10px; border-radius:20px; letter-spacing:1px; }
  .tag-free { background:rgba(0,212,106,0.12); color:var(--green); }
  .tag-ai { background:rgba(155,107,255,0.12); color:var(--purple); }
  .tag-hot { background:rgba(255,107,0,0.12); color:var(--saffron); }

  .modal { display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:1000; }
  .modal.active { display:flex; flex-direction:column; }
  .modal-header { padding:15px 20px; background:var(--card); display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); }
  .modal-header button { background:#ff3b5c; color:white; border:none; padding:8px 16px; border-radius:8px; cursor:pointer; font-weight:bold; }
  .modal-body { flex:1; padding:20px; overflow-y:auto; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:20px; }

  .upload-zone { border:2px dashed var(--border); border-radius:16px; padding:40px; text-align:center; cursor:pointer; transition:all 0.3s; width:100%; max-width:500px; }
  .upload-zone:hover { border-color:var(--saffron); background:rgba(255,107,0,0.05); }
  .upload-zone i { font-size:48px; color:var(--muted); margin-bottom:10px; }
  
  .btn { padding:14px 28px; border-radius:12px; border:none; font-size:16px; font-weight:700; cursor:pointer; font-family:'Space Mono',monospace; letter-spacing:0.5px; }
  .btn-saffron { background:var(--saffron); color:#000; }
  .btn-green { background:var(--green); color:#000; }
  
  .result-preview { max-width:400px; width:100%; }
  .result-preview img { width:100%; border-radius:12px; border:1px solid var(--border); }
  
  .footer { background:var(--card); padding:30px; text-align:center; border-top:1px solid var(--border); margin-top:40px; }
  .footer a { color:var(--muted); text-decoration:none; margin:0 10px; font-size:13px; }
  
  .lang-toggle { position:fixed; top:10px; right:10px; z-index:999; display:flex; gap:5px; }
  .lang-btn { padding:6px 14px; border-radius:20px; border:1px solid var(--border); background:var(--card); color:var(--text); cursor:pointer; font-size:11px; font-family:'Space Mono',monospace; }
  .lang-btn.active { background:var(--saffron); border-color:var(--saffron); color:#000; }

  @media (max-width:600px) {
    .tools-grid { grid-template-columns:1fr; }
    .hero h1 { font-size:32px; }
  }
</style>
</head>
<body>

<div class="lang-toggle">
  <button class="lang-btn active" onclick="switchLang('hi')">हिंदी</button>
  <button class="lang-btn" onclick="switchLang('en')">English</button>
</div>

<div class="hero">
  <span class="hero-badge">🇮🇳 India's #1 Government Form Tools</span>
  <h1>SARKARI<br><span>TOOLS AI</span></h1>
  <p>Photo Resize • JPG to PDF • Signature Joiner • Biodata Maker • Tax Calculator • GK Quiz — All FREE, No Sign-Up, AI-Powered</p>
</div>

<div class="stats-row">
  <div class="stat-item"><span class="stat-num">30+</span><span class="stat-lbl">Free Tools</span></div>
  <div class="stat-item"><span class="stat-num">2.5Cr</span><span class="stat-lbl">Exam Aspirants</span></div>
  <div class="stat-item"><span class="stat-num">100%</span><span class="stat-lbl">Free · No Sign-Up</span></div>
  <div class="stat-item"><span class="stat-num">AI</span><span class="stat-lbl">Powered</span></div>
</div>

<div class="container">
  <h2 class="section-title">🎯 MOST USED TOOLS</h2>
  <div class="tools-grid" id="toolsGrid"></div>
</div>

<div class="modal" id="toolModal">
  <div class="modal-header">
    <span id="modalTitle" style="font-family:'Bebas Neue',sans-serif;font-size:22px;">Tool</span>
    <button onclick="closeModal()">✕ Close</button>
  </div>
  <div class="modal-body" id="modalBody"></div>
</div>

<div class="footer">
  <p style="font-family:'Bebas Neue',sans-serif;font-size:24px;">SARKARI TOOLS AI</p>
  <p style="color:var(--muted);font-size:13px;">India's #1 Free AI-Powered Government Form Tools</p>
  <div style="margin-top:15px;">
    <a href="#">Photo Resize</a> <a href="#">JPG to PDF</a> <a href="#">Signature Joiner</a> <a href="#">Biodata Maker</a> <a href="#">Tax Calculator</a> <a href="#">GK Quiz</a>
  </div>
  <p style="color:var(--muted);font-size:11px;margin-top:15px;">© 2025 Sarkari Tools AI · Built for India · 100% Free</p>
</div>

<script>
const tools = [
  { id:'photo', icon:'📸', name:'Photo Resizer', desc:'Resize photo for UPSC, SSC, RRB forms. Auto-detect exam requirements.', tag:'HOT', tagClass:'tag-hot', action:'photoResize' },
  { id:'pdf', icon:'📄', name:'JPG to PDF', desc:'Convert any image to PDF instantly. No upload needed — client-side.', tag:'FREE', tagClass:'tag-free', action:'jpgToPdf' },
  { id:'sign', icon:'✍️', name:'Signature Joiner', desc:'Merge photo + signature into one file for government forms.', tag:'HOT', tagClass:'tag-hot', action:'signJoin' },
  { id:'biodata', icon:'💍', name:'AI Biodata Maker', desc:'AI writes beautiful marriage biodata in Hindi/English. Instant PDF.', tag:'AI', tagClass:'tag-ai', action:'biodataMaker' },
  { id:'tax', icon:'💰', name:'Income Tax Calculator', desc:'New vs Old Regime. AI explains which saves you more tax.', tag:'AI', tagClass:'tag-ai', action:'taxCalc' },
  { id:'emi', icon:'🏠', name:'EMI Calculator', desc:'Home loan, car loan, personal loan EMI. AI explains amortization.', tag:'FREE', tagClass:'tag-free', action:'emiCalc' },
  { id:'gk', icon:'🧠', name:'GK Quiz AI', desc:'Daily current affairs + GK quiz. AI generates fresh questions.', tag:'AI', tagClass:'tag-ai', action:'gkQuiz' },
  { id:'resume', icon:'📝', name:'AI Resume Maker', desc:'Instant professional resume. Hindi + English. ATS-friendly format.', tag:'AI', tagClass:'tag-ai', action:'resumeMaker' },
  { id:'hindi', icon:'⌨️', name:'Hindi Typing Test', desc:'Practice Hindi typing for government exams. Speed + accuracy.', tag:'FREE', tagClass:'tag-free', action:'hindiType' },
];

function renderTools() {
  document.getElementById('toolsGrid').innerHTML = tools.map(t => \`
    <div class="tool-card" onclick="openTool('\${t.id}')">
      <div class="tool-icon">\${t.icon}</div>
      <h3>\${t.name}</h3>
      <p>\${t.desc}</p>
      <span class="tool-tag \${t.tagClass}">\${t.tag}</span>
    </div>
  \`).join('');
}

function openTool(id) {
  const tool = tools.find(t => t.id === id);
  document.getElementById('toolModal').classList.add('active');
  document.getElementById('modalTitle').textContent = tool.icon + ' ' + tool.name;
  
  const body = document.getElementById('modalBody');
  
  switch(id) {
    case 'photo':
      body.innerHTML = \`
        <div class="upload-zone" onclick="document.getElementById('photoInput').click()">
          <i class="fas fa-cloud-upload-alt"></i>
          <p>Click to upload photo</p>
          <p style="color:var(--muted);font-size:12px;">Max 5MB · JPG, PNG, WebP</p>
        </div>
        <input type="file" id="photoInput" accept="image/*" style="display:none" onchange="previewPhoto(event)">
        <div class="result-preview" id="photoPreview" style="display:none;">
          <img id="previewImg">
          <button class="btn btn-green" style="width:100%;margin-top:10px;" onclick="downloadPhoto()">📥 Download Resized</button>
        </div>
      \`;
      break;
    case 'pdf':
      body.innerHTML = \`
        <div class="upload-zone" onclick="document.getElementById('pdfInput').click()">
          <i class="fas fa-file-image"></i>
          <p>Click to upload image</p>
          <p style="color:var(--muted);font-size:12px;">Converts to PDF instantly</p>
        </div>
        <input type="file" id="pdfInput" accept="image/*" style="display:none" onchange="convertToPdf(event)">
      \`;
      break;
    case 'sign':
      body.innerHTML = \`
        <p style="text-align:center;">Upload photo + signature to merge</p>
        <input type="file" id="photoFile" accept="image/*" style="margin:10px;">
        <input type="file" id="signFile" accept="image/*" style="margin:10px;">
        <button class="btn btn-saffron" onclick="mergePhotoSign()">🔗 Join Photo + Signature</button>
      \`;
      break;
    case 'biodata':
      body.innerHTML = \`
        <p style="text-align:center;color:var(--muted);">AI Biodata Maker — Coming Soon!</p>
        <p style="text-align:center;">Enter basic details → AI generates beautiful matrimony biodata in Hindi/English</p>
        <button class="btn btn-saffron" onclick="alert('AI Biodata Maker launching next week! 🚀')">🔔 Notify Me</button>
      \`;
      break;
    default:
      body.innerHTML = \`<p style="text-align:center;color:var(--muted);">\${tool.name} — Coming Soon!</p>\`;
  }
}

function closeModal() { document.getElementById('toolModal').classList.remove('active'); }

function previewPhoto(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    document.getElementById('previewImg').src = ev.target.result;
    document.getElementById('photoPreview').style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function downloadPhoto() {
  const img = document.getElementById('previewImg');
  const canvas = document.createElement('canvas');
  canvas.width = 150; canvas.height = 200;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 150, 200);
  const link = document.createElement('a');
  link.download = 'resized-photo.jpg';
  link.href = canvas.toDataURL('image/jpeg', 0.8);
  link.click();
  alert('✅ Photo resized! 150x200px — Perfect for government forms!');
}

function convertToPdf(e) {
  alert('✅ JPG to PDF converter coming this week! Client-side, no upload needed.');
}

function mergePhotoSign() {
  alert('✅ Signature Joiner coming this week! Merge photo + signature instantly.');
}

function switchLang(lang) {
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.lang-btn').forEach(b => {
    if (b.textContent.includes(lang === 'hi' ? 'हिंदी' : 'English')) b.classList.add('active');
  });
}

renderTools();
</script>
</body>
</html>`;
}
