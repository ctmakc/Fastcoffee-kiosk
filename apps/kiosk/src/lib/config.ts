export interface MenuConfig {
  location_id: string
  api_url: string
  language: string
  refresh_interval: number // milliseconds
}

const DEFAULT_CONFIG: MenuConfig = {
  location_id: 'default',
  api_url: 'https://api.fastcoffee.local/menu',
  language: 'en',
  refresh_interval: 300000, // 5 minutes
}

export function getLocationId(): string {
  const params = new URLSearchParams(window.location.search)
  return params.get('location_id') || DEFAULT_CONFIG.location_id
}

export function getConfig(): MenuConfig {
  return {
    ...DEFAULT_CONFIG,
    location_id: getLocationId(),
  }
}

export async function fetchMenuConfig(locationId: string): Promise<any> {
  try {
    const response = await fetch(`${DEFAULT_CONFIG.api_url}?location=${locationId}`)
    if (!response.ok) throw new Error('Failed to fetch menu')
    return response.json()
  } catch (error) {
    console.error('Menu fetch error:', error)
    // Try to load from cache
    const cached = localStorage.getItem(`menu_${locationId}`)
    return cached ? JSON.parse(cached) : null
  }
}
