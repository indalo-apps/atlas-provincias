// © 2026 Adela Moreno Vega y Carlos Moreno Otto. Todos los derechos reservados.
// Dirección antigua del Atlas: este service worker sustituye al viejo, borra lo guardado y lleva las ventanas abiertas a la dirección nueva.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith("atlas-")) await caches.delete(k);
    await self.clients.claim();
    for (const c of await self.clients.matchAll({ type: "window" })) { try { c.navigate("https://indalo-apps.github.io/atlas/"); } catch (err) {} }
    await self.registration.unregister();
  })());
});
self.addEventListener("fetch", e => {
  if (e.request.mode === "navigate") e.respondWith(Response.redirect("https://indalo-apps.github.io/atlas/", 302));
});
