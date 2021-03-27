const appCaches = "app-caches-v1";
const assets = [
  "/",
  "./index.html",
  "./systemDiagnosticManager.html",
  "./systemState.html",
  "./systemData.html",
  "./css/style.css",
  "./js/app.js",
  "./icons/icon-192x192.png",
  "./icons/icon-256x256.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(appCaches).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
