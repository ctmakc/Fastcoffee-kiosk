# FastCoffee Kiosk - MVP Specification

## Overview
FastCoffee Kiosk is an offline-first PWA designed for Android tablets. It serves as an interactive menu with auto-refresh, multi-language support, and location-based configuration.

## MVP Features (Week 1)

### 1. **Navigation & UI**
- ✅ Home screen with "Start Ordering" button
- ✅ Categories page (Coffee, Pastries, Drinks, Snacks)
- ✅ Product list per category
- ✅ Product detail view with price
- ✅ Large touch targets (min 64px) for tablet UX

### 2. **Offline-First PWA**
- ✅ Service Worker for offline support
- ✅ Automatic caching of static assets
- ✅ Network-first strategy for menu JSON
- ✅ Network status detection
- ✅ Offline cache fallback (localStorage)

### 3. **Multi-Language Support**
- ✅ i18next integration (EN/FR)
- ✅ Language selection via query param (`?lang=en` or `?lang=fr`)
- ✅ Persistent language preference in localStorage

### 4. **Location-Based Configuration**
- ✅ Location ID from query param: `?location_id=loc_123`
- ✅ Config loading from API with fallback to defaults
- ✅ Per-location menu caching

### 5. **Inactivity & Attract Screen**
- ✅ Auto-return to attract screen after 30 seconds of inactivity
- ✅ Touch/click event detection to reset timer
- ✅ Animated attract screen with loop

### 6. **Auto-Refresh**
- ✅ Manual refresh button
- ✅ Automatic refresh timer (configurable, default 5 min)
- ✅ Silent cache update in background

## Deployment

### Recommended Setup
1. **Host:** Cloudflare Pages / Vercel / GitHub Pages
2. **Tablet App:** FreeKiosk APK (or similar Kiosk app)
3. **URL Format:** `https://kiosk.fastcoffee.com/?location_id=loc_xxx&lang=en`

### FreeKiosk Configuration
```
- Homepage: https://kiosk.fastcoffee.com/?location_id=LOC_001
- Admin PIN: [set by operator]
- Kiosk Mode: Enabled
- Physical Home Button: Disabled (optional hard lock)
```

## Data Structure (Menu JSON)

```json
{
  "location_id": "loc_001",
  "name": "Downtown Cafe",
  "categories": [
    {
      "id": "coffee",
      "name": "Coffee",
      "products": [
        {
          "id": "p_101",
          "name": "Espresso",
          "description": "Rich and bold",
          "price": 2.50,
          "available": true
        }
      ]
    }
  ]
}
```

## Testing Checklist

- [ ] App boots and shows home screen
- [ ] Navigation between pages works smoothly
- [ ] Languages switch with ?lang param
- [ ] Service Worker installed and caching
- [ ] Offline mode works (disable network in DevTools)
- [ ] Inactivity timer triggers attract screen
- [ ] Touch targets are at least 64px
- [ ] Font sizes are readable from 6+ feet away
- [ ] Build is under 2MB (gzipped)

## Next Steps (Week 2-3)

- Promos & upselling ("Add syrup?" variants)
- Allergen & nutrition info
- QR code handoff to phone checkout
- Analytics events (Segment/Mixpanel)
- Admin dashboard for location operators
- Tablet health monitoring

## Important Notes

- **No checkout:** Kiosk is menu only; checkout happens on customer's phone (QR handoff)
- **FreeKiosk not included:** Android wrapper is separate (managed by DevOps)
- **API not included:** Backend menu/config service is out of scope for this repo
- **Offline-first:** App works even with zero network; menu only updates when online
