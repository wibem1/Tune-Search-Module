// Gavin Heneghan provider v0.3.0 — format follows ABC Tools.
const URL='https://michaeleskin.com/abctools/abctunes_gavin_heneghan_10nov2023.json';
let cache=null;
const txt=v=>v==null?'':String(v),norm=v=>txt(v).trim().toLocaleLowerCase();
function abcField(abc,code){const m=txt(abc).match(new RegExp('^'+code+':\\s*(.+)$','mi'));return m?m[1].trim():''}
export const GavinHeneghanProvider={
 id:'gavin',label:'Gavin Heneghan',
 async load(){if(cache)return cache;const r=await fetch(URL);if(!r.ok)throw new Error('Gavin-Heneghan-Datenbank konnte nicht geladen werden ('+r.status+').');const d=await r.json();if(!Array.isArray(d))throw new Error('Unerwartetes Gavin-Heneghan-Datenformat.');cache=d;return d;},
 async search(query,filters={}){
  const db=await this.load(),q=norm(query),ft=norm(filters.type),fk=norm(filters.key),fm=norm(filters.meter),limit=Math.max(1,Math.min(Number(filters.limit)||100,500)),out=[];
  for(let i=0;i<db.length;i++){const t=db[i],info=t?.info||{},title=txt(info.T);if(q&&!norm(title).includes(q))continue;const vars=Object.entries(t?.variations||{});
   for(let j=0;j<vars.length;j++){const [variationId,abc]=vars[j];if(!abc)continue;const type=txt(info.R||abcField(abc,'R')),key=txt(info.K||abcField(abc,'K')),meter=txt(info.M||abcField(abc,'M'));if(ft&&!norm(type).includes(ft))continue;if(fk&&!norm(key).includes(fk))continue;if(fm&&!norm(meter).includes(fm))continue;
    out.push({id:i+':'+variationId,title,type,key,meter,abc:txt(abc),source:{label:'Gavin Heneghan / ABC Tools tune database',databaseUrl:URL,variation:variationId}});if(out.length>=limit)return out;
   }
  }return out;
 }
};