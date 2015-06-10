function contactCtrl() {
	$(document).ready(function() {
		$.ajaxSetup({ cache: false });
		messageCompanyDisplay();
	})
}

function messageCompanyDisplay() {
/*
	// LOCAL JSON FILE FETCH
	$.getJSON("json/contact/message_from_company.json", function(data_json) {
		$('#messageFromCompany').empty();
		$('#messageFromCompany').append(data_json.message)
	})
*/
	// AJAX JSONP REQUEST
	$.ajax({
		url: 'http://131.251.176.109:8080/consumer/report?type=contact',
		dataType: 'jsonp',
		jsonp: 'callback',
		timeout: 5000,
		success: function(data, status){
			console.log(data);
			$('#messageFromCompany').empty();
			$('#messageFromCompany').append(data.message);
		},
		error: function(){
			console.error("getJSON failed in homeCtrl");
		}
	});
}
