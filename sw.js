/* FloReady: sw.js (service worker)
 * Keeps a copy of the app on the device so FloReady still opens with no internet connection,
 * which matters most during and after a hurricane.
 *
 * Strategy: "network first". When online, always load the newest files (so updates reach everyone)
 * and refresh the saved copy. When offline, use the saved copy.
 * CACHE_NAME only needs changing if you remove or rename files; normal edits update on their own.
 */
var CACHE_NAME = 'floready-v3';
var APP_FILES = [
  './', 'index.html', 'css/styles.css', 'manifest.webmanifest',
  'js/helpers.js', 'js/data.js', 'js/art.js', 'js/storage.js', 'js/es.js', 'js/i18n.js', 'js/speech.js', 'js/app.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png'
];
// Fonts come from Google; save them too so the app looks right offline
var FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) { return cache.addAll(APP_FILES); }));
  self.skipWaiting();
});

// Remove caches from older versions
self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (names) {
    return Promise.all(names.filter(function (n) { return n !== CACHE_NAME; }).map(function (n) { return caches.delete(n); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  var url = new URL(event.request.url);
  var ours = url.origin === self.location.origin;
  if (!ours && FONT_HOSTS.indexOf(url.hostname) === -1) return; // links to other sites: not our business

  event.respondWith(
    fetch(event.request)
      .then(function (response) {
        // Save a fresh copy of good responses for next time we're offline
        if (response && (response.ok || response.type === 'opaque')) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
        }
        return response;
      })
      .catch(function () {
        // Offline: use the saved copy; for page loads, fall back to the app's start page
        return caches.match(event.request).then(function (cached) {
          return cached || (event.request.mode === 'navigate' ? caches.match('index.html') : Response.error());
        });
      })
  );
});
