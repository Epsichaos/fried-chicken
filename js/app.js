'use strict';

//ajax cache
$.ajaxSetup({ cache: false });

// declare modules
angular.module('Authentication', []);

angular.module('WebApp', [
    'Authentication',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'partials/login.html'
        })

        .when('/', {
            templateUrl: 'partials/home.html'
        })

        .when('/historic', {
            templateUrl: 'partials/historic.html'
        })

        .when('/comparisons', {
            templateUrl: 'partials/comparisons.html'  
        })

        .when('/tips', {
            templateUrl: 'partials/tips.html'
        })

        .when('/social', {
            templateUrl: 'partials/social.html'
        })

        .when('/contact', {
            templateUrl: 'partials/contact.html'
        })

        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);

angular.module('WebApp')
    .directive('appmenu', function(){
        return {
            templateUrl: 'layout/menu.html'
        };
    });
