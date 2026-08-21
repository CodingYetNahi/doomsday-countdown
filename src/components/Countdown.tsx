import React, { useEffect, useMemo, useRef, useState } from 'react'

function pad(n:number){ return String(n).padStart(2, '0') }

type Props = {
  target: number // UTC ms
  onComplete?: () => void
  forceReleased?: boolean
}

export default function Countdown({ target, onComplete, forceReleased }: Props){
  const [now, setNow] = useState<number>(() => Date.now())
  const rafRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)
  const visibilityHandlerRef = useRef<() => void>(()=>{})

  const isReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(()=>{
    if(forceReleased) return;
    function tick(){
      setNow(Date.now())
    }
    // use interval for coarse updates, but always compute from absolute target
    intervalRef.current = window.setInterval(tick, 1000)
    // also use rAF to keep seconds visually up-to-date when visible
    let last = performance.now()
    function loop(ts:number){
      const elapsed = ts - last
      if(elapsed >= 250){
        setNow(Date.now())
        last = ts
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    // visibility handler: recalc immediately when tab becomes visible
    const onVisibility = () => {
      if(document.visibilityState === 'visible'){
        setNow(Date.now())
      }
    }
    visibilityHandlerRef.current = onVisibility
    document.addEventListener('visibilitychange', onVisibility)

    return ()=>{
      if(intervalRef.current) clearInterval(intervalRef.current)
      if(rafRef.current) cancelAnimationFrame(rafRef.current)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [target, forceReleased])

  const remaining = useMemo(()=>{
    const diff = Math.max(0, target - now)
    const totalSeconds = Math.floor(diff / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return { diff, days, hours, minutes, seconds }
  }, [now, target])

  useEffect(()=>{
    if(!forceReleased && remaining.diff === 0){
      // reached zero
      if(onComplete) onComplete()
    }
  }, [remaining.diff, onComplete, forceReleased])

  if(forceReleased || remaining.diff === 0){
    return (
      <div className="release-message" role="status">AVENGERS: DOOMSDAY HAS ARRIVED</div>
    )
  }

  return (
    <div className="countdown-grid" role="timer" aria-live="polite">
      <div className="card" data-unit="days">
        <div className="value">{String(remaining.days)}</div>
        <div className="label">DAYS</div>
      </div>
      <div className="card" data-unit="hours">
        <div className="value">{pad(remaining.hours)}</div>
        <div className="label">HOURS</div>
      </div>
      <div className="card" data-unit="minutes">
        <div className="value">{pad(remaining.minutes)}</div>
        <div className="label">MIN</div>
      </div>
      <div className="card" data-unit="seconds">
        <div className="value">{pad(remaining.seconds)}</div>
        <div className="label">SEC</div>
      </div>
    </div>
  )
}
