app.controller('CarEditController', function($scope, $httpStore, $mdToast, Upload){
    $scope.data = {
        car: {}, 
        files: [], 
        
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
            $scope.data.car = res.data;
       
            if (!$scope.data.files || !$scope.data.files.length) return ;
            
            for (var i = 0; i < $scope.data.files.length; i++) {
                $scope.methods.upload($scope.data.files[i]);
            }
            
        });
    };
    
    $scope.methods.upload = function (file) {
        Upload.upload({
            url: '/api/store/attach/' + $scope.data.car.id,
            data: {file: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.methods.loadMarks();
});