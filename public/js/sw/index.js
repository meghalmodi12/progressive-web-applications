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