
var app = angular.module('WebApp');
app.controller('ContactCtrl', function($rootScope, $scope, $location, $window, store, $state, Auth){
	$.ajaxSetup({ cache: false });
	var token = store.get('jwt');

	$(document).ready(function() {
		$.ajax({
			url: 'http://131.251.176.109:8080/consumer/report?type=contact&jwt=' + token,
			dataType: 'jsonp',
			jsonp: 'callback',
			timeout: 5000,
			success: function(data, status){
				console.log(data);
				if(data.access=='granted') {
					$('#messageFromCompany').empty();
					$('#messageFromCompany').append(data.message);
				}
                    // errors
                    // wrong signature token detected
                    else if(data.exception=='signature') {
                        bootbox.alert("Wrong token signature !");
                        Auth.logout(function() {
                            $state.go('public.login');
                        });
                    }
                    // token expired
                    else if(data.exception=='time') {
                        bootbox.alert("Expired token !");
                        Auth.logout(function() {
                            $state.go('public.login');
                        });
                    }
                    // unsupported token
                    else if(data.exception=='unsupported') {
                        bootbox.alert("Unsupported token !");
                        Auth.logout(function() {
                            $state.go('public.login');
                        });
                    }
                    // unknown error
                    else {
                        bootbox.alert("Unknown error !");
                        Auth.logout(function() {
                            $state.go('public.login');
                        });
                    }
			},
			error: function(){
				console.error("getJSON failed in ContactCtrl");
			}
		});
	})
})
