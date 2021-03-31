const appCaches = "app-caches-v1";
const assets = [
  "./index.html",
  "./diag_manager.html",
  "./state.html",
  "./css/style.css",
  "./js/app.js",
  "./icons/icon-192x192.png",
  "./icons/icon-256x256.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png",
  "./assets/bootstrap/css/bootstrap.min.css",
  "./assets/css/untitled.css",
  "./assets/js/bs-init.js",
  "./assets/js/theme.js",
  "./assets/fonts/fontawesome5-overrides.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.js",
  "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.bundle.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
  "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
  
];

self.addEventListener("install", installEvent => {
  console.log("installing cahcess")
  installEvent.waitUntil(
    caches.open(appCaches).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  console.log("Fetchng the caches")
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
