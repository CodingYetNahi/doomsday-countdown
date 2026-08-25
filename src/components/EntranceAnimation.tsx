import { useEffect, useState } from 'react'
import {safeGet,safeSet} from '../lib/storage'

export default function EntranceAnimation({ onReplay=0 }:{onReplay?:number}){
  const [visible,setVisible] = useState(false)
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = safeGet('protocol:intro','session') === '1'
    if((seen && onReplay === 0) || reduced) return
    setVisible(true)
    const timer = setTimeout(() => { setVisible(false); safeSet('protocol:intro','1','session') }, 4300)
    return () => clearTimeout(timer)
  },[onReplay])
  if(!visible) return null
  return <div className="intro" role="dialog" aria-label="Doomsday Protocol initialization">
    <div className="intro-eclipse" aria-hidden="true"/><div className="scan" aria-hidden="true"/>
    <div className="intro-copy"><p>OBSIDIAN WATCH // 06</p><h2>TIMELINE INSTABILITY<br/>DETECTED</h2><ol><li>Scanning temporal anchors</li><li>Calibrating event horizon</li><li>Doomsday protocol online</li></ol></div>
    <button className="skip" onClick={()=>{safeSet('protocol:intro','1','session');setVisible(false)}}>Skip intro</button>
  </div>
}
