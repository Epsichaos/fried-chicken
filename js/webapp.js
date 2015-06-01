'use strict';

//make all the charts responsive
Chart.defaults.global.responsive = true;

// Declare app level module which depends on views, and components
var app = angular.module('WebApp', ['ngRoute']);
app.config(function($routeProvider){
	$routeProvider
		.when('/', {templateUrl: 'partials/home.html'})
		.when('/historic', {templateUrl: 'partials/historic.html'})
		.when('/comparisons', {templateUrl: 'partials/comparisons.html'})
		.when('/tips', {templateUrl: 'partials/tips.html'})
		.when('/social', {templateUrl: 'partials/social.html'})
		.when('/contact', {templateUrl: 'partials/contact.html'})
		.otherwise({redirectTo: '/'});
});

angular.module('WebApp')
	.directive('appmenu', function(){
		return {
			templateUrl: 'layout/menu.html'
		};
	});

