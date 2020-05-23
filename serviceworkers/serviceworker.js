// serviceworker.js
// Listen for every event!!

// Cache API stuff
const version = 'V0.05';
const staticCacheName = version + 'staticfiles';
const imageCacheName = 'images';
const pagesCacheName = 'pages';

const cacheList = [
    staticCacheName,
    imageCacheName,
    pagesCacheName
];

// Utility functions
function trimCache(cacheName, maxItems) {
    cacheName.open(cache => {
        cache.keys()
            .then(items => {
                if (items.length > maxItems) {
                    cache.delete(items[0])
                        .then(trimCache(cacheName, maxItems));
                }
            });
    });
}

function stashInCache(request, cacheName) {
    // Fetch the file
    fetch(request)
        .then(responseFromFetch => {
            // Open the cache
            caches.open(cacheName)
                .then(theCache => {
                    // Put the file into the cache
                    return theCache.put(request, responseFromFetch);
                });
        });
}

// Install
// Make sure 'install' event listener populates cache
addEventListener('install', event => {
    skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
        .then(staticCache => {
            // Nice-to-have cached first
            staticCache.addAll([
                '/404.html',
                '/offline.html',
                '/fallback.svg'
            ]);
            // Now must-have cached next
            return staticCache.addAll([
                'styles.css'
            ]);

        })
    );
    console.log('The service worker is installing ....');
});

// Activation
addEventListener('activate', activateEvent => {
    // This the best time to delete no longer needed caches
    // use a waitUntil construct to handle this as for 
    // install event 
    activateEvent.waitUntil(
        // Clean-up code inserted here
        // get hold of all your defined caches
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                // asynch code goes here
                cacheNames.map(cacheName => {
                    if (!cacheList.includes(cacheName)) {
                        // This cache needs to go!
                        // Use a return statement as this is happening inside a Promise
                        // which allows the promise to be fulfilled
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            // Make sure thast your new
            return clients.claim();
        })
    );
    console.log('The service worker is activated ....');
});

// Messages
addEventListener('message', messageEvent => {
    console.log(messageEvent.data);
    if (messageEvent.data == 'clean up caches') {
        trimCache(pagesCacheName, 20);
        trimCache(imageCacheName, 50);
    }
});

// Fetch events - main body of the code

addEventListener('fetch', fetchEvent => {
    const request = fetchEvent.request;
    // Deal with HTML pages and images separately

    // First HTML pages
    if (request.headers.get('Accept').includes('text/html')) {
        // URL pattern matching code
        if (/\/articles\/.+/.test(request.url)) {
            fetchEvent.respondWith(
                // Look in the cache
                caches.match(request)
                .then(responseFromCache => {
                    if (responseFromCache) {
                        // Fetch a fresh version from the network
                        fetchEvent.waitUntil(
                            // Update ther cache

                            fetch(request)
                            .then(responseFromFetch => {
                                caches.open(pagesCacheName)
                                    .then(pagesCache => {
                                        return pagesCache.put(request, responseFromFetch);
                                    });

                            })

                        );
                        return responseFromCache;
                    }
                    // If not in pattern matching code, fetch the page from the network
                    return fetch(request)
                        .then(responseFromFetch => {
                            // Put a copy in the cache
                            const copy = responseFromFetch.clone();
                            fetchEvent.waitUntil(
                                caches.open(pagesCacheName)
                                .then(pagesCache => {
                                    return pagesCache.put(request, copy);
                                })
                            );
                            return responseFromFetch;
                        })
                        .catch(error => {
                            // Otherwise show the fallback poage
                            return caches.match('/offline.html');
                        });
                })
            );
            return;
        }

        // Second, images
        if (request.headers.get('Accept').includes('image')) {
            fetchEvent.respondWith(
                // Look for a chched version of the image
                caches.match(request)
                .then(responseFromCache => {
                    // Need to test for null respknse, which cache
                    // treats as a  fulfillefd promise.
                    // So dont use a catch() as it is no use!
                    if (responseFromCache) {
                        // Fetch and cache a fresh version
                        fetchEvent.waitUntil(
                            fetch(request)
                            .then(responseFromFetch => {
                                caches.open(imageCacheName)
                                    .then(imageCache => {
                                        return imageCache.put(request, responseFromFetch);
                                    });
                            })
                        );
                        return responseFromCache;
                    }
                    return fetch(request)
                        .then(responseFromFetch => {
                            // Put a copy in the cache
                            const copy = responmseFromFetch.clone();
                            fetchEvent.waitUntil(
                                caches.open(imageCacheName)
                                .then(imageCache => {
                                    return imageCache.put(request, copy);
                                })
                            );
                            return responseFromFetch;
                        })
                        .catch(error => {
                            // Otherwise show  a fallback image
                            return caches.match('/fallback.svg');
                        });
                })
            );
            return;
        }
        fetchEvent.respondWith(
            // Look for cached version of the file
            caches.match(request)
            .then(responseFromCache => {
                // Need to test for null respknse, which cache
                // treats as a  fulfillefd promise.
                // So dont use a catch() as it is no use!
                if (responseFromCache) {
                    return responseFromCache;
                }
                return fetch(request);
            })
        );

        //  Send your own response back
        // console.log(request);
        // console.log('The service worker is listening ....');
    }
});