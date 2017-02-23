app.controller('CarEditController', function($scope, $httpCar, $httpMark){
    $scope.data = {
        car: {}, 
        marks: []
    };

    $scope.methods = {};

    $scope.methods.loadMarks = function(){
        $httpMark.getAll().then(function(res){
            $scope.data.marks = res.data;
        });
    };
    
    $scope.methods.loadMarks();
});