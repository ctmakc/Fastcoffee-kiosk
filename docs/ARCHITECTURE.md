# Architecture Overview

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **i18n:** i18next + react-i18next
- **PWA:** vite-plugin-pwa (Service Worker + Manifest)
- **Storage:** LocalStorage (cache) + IndexedDB (future: for larger datasets)

## Project Structure

```
apps/kiosk/
├── src/
│   ├── components/        # Reusable UI components (future)
│   ├── pages/             # Page components (Home, Categories, Products, etc.)
│   ├── lib/
│   │   ├── config.ts      # Location and menu config
│   │   ├── cache.ts       # localStorage cache helpers
│   ├── i18n/
│   │   ├── i18n.ts        # i18next setup
│   │   └── locales/       # Translation JSON files (EN, FR)
│   ├── App.tsx            # Root component with routing + inactivity
│   ├── main.tsx           # React root
│   └── index.css          # Global styles
├── public/                # Static assets (icons, favicon)
├── vite.config.ts         # Vite + PWA config
├── tsconfig.json          # TypeScript config
└── index.html             # HTML entry

packages/ui/
├── src/                   # Shared UI components
├── dist/                  # Compiled output
└── package.json
```

## Data Flow

```
[Tablet / Browser]
    ↓
[App.tsx] (Route + Inactivity Timer)
    ↓
[React Router] → [Pages: Home, Categories, Products, ProductDetail]
    ↓
[lib/config.ts] → Fetch menu config from API
    ↓
[lib/cache.ts] → Store in localStorage
    ↓
[Service Worker] → Cache static assets + offline mode
    ↓
[Network Offline] → Fallback to cached menu JSON
```

## Offline-First Strategy

### 1. **Service Worker (vite-plugin-pwa)**
   - Caches all static assets on first visit
   - Routes requests through network-first strategy
   - Falls back to cache if network fails

### 2. **Menu JSON Caching (localStorage)**
   - Fetches menu from API when online
   - Stores in localStorage with TTL
   - Returns cached version if API is down

### 3. **Graceful Degradation**
   - App displays "offline" indicator if no network
   - Shows cached data instead of empty state
   - Auto-syncs when connection is restored

## State Management

Currently using:
- **React hooks** for local component state
- **localStorage** for persistent cache
- **React Router** for URL state (location_id, language)

Future: Consider Redux or Zustand if complexity grows.

## Inactivity & Attract Screen

```
User Activity (click/touch)
    ↓
[resetInactivityTimer()] in App.tsx
    ↓
Start 30-second countdown
    ↓
[No Activity] → Attracts → Show AttractScreen
    ↓
User Touches → Navigate back to Home
    ↓
Reset timer
```

## i18n Architecture

```
i18n.ts (i18next setup)
    ↓
languages: en, fr
    ↓
locales/en.json, locales/fr.json
    ↓
Components use useTranslation() hook
    ↓
Language stored in localStorage
    ↓
Query param ?lang=fr overrides default
```

## API Integration (Future)

Expected menu endpoint:

```
GET /api/menu?location=loc_001
Response:
{
  "location_id": "loc_001",
  "categories": [...],
  "last_updated": "2024-02-08T10:00:00Z"
}
```

Currently using mock data; replace in `src/pages/Products.tsx` and `src/pages/ProductDetail.tsx`.

## Performance Targets

- **TTFB:** <1s (cached)
- **Lighthouse:** 90+ on Performance
- **Build Size:** <2MB gzipped
- **Memory:** <50MB RAM usage
- **Touch response:** <100ms latency

## Security Considerations

1. **HTTPS Only:** All API calls done over HTTPS
2. **CSP Headers:** Set appropriate Content-Security-Policy
3. **No PII:** Kiosk doesn't store personal data
4. **Tablet Lock:** FreeKiosk prevents app exit
5. **Auto-lock:** Attract screen after inactivity

## Scalability Notes

- **Multi-tenant:** Uses `location_id` param to isolate per location
- **CDN delivery:** Static assets served from Cloudflare/Vercel edge
- **Cached menu:** No per-device database needed
- **Stateless:** App is completely stateless (FreeKiosk manages hardware)

## Testing Strategy (Future)

- Unit tests: Vitest + React Testing Library
- E2E tests: Playwright (tablet emulation)
- PWA tests: Lighthouse CI
- Performance: Web Vitals monitoring
