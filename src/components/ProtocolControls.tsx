import { useEffect, useRef, useState } from 'react'
import NotificationControl from './NotificationControl'

export default function ProtocolControls({targetMs,onReplay,finalMode,released}:{targetMs:number;onReplay:()=>void;finalMode:boolean;released:boolean}){
  const [sound,setSound]=useState(()=>localStorage.getItem('protocol:sound')==='on')
  const [shared,setShared]=useState(false)
  const audio=useRef<AudioContext|null>(null)
  useEffect(()=>{
    if(!sound){ audio.current?.close(); audio.current=null; return }
    const ctx=new AudioContext(); audio.current=ctx
    const master=ctx.createGain(); master.gain.value=.035; master.connect(ctx.destination)
    const oscillator=ctx.createOscillator(); oscillator.type='sawtooth'; oscillator.frequency.value=43
    const filter=ctx.createBiquadFilter(); filter.type='lowpass'; filter.frequency.value=95
    oscillator.connect(filter).connect(master); oscillator.start()
    let tick:number|undefined
    if(finalMode) tick=window.setInterval(()=>{const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=180;g.gain.setValueAtTime(.09,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.06);o.connect(g).connect(master);o.start();o.stop(ctx.currentTime+.07)},1000)
    if(released){ oscillator.frequency.exponentialRampToValueAtTime(28,ctx.currentTime+1.2); master.gain.setValueAtTime(.15,ctx.currentTime);master.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+2) }
    return()=>{if(tick)clearInterval(tick);ctx.close();if(audio.current===ctx)audio.current=null}
  },[sound,finalMode,released])
  const toggle=()=>setSound(v=>{localStorage.setItem('protocol:sound',v?'off':'on');return !v})
  const fullscreen=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()
  const share=async()=>{const data={title:'Doomsday Protocol',text:'The final convergence is approaching.',url:location.href};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(location.href);setShared(true);setTimeout(()=>setShared(false),2000)}}catch{/* user cancelled */}}
  return <nav className="protocol-controls" aria-label="Protocol controls"><button onClick={toggle} aria-pressed={sound}><b aria-hidden="true">{sound?'◖))':'◖×'}</b><span>{sound?'Sound on':'Sound off'}</span></button>{document.fullscreenEnabled&&<button onClick={fullscreen}><b aria-hidden="true">⛶</b><span>Fullscreen</span></button>}<button onClick={onReplay}><b aria-hidden="true">↻</b><span>Replay intro</span></button><button onClick={share}><b aria-hidden="true">⌁</b><span>{shared?'Link copied':'Share signal'}</span></button><NotificationControl targetMs={targetMs}/></nav>
}
