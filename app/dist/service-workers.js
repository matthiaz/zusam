!function(){var e,t=function(){var e;return!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise((function(t){var n=function(){return indexedDB.databases().finally(t)};e=setInterval(n,100),n()})).finally((function(){return clearInterval(e)})):Promise.resolve()};function n(e){return new Promise((function(t,n){e.oncomplete=e.onsuccess=function(){return t(e.result)},e.onabort=e.onerror=function(){return n(e.error)}}))}function r(e,r){var u=t().then((function(){var t=indexedDB.open(e);return t.onupgradeneeded=function(){return t.result.createObjectStore(r)},n(t)}));return function(e,t){return u.then((function(n){return t(n.transaction(r,e).objectStore(r))}))}}function u(){return e||(e=r("keyval-store","keyval")),e}function o(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:u();return r("readwrite",(function(r){return r.put(t,e),n(r.transaction)}))}const a="zusam-0.5-a",i=r(a,a),c=[{route:new RegExp("/api/users/[^/]+/?$"),duration:6e4},{route:new RegExp("/api/groups/[^/]+/?$"),duration:6e4},{route:new RegExp("/api/notifications/[^/]+/?$"),duration:864e5},{route:new RegExp("/api/images/crop/"),duration:31536e6},{route:new RegExp("/api/images/thumbnail/"),duration:31536e6},{route:new RegExp("/api/links/by_url?"),duration:31536e6}];function s(e,t,n){return o(t.url,{lastUsedAt:Date.now(),updatedAt:Date.now()},i).then((()=>e.put(t,n)))}function d(e){return caches.open(a).then((t=>fetch(e).then((n=>s(t,e,n)))))}self.addEventListener("fetch",(e=>{var t;"GET"==e.request.method&&c.some((t=>e.request.url.match(t.route)))&&(e.respondWith((t=e.request,caches.open(a).then((e=>e.match(t).then((e=>e?o(t.url,{lastUsedAt:Date.now()},i).then((()=>e)):function(e,t){return fetch(e).then((n=>{if(t){let t=n.clone();caches.open(a).then((n=>s(n,e,t)))}return n}))}(t,!0))))))),e.waitUntil((()=>{(function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:u())("readonly",(function(t){return n(t.get(e))}))})(e.request.url,i).then((t=>{if(t&&Object.protoype.hasOwnProperty.call(t,"updatedAt")&&null!=t.updatedAt){t.updatedAt+c.find((t=>e.request.url.match(t.route))).duration<Date.now()&&d(e.request)}})).catch((()=>d(e.request)))})))}))}();
//# sourceMappingURL=service-workers.js.map
