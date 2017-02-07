var leftCtrl = app.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
	$scope.groups = [
		{
			label: "Gerenciamento",
			items: [
				{label: "Vagas", url: '/#/jobs', icon:'notifications_active'    , badge: 250}, 
				]
		}, 
		{
			label: "Cadastros",
			items: [
					{label: "EPI´s", url: '/admin/epi', icon:'verified_user', badge: null, }, 
					{label: "Ambientes", url: '/admin/ambiente', icon:'place', badge: null, }, 
					{label: "Funcionário", url: '/admin/funcionario', icon:'person', badge: null, }
				]
		}, 
	];
	 
	$scope.isActiveMenu = function(item){
		return window.location.href.toLowerCase().endsWith(item.url.toLowerCase());
	};
	
	$scope.open = function(item){
		window.open(item.url, '_self');
	};
	
	$scope.close = function() {
		$mdSidenav('left').close().then(function() {
			$log.debug("close LEFT is done");
		});
	};
});
 