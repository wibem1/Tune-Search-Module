// Tune Search Module v0.1.0
// Provider-neutraler Kern. Konkrete Online-Provider werden separat ergänzt.
export class TuneSearch {
  constructor({providers=[]}={}){this.providers=[...providers];}
  addProvider(provider){if(!provider?.id||typeof provider.search!=='function')throw new Error('Ungültiger Suchprovider.');this.providers.push(provider);return this;}
  listProviders(){return this.providers.map(p=>({id:p.id,label:p.label||p.id}));}
  async search(query,filters={}){
    const q=String(query||'').trim();
    if(!q)throw new Error('Suchbegriff fehlt.');
    const settled=await Promise.allSettled(this.providers.map(p=>p.search(q,filters)));
    const results=[];
    settled.forEach((item,i)=>{if(item.status==='fulfilled')for(const hit of item.value||[])results.push({...hit,providerId:this.providers[i].id});});
    return results;
  }
}
