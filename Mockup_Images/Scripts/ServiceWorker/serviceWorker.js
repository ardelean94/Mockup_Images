self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
            .open('images-store')
            .then((cache) =>
                cache.addAll([
                    '/',
                    '/Image.aspx',
                    '/Scripts/WebForms/Images/image.js',
                    '/Scripts/dexie-3.0.3.js',
                    '/Scripts/modernizr-2.8.3.js',
                    '/Scripts/browser-image-compression-1.0.13.js',
                    '/Content/WebForms/image.css',
                    '/favicon.ico'
                ])
            )
    );
});

self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
