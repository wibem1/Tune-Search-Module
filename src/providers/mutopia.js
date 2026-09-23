// Mutopia provider v0.4.0 — public Mutopia GitHub archive.
const TREE='https://api.github.com/repos/MutopiaProject/MutopiaProject/git/trees/master?recursive=1';
const RAW='https://raw.githubusercontent.com/MutopiaProject/MutopiaProject/master/';
const SITE='https://www.mutopiaproject.org/';
let treeCache=null;
const txt=v=>v==null?'':String(v),norm=v=>txt(v).toLocaleLowerCase();
function meta(src,name){const re=new RegExp('(?:mutopia)?'+name+'\\s*=\\s*"([^"]+)"','i');return src.match(re)?.[1]||''}
function pretty(path){return path.split('/').pop().replace(/\.ly$/i,'').replace(/[-_]+/g,' ')}
export const MutopiaProvider={
 id:'mutopia',label:'Mutopia Project',
 async load(){
  if(treeCache)return treeCache;
  const r=await fetch(TREE,{headers:{Accept:'application/vnd.github+json'}});
  if(!r.ok)throw new Error('Mutopia-Katalog konnte nicht geladen werden ('+r.status+').');
  const d=await r.json();
  treeCache=(d.tree||[]).filter(x=>x.type==='blob'&&x.path.startsWith('ftp/')&&/\.ly$/i.test(x.path));
  return treeCache;
 },
 async search(query,filters={}){
  const q=norm(query).trim(),limit=Math.max(1,Math.min(Number(filters.limit)||100,100));
  const all=await this.load();
  let candidates=q?all.filter(x=>norm(x.path).includes(q)):all;
  candidates=candidates.slice(0,limit);
  const out=[];
  for(const x of candidates){
   let src='';try{const r=await fetch(RAW+x.path);if(r.ok)src=await r.text()}catch(_){}
   const title=meta(src,'title')||meta(src,'subtitle')||pretty(x.path);
   const composer=meta(src,'composer')||x.path.split('/')[1]||'';
   const instrument=meta(src,'instrument');
   const style=meta(src,'style');
   const opus=meta(src,'opus');
   const hay=norm([title,composer,instrument,style,opus,x.path].join(' '));
   if(q&&!hay.includes(q))continue;
   if(filters.type&&!hay.includes(norm(filters.type)))continue;
   out.push({id:x.path,title,composer,type:[instrument,style].filter(Boolean).join(' · '),key:'',meter:'',format:'LilyPond',abc:null,
    source:{label:'Mutopia Project',repositoryPath:x.path,lilypondUrl:RAW+x.path,midiUrl:SITE+x.path.replace(/\.ly$/i,'.mid'),pdfUrl:SITE+x.path.replace(/\.ly$/i,'-a4.pdf')}});
   if(out.length>=limit)break;
  }
  return out;
 }
};