var app = angular.module('WebApp');
/*
CONTROLLER SOCIAL
*/
app.controller('SocialCtrl', function($rootScope, $scope, $location, $window, store, $state, Auth){
    /*
    $(document).ready( function(){
        context var c=document.getElementById("waterGame");
        var ctx=c.getContext("2d");
        ctx.fillRect(0,0,700,400);  
        
        var container = $(c).parent();

        //Run function when browser resizes
        $(window).resize( respondCanvas );

        function respondCanvas(){ 
            c.attr('width', $(window).get(0).innerWidth / 2); //max width
            c.attr('height', $(window).get(0).innerHeight / 2); //max height

            var c=document.getElementById("waterGame");
            var ctx=c.getContext("2d");
            ctx.fillRect(0,0,700,400);
        }

        //Initial call 
        respondCanvas();
    });
    */
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
    }
})
