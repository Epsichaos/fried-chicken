'use strict';

//ajax cache
$.ajaxSetup({ cache: false });

// TEST WITH UI ROUTER

// loading of modules
angular.module('WebApp', [
    'ui.router',
    'ngCookies',
    'angular-storage'
])
// menu directive
.directive('appmenu', function(){
    return {
        templateUrl: 'layout/menu.html'
    };
})

// route config
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    var access = routingConfig.accessLevels;

    // Public routes
    $stateProvider
        .state('public', {
            abstract: true,
            template: '<ui-view/>',
            data: {
                access: access.public
            }
        })
        .state('public.404', {
            url: '/404',
            templateUrl: 'partials/404.html'
        })
        .state('public.login', {
            url: '/',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        });
    // User routes
    $stateProvider
        .state('user', {
            abstract: true,
            template: '<ui-view/>',
            data: {
                access: access.user
            }
        })
        .state('user.home', {
            url: '/home',
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .state('user.historic', {
            url: '/historic',
            templateUrl: 'partials/historic.html',
            controller: 'HistoricCtrl'
        })
        .state('user.comparisons', {
            url: '/comparisons',
            templateUrl: 'partials/comparisons.html',
            controller: 'ComparisonCtrl'
        })
        .state('user.tips', {
            url: '/tips',
            templateUrl: 'partials/tips.html', 
            controller: 'TipsCtrl'
        })
        .state('user.social', {
            url: '/social',
            templateUrl: 'partials/social.html',
            controller: 'SocialCtrl'
        })
        .state('user.contact', {
            url: '/contact',
            templateUrl: 'partials/contact.html',
            controller: 'ContactCtrl'
        });

    $urlRouterProvider.otherwise('/');

    // just a test, I think it can be commented or remove
    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
}])

.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        
        if(!('data' in toState) || !('access' in toState.data)){
            $rootScope.error = "Access undefined for this state";
            event.preventDefault();
        }
        else if (!Auth.authorize(toState.data.access)) {
            $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
            event.preventDefault();

            if(fromState.url === '^') {
                if(Auth.isLoggedIn()) {
                    $state.go('user.home');
                } else {
                    $rootScope.error = null;
                    $state.go('public.login');
                }
            }
        }
    });

}]);