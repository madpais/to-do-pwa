const CACHE_NAME = 'pwa-todo-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/to-do-pwa/index.html',
    '/to-do-pwa/manifest.json',
    '/to-do-pwa/styles.css',
    '/to-do-pwa/app.js',
    '/to-do-pwa/icons/icon-192.png',
    '/to-do-pwa/icons/icon-512.png'
];

// Instala o service worker e faz cache dos arquivos essenciais
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});

// Ativa o service worker e remove caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Intercepta requisições e responde com cache ou busca na rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response =>
            response || fetch(event.request)
        )
    );
});