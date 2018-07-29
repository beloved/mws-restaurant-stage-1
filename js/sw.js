self.addEventListener('install', function (event) {
   event.waitUntil(
       caches.open('restaurant-files-v1').then(function(cache) {
           return cache.addAll([
               '/index.html',
               '/restaurant.html',
               '/restaurant.html?id=1',
               '/restaurant.html?id=2',
               '/restaurant.html?id=3',
               '/restaurant.html?id=4',
               '/restaurant.html?id=5',
               '/restaurant.html?id=6',
               '/restaurant.html?id=7',
               '/restaurant.html?id=8',
               '/restaurant.html?id=9',
               '/restaurant.html?id=10',
               '/css/styles.css',
               '/data/restaurants.json',
               '/js/dbhelper.js',
               '/js/main.js',
               '/js/restaurant_info.js',
               // '/js/sw.js',
               '/img/1.jpg',
               '/img/2.jpg',
               '/img/3.jpg',
               '/img/4.jpg',
               '/img/5.jpg',
               '/img/6.jpg',
               '/img/7.jpg',
               '/img/8.jpg',
               '/img/9.jpg',
               '/img/10.jpg'
           ]);
       })
   );
});
//Code used from https://developers.google.com/web/fundamentals/primers/service-workers/
// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function(response) {
//                 // Cache hit - return response
//                 if (response) {
//                     return response;
//                 }
//
//                 //  Clone the request.
//                 let fetchRequest = event.request.clone();
//
//                 return fetch(fetchRequest).then(
//                     function(response) {
//                         // Check if we received a valid response
//                         if(!response || response.status !== 200 || response.type !== 'basic') {
//                             return response;
//                         }
//
//                         // Clone the response.
//                         let responseToCache = response.clone();
//                         caches.open('restaurant-files-v1')
//                             .then(function(cache) {
//                                 cache.put(event.request, responseToCache);
//                             });
//
//                         return response;
//                     }
//                 );
//             })
//     );
// });
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open('restaurant-files-v1').then(function(cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function(response) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {
//                 if (response) {
//                     return response;
//                 }
//                 return fetch(event.request);
//             })
//     )
// });
// code from example wittr tutorial
// let staticCacheName = "restaurant-files-v1";
//
// self.addEventListener('activate', function(event){
//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.filter(function (cacheName) {
//                     return cacheName.startsWith('restaurant-') && cacheName !== staticCacheName;
//                 }).map(function (cacheName) {
//                     return caches.delete(cacheName);
//                 })
//             );
//         })
//     )
// });

