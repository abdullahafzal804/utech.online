(async()=>{
const $=s=>document.querySelector(s);
const E=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const j=(u,o)=>fetch(u,o).then(async r=>{const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'Request failed.');return d});
let C,U=null,STATIC=false;
try{
 if(location.hostname.endsWith('.github.io')){C=await j('content.json');STATIC=true}
 else{
  try{C=await j('/api/content');U=(await j('/api/me')).user}
  catch(e){C=await j('content.json');STATIC=true}
 }
}catch(e){
 document.body.innerHTML='<p style="padding:30px">The website content could not be loaded. Check that app.js and content.json are uploaded beside this page.</p>';return
}
const S=C.settings,key=document.body.dataset.page,P=C.pages[key];
const nav=[['index','Home'],['enrollment','Enrollment'],['courses','Courses'],['campus-tour','Campus Tour'],['admission-portal','Admission Portal'],['contact','Contact'],['feedback','Feedback']];
const cur=(location.pathname.split('/').pop()||'index').replace('.html','');
const acct=U?(U.role==='admin'?'admin.html':'dashboard.html'):'login.html';
$('#hdr').outerHTML=`<header><div class="wrap bar"><a class="brand" href="index.html"><img src="logo.png" alt="U-TECH logo" width="44" height="52"><span>U-TECH</span></a><input type="checkbox" id="tg" aria-hidden="true"><nav aria-label="Main menu"><ul>${nav.map(n=>`<li><a href="${n[0]}.html"${n[0]===cur?' class="on" aria-current="page"':''}>${n[1]}</a></li>`).join('')}${U?'<li><a href="#" id="lo">Log out</a></li>':''}</ul></nav><div class="right"><a class="btn sm" href="${acct}">${U?(U.role==='admin'?'Admin panel':'My account'):'Login'}</a><label class="burger" for="tg" aria-label="Open or close menu"><span></span><span></span><span></span></label></div></div></header>`;
$('#ftr').outerHTML=`<footer><div class="wrap"><div class="grid"><div><h3>U-TECH</h3><p>University of Technology Culture and Health Sciences</p></div><div><h3>Pages</h3><ul>${nav.map(n=>`<li><a href="${n[0]}.html">${n[1]}</a></li>`).join('')}<li><a href="login.html">Login</a></li></ul></div><div><h3>Contact</h3><p>Phone: <a href="tel:+${E(S.whatsapp)}">${E(S.phone)}</a>${S.email?`<br>Email: <a href="mailto:${E(S.email)}">${E(S.email)}</a>`:''}${S.address?`<br>${E(S.address)}`:''}</p></div></div><p class="copy">&copy; ${new Date().getFullYear()} U-TECH. All rights reserved.</p></div></footer><a class="wa" href="https://wa.me/${E(S.whatsapp)}?text=${encodeURIComponent('Hello U-TECH, I have a question.')}" target="_blank" rel="noopener" aria-label="Chat with U-TECH on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>`;
const lo=$('#lo');if(lo)lo.onclick=async e=>{e.preventDefault();await fetch('/api/logout',{method:'POST'});location.href='index.html'};
if(P){document.title=P.title+' | U-TECH';const t=$('#pt'),i=$('#pi'),b=$('#cms');if(t)t.textContent=P.title;if(i)i.textContent=P.intro;if(b)b.innerHTML=P.body||''}
const sl=$('#slider');
if(sl&&C.slides.length){
 sl.innerHTML=`<div class="slides">${C.slides.map((s,i)=>`<div class="slide${i?'':' on'}"><div class="wrap"><h2>${E(s.title)}</h2><p>${E(s.text)}</p><a class="btn light" href="${E(s.link)}"${i?' tabindex="-1"':''}>${E(s.btn)}</a></div></div>`).join('')}</div><div class="ctl"><button type="button" aria-label="Previous slide" data-d="-1">&#8249;</button><div class="dots">${C.slides.map((s,i)=>`<button type="button" aria-label="Show slide ${i+1}" data-i="${i}"${i?'':' class="on"'}></button>`).join('')}</div><button type="button" aria-label="Next slide" data-d="1">&#8250;</button></div>`;
 const sh=[...sl.querySelectorAll('.slide')],dt=[...sl.querySelectorAll('.dots button')];let n=0,tm;
 const go=k=>{n=(k+sh.length)%sh.length;sh.forEach((x,i)=>{x.classList.toggle('on',i===n);x.querySelector('a').tabIndex=i===n?0:-1});dt.forEach((x,i)=>x.classList.toggle('on',i===n))};
 sl.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{go(n+ +b.dataset.d);run()});
 dt.forEach(b=>b.onclick=()=>{go(+b.dataset.i);run()});
 const run=()=>{clearInterval(tm);if(sh.length>1&&!matchMedia('(prefers-reduced-motion:reduce)').matches)tm=setInterval(()=>go(n+1),6000)};
 sl.onmouseenter=()=>clearInterval(tm);sl.onmouseleave=run;sl.onfocusin=()=>clearInterval(tm);run();
}
const cs=$('#courses');
if(cs){const g={};C.courses.forEach(c=>(g[c.dept]=g[c.dept]||[]).push(c));cs.innerHTML=Object.entries(g).map(([d,a])=>`<h2 class="dept">${E(d)}</h2><div class="plist">${a.map(c=>`<div class="prow"><strong>${E(c.name)}</strong><span>${E(c.level)}</span><span>${E(c.duration)}</span></div>`).join('')}</div>`).join('')}
document.querySelectorAll('select[data-programs]').forEach(s=>[...new Set(C.courses.map(c=>c.name))].forEach(n=>s.add(new Option(n,n))));
const ci=$('#cinfo');
if(ci)ci.innerHTML=`<h3>Phone</h3><p><a href="tel:+${E(S.whatsapp)}">${E(S.phone)}</a></p><h3>WhatsApp</h3><p><a href="https://wa.me/${E(S.whatsapp)}" target="_blank" rel="noopener">Chat on WhatsApp</a></p>${S.email?`<h3>Email</h3><p><a href="mailto:${E(S.email)}">${E(S.email)}</a></p>`:''}${S.address?`<h3>Address</h3><p>${E(S.address)}</p>`:''}`;
document.querySelectorAll('form[data-form]').forEach(f=>f.addEventListener('submit',async e=>{
 e.preventDefault();const m=f.querySelector('.msg'),b=f.querySelector('button[type=submit]');m.className='msg';
 if(STATIC){m.textContent='This feature needs a backend. GitHub Pages only hosts static files; connect Firebase or host the Node.js server to enable it.';m.className='msg err';return}
 if(f.password2&&f.password2.value!==f.password.value){m.textContent='The two passwords do not match.';m.className='msg err';return}
 b.disabled=true;m.textContent='Please wait...';
 try{const d=await j(f.dataset.api||'/api/submit/'+f.dataset.form,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))});
  if(d.user){location.href=d.user.role==='admin'?'admin.html':'dashboard.html';return}
  m.textContent=f.dataset.ok||'Sent. Thank you.';m.className='msg ok';f.reset()}
 catch(x){m.textContent=x.message;m.className='msg err'}
 b.disabled=false}));
if((key==='login'||key==='signup')&&U)location.href=acct;
if(key==='dashboard'){
 if(!U){location.href='login.html';return}
 if(U.role==='admin'){location.href='admin.html';return}
 const d=$('#dash');d.innerHTML=`<h2>Welcome, ${E(U.name)}</h2><p>You are logged in as a ${E(U.role)} (username: ${E(U.username)}).</p>`;
 if(U.role==='student'){
  const a=(await j('/api/my/apps')).apps;
  d.innerHTML+=`<h3>Your applications</h3>`+(a.length?`<div class="plist">${a.map(x=>`<div class="prow"><strong>${E(x.program)}</strong><span>${new Date(x.created).toLocaleDateString()}</span><span>Received</span></div>`).join('')}</div>`:'<p>You have not applied yet.</p>')+'<p style="margin-top:16px"><a class="btn" href="admission-portal.html">Open the admission portal</a></p>';
 }else d.innerHTML+='<p>Your teacher account is active.</p>';
}
if(window.onSite)window.onSite(C,U);
})();
