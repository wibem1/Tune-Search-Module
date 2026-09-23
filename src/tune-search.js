// Tune Search Module v0.2.0
export class TuneSearch{
 constructor({providers=[]}={}){this.providers=[...providers]}
 addProvider(p){if(!p?.id||typeof p.search!=='function')throw new Error('Ungültiger Suchprovider.');this.providers.push(p);return this}
 listProviders(){return this.providers.map(p=>({id:p.id,label:p.label||p.id}))}
 async search(query='',filters={}){
  const q=String(query||'').trim();
  if(!q&&!filters.type&&!filters.key&&!filters.meter)throw new Error('Mindestens ein Suchkriterium fehlt.');
  const settled=await Promise.allSettled(this.providers.map(p=>p.search(q,filters))),results=[];
  settled.forEach((x,i)=>{if(x.status==='fulfilled')for(const hit of x.value||[])results.push({...hit,providerId:this.providers[i].id})});
  return results;
 }
}