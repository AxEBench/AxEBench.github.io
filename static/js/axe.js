(()=>{const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// theme
$('#theme').onclick=()=>{const r=document.documentElement;r.dataset.theme=r.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('axe-theme',r.dataset.theme)}catch(e){}};
// progress + active nav
const secs=$$('section[id]'),links=$$('nav .links a');
addEventListener('scroll',()=>{const h=document.documentElement;$('#progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
 let cur='';secs.forEach(s=>{if(s.getBoundingClientRect().top<120)cur=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur))},{passive:true});
// explorer
const V={'00':['Original','var(--ok)','Original task: the marker stays wrapped while it is moved. The model succeeds.'],
'10':['Agent changed','var(--agent)','The action changes to removing the marker. A second marker appears.'],
'01':['Environment changed','var(--env)','The towel becomes paper. The wrapping opens mid-way.'],
'11':['Agent × Environment','var(--joint)','Both change at once. Black gloves appear from nowhere.']};
function ex(){const k=($('#tgA').getAttribute('aria-pressed')==='true'?'1':'0')+($('#tgE').getAttribute('aria-pressed')==='true'?'1':'0');
 $$('.stage img').forEach(i=>i.classList.toggle('on',i.dataset.k===k));const v=V[k];const r=$('#regime');r.textContent=v[0];r.style.color=v[1];$('#verdict').textContent=v[2]}
['#tgA','#tgE'].forEach(s=>$(s).onclick=e=>{const b=e.currentTarget;b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');ex()});ex();
// reveal + count-up
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
 e.target.querySelectorAll('[data-count]').forEach(b=>{const n=+b.dataset.count,t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1100),v=Math.round(n*(1-Math.pow(1-p,3)));b.textContent=v.toLocaleString('en-US');if(p<1)requestAnimationFrame(f)})(t0)})}),{threshold:.12});
$$('.reveal').forEach(e=>io.observe(e));
// leaderboard
let g='t2v',key='axe',dir=-1;const cols=['axe','fid','stab','tim','con'];
function draw(){const rows=AXE_DATA.filter(d=>d.g===g).sort((a,b)=>key==='m'?dir*a.m.localeCompare(b.m)*-1:dir*(a[key]-b[key]));
 const all=AXE_DATA.filter(d=>d.g===g),best={},mx=Math.max(...all.map(d=>d.axe));cols.forEach(c=>best[c]=Math.max(...all.map(d=>d[c])));
 $('#lbody').innerHTML=rows.map((d,i)=>`<tr><td>${i+1}</td><td>${d.m}${d.c?'<span class="tag">COMMERCIAL</span>':''}</td><td class="bar"><i style="width:${Math.max(2,d.axe/mx*60)}%"></i><em>${d.axe.toFixed(2)}</em></td>`+
  ['fid','stab','tim','con'].map(c=>`<td class="${d[c]===best[c]?'best':''}">${d[c].toFixed(2)}</td>`).join('')+'</tr>').join('');
 $$('thead th[data-k]').forEach(th=>{const on=th.dataset.k===key;th.classList.toggle('sorted',on);th.querySelector('.ar')?.remove();if(on)th.insertAdjacentHTML('beforeend',`<span class="ar">${dir<0?'↓':'↑'}</span>`)})}
$$('thead th[data-k]').forEach(th=>th.onclick=()=>{if(key===th.dataset.k)dir=-dir;else{key=th.dataset.k;dir=-1}draw()});
$$('.tab').forEach(t=>t.onclick=()=>{g=t.dataset.g;$$('.tab').forEach(x=>x.classList.toggle('on',x===t));draw()});draw();
// lightbox
$$('figure .fig img').forEach(i=>i.parentElement.onclick=()=>{$('#lb img').src=i.src;$('#lb').classList.add('on')});
$('#lb').onclick=()=>$('#lb').classList.remove('on');addEventListener('keydown',e=>{if(e.key==='Escape')$('#lb').classList.remove('on')});
// copy
$('#copy').onclick=()=>navigator.clipboard.writeText($('#bib').innerText).then(()=>{$('#copy').textContent='Copied';setTimeout(()=>$('#copy').textContent='Copy',1500)});
})();
