import { useCallback, useEffect, useMemo, useState } from 'react'
import Countdown, { TimeRemaining } from '../components/Countdown'
import AdSenseUnit from '../components/AdSenseUnit'
import CosmicBackdrop from '../components/CosmicBackdrop'
import ProtocolControls from '../components/ProtocolControls'
import ReleaseAnimation from '../components/ReleaseAnimation'
import StatusPanel from '../components/StatusPanel'
import { getCampaignProgress, getPhase, getPreviewNow, getReleaseTimestampMs } from '../config/release'
import DailyTrivia from '../components/DailyTrivia'
import DailyGame from '../components/DailyGame'
import { articles } from '../data/articles'
import { selectMilestone } from '../lib/milestones'

function milestone(days:number,released:boolean){if(released)return'Doomsday has arrived.';if(days>180)return'The signal remains distant.';if(days>90)return'The boundaries are weakening.';if(days>30)return'The collision can no longer be ignored.';if(days>7)return'Incursion imminent.';return'Doomsday is almost here.'}

export default function CountdownPage(){
  const targetMs=useMemo(getReleaseTimestampMs,[]),previewNow=useMemo(getPreviewNow,[])
  const current=()=>previewNow??Date.now()
  const [themeNow,setThemeNow]=useState(current),[released,setReleased]=useState(()=>current()>=targetMs)
  const [time,setTime]=useState<TimeRemaining>(()=>{const diff=Math.max(0,targetMs-current()),total=Math.floor(diff/1000);return{diff,days:Math.floor(total/86400),hours:Math.floor(total%86400/3600),minutes:Math.floor(total%3600/60),seconds:total%60}})
  const progress=getCampaignProgress(themeNow),phase=getPhase(progress),percent=Math.round(progress*100),dailyMilestone=selectMilestone(time.days,import.meta.env.DEV?import.meta.env.VITE_MILESTONE_OVERRIDE:undefined)
  const localRelease = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }).format(targetMs),
    [targetMs],
  )
  useEffect(()=>{document.documentElement.style.setProperty('--doomsday-progress',String(progress))},[progress])
  useEffect(()=>{if(previewNow!==null)return;const update=()=>setThemeNow(Date.now()),id=setInterval(update,60000);document.addEventListener('visibilitychange',update);return()=>{clearInterval(id);document.removeEventListener('visibilitychange',update)}},[previewNow])
  useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const move=(event:PointerEvent)=>{document.documentElement.style.setProperty('--parallax-x',`${(event.clientX/innerWidth-.5)*10}px`);document.documentElement.style.setProperty('--parallax-y',`${(event.clientY/innerHeight-.5)*10}px`)};addEventListener('pointermove',move,{passive:true});return()=>removeEventListener('pointermove',move)},[])
  const complete=useCallback(()=>{setReleased(true);dispatchEvent(new Event('doomsday:arrived'))},[])
  const remainingText=released?'Doomsday has arrived.':`${time.days} days, ${time.hours} hours, ${time.minutes} minutes remaining.`
  return <div className={`page-root ${released?'is-released':''}`} data-phase={phase.number} style={{'--phase-progress':progress} as React.CSSProperties}>
    <CosmicBackdrop/><nav className="home-nav" aria-label="Primary"><a href="/" className="brand">DOOMSDAY <span>DAILY</span></a><div><a href="/daily-challenge/">Daily</a><a href="/trivia/">Trivia</a><a href="/games/">Games</a><a href="/articles/">Articles</a><a href="/updates/">Updates</a></div></nav><main className="container"><header className="hero"><p className="eyebrow">REALITY CONVERGENCE</p><h1>THREE WORLDS. <span>ONE COLLISION.</span></h1><p className="phase-message">PHASE {phase.number} // {phase.status}</p></header>
    <section className="chamber" aria-labelledby="countdown-heading"><h2 id="countdown-heading" className="sr-only">Countdown to Avengers: Doomsday</h2><div className="chamber-frame" aria-hidden="true"/>
      <Countdown target={targetMs} onComplete={complete} onTimeChange={setTime} forceReleased={released} nowOverride={previewNow}/>
      <p className="release-label">Counting down to 18 December 2026, 12:00 AM IST</p><p className="milestone">{milestone(time.days,released)}</p>
    </section>
    <section className="meter" aria-label={`Campaign convergence is ${percent} percent progress toward the announced release date`}><div><span>CONVERGENCE <small>campaign progress</small></span><strong>{percent}%</strong></div><progress max="100" value={percent}>{percent}%</progress></section>
    <section className="home-content" aria-label="Daily features"><DailyTrivia/><DailyGame/><article className="content-card"><p className="kicker">LATEST ARTICLE · {articles[0].label}</p><h2><a href={`/articles/${articles[0].slug}/`}>{articles[0].title}</a></h2><p>{articles[0].description}</p></article><article className="content-card"><p className="kicker">CONFIRMED UPDATES</p><h2>No newly reviewed updates</h2><p>We publish an honest empty state rather than repeat unverified reports.</p><a href="/updates/">View the confirmation standard</a></article><article className="content-card milestone-card" style={{borderColor:dailyMilestone.accent}}><p className="kicker">COUNTDOWN MILESTONE · {dailyMilestone.id}</p><h2>{dailyMilestone.message}</h2><p>Milestone presentation never changes countdown arithmetic.</p></article></section>
    <AdSenseUnit />
    <div className="information-grid"><StatusPanel phase={phase} days={time.days} progress={progress} localRelease={localRelease}/><section className="release-times" aria-labelledby="release-times-title"><h2 id="release-times-title">RELEASE VECTOR</h2><p><span>INDIA // IST</span><strong>18 December 2026, 12:00 AM IST</strong></p><p><span>YOUR LOCAL TIME</span><strong>{localRelease}</strong></p></section></div>
    <details className="intelligence"><summary>CONFIRMED INTELLIGENCE</summary><div className="intel-body"><p className="intel-note">This section contains confirmed promotional information only. Rumours and leaked plot claims are excluded.</p><dl><div><dt>Release</dt><dd>18 December 2026</dd></div><div><dt>Directors</dt><dd>Anthony and Joe Russo</dd></div><div><dt>Central threat</dt><dd>Victor von Doom</dd></div><div><dt>Confirmed convergence</dt><dd>Heroes from three universes</dd></div><div><dt>Confirmed groups</dt><dd>Avengers, New Avengers, Wakandans, Fantastic Four and X-Men</dd></div><div><dt>Next chapter</dt><dd>Avengers: Secret Wars</dd></div></dl><p className="sources"><a href="https://www.marvel.com/movies/avengers-doomsday" target="_blank" rel="noopener noreferrer">Official Marvel movie page ↗</a><a href="https://www.marvel.com/articles/movies/avengers-doomsday-trailer-infinity-vision-tickets" target="_blank" rel="noopener noreferrer">Official Marvel trailer and information ↗</a></p></div></details>
    <ProtocolControls targetMs={targetMs} remainingText={remainingText}/><p className="sr-only" aria-live="polite">Phase {phase.number}, {phase.name}. {time.days} days remain.</p>
    <footer>Doomsday Daily is an unofficial fan-made website. It is not affiliated with, endorsed by, or sponsored by Marvel Entertainment, Marvel Studios, Disney, or their affiliates. All related trademarks belong to their respective owners. <a href="/privacy/">Privacy</a> · <a href="/editorial-policy/">Editorial Policy</a></footer></main>{released&&<ReleaseAnimation/>}
  </div>
}
