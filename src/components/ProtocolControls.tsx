import { useEffect, useRef, useState } from 'react'
import NotificationControl from './NotificationControl';import {safeGet,safeSet} from '../lib/storage'
export default function ProtocolControls({targetMs,remainingText}:{targetMs:number;remainingText:string}){
  const [sound,setSound]=useState(()=>safeGet('protocol:sound')==='on'),[shared,setShared]=useState(false),audio=useRef<AudioContext|null>(null)
  useEffect(()=>{if(!sound){audio.current?.close();audio.current=null;return}const ctx=new AudioContext(),master=ctx.createGain(),osc=ctx.createOscillator();master.gain.value=.025;osc.type='sine';osc.frequency.value=48;osc.connect(master).connect(ctx.destination);osc.start();audio.current=ctx;return()=>{ctx.close();if(audio.current===ctx)audio.current=null}},[sound])
  const toggle=()=>setSound(v=>{safeSet('protocol:sound',v?'off':'on');return !v})
  const share=async()=>{const data={title:'Doomsday Countdown — Unofficial Fan Experience',text:`${remainingText} An unofficial fan-made countdown.`,url:location.href};try{if(navigator.share)await navigator.share(data);else{await navigator.clipboard.writeText(`${data.text} ${data.url}`);setShared(true);setTimeout(()=>setShared(false),2000)}}catch{/* Share cancellation needs no warning. */}}
  return <nav className="protocol-controls" aria-label="Experience controls"><button onClick={toggle} aria-pressed={sound}><b aria-hidden="true">{sound?'◖))':'◖×'}</b>{sound?'Mute ambience':'Enable ambience'}</button><button onClick={share}><b aria-hidden="true">⌁</b>{shared?'Copied':'Share countdown'}</button><NotificationControl targetMs={targetMs}/></nav>
}
