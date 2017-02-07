app.lazy.factory('$httpJob', function($http){
    var urlBase = '/oficioja/api/';
    return {
        save: function(job){
            var url = urlBase + 'job/';
            return $http.post(url, job);
        }, 
        get: function(limit, sortBy, sortByDirection){
            var url = urlBase + 'jobs/{limit}/{sortBy}/{sortByDirection}';
            return $http.get(url.format({limit: limit, sortBy: sortBy, sortByDirection: sortByDirection}));
        }

    };
});