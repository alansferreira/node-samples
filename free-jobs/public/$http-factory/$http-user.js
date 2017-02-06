app.factory('$httpUser', function($http){
    return {
        signin: function(email, password){
            return $http.post('/oficioja/api/user/signin', {email: email, password: password});
        }
    };
});