importScripts('/nouvelle/js/workbox-sw-4.3.1.js');

const OFFLINE_PAGE = '/nouvelle/offline.html';
const FALLBACK_IMAGE_URL = '/assets/images/fff.png';


console.log(`Yay! Workbox is loaded 🎉`);

workbox.core.setCacheNameDetails({
    prefix: 'nouvelle',
    suffix: 'web',
    precache: 'install-time',
    runtime: 'run-time'
});

console.log(`EventSource ? ${EventSource ? 'oui': 'non'}`);

workbox.precaching.precacheAndRoute([
    '/favicon.ico',
    OFFLINE_PAGE,
    FALLBACK_IMAGE_URL
]);

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate(),
);

// par défaut
workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkOnly()
);

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
workbox.routing.setCatchHandler(({event}) => {
    // The FALLBACK_URL entries must be added to the cache ahead of time, either via runtime
    // or precaching.
    // If they are precached, then call workbox.precaching.getCacheKeyForURL(FALLBACK_URL)
    // to get the correct cache key to pass in to caches.match().
    //
    // Use event, request, and url to figure out how to respond.
    // One approach would be to use request.destination, see
    // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c    
    switch (event.request.destination) {
      case 'document':
        return caches.match(OFFLINE_PAGE);
      break;
  
      case 'image':
        return caches.match(FALLBACK_IMAGE_URL);
      break;
  
      default:
        // If we don't have a fallback, just return an error response.
        return Response.error();
    }
  });