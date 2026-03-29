/**
 * Simple in-memory rate limiter for Serverless functions.
 * Note: This is per-instance. For global rate limiting across all Vercel instances,
 * a Redis-based solutions like Upstash would be needed.
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    lastRequest: number
  }
}

const store: RateLimitStore = {}

// Cleanup old entries every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    Object.keys(store).forEach((key) => {
      if (now - store[key].lastRequest > 3600000) {
        delete store[key]
      }
    })
  }, 3600000)
}

/**
 * Checks if a request should be rate limited.
 * @param key Unique key for the request (e.g. user ID or action name)
 * @param limit Maximum number of requests allowed in the window
 * @param windowMs Time window in milliseconds
 * @returns { success: boolean, limit: number, remaining: number }
 */
export function rateLimit(key: string, limit: number = 5, windowMs: number = 60000) {
  const now = Date.now()
  const entry = store[key]

  if (!entry || now - entry.lastRequest > windowMs) {
    store[key] = {
      count: 1,
      lastRequest: now,
    }
    return { success: true, limit, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return { success: false, limit, remaining: 0 }
  }

  entry.count += 1
  return { success: true, limit, remaining: limit - entry.count }
}
