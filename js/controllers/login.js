'use strict';

var app = angular.module('WebApp');

app.controller('LoginCtrl', 
	['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth){
		$scope.rememberme = true;
		$scope.login=function() {
			// Usage of the factory Auth for login post
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