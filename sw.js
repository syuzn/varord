// App shell cached on install; map tiles cached as you drive (cache-first),
// so streets you have already seen keep working without internet.
const SHELL='varord-shell-v1',TILES='varord-tiles-v1';
const ASSETS=['./','index.html','app.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png',
  'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js','https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET')return;
  if(u.hostname==='tiles.openfreemap.org'){
    e.respondWith(caches.open(TILES).then(async c=>{const hit=await c.match(e.request);if(hit)return hit;
      const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}));
    return;
  }
  if(u.origin===location.origin||u.hostname==='unpkg.com'){
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(SHELL).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)));
  }
});
