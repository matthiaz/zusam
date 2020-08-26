parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vRk2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.get=o,exports.set=n,exports.del=s,exports.clear=i,exports.keys=u,exports.Store=void 0;class e{constructor(e="keyval-store",t="keyval"){this.storeName=t,this._dbp=new Promise((r,o)=>{const n=indexedDB.open(e,1);n.onerror=(()=>o(n.error)),n.onsuccess=(()=>r(n.result)),n.onupgradeneeded=(()=>{n.result.createObjectStore(t)})})}_withIDBStore(e,t){return this._dbp.then(r=>new Promise((o,n)=>{const s=r.transaction(this.storeName,e);s.oncomplete=(()=>o()),s.onabort=s.onerror=(()=>n(s.error)),t(s.objectStore(this.storeName))}))}}let t;function r(){return t||(t=new e),t}function o(e,t=r()){let o;return t._withIDBStore("readonly",t=>{o=t.get(e)}).then(()=>o.result)}function n(e,t,o=r()){return o._withIDBStore("readwrite",r=>{r.put(t,e)})}function s(e,t=r()){return t._withIDBStore("readwrite",t=>{t.delete(e)})}function i(e=r()){return e._withIDBStore("readwrite",e=>{e.clear()})}function u(e=r()){const t=[];return e._withIDBStore("readonly",e=>{(e.openKeyCursor||e.openCursor).call(e).onsuccess=function(){this.result&&(t.push(this.result.key),this.result.continue())}}).then(()=>t)}exports.Store=e;
},{}],"CwoO":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e="4.1",s="0.3",t={ZUSAM_VERSION:"4.1",CACHE_VERSION:"0.3",CACHE:"zusam-4.1-simplecache-0.3",CACHE_STORE:"zusam-4.1"};var a=t;exports.default=a;
},{}],"vnR2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={remove:e=>document.getElementById(e).outerHTML="",add:(t,r="alert-success",d=5e3)=>{if(!t)return;let l=document.createElement("DIV");l.id=e.hash(t),l.innerHTML=t,l.classList.add("global-alert","alert",r),document.body.appendChild(l),setTimeout(()=>e.remove(l.id),d)},hash:e=>{let t=0;if(0==e.length)return t;for(let r=0;r<e.length;r++){t=(t<<5)-t+e.charCodeAt(r),t&=t}return t}};var t=e;exports.default=t;
},{}],"EDnG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const e={usage:()=>{let e,t=0;for(e in localStorage)Object.prototype.hasOwnProperty.call(localStorage,e)&&(t+=2*(localStorage[e].length+e.length));return t},createStorageBox:(e,t=null)=>({data:e,createdAt:Date.now(),metadata:t}),remove:e=>localStorage.removeItem(e),set:(t,a,o=null)=>(localStorage.setItem(t,JSON.stringify(e.createStorageBox(a,o))),Promise.resolve(t)),get:e=>{let t=localStorage.getItem(e);return null!=t&&(t=JSON.parse(t),Object.prototype.hasOwnProperty.call(t,"data"))?new Promise(e=>e(t.data)):new Promise(e=>e(null))},reset:()=>localStorage.clear()&&window.dispatchEvent(new CustomEvent("resetStorage"))};var t=e;exports.default=t;
},{}],"dg0a":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("./me.js")),t=a(require("./http.js"));function a(e){return e&&e.__esModule?e:{default:e}}const n={dict:[],possibleLang:{en:"English",es:"Español",fr:"Français",sk:"Slovenský"},getDefaultLang:()=>(document.querySelector("meta[name='zusam:default-lang']")||{}).content||"en",getCurrentLang:()=>e.default.me&&e.default.me.data&&e.default.me.data.lang||n.getDefaultLang(),fetchDict:(e=n.getCurrentLang())=>!n.dict[e]&&t.default.get(`/lang/${e}.json`).then(t=>{n.dict[e]=t,window.dispatchEvent(new CustomEvent("fetchedNewDict"))}),t:(e,t={})=>{if(t.dict=t.dict||n.getCurrentLang(),t.count=t.count||0,!e||!n.dict[t.dict])return"";let a=n.dict[t.dict][e]||"";if("object"==typeof a){let e=Object.getOwnPropertyNames(a).map(e=>+e).filter(e=>!isNaN(e)&&e<=t.count).sort((e,t)=>e-t);a=e.length?a[e.slice(-1)[0]]:""}return Object.assign([],a.match(/{{\w+}}/g)).forEach(e=>{let n=e.replace(/[{}]/g,"");t[n]&&(a=a.replace(e,t[n]))}),a}};var r=n;exports.default=r;
},{"./me.js":"DIJp","./http.js":"MqMR"}],"DIJp":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=i(require("./http.js")),t=i(require("./lang.js"));function i(e){return e&&e.__esModule?e:{default:e}}const o={me:{},get:()=>o.me.id?Promise.resolve(o.me):o.update(),update:()=>e.default.get("/api/me",!0).then(e=>{if(e)return o.me=Object.assign({notifications:[]},e),o.loadNotifications(),t.default.fetchDict(),setTimeout(dispatchEvent(new CustomEvent("meStateChange"))),e}),loadNotifications:()=>e.default.get(`/api/users/${o.me.id}/notifications`).then(e=>{o.me.notifications=e,setTimeout(dispatchEvent(new CustomEvent("meStateChange")))}),matchNotification:(e,t)=>e.id===t||e.target===t,isNew:e=>!!Array.isArray(o.me.notifications)&&o.me.notifications.some(t=>o.matchNotification(t,e)||"new_comment"==t.type&&t.fromMessage.id===e),removeMatchingNotifications:t=>o.loadNotifications().then(()=>Array.isArray(o.me.notifications)?Promise.all(o.me.notifications.filter(e=>o.matchNotification(e,t)).map(i=>e.default.delete(`/api/notifications/${i.id}`).then(()=>{o.me.notifications=o.me.notifications.filter(e=>!o.matchNotification(e,t)),setTimeout(dispatchEvent(new CustomEvent("meStateChange")))}))):Promise.reject("Failed to get notifications from server")),hasBookmark:e=>{var t,i;return!!Array.isArray(null===(t=o.me)||void 0===t?void 0:null===(i=t.data)||void 0===i?void 0:i.bookmarks)&&o.me.data.bookmarks.some(t=>t===e)},addBookmark:t=>{o.hasBookmark(t)||e.default.post(`/api/bookmarks/${t}`).then(e=>{o.me=Object.assign(o.me,e),setTimeout(dispatchEvent(new CustomEvent("meStateChange")))})},removeBookmark:t=>{o.hasBookmark(t)&&e.default.delete(`/api/bookmarks/${t}`).then(e=>{o.me=Object.assign(o.me,e),setTimeout(dispatchEvent(new CustomEvent("meStateChange")))})}};var a=o;exports.default=a;
},{"./http.js":"MqMR","./lang.js":"dg0a"}],"O1i9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=i(require("./lang.js")),t=i(require("./router.js")),r=i(require("./me.js")),a=i(require("./storage.js"));function i(e){return e&&e.__esModule?e:{default:e}}const o={genId:e=>`z${e||""}-${Date.now().toString().slice(-5)}${Math.random().toString().slice(-5)}`,id2Int:e=>parseInt(e.replace(/[^\d]/g,""),10),urlRegExp:/(\([^()]*)?https?:\/\/[^[\]\n\r ]*[-A-Za-z0-9+&@#/%=~_()|]/i,getUrl:e=>{if(!e)return"";let t=e.match(o.urlRegExp);if(t&&t[0].startsWith("(")){let e=t[0].match(/https?:\/\//i);t.index+=e.index,t[0]=t[0].slice(e.index),t[0].endsWith(")")&&(t[0]=t[0].slice(0,-1))}return t},limitStrSize:(e,t)=>e.length>t?`${e.slice(0,t-3)}...`:e,humanFullDate:e=>{let t=new Date(1e3*e);return(t=new Date(t.getTime()+6e4*t.getTimezoneOffset()*-1)).toISOString().replace("T"," ").replace(/\..*$/,"")},humanTime:t=>{if(!t)return null;const r=Math.abs(Math.round((Date.now()/1e3-t)/60));return r<1?e.default.t("just_now"):r<60?e.default.t("ago",{duration:`${r}mn`}):r<1440?e.default.t("ago",{duration:`${Math.floor(r/60)}h`}):o.humanFullDate(t).split(" ")[0]},getGroupId:()=>{if(r.default.me.groups)switch(t.default.entity.entityType){case"group":return o.getId(t.default.entity);case"message":return o.getId(t.default.entity.group)}return""},getGroupName:()=>{let e=r.default.me.groups.find(e=>e.id==o.getGroupId());return e?e.name:""},getId:e=>{switch(typeof e){case"object":return e?e.id:null;case"string":return e.split("/").pop().replace(/\?.*$/,"").replace(/\.\w+$/,"");default:throw console.error(e),"Could not extract id !"}},thumbnail:(e,r,a)=>"string"!=typeof e||e.startsWith("z")?null:t.default.toApp(`/api/images/thumbnail/${r}/${a}/${e}`),crop:(e,r,a)=>"string"!=typeof e||e.startsWith("z")?null:t.default.toApp(`/api/images/crop/${r}/${a}/${e}`),defaultAvatar:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIAAQMAAADOtka5AAAABlBMVEUAAAD///+l2Z/dAAAAAnRSTlMA/iyWEiMAAAMJSURBVHja7ZtBjpwwEEWxmIhFFmiURZZEyi6HCLkZHCXr2eQKHIUjoEiRSGRRiWB6klaDU/hDF4z+W6LuNz3+ZRvbkCSEEEIIIYQQQgghhBBCCCGEEEIIITvwGfy+kxoTpNJigkw6TJBLjwkK8ZiglMFYUInAAqwQRKRBBR0q8FhXEKwVR0GLCvxCjeo6oyzkoIxnEvj5661acPO3yvFqpxdcV+Pj88VeNZ7cGB4ul1QFkv399KT4KBIpmGEwF4i9oL6DIN/3FzToL2ju8AvsBeE2aNFfQMFJBCkF0/R+bkHyCgSVuaDcVaC5zyvMBTkqyHYVaBZDKSpw5oJgLcMC5doXFBSoIMNutjcQBHJULmlhQYUKlmNQbs9kqGC5P2o3FqBBOVjMWkEOdcZQKam3dyqkkgP/g35zxmEpLhbjir0ZFz2tXHgbPR5deI+EMPKmig/hhU/fIkOYL4iYDbIyqpCXajp2Zy4yhNuxqUfbMCaEIraQZ9swJgQBQ0jBQr6eYXrzQrYIYdtC9uaFbDKayJajyTkL+VijyWA+mnBajGpDeFrMzAu5BNvwKoQBDaFHQ+jQEBo0hBoMYUBD8GgIHRpCi44mcAiJRQhoITvzQs63LGQxL2SOJnEhiHUI296bwNOixb1JYr5kz8yX7Odf6XDfBC9kd6yVzq+np69QIY/8AEJ45kt0T4hIM0VONm5CiLlVhLflS+CwdTGEVa2AnfOFTogaVAAfcg1QivpqzLFHD4LnrR0q8FAhqlux3PPUu0EFLSrooL6kLeaQwKMCTY4OfUjVoY+IOvTxSFiw81NtnbmgRwXeXDAg08IxBPIKBPX5BQ0FBxC0+wtSCg4gcBT853nruwiqfQXNHQT/LDiGD9Old6sEL2umn3MtqxDks9NotVbwfaG+FDfL6fznsjV32365cTXrtqoPdJKYrbmreIDvT42DCMYoIUEu4FvIKSpwgr6JvYEAfJm8QgUl+j58gb6Rn4Nvcv/p0jUmcODr8IQQQgghhBBCCCGEEEIIIYQQQgghs/wGp6uYgtiKODIAAAAASUVORK5CYII=",hash:e=>e.split("").reduce((e,t)=>(e<<5)-e+t.charCodeAt()|0),colorHash:e=>["#000000","#333366","#333399","#3333CC","#339933","#339999","#33CC33","#33CC99","#663333","#663366","#666633","#666699","#66CC33","#66CCCC","#993333","#993366","#993399","#996633","#999966","#CC3333","#CC3366","#CC3399","#CC33CC","#CC6633","#CC9933","#CC99CC","#CCCC33"][Math.abs(o.hash(e))%27],backgroundHash:e=>{if(!e)return"background-color: #aaa;";let t=o.colorHash(e),r=o.colorHash(e.split("").reverse().join("."));return`background-color:${t};background-image:linear-gradient(${Math.abs(o.hash(e))%4*45}deg, ${r} 15%, transparent 15% 30%, ${r} 30% 45%, transparent 45% 60%, ${r} 60% 75%, transparent 75% 90%, ${r} 90%);`},logout:()=>{a.default.reset(),window.location.href=window.location.origin}};var n=o;exports.default=n;
},{"./lang.js":"dg0a","./router.js":"QBcK","./me.js":"DIJp","./storage.js":"EDnG"}],"QBcK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=s(require("./http.js")),t=s(require("./me.js")),a=s(require("./util.js")),r=s(require("./lang.js")),i=s(require("./storage.js"));function s(e){return e&&e.__esModule?e:{default:e}}const n={route:"",id:"",action:"",backUrl:"",backUrlPrompt:"",entityUrl:"",entityType:"",search:"",entity:{},isValidUrl:e=>{try{return new URL(e),!0}catch(t){return!1}},getSubpath:()=>new URL(document.baseURI).pathname.replace(/\/$/,""),toApp:e=>e&&"string"==typeof e?n.isValidUrl(e)?e:location.origin+n.getSubpath()+e:"",removeSubpath:e=>e?e.replace(new RegExp(`^${n.getSubpath()}`),""):"",getParam:(e,t=window.location.search.substring(1))=>{let a=t.split("&").find(t=>t.split("=")[0]===e);return a?decodeURIComponent(a.split("=")[1]):""},getSegments:()=>window.location.pathname.slice(1).split("?")[0].split("/"),isOutside:()=>["login","password-reset","signup","invitation","stop-notification-emails","public"].includes(n.route||n.getSegments()[0]),isEntity:e=>["messages","groups","users","links","files"].includes(e),getUrlComponents:e=>{let t={};return e&&(t.url=new URL(e),t.path=t.url.pathname,t.search=t.url.search.slice(1),[t.route,t.id,t.action]=n.removeSubpath(t.path).slice(1).split("/")),t.entityUrl="",t.entityType="",t.backUrl="",t.backUrlPrompt="",t},navigate:async(s="/",o={})=>{s.match(/^http/)||o.raw_url||(s=n.toApp(s));let l=n.getUrlComponents(s);if(n.url&&n.url.href==l.url.href)console.warn("navigate lock !");else switch(Object.assign(n,l),n.id&&n.isEntity(null==n?void 0:n.route)?(n.entityUrl=`/api/${n.route}/${n.id}`,n.entityType=n.route,await e.default.get(n.entityUrl).then(e=>{if(e)switch(n.entity=e,n.route){case"groups":"write"==n.action&&(n.backUrl=`/${n.route}/${n.id}`,n.backUrlPrompt=r.default.t("cancel_write")),n.search&&(n.backUrl=`/${n.route}/${n.id}`);break;case"messages":e.parent&&!e.isInFront?n.backUrl=`/messages/${e.parent.id}`:n.backUrl=`/groups/${a.default.getId(e.group)}`;break;case"users":n.backUrl="/";break;default:n.action&&(n.backUrl="/")}else console.warn("Unknown entity")}).catch(e=>console.warn(e))):n.entity=null,n.route){case"login":i.default.reset();case"bookmarks":case"create-group":case"groups":case"messages":case"password-reset":case"public":case"share":case"signup":case"stop-notification-emails":case"users":o.replace?history.replaceState(null,"",s):history.pushState(null,"",s),window.dispatchEvent(new CustomEvent("routerStateChange"));break;case"logout":a.default.logout();break;case"invitation":i.default.get("apiKey").then(t=>{t?e.default.post(`/api/groups/invitation/${n.id}`,{}).then(()=>{window.location.href=window.location.origin}):n.navigate(`/signup?inviteKey=${n.id}`)});break;default:t.default.get().then(e=>{e?e.data.default_group?n.navigate(`/groups/${e.data.default_group}`):e.groups[0]?n.navigate(`/groups/${e.groups[0].id}`):window.location="/create-group":n.navigate("/login")})}},sync:()=>{n.navigate(location.pathname+location.search+location.hash,{replace:!0})},onClick:(e,t=!1,a=null)=>{if(e.preventDefault(),e.stopPropagation(),!a){const r=e.target.closest("a");r&&("_blank"==r.target&&(t=!0),a=r.getAttribute("href"))}if(a){if(a.startsWith("http")){if(new URL(a).host!=location.host)return void(e.ctrlKey||t?open(a,"_blank"):location.href=a)}for(let e of document.getElementsByClassName("active"))e.classList.remove("active");e.ctrlKey||t?open(a,"_blank"):n.navigate(a)}}};var o=n;exports.default=o;
},{"./http.js":"MqMR","./me.js":"DIJp","./util.js":"O1i9","./lang.js":"dg0a","./storage.js":"EDnG"}],"MqMR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=a(require("./alert.js")),t=a(require("./storage.js")),r=a(require("./router.js"));function a(e){return e&&e.__esModule?e:{default:e}}const s={sendFile:(r,a,s=null,n=null)=>t.default.get("apiKey").then(e=>{let t=new XMLHttpRequest;t.open("POST",`${document.baseURI}api/files`,!0),t.setRequestHeader("X-AUTH-TOKEN",e),t.addEventListener("load",e=>{e.target.status>199&&e.target.status<300?a(JSON.parse(e.target.response)):n?n(e.target.statusText):console.error(e.target.statusText)}),s&&(t.upload.onprogress=(e=>s({loaded:e.loaded,total:e.total}))),n&&t.addEventListener("error",e=>n(e)),t.send(r)}).catch(t=>e.default.add(t,"alert-danger")),get:(a,s=!1)=>t.default.get("apiKey").then(e=>{if(!(a=r.default.toApp(a)))return;let t={};return e&&(t["X-AUTH-TOKEN"]=e),s&&(t["X-NOCACHE"]="nocache"),fetch(a,{method:"GET",headers:new Headers(t)}).then(e=>e.ok&&e.json()).catch(e=>console.warn(`ERROR for ${a}`,e))}).catch(t=>e.default.add(t,"alert-danger")),post:(e,t,r="application/json")=>s.request(e,t,"POST",r),put:(e,t,r="application/json")=>s.request(e,t,"PUT",r),delete:(e,t,r="application/json")=>s.request(e,null,"DELETE",r),request:(a,s,n,o="application/json")=>t.default.get("apiKey").then(e=>{if(!(a=r.default.toApp(a)))return;let t={};e&&(t["X-AUTH-TOKEN"]=e),o&&(t["Content-type"]=o);let d={method:n,headers:new Headers(t)};return s&&(d.body="object"==typeof s&&"Object"==s.constructor.name?JSON.stringify(s):s),fetch(a,d).then(e=>{try{return e.json()}catch(t){return console.warn(t.message),Promise.reject(t.message)}}).catch(e=>console.warn(`ERROR for ${a}`,e))}).catch(t=>e.default.add(t,"alert-danger"))};var n=s;exports.default=n;
},{"./alert.js":"vnR2","./storage.js":"EDnG","./router.js":"QBcK"}],"lCef":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=t(require("./http.js"));function t(e){return e&&e.__esModule?e:{default:e}}const n={info:{},update:()=>e.default.get("/api/info",!0).then(e=>{if(e)return n.info=Object.assign({},e),setTimeout(dispatchEvent(new CustomEvent("apiStateChange"))),e})};var u=n;exports.default=u;
},{"./http.js":"MqMR"}],"NUMl":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("idb-keyval"),t=a(require("./param.js"));function a(e){return e&&e.__esModule?e:{default:e}}const l={name:t.default.CACHE,cache_store:new e.Store(t.default.CACHE_STORE,t.default.CACHE),purgeOldCache:()=>{(0,e.keys)().then(t=>t.map(t=>(0,e.get)(t).then(a=>{a.lastUsed+2592e6<Date.now()&&(console.log(`Remove from cache: ${t.url}`),(0,e.del)(t),caches.open(l.name).then(e=>e.delete(t)))})))},removeMatching:e=>caches.open(l.name).then(t=>t.matchAll().then(a=>Promise.all(a.filter(t=>t.url.match(e)).map(e=>t.delete(e)))))};var r=l;exports.default=r;
},{"idb-keyval":"vRk2","./param.js":"CwoO"}],"rqMW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.lang=exports.util=exports.router=exports.me=exports.http=exports.storage=exports.cache=exports.alert=exports.api=exports.param=void 0;var e=i(require("./param.js")),t=i(require("./api.js")),r=i(require("./alert.js")),s=i(require("./cache.js")),o=i(require("./storage.js")),a=i(require("./http.js")),u=i(require("./me.js")),p=i(require("./router.js")),l=i(require("./util.js")),x=i(require("./lang.js"));function i(e){return e&&e.__esModule?e:{default:e}}const c=e.default;exports.param=c;const n=t.default;exports.api=n;const d=r.default;exports.alert=d;const f=s.default;exports.cache=f;const j=o.default;exports.storage=j;const q=a.default;exports.http=q;const g=u.default;exports.me=g;const h=p.default;exports.router=h;const m=l.default;exports.util=m;const _=x.default;exports.lang=_;
},{"./param.js":"CwoO","./api.js":"lCef","./alert.js":"vnR2","./cache.js":"NUMl","./storage.js":"EDnG","./http.js":"MqMR","./me.js":"DIJp","./router.js":"QBcK","./util.js":"O1i9","./lang.js":"dg0a"}],"qGzB":[function(require,module,exports) {
"use strict";var e=require("idb-keyval"),t=n(require("/core"));function n(e){return e&&e.__esModule?e:{default:e}}const r=new e.Store(t.default.CACHE_STORE,t.default.CACHE),u=[{route:new RegExp("/api/users/[^/]+/?$"),duration:864e5},{route:new RegExp("/api/images/crop/"),duration:31536e6},{route:new RegExp("/api/images/thumbnail/"),duration:31536e6},{route:new RegExp("/api/links/by_url?"),duration:31536e6}];function a(t,n,u){return(0,e.set)(n.url,{lastUsed:Date.now()},r).then(()=>t.put(n,u))}function s(e,n){return fetch(e).then(r=>{if(n){let n=r.clone();caches.open(t.default.CACHE).then(t=>a(t,e,n))}return r})}function o(n){return caches.open(t.default.CACHE).then(t=>t.match(n).then(t=>t?(0,e.set)(n.url,{lastUsed:Date.now()},r).then(()=>t):s(n,!0)))}function i(e){return caches.open(t.default.CACHE).then(t=>fetch(e).then(n=>a(t,e,n)))}self.addEventListener("fetch",t=>{"GET"==t.request.method&&u.some(e=>t.request.url.match(e.route))&&(t.respondWith(o(t.request)),t.waitUntil(()=>{(0,e.get)(t.request.url,r).then(e=>{if(e&&Object.protoype.hasOwnProperty.call(e,"lastUsed")&&null!=e.lastUsed){e.lastUsed+u.find(e=>t.request.url.match(e.route)).duration<Date.now()&&i(t.request)}}).catch(()=>i(t.request))}))});
},{"idb-keyval":"vRk2","/core":"rqMW"}]},{},["qGzB"], null)
//# sourceMappingURL=service-workers.js.map