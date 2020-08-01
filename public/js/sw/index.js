const staticCache = 'wittr-static-v2';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCache)
        .then(cache => {
            return cache.addAll([
                '/',
                'js/main.js',
                'css/main.css',
                'imgs/icon.png',
                'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
                'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName.startsWith('wittr-') && cacheName !== staticCache;
                })
                .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) return response;
            return fetch(event.request);
        })
    );
});