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
