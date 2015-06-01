// Controller for home.html -> reload waterstatus

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