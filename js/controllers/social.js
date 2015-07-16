var app = angular.module('WebApp');
/*
CONTROLLER SOCIAL
*/
app.controller('SocialCtrl', function($rootScope, $scope, $location, $window, store, $state, Auth){
	$scope.progressBarUpdate = function() {
		var valueBar = 80;
		$('#progressBar').empty();
		$('#progressBar').append('<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+valueBar+'" aria-valuemin="0" aria-valuemax="100" style="width: '+valueBar+'%"></div>');
	}
	$scope.init = function() {
        var token = store.get('jwt');
        var data_message = {"pageName": "social", "jwt": token};
        // COUNT REQUEST
        $.ajax({
            type: 'POST',
            url: 'http://131.251.176.109:8080/consumer/count',
            crossDomain: true,
            data: data_message,
            success: function (data) {
                console.log(data);
            },
            error: function (err) {
                console.log('Error in POST request');
            }
        });
        // 
       	$scope.progressBarUpdate();
	}
})
