app.controller('ControllerSignin', function($scope, $httpUser){
    $scope.signin = function(){
        $httpUser.signin($scope.email, $scope.password).then(function(res){
            console.log(res.data);
        });
    }
});