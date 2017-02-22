app.controller('CarController', function($scope, $httpCar){
    $scope.data = {filter: {}, list: []};
    $scope.methods = {};

    $scope.methods.list = function(){
        $httpCar.get($scope.data.filter).then(function(res){
            $scope.data.list = res.data;
        });
    };
    
    $scope.methods.list();
});