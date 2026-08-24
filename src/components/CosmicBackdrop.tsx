export default function CosmicBackdrop(){
  return <div className="cosmos" aria-hidden="true"><div className="stars stars-a"/><div className="stars stars-b"/><div className="eclipse"><div className="corona"/><div className="planet"/></div><div className="smoke smoke-a"/><div className="smoke smoke-b"/><div className="crack crack-a"/><div className="crack crack-b"/><div className="embers">{Array.from({length:16},(_,i)=><i key={i}/>)}</div></div>
}
