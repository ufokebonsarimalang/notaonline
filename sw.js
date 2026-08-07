const CACHE_NAME = 'wollfish-pos-v1';
const assetsToCache = [
  './wollfish.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap'
];

// Install Service Worker & Simpan Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Ambil data dari cache jika offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request).catch(() => {
        // Fallback jika fetch gagal total (misal offline dan data tidak ada di cache)
        return caches.match('./wollfish.html');
      });
    })
  );
});
