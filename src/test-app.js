import {TuneSearch} from './tune-search.js?v=0.1.0';
import {TheSessionProvider} from './providers/thesession.js?v=0.1.1';
const engine=new TuneSearch({providers:[TheSessionProvider]});
const q=document.getElementById('query'),status=document.getElementById('status'),results=document.getElementById('results');
let synth=null,audioContext=null;
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
async function stop(){if(synth)try{synth.stop()}catch(_){}}
async function preview(hit,box,button){
  await stop();
  document.querySelectorAll('.preview').forEach(x=>x.innerHTML='');
  if(!audioContext)audioContext=new (window.AudioContext||window.webkitAudioContext)();
  if(audioContext.state!=='running')await audioContext.resume();
  const rendered=ABCJS.renderAbc(box,hit.abc,{responsive:'resize'});
  if(!rendered[0])throw new Error('ABC konnte nicht gerendert werden.');
  synth=new ABCJS.synth.CreateSynth();
  await synth.init({audioContext,visualObj:rendered[0],options:{chordsOff:true}});
  await synth.prime();
  await synth.start();
  button.textContent='Läuft …';
}
function show(hits){
  results.innerHTML='';
  hits.forEach((hit,i)=>{
    const el=document.createElement('article');el.className='hit';
    el.innerHTML='<h3>'+esc(hit.title||'(ohne Titel)')+'</h3><div class="meta">'+esc([hit.type,hit.key&&('Tonart '+hit.key),hit.meter&&('Takt '+hit.meter)].filter(Boolean).join(' · '))+'</div><div class="actions"><button class="play">▶ Vorhören</button><button class="stop">■ Stop</button></div><div class="preview"></div>';
    const box=el.querySelector('.preview'),play=el.querySelector('.play');
    play.onclick=()=>preview(hit,box,play).catch(e=>status.textContent='Vorhörfehler: '+e.message);
    el.querySelector('.stop').onclick=async()=>{await stop();play.textContent='▶ Vorhören'};
    results.appendChild(el);
  });
}
async function run(){
  try{await stop();results.innerHTML='';status.textContent='Datenbank laden / suchen …';const hits=await engine.search(q.value,{limit:50});show(hits);status.textContent=hits.length+' Treffer (max. 50).';}
  catch(e){status.textContent='Suchfehler: '+e.message;}
}
document.getElementById('search').onclick=run;q.addEventListener('keydown',e=>{if(e.key==='Enter')run()});
