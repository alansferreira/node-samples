app.controller('CarEditController', function($scope, $httpStore, $mdToast){
    $scope.data = {
        car: {}, 
        
        avaible_marks: [], 
        avaible_models: [], 
        selected_mark: {}
    };

    $scope.methods = {};

    $scope.methods.loadMarks = function(){
        $httpStore.avaible_marks().then(function(res){
            $scope.data.avaible_marks = res.data;
        });
    };

    $scope.methods.changeMark = function(){
        $scope.data.avaible_models = $scope.data.selected_mark.models;
        $scope.data.car.mark = $scope.data.selected_mark._id;
    };
    
    $scope.methods.save = function(){
        $httpStore.save($scope.data.car)
        .then(function(res){
            var msg = 'Ok, veículo publicado!';
            if(!res.data._id){
                msg = 'Ops! Aconteceu alguma coisa errada durante a publicação!'
            }

            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .hideDelay(3000)
            );
        });
    };


    $scope.methods.loadMarks();
});