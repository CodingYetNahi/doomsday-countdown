import React, { useEffect, useState } from 'react'

type Props = {
  targetMs: number
}

export default function NotificationControl({ targetMs }: Props){
  const [status, setStatus] = useState<'idle'|'granted'|'denied'|'unsupported'>(() => {
    if(typeof Notification === 'undefined') return 'unsupported'
    try{
      const stored = localStorage.getItem('doomsday:notify')
      if(stored === 'granted') return 'granted'
      if(stored === 'denied') return 'denied'
    }catch{}
    return Notification.permission === 'granted' ? 'granted' : 'idle'
  })
  const [message, setMessage] = useState<string | null>(null)

  useEffect(()=>{
    if(status === 'granted'){
      try{ localStorage.setItem('doomsday:notify', 'granted') }catch{}
    }
    if(status === 'denied'){
      try{ localStorage.setItem('doomsday:notify', 'denied') }catch{}
    }
  }, [status])

  const explainAndRequest = async () => {
    if(typeof Notification === 'undefined'){
      setStatus('unsupported')
      setMessage('This browser does not support Notifications.')
      return
    }

    setMessage('This site will ask permission to show a single alert when the countdown finishes. The browser may still block or limit delivery when closed.')

    try{
      const result = await Notification.requestPermission()
      if(result === 'granted'){
        setStatus('granted')
        setMessage('Notifications enabled — you will receive an alert when Doomsday arrives (while the browser/page is running).')
      }else if(result === 'denied'){
        setStatus('denied')
        setMessage('Notifications were denied. You can enable them in your browser settings.')
      }else{
        setStatus('idle')
        setMessage('Notification permission was dismissed.')
      }
    }catch(err){
      setStatus('unsupported')
      setMessage('Unable to request Notification permission.')
    }
  }

  // Handler to send in-page notification when called by other code
  useEffect(()=>{
    function onComplete(){
      // prevent duplicate notifications
      try{
        const notified = localStorage.getItem('doomsday:notified')
        if(notified === '1') return
      }catch{}

      if(status !== 'granted') return
      try{
        const n = new Notification('Doomsday Has Arrived', {
          body: 'The countdown is over. Avengers: Doomsday is now scheduled for release.',
          tag: 'doomsday-arrived'
        })
        n.onclick = () => {
          try{ window.focus(); window.location.href = window.location.href }catch{}
        }
        localStorage.setItem('doomsday:notified', '1')
      }catch(e){
        // ignore
      }
    }

    // Listen for a custom event dispatched on window when countdown completes.
    window.addEventListener('doomsday:arrived', onComplete as EventListener)
    return ()=> window.removeEventListener('doomsday:arrived', onComplete as EventListener)
  }, [status])

  return (
    <div className="notify-control">
      <button className="btn" onClick={explainAndRequest} aria-pressed={status==='granted'}>
        {status === 'granted' ? 'Alert Me — Enabled' : 'Alert Me When Doomsday Arrives'}
      </button>
      {message && <div className="notify-msg">{message}</div>}
      {status === 'unsupported' && <div className="notify-msg">Notifications not supported in this browser.</div>}
    </div>
  )
}
