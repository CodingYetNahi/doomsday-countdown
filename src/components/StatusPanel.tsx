import { useEffect, useState } from 'react'
const messages=['TEMPORAL FRACTURE EXPANDING','REALITY ANCHORS DESTABILIZING','FINAL CONVERGENCE APPROACHING','EVACUATION WINDOW UNAVAILABLE']
export default function StatusPanel(){
  const [index,setIndex]=useState(0)
  useEffect(()=>{const id=setInterval(()=>setIndex(i=>(i+1)%messages.length),6000);return()=>clearInterval(id)},[])
  return <section className="status-panel" aria-labelledby="status-title"><div className="status-heading"><span className="status-glyph">⌁</span><div><small>OBSIDIAN WATCH DIRECTIVE</small><h2 id="status-title">DOOMSDAY PROTOCOL</h2></div><span className="live">LIVE</span></div><dl><div><dt>Timeline</dt><dd>Earth-Prime</dd></div><div><dt>Event Status</dt><dd>Approaching</dd></div><div><dt>Temporal Stability</dt><dd className="danger">Critical</dd></div><div><dt>Impact Probability</dt><dd>99.99%</dd></div></dl><div className="signal" aria-hidden="true"><svg viewBox="0 0 600 30" preserveAspectRatio="none"><path d="M0 15h65l7-8 8 16 9-8h70l5-4 8 8 6-4h75l12-13 10 26 10-13h90l6-6 8 12 8-6h90l8-10 8 20 9-10h75"/></svg></div><p className="warning-message" aria-live="polite"><span>WARNING //</span> {messages[index]}</p></section>
}
