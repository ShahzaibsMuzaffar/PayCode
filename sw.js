const C='paycode-v3';
const A=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const store=(r,n)=>{if(n.ok&&new URL(r.url).origin===location.origin){const c=n.clone();caches.open(C).then(x=>x.put(r,c))}return n};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 if(r.mode==='navigate'){
  e.respondWith(Promise.race([fetch(r),new Promise((_,j)=>setTimeout(j,3000))]).then(n=>store(r,n)).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('./index.html'))));
 }else{
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>store(r,n)).catch(()=>undefined)));
 }});
