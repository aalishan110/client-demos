(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const G=window.GUIDES;

/* mobile menu */
const mb=$('#menu'), nav=$('#nav');
mb.addEventListener('click',()=>{const o=nav.classList.toggle('open'); mb.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open'); mb.setAttribute('aria-expanded',false)}});

/* ---------- hero: route finder ---------- */
const selP=$('#selProf'), selC=$('#selCountry'), res=$('#result');
function fit(sel){
  const t=sel.options[sel.selectedIndex].text;
  const c=document.createElement('span'); const cs=getComputedStyle(sel);
  c.style.cssText='position:absolute;visibility:hidden;white-space:nowrap;font:'+cs.font+';letter-spacing:'+cs.letterSpacing;
  c.textContent=t; document.body.appendChild(c);
  sel.style.width=(c.getBoundingClientRect().width+parseFloat(cs.fontSize)*0.64)+'px'; c.remove();
}
function renderResult(){
  fit(selP); fit(selC);
  const g=G.find(x=>x.prof===selP.value&&x.country===selC.value);
  if(g){
    res.innerHTML='<div><div class="meta"><span><b>'+g.prof+'</b> → <b>'+g.country+'</b></span><span>'+g.stages.length+' stages</span><span>'+g.code+'</span></div>'+
      '<ol class="line">'+g.stages.map(s=>'<li><small></small><span>'+s+'</span></li>').join('')+'</ol></div>'+
      '<aside><div class="tags"><span class="tag live">EN</span>'+(g.bn?'<span class="tag live bn" lang="bn">বাংলা</span>':'')+'</div>'+
      '<a class="btn" href="guides/'+g.slug+'.html">Open the guide <span class="ar">→</span></a>'+
      (g.bn?'<a class="btn line" href="guides/'+g.slug+'-bn.html" lang="bn">বাংলায় পড়ুন</a>':'')+'</aside>';
  }else{
    const same=G.filter(x=>x.prof===selP.value), cty=G.filter(x=>x.country===selC.value);
    const near=[].concat(same.map(x=>[x,'same profession']),cty.map(x=>[x,'same country']));
    res.innerHTML='<div><div class="meta"><span><b>'+selP.value+'</b> → <b>'+selC.value+'</b></span><span>Not published yet</span></div>'+
      '<p class="none"><b>We haven’t mapped this route yet.</b> Tell us you need it and it moves up the list.'+(near.length?' Closest guides: '+near.slice(0,2).map(n=>'<a href="guides/'+n[0].slug+'.html" style="color:#ff6b47">'+n[0].title+'</a>').join(' and ')+'.':'')+'</p></div>'+
      '<aside><a class="btn" href="#assessment">Request this route <span class="ar">→</span></a></aside>';
  }
}
selP.addEventListener('change',renderResult); selC.addEventListener('change',renderResult);
renderResult();
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(renderResult);
window.addEventListener('resize',()=>{fit(selP);fit(selC)});

/* ---------- departures board ---------- */
const board=$('#board'), fP=$('#fProf'), fC=$('#fCountry');
function renderBoard(){
  const items=G.filter(g=>(!fP.value||g.prof===fP.value)&&(!fC.value||g.country===fC.value));
  board.innerHTML=items.length?items.map(g=>'<li><a href="guides/'+g.slug+'.html"><span class="cd"><span class="code">'+g.code+'</span><span class="st">'+g.stages.length+' stages</span></span><span class="route">'+g.title+'<small>'+g.sum+'</small></span><span class="lgs"><span class="tag">EN</span>'+(g.bn?'<span class="tag bn" lang="bn">বাংলা</span>':'')+'</span><span class="go" aria-hidden="true">→</span></a></li>').join(''):'<li class="none">No guide for that combination yet. <a href="#assessment" style="text-decoration:underline">Ask us for it.</a></li>';
}
fP.addEventListener('change',renderBoard); fC.addEventListener('change',renderBoard); renderBoard();

/* ---------- eight stops ---------- */
const EIGHT=[
 ['Demand','Which roles, in which regions, and why employers are hiring from abroad.'],
 ['Pay and costs','Typical pay set against rent, tax and everyday spending, not headline salaries alone.'],
 ['Recognition','How degrees and diplomas from Bangladesh are assessed, and what happens if they fall short.'],
 ['Registration','The professional body, the paperwork, and the order it has to be done in.'],
 ['Language','Which test, which level, and how long preparation realistically takes.'],
 ['Exams','Bridging courses, knowledge tests and supervised practice periods.'],
 ['Visa','Which permit applies, who applies for it, and the documents each stage needs.'],
 ['Total cost','Every fee, test and travel expense laid out end to end, so nothing surprises you later.']
];
const eight=$('#eight');
eight.innerHTML=EIGHT.map((x,i)=>'<li'+(i===0?' aria-current="true"':'')+'><button type="button" data-i="'+i+'"><small></small><span>'+x[0]+'</span></button></li>').join('');
function pick(i){
  $$('#eight li').forEach((li,k)=>li.toggleAttribute('aria-current',k===i));
  $$('#eight li').forEach((li,k)=>{if(k===i) li.setAttribute('aria-current','true'); else li.removeAttribute('aria-current')});
  $('#hn').textContent='0'+(i+1); $('#ht').textContent=EIGHT[i][1];
}
eight.addEventListener('click',e=>{const b=e.target.closest('button'); if(b) pick(+b.dataset.i)});
pick(0);

/* ---------- assessment stepper ---------- */
const step=$('#step'), panes=$$('.pane[data-p]',step), bars=$$('.bar span',step);
const next=$('#next'), back=$('#back'), note=$('#stepNote'), nav2=$('#nav2');
let cur=0; const ans={};
function show(n){
  cur=n;
  panes.forEach(p=>p.classList.toggle('on',+p.dataset.p===n));
  bars.forEach((b,i)=>{b.classList.toggle('on',i===n); b.classList.toggle('done',i<n)});
  const fin=n===4; nav2.style.display=fin?'none':'block';
  back.hidden=(n===0); note.textContent='Step '+(n+1)+' of 4';
  next.innerHTML=(n===3?'Request assessment':'Continue')+' <span class="ar">→</span>';
  gate();
}
function gate(){
  if(cur===0) next.disabled=!ans.prof;
  else if(cur===1) next.disabled=!(ans.dest&&ans.dest.length);
  else if(cur===2) next.disabled=!ans.lang;
  else if(cur===3) next.disabled=!(ans.slot&&$('#nm').value.trim()&&$('#ph').value.trim());
}
$$('.opts',step).forEach(g=>g.addEventListener('click',e=>{
  const b=e.target.closest('.opt'); if(!b||b.disabled) return; const k=g.dataset.k;
  if(g.dataset.multi){b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true'); ans[k]=$$('.opt[aria-pressed="true"]',g).map(x=>x.textContent)}
  else{$$('.opt',g).forEach(x=>x.setAttribute('aria-pressed',x===b)); ans[k]=b.textContent}
  gate();
}));
['#nm','#ph'].forEach(s=>$(s).addEventListener('input',gate));
next.addEventListener('click',()=>{ if(next.disabled) return; show(cur===3?4:cur+1)});
back.addEventListener('click',()=>show(Math.max(0,cur-1)));
$('#again').addEventListener('click',()=>{Object.keys(ans).forEach(k=>delete ans[k]); $$('.opt',step).forEach(x=>x.setAttribute('aria-pressed','false')); $('#nm').value=''; $('#ph').value=''; show(0)});
show(0);
})();
