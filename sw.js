const CACHE_NAME = "pwa-cache-v1";

const CACHE_ASSETS = [
  "/",
  "/about.html",
  "/favicon.ico",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta encontrar a resposta no cache primeiro.
    caches.match(event.request)
      .then(response => {
        // Se a resposta estiver no cache, a retorna.
        // Se não, faz a requisição à rede.
        return response || fetch(event.request);
      })
      .catch(() => {
        // Se a rede também falhar (offline),
        // retorna a página offline de fallback.
        return caches.match('/offline.html');
      })
  );
});