// New Controller for homepage

var app = angular.module('WebApp');
app.controller('HomeCtrl', function($rootScope, $scope, $location, $window, store, $state, Auth){

	$.ajaxSetup({ cache: false });
    /*
    /!\ BUG: This document.ready attribute seems to be fired twice. That's why each function in it
                will be fired twice. Be careful for the counting function, because it will count each visit
                as 2 visits for each consumer... I do not know what create this bug and how to fix it. 
    */
    $scope.init = function() {
        // get the token and remove the quotes
        var token = store.get('jwt');
        // ajax request for counting the page visit
        var data_message = {"pageName": "home", "jwt": token};
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
                console.error("getJSON failed for WaterStatus data");
            }
        });
    }
})