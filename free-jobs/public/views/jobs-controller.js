app.lazy.controller('jobsController', 
    function(
        $scope, $mdToast,
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
        }
    };
    

    $scope.method.list();
    $scope.message = 'Look! I am an about page.';
    $scope.params = $routeParams;



});
