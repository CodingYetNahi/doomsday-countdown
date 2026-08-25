import { useEffect, useRef } from 'react'
import {
  ADSENSE_CLIENT_ID,
  ADSENSE_SLOT_ID,
  isAdSenseSlotConfigured,
} from '../config/ads'

export default function AdSenseUnit() {
  const initialized = useRef(false)

  useEffect(() => {
    if (!isAdSenseSlotConfigured || initialized.current) return
    if (!document.querySelector('script[data-doomsday-adsense]')) {
      const script = document.createElement('script')
      script.async = true
      script.crossOrigin = 'anonymous'
      script.dataset.doomsdayAdsense = 'true'
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`
      document.head.appendChild(script)
    }
    initialized.current = true
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
    } catch (error) {
      if (import.meta.env.DEV) {
        console.warn('AdSense unit could not be initialized.', error)
      }
    }
  }, [])

  if (!isAdSenseSlotConfigured) return import.meta.env.DEV ? <section className="ad-section ad-dev">Development ad preview: set VITE_ADSENSE_SLOT to test a real unit.</section> : null

  return (
    <section className="ad-section" aria-label="Advertisement">
      <p className="ad-label">ADVERTISEMENT</p>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={ADSENSE_SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </section>
  )
}
