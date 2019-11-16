const cacheName = 'cache-v1';
const OFFLINE_PAGE = 'offline.html';

const precacheResources = [
    OFFLINE_PAGE,
    '/favicon.ico'
];

self.addEventListener('install', event => {
    console.log('Service worker installing...');

    const precache = async () => {
        const cache = await caches.open(cacheName);
        return await cache.addAll(precacheResources);
    };
    
    event.waitUntil(precache());
});

self.addEventListener('activate', event => {
    console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    const doFetch = async () => {
        try{
            return await fetch(event.request);
        }catch(e){
            const cache = await caches.open(cacheName);
            return await cache.match(OFFLINE_PAGE);
        }
    };

    event.respondWith(doFetch());
});