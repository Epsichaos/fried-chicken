// New Controller for homepage

var app = angular.module('WebApp');
app.controller('HomeCtrl', function($rootScope, $scope, $location, $window, store, $state, Auth){

	$.ajaxSetup({ cache: false });
	$(document).ready(function() {
		// get the token and remove the quotes
		var token = localStorage.getItem('jwt');
		token = token.replace('"', '');
		token = token.replace('"', '');
		// ajax request for feching the data
		$.ajax({
			url: 'http://131.251.176.109:8080/consumer/report?type=home&jwt=' + token,
			dataType: 'jsonp',
			jsonp: 'callback',
			timeout: 5000,
			success: function(data, status){
				if(data.access=='granted') {
					console.log(data);
					$('#SpanStatus').remove();
					$('#WaterStatus').append('<span id=\"SpanStatus\" class=\"label label-'+data.status+'\">'+data.status+'</span>');
				}
	        	// errors
	        	// wrong signature token detected
	        	else if(data.exception=='signature') {
	        		alert('Wrong token signature !');
			        Auth.logout(function() {
			            $state.go('public.login');
			        })
	        	}
	        	// token expired
	        	else if(data.exception=='time') {
	        		alert('Expired token !');
			        Auth.logout(function() {
			            $state.go('public.login');
			        })
	        	}
	        	// unsupported token
	        	else if(data.exception=='unsupported') {
	        		alert('Unsupported token !');
			        Auth.logout(function() {
			            $state.go('public.login');
			        })
	        	}
	        	// unknown error
	        	else {
	        		alert('Unknown error !');
			        Auth.logout(function() {
			            $state.go('public.login');
			        })
	        	}
			},
			error: function(){
				console.error("getJSON failed for WaterStatus data");
			}
		});
	});
})