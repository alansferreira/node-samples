var jobController = app.lazy.controller('jobController', 
    function(
        $scope, $mdToast, $mdDialog, 
        $routeParams, 
        $httpJob
    ) {
    
    $scope.prop = {
        detail: {},
        list: [], 
        config: {
            list:{
                limit: 10, 
                sortBy: 'publishDate', 
                sortByDirection: -1
            }
        }
    };


    $scope.method = {
        list: function(){
            var parms = $scope.prop.config.list;
            $httpJob
            .get(parms.limit, parms.sortBy, parms.sortByDirection)
            .then(function(res){
                $scope.prop.list = res.data;
            })
            .then(function(res){})
        }, 
        save: function(job, $event){
            $httpJob.save(job).then(function(res){
                console.log(res);
            }).then(function(res){
                console.log(res);
            });
        }, 
        edit: function(job, $event){
            
            //$scope.prop.detail = job;

            $mdDialog.show({
                controller: fnEditJobController,
                templateUrl: '/views/job-edit.modal.tmpl.html',
                resolve: {
                    job: function(){
                        return job;
                    }
                },
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: false,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function(job) {
                $scope.status = 'You said the information was "' + job + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });            
        }
    };
    

    $scope.method.list();
    $scope.message = 'Look! I am an about page.';
    $scope.params = $routeParams;
});

var fnEditJobController = function(
        $scope, $mdToast, $mdDialog, 
        $routeParams, job
    ) {
    
    $scope.prop = {
        detail: angular.copy(job, {})
    };

    $scope.method = {
        save: function(){
            $mdDialog.hide($scope.prop.detail);
        },
        cancel: function(){
            $mdDialog.cancel();
        }
    };

};