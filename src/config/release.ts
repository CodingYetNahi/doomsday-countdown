// Central release configuration
// Edit RELEASE_TARGET here to change the release instant.
// The timezoneOffsetMinutes is the minutes offset of the timezone from UTC.
// Asia/Kolkata is UTC+5:30 = 330 minutes.
export const RELEASE_TARGET = {
  year: 2026,
  month: 12, // 1-12 for readability
  day: 18,
  hour: 0,
  minute: 0,
  timezoneOffsetMinutes: 330 // Asia/Kolkata = +5:30
}

export function getReleaseTimestampMs(){
  const { year, month, day, hour, minute, timezoneOffsetMinutes } = RELEASE_TARGET
  // Date.UTC treats the provided fields as UTC. To convert a local time in a given timezone
  // to the absolute UTC timestamp, subtract the timezone offset (in ms).
  const utcMs = Date.UTC(year, month - 1, day, hour, minute, 0, 0) - timezoneOffsetMinutes * 60 * 1000
  return utcMs
}
