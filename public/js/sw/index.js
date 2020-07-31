self.addEventListener('fetch', (event) => {
    console.log(event.request);
    if (event.request.url.endsWith('.jpg')) {
        event.respondWith(
            fetch('/imgs/dr-evil.gif')
        );
    }
    
});