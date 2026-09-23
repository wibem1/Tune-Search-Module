import {TuneSearch} from './tune-search.js?v=0.1.0';
const search=new TuneSearch();
const q=document.getElementById('query'),status=document.getElementById('status'),results=document.getElementById('results');
async function run(){try{results.textContent='';const hits=await search.search(q.value);status.textContent=hits.length+' Treffer.';}catch(e){status.textContent=e.message;}}
document.getElementById('search').onclick=run;q.addEventListener('keydown',e=>{if(e.key==='Enter')run()});
