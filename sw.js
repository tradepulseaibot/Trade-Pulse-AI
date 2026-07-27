self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Required by Chrome to treat the site as a full PWA (not a shortcut)
self.addEventListener('fetch', event => {
  // no-op – the browser handles the request normally
});
