// January 1, 2024
const prettyDateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'America/New_York',
}

export function prettyDateFormat(date: Date) {
  date = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())

  return date.toLocaleDateString('en-US', prettyDateFormatOptions)
}

// 1/1/24
export function shortDateFormat(date: Date) {
  const shortYear = date.getUTCFullYear() % 1000
  return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${shortYear}`
}

// YYYY/MM/DD
export function formatDateToYYYYMMDD(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
