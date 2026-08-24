import { useEffect, useState } from 'react'
export default function NotificationControl({targetMs:_targetMs}:{targetMs:number}){
  const supported=typeof Notification!=='undefined'
  const [status,setStatus]=useState<NotificationPermission| 'unsupported'>(()=>supported?Notification.permission:'unsupported')
  useEffect(()=>{const complete=()=>{if(status==='granted'&&localStorage.getItem('doomsday:notified')!=='1'){new Notification('Timeline convergence complete',{body:'The Doomsday countdown has reached zero.',tag:'doomsday-arrived'});localStorage.setItem('doomsday:notified','1')}};addEventListener('doomsday:arrived',complete);return()=>removeEventListener('doomsday:arrived',complete)},[status])
  const request=async()=>{if(supported)setStatus(await Notification.requestPermission())}
  return <button onClick={request} disabled={!supported||status==='denied'} aria-pressed={status==='granted'} title={status==='denied'?'Notifications blocked in browser settings':undefined}><b aria-hidden="true">{status==='granted'?'◉':'◎'}</b><span>{status==='granted'?'Alert armed':status==='unsupported'?'Alerts unavailable':'Arm alert'}</span></button>
}
