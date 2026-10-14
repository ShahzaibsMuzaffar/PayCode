const C='paycode-v1';
const A=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>{if(n.ok&&new URL(r.url).origin===location.origin){const c=n.clone();caches.open(C).then(x=>x.put(r,c))}return n}).catch(()=>r.mode==='navigate'?caches.match('./index.html'):undefined)))});
