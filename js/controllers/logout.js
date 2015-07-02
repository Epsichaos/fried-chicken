'use strict';

angular.module('WebApp')
.controller('LogoutCtrl', function($rootScope, $scope, $state, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.logout = function() {
        Auth.logout(function() {
            $state.go('public.login');
        }, function() {
            $rootScope.error = "Failed to logout";
        });
    };
});