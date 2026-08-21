import React, { useEffect, useRef } from 'react'

// EntranceAnimation wraps content and runs a 2-3s assemble animation composed of fragments.
export default function EntranceAnimation({ children }: { children: React.ReactNode }){
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(()=>{
    const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if(reduced) return
    const el = containerRef.current
    if(!el) return

    // Create fragments
    const pieces: HTMLDivElement[] = []
    const rows = 3, cols = 4
    const rect = el.getBoundingClientRect()
    const w = rect.width / cols
    const h = rect.height / rows

    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const piece = document.createElement('div')
        piece.className = 'fragment'
        piece.style.width = `${w}px`
        piece.style.height = `${h}px`
        piece.style.left = `${c * w}px`
        piece.style.top = `${r * h}px`
        // random offset
        const ox = (Math.random() - 0.5) * 600
        const oy = (Math.random() - 0.5) * 400
        const rot = (Math.random() - 0.5) * 30
        piece.style.transform = `translate(${ox}px, ${oy}px) rotate(${rot}deg) scale(1.05)`
        piece.style.opacity = '0'
        el.appendChild(piece)
        pieces.push(piece)
      }
    }

    let start: number | null = null
    function step(t:number){
      if(start === null) start = t
      const progress = Math.min(1, (t - start) / 2000)
      pieces.forEach((p, i) =>{
        const delay = (i % pieces.length) * 6
        const pprog = Math.max(0, Math.min(1, (progress * 100 - delay) / 100))
        p.style.opacity = String(pprog)
        // interpolate transform to identity
        p.style.transform = `translate(${(1-pprog)*(parseFloat(p.style.transform.split('translate(')[1]||'0')||0)}px, ${(1-pprog)*(parseFloat(p.style.transform.split('translate(')[1]||'0')||0)}px) rotate(${(1-pprog)*0}deg) scale(${1 + (1-pprog)*0.05})`
      })
      if(progress < 1){
        requestAnimationFrame(step)
      }else{
        pieces.forEach(p => p.remove())
      }
    }
    requestAnimationFrame(step)

    return ()=>{
      pieces.forEach(p => p.remove())
    }
  }, [])

  return (
    <div className="entrance-root" ref={containerRef}>
      {children}
    </div>
  )
}
