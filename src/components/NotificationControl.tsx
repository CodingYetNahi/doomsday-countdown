import { useEffect, useState } from 'react'
import {safeGet,safeSet} from '../lib/storage'
export default function NotificationControl({targetMs}:{targetMs:number}){
  const supported=typeof Notification!=='undefined'
  const [status,setStatus]=useState<NotificationPermission| 'unsupported'>(()=>supported?Notification.permission:'unsupported')
  useEffect(()=>{const complete=()=>{if(Date.now()>=targetMs&&status==='granted'&&safeGet('doomsday:notified')!=='1'){new Notification('Timeline convergence complete',{body:'The Doomsday countdown has reached zero.',tag:'doomsday-arrived'});safeSet('doomsday:notified','1')}};addEventListener('doomsday:arrived',complete);return()=>removeEventListener('doomsday:arrived',complete)},[status,targetMs])
  const request=async()=>{if(supported)setStatus(await Notification.requestPermission())}
  return <button onClick={request} disabled={!supported||status==='denied'} aria-pressed={status==='granted'} title={status==='granted'?'Only alerts while this page remains open':status==='denied'?'Notifications blocked in browser settings':undefined}><b aria-hidden="true">{status==='granted'?'◉':'◎'}</b><span>{status==='granted'?'Alert armed while open':status==='unsupported'?'Alerts unavailable':'Arm in-page alert'}</span></button>
}
