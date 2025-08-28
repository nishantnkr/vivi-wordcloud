import React from 'react'
import Client from './pages/Client'
import Signage from './pages/Signage'

export default function App(){
  const parts = window.location.pathname.split('/').filter(Boolean);
  const last = parts.length ? parts[parts.length - 1] : '';

  if (last === 'client') return <Client />;
  if (last === 'signage') return <Signage />;

  return (
    <div style={{padding:20, fontFamily:'system-ui, sans-serif'}}>
      <h1>Vivi Word Cloud Applet — Dev</h1>
      <p><a href="./client" target="_blank" rel="noreferrer">Open Client View</a></p>
      <p><a href="./signage" target="_blank" rel="noreferrer">Open Signage View</a></p>
      <p><a href="./mediator.html" target="_blank" rel="noreferrer">Open Box Simulator (mediator)</a></p>
      <p>Open the mediator so the client and signage can talk through the simulated box.</p>
    </div>
  );
}
