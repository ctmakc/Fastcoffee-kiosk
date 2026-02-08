# Deployment Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- Git

## Local Development

```bash
# Install dependencies
cd /workspaces/Fastcoffee-kiosk
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000` by default.

## Testing with Query Params

```
Local:
http://localhost:3000/?location_id=loc_demo&lang=en

With French:
http://localhost:3000/?location_id=loc_demo&lang=fr
```

## Production Deployment

### Cloudflare Pages (Recommended)

1. **Connect Repository**
   ```bash
   cd /workspaces/Fastcoffee-kiosk
   git push origin main
   ```

2. **Cloudflare Pages Settings**
   - **Build command:** `npm run build`
   - **Build output directory:** `apps/kiosk/dist`
   - **Root directory:** (leave empty)

3. **Environment Variables** (in Cloudflare Pages)
   - `VITE_API_URL=https://api.fastcoffee.local/menu`

### GitHub Pages

```bash
# Build and deploy
npm run build
git add .
git commit -m "Deploy build"
git push origin main
```

Then enable GitHub Pages in repository settings.

### Vercel

```bash
# Build and deploy
npm run build
vercel deploy
```

## Tablet Setup

### FreeKiosk Installation

1. **Download FreeKiosk APK** from app store or FreeKiosk website
2. **Install on tablet**
3. **Configure FreeKiosk:**
   - Admin Mode: Open admin panel (long-hold home button or PIN)
   - Homepage: Set to your deployed URL + query params
   - Example: `https://kiosk.fastcoffee.com/?location_id=LOC_DOWNTOWN&lang=en`
   - Kiosk Mode: Enable
   - Allowed apps: FreeKiosk only
   - Home button behavior: Disabled or locked

### Network Configuration

- **WiFi:** Connect tablet to reliable, dedicated WiFi network
- **Backup:** Consider 4G failover if available
- **DNS:** Use cloudflare 1.1.1.1 or Google 8.8.8.8 for reliability

## Performance Optimization

- Static assets cached by Service Worker
- Menu JSON cached with 1-hour TTL
- Images optimized with gzip compression
- Build size target: <2MB gzipped

## Monitoring

### Remote Debugging
- Enable **Cloudflare Analytics Engine** for performance tracking
- Use **PWA manifest** to track install metrics
- Monitor **Service Worker** cache hits/misses

### Health Checks
- Verify WiFi connectivity on tablets
- Monitor Service Worker sync status
- Check localStorage cache validity

## Rollback

If a bad build ships:

**Cloudflare Pages:**
1. Go to Deployments tab
2. Find previous good deployment
3. Click "Rollback"

**GitHub Pages:**
```bash
git revert <bad-commit-hash>
git push origin main
```

## Configuration per Location

Each location gets a unique URL with `location_id`:

```
Location 1 (Downtown):
https://kiosk.fastcoffee.com/?location_id=LOC_001&lang=en

Location 2 (Airport):
https://kiosk.fastcoffee.com/?location_id=LOC_002&lang=fr

Location 3 (Mall):
https://kiosk.fastcoffee.com/?location_id=LOC_003&lang=en
```

The app will fetch location-specific pricing, availability, and menu items from your backend API.
