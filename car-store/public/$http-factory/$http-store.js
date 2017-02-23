app.factory('$httpStore', function($http){
    return {
        avaible_marks: function(filter){
            return $http.get('/api/store/avaible_marks', filter);
        },
        get: function(filter){
            return $http.get('/api/store', filter);
        },
        save: function(car){
            return $http.post('/api/store', car);
        }
    };
});