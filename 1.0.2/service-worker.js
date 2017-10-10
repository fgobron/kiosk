// Shared variables
var CURRENT_CACHE = 'kiosk';

// Skip waiting on lifeCycle
this.addEventListener('install', function(event) {
    console.log('install4');
    event.waitUntil(this.skipWaiting());
});

// Auto activation on update
this.addEventListener('activate', function(event) {
    console.log('activated4');
    event.waitUntil(this.clients.claim());
    
    // Clean cache
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if(cacheName != CURRENT_CACHE) {            
            return caches.delete(cacheName);
          }
        })
      );
    });
    
    //Clean old registrations
    var regList = [];
    this.getRegistrations().then(function(registrations) {          
        registrations.forEach(function(w) {
            regList.push(w);
        });          
    });
    console.log(regList);
});

// Fetch Handler
this.addEventListener('fetch', function(event) {
    try {
        // Paris Activities request filter        
        if (event.request.url.indexOf('getBookingParisActivities') > 0) {            
            var lang = event.request.headers.get('lang');
            
            event.respondWith(            
                caches.match(event.request)
                .then(function(response) {
                if (response) {
                    // Cache hit - direct response return                
                    return response;
                }
    
                // Else clone stream before fetch data from network
                var fetchRequest = event.request.clone();
    
                return fetch(fetchRequest).then(function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200) {                    
                        return response;
                    }
    
                    var responseToCache = response.clone();
    
                    // Generic cache of Paris Activities
                    caches.open(CURRENT_CACHE)
                        .then(function(cache) {
                        cache.keys().then(function(cachedRequests) {                        
                            cachedRequests.filter(function (cachedRequest) {                                                   
                                return cachedRequest.url.indexOf('lang=' + lang) > 0;
                            }).map(function(req) {                            
                                cache.delete(req);
                            })
                        }).then(function () {                        
                            cache.put(event.request, responseToCache);
                        });                    
                    });
    
                    return response;
                });
            }));
        }
        
    } catch (e) {
        // Service worker delete cache on error        
        caches.delete(CURRENT_CACHE);
    }
});