self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('wittr-static-v1')
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

self.addEventListener('fetch', (event) => {
    console.log(event.request);
    event.respondWith(
        fetch(event.request.url)
            .then(response => {
                if (response.status === 404) {
                    return fetch('/imgs/dr-evil.gif');
                }
                return response;
            })
            .catch(() => {
                return new Response('Uh oh, that totally failed!!');
            })
    );
});