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
    $(document).ready(function() {
        if($state.current.name == 'user.home') {
            $('#pageIndicator').empty();
            $('#pageIndicator').append('Homepage');
        }
        if($state.current.name == 'user.historic') {
            $('#pageIndicator').empty();
            $('#pageIndicator').append('Historic');
        }
        if($state.current.name == 'user.comparisons') {
            $('#pageIndicator').empty();
            $('#pageIndicator').append('Comparisons');
        }
        if($state.current.name == 'user.tips') {
            $('#pageIndicator').empty();
            $('#pageIndicator').append('Tips &#38; Advices');
        }
        if($state.current.name == 'user.social') {
            $('#pageIndicator').empty();
            $('#pageIndicator').append('Social &#38; Watergaming');
        }
        if($state.current.name == 'user.contact') {
            $('#pageIndicator').empty();
            $('#pageIndicator').append('Contact');
        }
    })
});