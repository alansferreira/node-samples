app.factory('$httpUser', function($http){
    return {
        signin: function(email, password){
            return $http.post('/myapp/api/user/signin', {email: email, password: password});
        }
    };
});