var CACHE="london-c1386e48a8ba";
var ASSETS=["./","./index.html","./manifest.webmanifest","./icon.png"];
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS)}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.map(function(x){return x===CACHE?null:caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(hit){return hit||fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE).then(function(x){x.put(e.request,c)});return r}).catch(function(){return caches.match("./index.html")})}))});
