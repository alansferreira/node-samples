app.factory('$httpUser', function($http){
    var urlBase = '/oficioja/api/job/';
    return {
        save: function(job){
            return $http.post('/oficioja/api/job/', job);
        }, 
        get: function(limit, sortBy){
            return $http.get('/oficioja/api/job/{limit}/{sortBy}', {limit: limit, sortBy: sortBy});
        }

    };
});