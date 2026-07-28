const CACHE_NAME = 'lazy-chef-v1';
const ASSETS = [
  './懒洋洋当大厨.html',
  './manifest.json',
  './sheep_logo_web.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(ASSETS)
    ).catch(err => console.log('Cache error:', err))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response =>
      response || fetch(e.request)
    ).catch(() => caches.match('./懒洋洋当大厨.html'))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
