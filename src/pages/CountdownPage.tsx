import React, { useEffect, useMemo, useState } from 'react'
import Countdown from '../components/Countdown'
import NotificationControl from '../components/NotificationControl'
import EntranceAnimation from '../components/EntranceAnimation'
import ReleaseAnimation from '../components/ReleaseAnimation'
import { getReleaseTimestampMs } from '../config/release'

export default function CountdownPage(){
  const targetMs = useMemo(() => getReleaseTimestampMs(), [])
  const [released, setReleased] = useState(() => {
    try{
      return localStorage.getItem('doomsday:completed') === '1'
    }catch{
      return false
    }
  })

  useEffect(() => {
    // If release already recorded but target is still in future, allow normal flow.
  }, [targetMs])

  return (
    <div className="page-root" aria-live="polite">
      <EntranceAnimation>
        <main className="container">
          <header className="header">
            <h1 className="title">AVENGERS: DOOMSDAY</h1>
            <p className="subtitle">Release Countdown</p>
          </header>

          <section className="countdown-area">
            <Countdown
              target={targetMs}
              onComplete={() => {
                setReleased(true)
                try{ localStorage.setItem('doomsday:completed', '1') }catch{}
              }}
              forceReleased={released}
            />
          </section>

          <aside className="controls">
            <NotificationControl targetMs={targetMs} />
            <p className="note">Note: Browser notifications require the page to be open or the browser to be running. Background notifications when the browser is closed are not guaranteed. If you have a service worker + push backend already in your app, integrate there for background delivery.</p>
          </aside>
        </main>
        {released && <ReleaseAnimation />}
      </EntranceAnimation>
    </div>
  )
}
