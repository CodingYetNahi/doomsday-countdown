import { useEffect, useMemo, useRef, useState } from 'react'

export type TimeRemaining = { diff:number; days:number; hours:number; minutes:number; seconds:number }
const pad = (value:number) => String(value).padStart(2, '0')

type Props = { target:number; onComplete:()=>void; onTimeChange?:(time:TimeRemaining)=>void; forceReleased:boolean }

export default function Countdown({ target, onComplete, onTimeChange, forceReleased }:Props){
  const [now, setNow] = useState(Date.now)
  const completed = useRef(false)
  const remaining = useMemo<TimeRemaining>(() => {
    const diff = Math.max(0, target - now)
    const total = Math.floor(diff / 1000)
    return { diff, days:Math.floor(total / 86400), hours:Math.floor(total % 86400 / 3600), minutes:Math.floor(total % 3600 / 60), seconds:total % 60 }
  }, [now, target])

  useEffect(() => {
    if(forceReleased) return
    const update = () => setNow(Date.now())
    const timer = window.setInterval(update, 1000)
    document.addEventListener('visibilitychange', update)
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', update) }
  }, [forceReleased])
  useEffect(() => { onTimeChange?.(remaining) }, [remaining, onTimeChange])
  useEffect(() => {
    if(!forceReleased && remaining.diff === 0 && !completed.current){ completed.current = true; onComplete() }
  }, [forceReleased, onComplete, remaining.diff])

  if(forceReleased || remaining.diff === 0) return <div className="collapse-message" role="status"><small>PROTOCOL COMPLETE</small><strong>TIMELINE COLLAPSED</strong><span>THE CONVERGENCE HAS ARRIVED</span></div>
  return <div className="core" role="timer" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds remaining`}>
    <div className="ring ring-outer" aria-hidden="true"/><div className="ring ring-middle" aria-hidden="true"/><div className="ring ring-inner" aria-hidden="true"/>
    <div className="core-centre"><span className="day-value">{remaining.days}</span><span className="unit-label">DAYS</span><i/></div>
    <TimeNode className="hours" value={pad(remaining.hours)} label="HOURS" />
    <TimeNode className="minutes" value={pad(remaining.minutes)} label="MINUTES" />
    <TimeNode className="seconds" value={pad(remaining.seconds)} label="SECONDS" pulseKey={remaining.seconds}/>
  </div>
}

function TimeNode({className,value,label,pulseKey}:{className:string;value:string;label:string;pulseKey?:number}){
  return <div className={`time-node ${className}`} key={pulseKey}><strong>{value}</strong><span>{label}</span></div>
}
