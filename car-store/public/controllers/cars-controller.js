app.controller('CarController', function($scope, $httpCar){
    $scope.data = {
        car: {}, 
        filter: {}, list: [], 
        marks: [
            'Citroen', 'Renault', 'Fiat', 'Volkswagen'
        ]
    };
    $scope.methods = {};

    $scope.methods.list = function(){
        $httpCar.get($scope.data.filter).then(function(res){
            $scope.data.list = res.data;
        });
    };
    
    $scope.methods.list();
});