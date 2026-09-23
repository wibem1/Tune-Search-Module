// TheSession provider v0.2.0
const URL='https://michaeleskin.com/abctools/abctunes_thesession_28may2026.json';
let cache=null;
const txt=v=>v==null?'':String(v), norm=v=>txt(v).trim().toLocaleLowerCase();
function field(t,...names){for(const n of names){const v=t?.[n]??t?.info?.[n];if(v!=null&&txt(v).trim())return txt(v)}return ''}
export const TheSessionProvider={
 id:'thesession',label:'The Session',
 async load(){if(cache)return cache;const r=await fetch(URL);if(!r.ok)throw new Error('Tune-Datenbank konnte nicht geladen werden ('+r.status+').');const d=await r.json();if(!Array.isArray(d))throw new Error('Unerwartetes Tune-Datenformat.');cache=d;return d;},
 async search(query,filters={}){
  const db=await this.load(),q=norm(query),ft=norm(filters.type),fk=norm(filters.key),fm=norm(filters.meter);
  const limit=Math.max(1,Math.min(Number(filters.limit)||100,500)),out=[];
  for(const t of db){if(!t?.abc)continue;
   const title=field(t,'name','title','T'),type=field(t,'type','rhythm','R'),key=field(t,'key','K'),meter=field(t,'meter','M');
   if(q&&!norm(title).includes(q))continue;if(ft&&!norm(type).includes(ft))continue;if(fk&&!norm(key).includes(fk))continue;if(fm&&!norm(meter).includes(fm))continue;
   out.push({id:txt(t.setting_id||t.id||out.length),title,type,key,meter,abc:txt(t.abc),formats:{abc:{text:txt(t.abc)}},source:{label:'The Session / ABC Tools tune database',databaseUrl:URL,settingId:t.setting_id||null,tuneId:t.tune_id||null}});
   if(out.length>=limit)break;
  } return out;
 }
};