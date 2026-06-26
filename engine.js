/* ===== 🎮 CATCH GAME ENGINE — you do NOT need to edit this file ===== */
/* All your choices live in game.js. This file just makes them work.   */

let CFG = { background:"#0b1126", player:"🍽️", catch:["🍕"], dodge:"🥦", speed:3, lives:3 };
let area, catcher, scoreEl, livesEl, overlay;
let score=0, lives=0, running=false;
let catcherX=240, items=[], sinceSpawn=0, last=0, W=480, H=540, fall=3, every=850;
const keys={};

/* is this value a picture file, or just an emoji? */
function isImage(v){ return typeof v==='string' && (/\.(svg|png|jpe?g|gif|webp)$/i.test(v) || v.indexOf('/')>=0); }
function fill(el, v, size){
  if(isImage(v)){ el.innerHTML='<img src="'+v+'" alt="" draggable="false" style="width:'+size+'px;height:'+size+'px;display:block">'; }
  else { el.textContent=v; }
}

function startGame(opts){
  CFG = Object.assign(CFG, opts);
  area=document.getElementById('area'); catcher=document.getElementById('catcher');
  scoreEl=document.getElementById('score'); livesEl=document.getElementById('lives');
  overlay=document.getElementById('overlay');

  if(isImage(CFG.background)){
    area.style.backgroundImage='url('+CFG.background+')';
    area.style.backgroundSize='cover'; area.style.backgroundPosition='center';
  } else { area.style.background=CFG.background; }

  fill(catcher, CFG.player, 52);
  W=area.clientWidth; H=area.clientHeight; catcherX=W/2; place();

  area.addEventListener('pointermove', e=>{
    const r=area.getBoundingClientRect();
    catcherX=Math.max(28, Math.min(W-28, e.clientX-r.left)); place();
  });
  document.addEventListener('keydown', e=>keys[e.key]=true);
  document.addEventListener('keyup',   e=>keys[e.key]=false);
}
function place(){ if(catcher) catcher.style.left=catcherX+'px'; }

function play(){
  overlay.classList.add('hide');
  score=0; lives=CFG.lives; fall=CFG.speed; every=850; sinceSpawn=0;
  items.forEach(i=>i.el.remove()); items=[];
  running=true; last=performance.now(); hud(); requestAnimationFrame(loop);
}
function loop(t){
  if(!running) return;
  const dt=Math.min(40, t-last); last=t;
  if(keys['ArrowLeft'])  catcherX=Math.max(28, catcherX-0.5*dt);
  if(keys['ArrowRight']) catcherX=Math.min(W-28, catcherX+0.5*dt);
  place();
  sinceSpawn+=dt;
  if(sinceSpawn>=every){ sinceSpawn=0; spawn(); if(every>380) every-=8; fall+=0.02; }
  for(let i=items.length-1;i>=0;i--){
    const it=items[i]; it.y+=fall*(dt/16); it.el.style.top=it.y+'px';
    if(it.y > H-70 && Math.abs(it.x-catcherX) < 42){
      if(it.bad){ hit(); } else { score++; pop('+1', it.x, it.y); }
      it.el.remove(); items.splice(i,1);
    } else if(it.y > H){ it.el.remove(); items.splice(i,1); }
  }
  hud(); requestAnimationFrame(loop);
}
function spawn(){
  const bad=Math.random()<0.22;
  const el=document.createElement('div'); el.className='item';
  const val = bad ? CFG.dodge : CFG.catch[Math.floor(Math.random()*CFG.catch.length)];
  fill(el, val, 38);
  const x=40+Math.random()*(W-80); el.style.left=x+'px'; el.style.top='-40px';
  area.appendChild(el); items.push({el, x, y:-40, bad});
}
function hit(){ lives--; area.classList.add('hurt'); setTimeout(()=>area.classList.remove('hurt'),250); if(lives<=0) gameOver(); }
function pop(txt,x,y){ const p=document.createElement('div'); p.className='pop'; p.textContent=txt; p.style.left=x+'px'; p.style.top=y+'px'; area.appendChild(p); setTimeout(()=>p.remove(),600); }
function hud(){ if(scoreEl)scoreEl.textContent=score; if(livesEl)livesEl.textContent='❤️'.repeat(Math.max(0,lives)); }
function gameOver(){
  running=false;
  let best=0; try{ best=Number(localStorage.getItem('best')||0); if(score>best){best=score; localStorage.setItem('best',score);} }catch(e){ best=score; }
  overlay.querySelector('h2').textContent='Game Over!';
  overlay.querySelector('p').innerHTML='You scored <b>'+score+'</b>! 🎉<br>Best ever: '+best;
  overlay.querySelector('.play').textContent='Play again ▶';
  overlay.classList.remove('hide');
}
