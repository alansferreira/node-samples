app.controller('CarEditController', function($scope, $httpStore, $mdToast, Upload){
    $scope.data = {
        car: {}, 
        files: [], 
        namedProgresses: {}, 
        uploadingIndex: -1,

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
            $scope.data.uploadingIndex = 0;
            //start recursive dequeue uploads
            $scope.methods.upload($scope.data.files[$scope.data.uploadingIndex++]);
            
        });
    };
    
    $scope.methods.upload = function (file) {
        Upload.upload({
            url: '/api/store/attach/' + $scope.data.car._id,
            data: {file: file}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);

            //recursive dequeue uploads
            if (!$scope.data.files || !$scope.data.files.length) return ;
            if($scope.data.uploadingIndex >= $scope.data.files.length ) return;

            $scope.methods.upload($scope.data.files[$scope.data.uploadingIndex++]);

        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            
            $scope.data.namedProgresses[evt.config.data.file.name] = progressPercentage;

            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.methods.loadMarks();
});