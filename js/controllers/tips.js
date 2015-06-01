function tipsCtrl() {
	$(document).ready(function() {
    	$.ajaxSetup({ cache: false });
    	chartTips('daily');
    })
}

function chartTips(name) {
    var file_path_bar = 'json/historic/bar_' + name + '.json';
    var file_path_pie = 'json/historic/pie_' + name + '.json';
    var label_graph = name + ' consumption';
    $.getJSON(file_path_bar, function(data_json) {
        if(name=='yearly') {
            var table_labels_bar = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var table_data_bar = [data_json.january, data_json.february, data_json.march, data_json.april, data_json.may, data_json.june, data_json.july, data_json.august, data_json.september, data_json.october, data_json.november, data_json.december];
        }
        if(name=='monthly') {
            var table_labels_bar = ["1", "2", "3", "4", "5", "6", "7", "8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
            var table_data_bar = [data_json.month1, data_json.month2, data_json.month3, data_json.month4, data_json.month5, data_json.month6, data_json.month7, data_json.month8,data_json.month9,data_json.month10,data_json.month11,data_json.month12,data_json.month13,data_json.month14,data_json.month15,data_json.month16,data_json.month17,data_json.month18,data_json.month19,data_json.month20,data_json.month21,data_json.month22,data_json.month23,data_json.month24,data_json.month25,data_json.month26,data_json.month27,data_json.month28,data_json.month29,data_json.month30,data_json.month31];
        }
        if(name=='weekly') {
            var table_labels_bar = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var table_data_bar = [data_json.week1, data_json.week2, data_json.week3, data_json.week4, data_json.week5, data_json.week6, data_json.week7];
        }
        if(name=='daily') {
            var table_labels_bar = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
            var table_data_bar = [data_json.hour0, data_json.hour1, data_json.hour2, data_json.hour3, data_json.hour4, data_json.hour5, data_json.hour6, data_json.hour7, data_json.hour8, data_json.hour9, data_json.hour10, data_json.hour11, data_json.hour12, data_json.hour13, data_json.hour14, data_json.hour15, data_json.hour16, data_json.hour17, data_json.hour18, data_json.hour19, data_json.hour20, data_json.hour21, data_json.hour22, data_json.hour23];
        }
        $('#DivChartBarContainerTips').empty();
        $('#DivChartBarContainerTips').append('<canvas id="barChart" width="600" height="300"></canvas>');
        var BarCanvas = document.getElementById("barChart");
        
        var ctx = BarCanvas.getContext("2d");
        var data = {
            labels: table_labels_bar,
            datasets: [
                {
                    label: label_graph,
                    fillColor: "rgba(82, 84, 213, 0.3)",
                    strokeColor: "rgba(82, 84, 213, 0.6)",
                    pointColor: "rgba(82, 84, 213, 1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: table_data_bar
                }
            ]};
        var myBarChart = new Chart(ctx).Line(data, {
            responsive: true
        });
    })
}