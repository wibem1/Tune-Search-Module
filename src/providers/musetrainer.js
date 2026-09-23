// MuseTrainer provider — public-domain compressed MusicXML (.mxl) library.
const INDEX='https://api.github.com/repos/musetrainer/library/git/trees/master?recursive=1';
const RAW='https://raw.githubusercontent.com/musetrainer/library/master/';
let cache=null;
const norm=s=>String(s||'').toLocaleLowerCase();
export const MuseTrainerProvider={
 id:'musetrainer',label:'MuseTrainer',
 async load(){
  if(cache)return cache;
  const r=await fetch(INDEX,{headers:{Accept:'application/vnd.github+json'}});if(!r.ok)throw new Error('MuseTrainer-Katalog konnte nicht geladen werden ('+r.status+').');
  const data=await r.json();
  cache=(data.tree||[]).filter(x=>x.type==='blob'&&x.path.startsWith('scores/')&&/\.mxl$/i.test(x.path)).map((x,i)=>{
   const file=x.path.split('/').pop(),title=decodeURIComponent(file.replace(/\.mxl$/i,'').replace(/_/g,' '));
   const url=RAW+x.path.split('/').map(encodeURIComponent).join('/');
   return {id:x.sha||x.path,title,type:'MusicXML',key:'',meter:'',formats:{musicxml:{url,compressed:true}},source:{label:'MuseTrainer',url}};
  });
  return cache;
 },
 async search(query,filters={}){
  const all=await this.load(),q=norm(query).trim(),type=norm(filters.type).trim();
  return all.filter(h=>(!q||norm(h.title).includes(q))&&(!type||norm(h.title+' '+h.type).includes(type))).slice(0,Math.max(1,Math.min(Number(filters.limit)||100,100)));
 }
};