/** The announced India release instant. This is the application's single source of truth. */
export const DOOMSDAY_RELEASE_DATE = '2026-12-18T00:00:00+05:30'

export const CAMPAIGN_START_DATE = '2025-12-18T00:00:00+05:30'

export const getReleaseTimestampMs = () => Date.parse(DOOMSDAY_RELEASE_DATE)

export type Phase = { number: 1 | 2 | 3 | 4; name: string; status: string }

export function getCampaignProgress(now: number) {
  const start = Date.parse(CAMPAIGN_START_DATE)
  return Math.min(1, Math.max(0, (now - start) / (getReleaseTimestampMs() - start)))
}

export function getPhase(progress: number): Phase {
  if (progress < .35) return { number: 1, name: 'Distant signal', status: 'DISTANT SIGNAL DETECTED' }
  if (progress < .70) return { number: 2, name: 'Realities destabilise', status: 'REALITIES DESTABILISING' }
  if (progress < .92) return { number: 3, name: 'Incursion imminent', status: 'INCURSION IMMINENT' }
  return { number: 4, name: 'Doomsday', status: 'ALL WORLDS APPROACH ONE END' }
}

/** Development-only clock override: ?previewPhase=1..4 or ?previewState=arrived. */
export function getPreviewNow() {
  if (!import.meta.env.DEV) return null
  const params = new URLSearchParams(location.search)
  if (params.get('previewState') === 'arrived') return getReleaseTimestampMs() + 1000
  const phase = Number(params.get('previewPhase'))
  const points: Record<number, number> = { 1: .18, 2: .52, 3: .81, 4: .96 }
  if (!points[phase]) return null
  const start = Date.parse(CAMPAIGN_START_DATE)
  return start + (getReleaseTimestampMs() - start) * points[phase]
}
