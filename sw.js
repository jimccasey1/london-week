var CACHE="london-c063767dd3d6";
var ASSETS=["./","./index.html","./manifest.webmanifest","./icon.png"];
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS)}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.map(function(x){return x===CACHE?null:caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;
if(r.mode==="navigate"){e.respondWith(new Promise(function(ok){var done=false;var t=setTimeout(function(){caches.match("./index.html").then(function(h){if(h&&!done){done=true;ok(h)}})},3000);
fetch(r).then(function(n){if(done)return;done=true;clearTimeout(t);var c=n.clone();caches.open(CACHE).then(function(x){x.put("./index.html",c)});ok(n)}).catch(function(){caches.match("./index.html").then(function(h){if(!done){done=true;clearTimeout(t);ok(h||Response.error())}})})}));return}
e.respondWith(caches.match(r,{ignoreSearch:true}).then(function(hit){return hit||fetch(r)}))});
