export const CACHE_KEYS = {
  MENU: 'menu_cache',
  CONFIG: 'config_cache',
  LOCATION: 'location_cache',
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number // Time to live in milliseconds
}

export function setCache<T>(key: string, data: T, ttl: number = 3600000): void {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now(),
    ttl,
  }
  localStorage.setItem(key, JSON.stringify(entry))
}

export function getCache<T>(key: string): T | null {
  const entry = localStorage.getItem(key)
  if (!entry) return null

  try {
    const parsed: CacheEntry<T> = JSON.parse(entry)
    const now = Date.now()
    const isExpired = now - parsed.timestamp > parsed.ttl

    if (isExpired) {
      localStorage.removeItem(key)
      return null
    }

    return parsed.data
  } catch {
    return null
  }
}

export function clearCache(key?: string): void {
  if (key) {
    localStorage.removeItem(key)
  } else {
    Object.values(CACHE_KEYS).forEach(k => localStorage.removeItem(k))
  }
}
