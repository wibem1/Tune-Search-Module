// MuseTrainer provider — public-domain compressed MusicXML (.mxl) library.
const INDEX='https://musetrainer.github.io/library/';
let cache=null;
const norm=s=>String(s||'').toLocaleLowerCase();
export const MuseTrainerProvider={
 id:'musetrainer',label:'MuseTrainer',
 async load(){
  if(cache)return cache;
  const r=await fetch(INDEX);if(!r.ok)throw new Error('MuseTrainer-Katalog konnte nicht geladen werden ('+r.status+').');
  const html=await r.text(),doc=new DOMParser().parseFromString(html,'text/html');
  cache=[...doc.querySelectorAll('li')].map((li,i)=>{
   const a=[...li.querySelectorAll('a')].find(x=>/\.mxl(?:$|[?#])/i.test(x.href));
   if(!a)return null;
   const title=(li.childNodes[0]?.textContent||li.textContent.split('·')[0]||'').trim();
   return {id:a.href,title:title||decodeURIComponent(a.href.split('/').pop().replace(/_/g,' ')),type:'MusicXML',key:'',meter:'',formats:{musicxml:{url:a.href,compressed:true}},source:{label:'MuseTrainer',url:a.href}};
  }).filter(Boolean);
  return cache;
 },
 async search(query,filters={}){
  const all=await this.load(),q=norm(query).trim(),type=norm(filters.type).trim();
  return all.filter(h=>(!q||norm(h.title).includes(q))&&(!type||norm(h.title+' '+h.type).includes(type))).slice(0,Math.max(1,Math.min(Number(filters.limit)||100,100)));
 }
};