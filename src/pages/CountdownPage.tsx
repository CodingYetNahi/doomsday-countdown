import { useCallback, useMemo, useState } from 'react'
import Countdown, { TimeRemaining } from '../components/Countdown'
import CosmicBackdrop from '../components/CosmicBackdrop'
import EntranceAnimation from '../components/EntranceAnimation'
import ProtocolControls from '../components/ProtocolControls'
import ReleaseAnimation from '../components/ReleaseAnimation'
import StatusPanel from '../components/StatusPanel'
import { getReleaseTimestampMs } from '../config/release'

export default function CountdownPage(){
  const targetMs=useMemo(getReleaseTimestampMs,[])
  const [released,setReleased]=useState(()=>Date.now()>=targetMs)
  const [days,setDays]=useState(Math.max(0,Math.floor((targetMs-Date.now())/86400000)))
  const [finalMode,setFinalMode]=useState(targetMs-Date.now()<86400000)
  const [replay,setReplay]=useState(0)
  const onTimeChange=useCallback((time:TimeRemaining)=>{setDays(time.days);setFinalMode(time.diff<86400000)},[])
  const complete=useCallback(()=>{setReleased(true);dispatchEvent(new Event('doomsday:arrived'))},[])
  const phase=released?'collapsed':finalMode?'final':days<7?'critical':days<30?'danger':days<=180?'unstable':'distant'
  return <div className="page-root" data-phase={phase}>
    <CosmicBackdrop/><EntranceAnimation onReplay={replay}/>
    <main className="container">
      <header className="header"><div className="eyebrow"><span/>CLASSIFIED // TEMPORAL EVENT 006<span/></div><h1>DOOMSDAY <em>PROTOCOL</em></h1><p>CONVERGENCE LOCKED // EARTH-PRIME</p></header>
      <section className="countdown-area" aria-labelledby="countdown-heading"><h2 id="countdown-heading" className="sr-only">Time until Doomsday convergence</h2><div className="core-bracket left" aria-hidden="true"/><Countdown target={targetMs} onComplete={complete} onTimeChange={onTimeChange} forceReleased={released}/><div className="core-bracket right" aria-hidden="true"/></section>
      <StatusPanel/><ProtocolControls targetMs={targetMs} onReplay={()=>setReplay(v=>v+1)} finalMode={finalMode} released={released}/>
      <footer><span>OBSIDIAN WATCH // ACTIVE</span><span>RELEASE VECTOR // 18 DEC 2026</span></footer>
    </main>{released&&<ReleaseAnimation/>}
  </div>
}
