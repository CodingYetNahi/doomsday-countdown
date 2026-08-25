import { useEffect, useMemo, useRef, useState } from 'react'

export type TimeRemaining = { diff:number; days:number; hours:number; minutes:number; seconds:number }
const pad = (value:number) => String(value).padStart(2, '0')
type Props = { target:number; onComplete:()=>void; onTimeChange?:(time:TimeRemaining)=>void; forceReleased:boolean; nowOverride:number|null }

export default function Countdown({ target, onComplete, onTimeChange, forceReleased, nowOverride }:Props){
  const [now, setNow] = useState(nowOverride ?? Date.now())
  const completed = useRef(false)
  const remaining = useMemo<TimeRemaining>(() => {
    const diff = Math.max(0, target - now), total = Math.floor(diff / 1000)
    return { diff, days:Math.floor(total/86400), hours:Math.floor(total%86400/3600), minutes:Math.floor(total%3600/60), seconds:total%60 }
  }, [now,target])
  useEffect(()=>{
    if(forceReleased || nowOverride !== null) return
    const update=()=>setNow(Date.now()), timer=window.setInterval(update,1000)
    document.addEventListener('visibilitychange',update)
    return()=>{clearInterval(timer);document.removeEventListener('visibilitychange',update)}
  },[forceReleased,nowOverride])
  useEffect(()=>onTimeChange?.(remaining),[remaining,onTimeChange])
  useEffect(()=>{if(!forceReleased&&remaining.diff===0&&!completed.current){completed.current=true;onComplete()}},[forceReleased,onComplete,remaining.diff])
  if(forceReleased || remaining.diff===0) return <div className="arrival" role="status"><small>CONVERGENCE COMPLETE</small><strong>DOOMSDAY HAS ARRIVED</strong><span>18 DECEMBER 2026</span></div>
  const units:[[string,string],[string,string],[string,string],[string,string]]=[
    [String(remaining.days),'DAYS'],[pad(remaining.hours),'HOURS'],[pad(remaining.minutes),'MINUTES'],[pad(remaining.seconds),'SECONDS']]
  return <div className="countdown" role="timer" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds remaining`}>
    {units.map(([value,label])=><div className="time-panel" key={label}><strong key={value}>{value}</strong><span>{label}</span></div>)}
  </div>
}
