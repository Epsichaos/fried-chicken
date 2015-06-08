function contactCtrl() {
	$(document).ready(function() {
		$.ajaxSetup({ cache: false });
		messageCompanyDisplay();
	})
}

function messageCompanyDisplay() {
	$.getJSON("json/contact/message_from_company.json", function(data_json) {
		$('#messageFromCompany').empty();
		$('#messageFromCompany').append(data_json.message)
	})

/*
	$.getJSON("http://131.251.176.109:8080/consumer/report?type=contact", function(data) {
		$('#messageFromCompany').empty();
		$('#messageFromCompany').append(data.message);
	})
*/
}
