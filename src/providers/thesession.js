// TheSession provider v0.1.1
// Datenquelle und Datenformat entsprechen dem aktuellen ABC-Tools-Tune-Search-Bestand.
const URL='https://michaeleskin.com/abctools/abctunes_thesession_28may2026.json';
let cache=null;
function text(v){return v==null?'':String(v)}
export const TheSessionProvider={
  id:'thesession',
  label:'The Session',
  async load(){
    if(cache)return cache;
    const r=await fetch(URL);
    if(!r.ok)throw new Error('Tune-Datenbank konnte nicht geladen werden ('+r.status+').');
    const data=await r.json();
    if(!Array.isArray(data))throw new Error('Unerwartetes Tune-Datenformat.');
    cache=data; return data;
  },
  async search(query,filters={}){
    const db=await this.load(), q=text(query).trim().toLocaleLowerCase();
    const limit=Math.max(1,Math.min(Number(filters.limit)||50,200));
    const out=[];
    for(const t of db){
      if(!t||!t.abc)continue;
      const title=text(t.name||t.title||t.info?.T);
      if(!title.toLocaleLowerCase().includes(q))continue;
      out.push({
        id:text(t.setting_id||t.id||out.length),
        title,
        type:text(t.type||t.rhythm||t.info?.R),
        key:text(t.key||t.info?.K),
        meter:text(t.meter||t.info?.M),
        abc:text(t.abc),
        source:{label:'The Session / ABC Tools tune database',databaseUrl:URL,settingId:t.setting_id||null,tuneId:t.tune_id||null}
      });
      if(out.length>=limit)break;
    }
    return out;
  }
};
