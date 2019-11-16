importScripts('/nouvelle/js/workbox-sw-4.3.1.js');

const OFFLINE_PAGE = '/mobile/offline.html';
const FALLBACK_IMAGE_URL = '/assets/images/fff.png';


console.log(`Yay! Workbox is loaded 🎉`);

workbox.core.setCacheNameDetails({
    prefix: 'mobile',
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

// par défaut
workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.setCatchHandler(({event}) => {  
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


  self.addEventListener('message', function(event) {
    if (event.data.action === 'notify' && self.registration && self.registration.showNotification) {
      self.registration.showNotification('Mobile web app 🗲', {
        body: event.data.message,
        data: {
          myUrl: '/'
        },
        icon: '/assets/images/favicon-32x32.png'
      });
    }
  });

  self.addEventListener('notificationclick', event => {
    const url = event.notification.data.url;
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
  });