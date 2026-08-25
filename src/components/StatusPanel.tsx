import type { Phase } from '../config/release'
export default function StatusPanel({phase,days,progress,localRelease}:{phase:Phase;days:number;progress:number;localRelease:string}){
  return <section className="status-panel" aria-labelledby="status-title"><header><span aria-hidden="true">◇</span><div><small>SYSTEM STATUS</small><h2 id="status-title">CONVERGENCE CHAMBER</h2></div></header><dl>
    <div><dt>Current phase</dt><dd>{phase.name}</dd></div><div><dt>Days remaining</dt><dd>{days}</dd></div>
    <div><dt>Convergence</dt><dd>{Math.round(progress*100)}%</dd></div><div><dt>Local release</dt><dd>{localRelease}</dd></div>
  </dl></section>
}
