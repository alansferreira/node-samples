app.factory('$httpCar', function($http){
    return {
        get: function(filter){
            return $http.get('/api/car', filter);
        },
        save: function(car){
            return $http.post('/api/car', car);
        }
    };
});