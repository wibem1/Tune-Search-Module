// Shared preview player for MIDI-based sources. Uses WebAudioFont samples instead of oscillators.
const SOUNDFONTS={
 piano:'0000_FluidR3_GM_sf2_file',violin:'0400_FluidR3_GM_sf2_file',cello:'0420_FluidR3_GM_sf2_file',flute:'0730_FluidR3_GM_sf2_file'
};
let ctx=null,player=null,current=null,loaded=new Set();
const context=async()=>{if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();if(ctx.state!=='running')await ctx.resume();return ctx};
const selected=()=>document.getElementById('instrument')?.value||'piano';
async function loadPreset(name){
 const key=SOUNDFONTS[name]||SOUNDFONTS.piano;if(loaded.has(key))return window['_tone_'+key];
 await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://surikov.github.io/webaudiofontdata/sound/128'+key+'.js';s.onload=ok;s.onerror=()=>no(new Error('Instrumentenklang konnte nicht geladen werden.'));document.head.appendChild(s)});
 loaded.add(key);return window['_tone_'+key];
}
export async function stopPreview(){if(current)try{current.cancel()}catch(_){}current=null}
export async function playMidiData(arrayBuffer){
 await stopPreview();if(!window.Midi)throw new Error('MIDI-Parser ist nicht geladen.');if(!window.WebAudioFontPlayer)throw new Error('Preview-Player ist nicht geladen.');
 const ac=await context();if(!player)player=new WebAudioFontPlayer();const midi=new window.Midi(arrayBuffer),preset=await loadPreset(selected());player.loader.decodeAfterLoading(ac,preset);
 const start=ac.currentTime+.08,handles=[];
 for(const track of midi.tracks)for(const note of track.notes){const h=player.queueWaveTable(ac,ac.destination,preset,start+note.time,note.midi,Math.max(.03,note.duration),Math.max(.05,note.velocity));if(h)handles.push(h)}
 current={cancel(){for(const h of handles)try{h.cancel()}catch(_){}}};
}