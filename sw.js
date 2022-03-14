//the creation of the app's service worker starts with letting the browser know that the SW needs to be installed
//the install event is what gets triggered first
//the creation of the cache.open function allows the app to return previously used data to the user more quickly
//if the cache doesn't exist prior to user involvement... then it will be created upon request

self.oninstall = function(){
    caches.open('fayePIv1')
    .then(function(cache) {
        cache.addAll([
            '/',
            'index.html'
        ])
        .then(function() {
            console.log('cached!');            
        })
//the catch method makes debugging easier        
        .catch(function(err) {
            console.log('err', err);
        })    
    })
}

self.onactive = function() {
    console.log('activated!');
}
//the user has access to all the available data
//the event respond method gives developers ability to send custom responses back to fetch requests
self.onfetch = function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if(response) {
                return response;    
        } else {
            return fetch(event.request);
        }
    })  
    )
}    


//this service worker addresses the Pinterest case study by providing superior performance
//the application is now able to function offline
//the application can store previously used app data and repeat it back with more efficiency
// the service worker is able to go back and forth between being idle and fetching for data
//dumping unused data helps the SW take advantage of background processing
