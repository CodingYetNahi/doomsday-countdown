export default function CosmicBackdrop(){
  return <div className="cosmos" aria-hidden="true">
    <div className="fog"/><div className="reality reality-616"><i/><i/><i/></div>
    <div className="reality reality-retro"><i/><i/><i/></div>
    <div className="reality reality-mutant"><i/><i/><i/></div>
    <div className="source"/><div className="fractures">{Array.from({length:8},(_,i)=><i key={i}/>)}</div>
    <div className="particles">{Array.from({length:12},(_,i)=><i key={i}/>)}</div>
  </div>
}
