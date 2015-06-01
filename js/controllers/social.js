function socialCtrl() {
	$(document).ready(function() {
    	$.ajaxSetup({ cache: false });
    	progressBarUpdate();
    })
}

function progressBarUpdate() {
	var valueBar = 80;
	$('#progressBar').empty();
	$('#progressBar').append('<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+valueBar+'" aria-valuemin="0" aria-valuemax="100" style="width: '+valueBar+'%"></div>');
}