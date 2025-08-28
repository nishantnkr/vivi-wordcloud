import React, { useEffect, useState } from 'react'

function fontSize(count, maxCount){
  const min = 12, max = 56;
  if (maxCount <= 1) return min;
  const scale = (count - 1) / (maxCount - 1);
  return Math.round(min + scale * (max - min));
}

export default function Signage(){
  const [words, setWords] = useState([]);

  useEffect(()=>{
    const handler = ev => {
      if (ev.data && ev.data.type === 'applet-message' && ev.data.command && ev.data.command.type === 'word-cloud') {
        setWords(ev.data.command.content.words || []);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const maxCount = words.reduce((m,w)=> Math.max(m, w.count || 1), 1);

  return (
    <div style={{padding:20,fontFamily:'system-ui, sans-serif'}}>
      <h2>Signage — Word Cloud</h2>
      <div style={{border:'1px solid #ddd', padding:20, minHeight:240}}>
        {words.length === 0 ? <div style={{color:'#999'}}>Waiting for words from the client...</div> : (
          <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
            {words.map(w => (
              <span key={w.word} style={{fontSize: fontSize(w.count, maxCount) + 'px', padding:'4px 6px'}}>
                {w.word}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
