import React, { useEffect } from 'react'

export default function ReleaseAnimation(){
  useEffect(()=>{
    const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if(reduced) return

    const container = document.querySelector('.countdown-grid')
    if(!container) return
    const cards = Array.from(container.querySelectorAll('.card')) as HTMLElement[]

    cards.forEach((card, i) =>{
      card.style.transition = 'transform 700ms ease, opacity 700ms ease'
      const angle = (i - cards.length/2) * 15
      const tx = (Math.random() - 0.5) * 400
      const ty = (Math.random() - 0.5) * 300
      card.style.transform = `translate(${tx}px, ${ty}px) rotate(${angle}deg) scale(0.9)`
      card.style.opacity = '0'
    })

    // after dispersal, reveal release message area
    setTimeout(()=>{
      cards.forEach((card) =>{
        card.style.transition = 'transform 800ms ease, opacity 800ms ease'
        card.style.transform = 'translate(0,0) rotate(0deg) scale(0.001)'
        card.style.opacity = '0'
      })

      // dispatch event to trigger notification if enabled
      window.dispatchEvent(new Event('doomsday:arrived'))
    }, 700)

    return ()=>{
      // cleanup styles
      cards.forEach(card => {
        card.style.transition = ''
        card.style.transform = ''
        card.style.opacity = ''
      })
    }
  }, [])

  return null
}
