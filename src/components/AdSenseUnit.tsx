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

  if (!isAdSenseSlotConfigured) return null

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
