
var app = angular.module('WebApp');
/*
CONTROLLER CONTACT
*/
app.controller('ContactCtrl', function($rootScope, $scope, $location, $window, store, $state, Auth){
	$.ajaxSetup({ cache: false });
    // get the token
	var token = store.get('jwt');
    // Scope Init
    $scope.init = function() {
        var token = store.get('jwt');
        var data_message = {"pageName": "contact", "jwt": token};
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
        // GET the message from the company
        $.ajax({
            // include the token in the URL
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
    }
    // Scope Function: if NoWater
    $scope.modalWarningNoWater = function() {

        var data_message = {"type": "nowater", "jwt": token};
        $.ajax({
            type: 'POST',
            url: 'http://131.251.176.109:8080/consumer/message',
            crossDomain: true,
            data: data_message,
            success: function (data) {
                if(data.access == 'granted') {
                    console.log(data);
                    bootbox.alert("Message sent !");
                }
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
            error: function (err) {
                console.log('Error in POST request');
            }
        });
    }
    // Scope Function: Discolored
    $scope.modalWarningColor = function() {
        var data_message = {"type": "discolored", "jwt": token};
        $.ajax({
            type: 'POST',
            url: 'http://131.251.176.109:8080/consumer/message',
            crossDomain: true,
            data: data_message,
            success: function (data) {
                if(data.access == 'granted') {
                    console.log(data);
                    bootbox.alert("Message sent !");
                }
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
            error: function (err) {
                console.log('Error in POST login request');
            }
        });
    }
    // Scope Function: Warning Message
    $scope.modalWarningMessage = function() {
        $scope.jwt = token;
        // CAPTCHA WRONG
        if($scope.captcha != '4') {
            bootbox.alert("Wrong or empty captcha. You must write a single number in answer, just to prouve you are an human.");
        }
        // CAPTCHA CORRECT
        else {
            // MESSAGE EMPTY
            //console.log($scope.message);
            if($scope.message == undefined) {
                bootbox.alert("Message cannot be empty !");
            }
            // MESSAGE OKAY -> we can post
            else {
                var data_message = {"type": "other", "message": $scope.message, "jwt": token};
                $.ajax({
                    type: 'POST',
                    url: 'http://131.251.176.109:8080/consumer/message',
                    crossDomain: true,
                    data: data_message,
                    success: function (data) {
                        if(data.access == 'granted') {
                            console.log(data);
                            bootbox.alert("Message sent !");
                        }
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
                    error: function (err) {
                        console.log('Error in POST login request');
                    }
                });
                $scope.message = '';
                $scope.jwt = '';
                $scope.captcha = '';
            }
        }
    }
})
