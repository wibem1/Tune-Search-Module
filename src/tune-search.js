// Tune Search Module v0.4 — format-independent result layer.
export class TuneSearch{
 constructor({providers=[]}={}){this.providers=[...providers]}
 addProvider(p){if(!p?.id||typeof p.search!=='function')throw new Error('Ungültiger Suchprovider.');this.providers.push(p);return this}
 listProviders(){return this.providers.map(p=>({id:p.id,label:p.label||p.id}))}
 normalizeHit(hit,provider){
  const formats={...(hit.formats||{})};
  if(hit.abc&&!formats.abc)formats.abc={text:hit.abc};
  const availableFormats=Object.keys(formats).filter(k=>formats[k]);
  return {...hit,formats,availableFormats,providerId:provider.id,providerLabel:provider.label||provider.id};
 }
 async search(query='',filters={},providerIds=null){
  const q=String(query||'').trim();
  if(!q&&!filters.type&&!filters.key&&!filters.meter)throw new Error('Mindestens ein Suchkriterium fehlt.');
  const active=providerIds?.length?this.providers.filter(p=>providerIds.includes(p.id)):this.providers;
  if(!active.length)throw new Error('Keine Suchquelle ausgewählt.');
  const settled=await Promise.allSettled(active.map(p=>p.search(q,filters))),results=[];
  settled.forEach((x,i)=>{if(x.status==='fulfilled')for(const hit of x.value||[])results.push(this.normalizeHit(hit,active[i]))});
  return results;
 }
}
