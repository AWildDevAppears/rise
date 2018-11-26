importScripts("./precache-manifest.b4459e0053827277184dbe358e9e6a3f.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

function addIndexRevision(urls, defRev) {
    const rando = (Math.random() * 1000000).toPrecision(6);
    const indices = __precacheManifest.filter(m => m.url === '/index.html');
    const revision = indices.length === 1 ? indices[0].revision : defRev || rando;
    return urls.map(url => {
        return { url, revision };
    });
}

workbox.core.setCacheNameDetails({
    prefix: 'rise',
    suffix: 'v1',
    precache: 'install-time',
    runtime: 'run-time',
    googleAnalytics: 'ga',
});

workbox.precaching.precache(['/img/yeoman-033.png']);

workbox.precaching.precache(addIndexRevision(['/', '/manifest.json']));

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {
    cleanUrls: false,
});

