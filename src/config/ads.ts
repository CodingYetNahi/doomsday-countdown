export const ADSENSE_CLIENT_ID = 'ca-pub-9395184812907805'

export const ADSENSE_SLOT_ID = import.meta.env.VITE_ADSENSE_SLOT ?? ''

export const isAdSenseSlotConfigured = /^\d{6,20}$/.test(
  ADSENSE_SLOT_ID,
)
