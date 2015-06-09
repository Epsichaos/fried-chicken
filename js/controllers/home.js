// Controller for home.html -> reload waterstatus
/*
function homeCtrl() {
	$(document).ready(function() {
		$.ajaxSetup({ cache: false });
		WaterStatus();
	});
}

function WaterStatus() {
	 $.getJSON("json/home/WaterStatus.json", function(data) {
	 	$('#SpanStatus').remove();
        $('#WaterStatus').append('<span id=\"SpanStatus\" class=\"label label-'+data.status+'\">'+data.status+'</span>');
    })
    	.fail( function() {
        console.error("getJSON failed");
    });
}
*/

// New Controller for homepage
function homeController($http) {
	$.ajaxSetup({ cache: false });
	/*
	$http.get('http://131.251.176.109:8080/consumer/report?type=home')
		.success(function(response) {
			alert('lol');
		});
	*/
	$(document).ready(function() {

		$.getJSON("json/home/WaterStatus.json", function(data) {
		 	$('#SpanStatus').remove();
	        $('#WaterStatus').append('<span id=\"SpanStatus\" class=\"label label-'+data.status+'\">'+data.status+'</span>');
	    })
	    	.fail( function() {
	        console.error("getJSON failed");
	    });

	    // JSONP : get json from a different server require some specific syntax on JSON
	    /*
		$http.jsonp('http://131.251.176.109:8080/consumer')
			.success(function(data) {
				console.log(data);
			});
	
		*/
		/*
		$.ajax({
	        url: 'http://131.251.176.109:8080/consumer',
	        dataType: 'jsonp',
	        jsonp: 'callback',
	        timeout: 50000,
	        success: function(data, status){
	            alert('lol');
	        },
	        error: function(){
	        	alert('error');
	        }
    	});
		*/
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