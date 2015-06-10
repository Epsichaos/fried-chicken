// New Controller for homepage
function homeCtrl($http) {
	$.ajaxSetup({ cache: false });
	$(document).ready(function() {
/*
		// LOCAL JSON FILE FETCH
		$.getJSON("json/home/WaterStatus.json", function(data) {
		 	$('#SpanStatus').remove();
	        $('#WaterStatus').append('<span id=\"SpanStatus\" class=\"label label-'+data.status+'\">'+data.status+'</span>');
	    })
	    	.fail( function() {
	        console.error("getJSON failed");
	    });
*/		
		// AJAX JSONP REQUEST
		$.ajax({
	        url: 'http://131.251.176.109:8080/consumer/report?type=home',
	        dataType: 'jsonp',
	        jsonp: 'callback',
	        timeout: 5000,
	        success: function(data, status){
	        	console.log(data);
	            $('#SpanStatus').remove();
	        	$('#WaterStatus').append('<span id=\"SpanStatus\" class=\"label label-'+data.status+'\">'+data.status+'</span>');
	        },
	        error: function(){
	        	console.error("getJSON failed in homeCtrl");
	        }
    	});
	});

	// Part not useless if we want to code a reset button
	/*
	$.getJSON("json/home/WaterStatus.json", function(data) {
	 	$('#SpanStatus').remove();
        $('#WaterStatus').append('<span id=\"SpanStatus\" class=\"label label-'+data.status+'\">'+data.status+'</span>');
    })
    	.fail( function() {
        console.error("getJSON failed");
    });
	*/
}