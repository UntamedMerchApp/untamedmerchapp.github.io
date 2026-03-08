const REDIRECT_URL = "https://untamed-fitness-training.printify.me/";

// Ensure SW takes control immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Redirect ONLY the PWA shell to your Printify store
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Match the shell path exactly
  if (
    url.pathname === "/untamed-merch-app/" ||
    url.pathname === "/untamed-merch-app/index.html"
  ) {
    event.respondWith(Response.redirect(REDIRECT_URL));
    return;
  }

  // Default fetch for everything else
  event.respondWith(fetch(event.request));
});
