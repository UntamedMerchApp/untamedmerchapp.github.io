const REDIRECT_URL = "https://untamed-fitness-training.printify.me/";

// Install immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Take control immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Redirect logic
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 1. Redirect ANY request to the root shell
  if (url.origin === self.location.origin && url.pathname === "/") {
    event.respondWith(Response.redirect(REDIRECT_URL));
    return;
  }

  // 2. Redirect index.html even with query params
  if (url.pathname.endsWith("index.html")) {
    event.respondWith(Response.redirect(REDIRECT_URL));
    return;
  }

  // 3. Default fetch for everything else
  event.respondWith(fetch(event.request));
});
