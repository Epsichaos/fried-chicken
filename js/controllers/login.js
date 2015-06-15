//var app = angular.module('WebApp', []);

/*
app.controller('formController', function($scope) {
	$scope.reset = function(){
		$scope.login = 'test login';
		$scope.password = 'test password';
	}
	scope.reset();
});
*/
'use strict';

var app = angular.module('WebApp');

app.controller('LoginCtrl', 
	['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth){
		$scope.rememberme = true;
		$scope.login=function() {
			// test
			/*
			console.log('Username:' + $scope.username);
			console.log('Password:' + $scope.password);
			console.log('Remember:' + $scope.rememberme);
			*/
			Auth.login({
				username: $scope.username,
				password: $scope.password,
				rememberme: $scope.rememberme
			},
			// response of the server
			function(res){
				$location.path('/');
			},
			function(err){
				$rootScope.error = 'Failed to login';
			});
		};
	}]);