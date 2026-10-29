// Minimal offline cache: network-first for same-origin GETs, cache fallback. Never caches Supabase API calls (other origin).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('fetch', (e) => { if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); caches.open('pocketbook-v2').then((x) => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request))); });
