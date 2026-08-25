export const ADSENSE_CLIENT_ID = 'ca-pub-9395184812907805'

// Replace this with the numerical ID of a responsive display-ad unit created in AdSense.
export const ADSENSE_SLOT_ID = ''

export const isAdSenseSlotConfigured = /^\d{6,20}$/.test(
  ADSENSE_SLOT_ID,
)
