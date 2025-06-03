// service-worker.js

const CACHE_NAME = 'minha-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
    // Adicione aqui outros arquivos que você quer que funcionem offline
];

// Evento de Instalação: Armazena os arquivos em cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento de Ativação: Limpa caches antigos (opcional, mas bom para atualizações)
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Evento de Fetch: Intercepta as requisições e serve do cache se disponível
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Se o recurso estiver no cache, retorna ele
                if (response) {
                    return response;
                }
                // Caso contrário, faz a requisição à rede
                return fetch(event.request);
            })
    );
});