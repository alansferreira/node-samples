app.factory('$httpMark', function($http){
    return {
        getAll: function(){
            return $http.get('/api/mark');
        },
        getModels: function(mark){
            return $http.post('/api/mark/' + mark);
        }
    };
});