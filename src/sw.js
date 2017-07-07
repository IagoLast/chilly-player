const CACHE = 'v1.0.0';

this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll([
        '/assets/logo.svg',
        '/assets/bg.jpg',
        '/assets/pause.svg',
        '/assets/play.svg',
        '/assets/vinyl.png',
      ]);
    })
  );
});

this.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (resp) {
      return resp || fetch(event.request).then(function (response) {
        return caches.open(CACHE).then(function (cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
