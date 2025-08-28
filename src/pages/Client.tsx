//import React, { useState } from 'react'
import { useState } from 'react'

function parseAndCount(text: string){
  const tokens = (text || '').toLowerCase().match(/\b[^\s]+\b/g) || [];
  const map: { [key: string]: number } = {};
  for (const t of tokens){
    const w = t.replace(/[^\w']/g,'').trim();
    if (!w) continue;
    map[w] = (map[w]||0)+1;
  }
  const arr = Object.entries(map).map(([word,count])=>({word,count}));
  arr.sort((a,b)=> b.count - a.count);
  return arr.slice(0,50);
}

export default function Client(){
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');

  async function handleSend(){
    const words = parseAndCount(text);
    // send to parent (the box / mediator)
    window.parent.postMessage({
      type: 'applet-message',
      command: { type: 'word-cloud', content: { words } }
    }, '*');
    setStatus(`Sent ${words.length} words`);
  }

  return (
    <div style={{padding:20}}>
      <h2>Client — paste text and send</h2>
      <textarea rows={10} value={text} onChange={e=>setText(e.target.value)}
        style={{width:'100%'}} placeholder="Paste text here and click Send"></textarea>
      <div style={{marginTop:10}}>
        <button onClick={handleSend}>Send to Signage</button>
        <button onClick={()=>{ setText(''); setStatus(''); }} style={{marginLeft:8}}>Clear</button>
      </div>
      <div style={{marginTop:10,color:'#666'}}>{status}</div>
      <p style={{marginTop:12,color:'#666'}}>
        This demo sends a `word-cloud` command whose payload is an array of {'{word,count}'}.
      </p>
    </div>
  );
}
