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
}