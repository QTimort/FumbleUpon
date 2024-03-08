// utils/isResponseFresh.ts
const CACHE_CONTROL_HEADER = "Cache-Control"
const MAX_AGE_REGEX = /max-age=(\d+)/

// Custom stale time in seconds
const STALE_TIME = 10

export function isResponseFresh(response: Response): boolean {
  const cacheControl = response.headers.get(CACHE_CONTROL_HEADER)

  if (!cacheControl) {
    // If no Cache-Control header is present, use the custom stale time
    return getResponseAge(response) <= STALE_TIME
  }

  const maxAgeMatch = cacheControl.match(MAX_AGE_REGEX)

  if (!maxAgeMatch) {
    // If the Cache-Control header doesn't contain a max-age value, use the custom stale time
    return getResponseAge(response) <= STALE_TIME
  }

  const maxAge = parseInt(maxAgeMatch[1], 10)
  const responseAge = getResponseAge(response)

  return responseAge <= maxAge
}

function getResponseAge(response: Response): number {
  const dateHeader = response.headers.get("Date")
  if (!dateHeader) {
    // If no Date header is present, assume the response is fresh
    return 0
  }

  const responseDate = new Date(dateHeader)
  const currentDate = new Date()

  return (currentDate.getTime() - responseDate.getTime()) / 1000
}
