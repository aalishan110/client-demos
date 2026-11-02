(function(){
const mb=document.getElementById('menu'), nav=document.getElementById('nav');
if(mb){mb.addEventListener('click',()=>{const o=nav.classList.toggle('open'); mb.setAttribute('aria-expanded',o)});}
/* rail: highlight the stage in view */
const links=[...document.querySelectorAll('.rail a')];
const secs=links.map(a=>document.getElementById(a.dataset.s));
function spy(){
  const y=window.scrollY+160; let c=0;
  secs.forEach((s,i)=>{if(s&&s.offsetTop<=y) c=i});
  links.forEach((a,i)=>a.classList.toggle('cur',i===c));
}
window.addEventListener('scroll',spy,{passive:true}); spy();
})();
