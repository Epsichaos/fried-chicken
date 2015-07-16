var app = angular.module('WebApp');
app.controller('HistoricCtrl', function($rootScope, $scope, $location, $window, store, $state, Auth){
    $.ajaxSetup({ cache: false });
    $scope.chart = function(name) {
            // TOKEN
            var token = store.get('jwt');
            // AJAX JSONP REQUEST
            var time;
            if(name=='yearly') {
                time='year';
            }
            if(name=='monthly') {
                time='month';
            }
            if(name=='weekly') {
                time='week';
            }
            if(name=='daily') {
                time='day';
            }
            var file_path_bar = 'http://131.251.176.109:8080/consumer/report?type=historic&graphType=barChart&time=' + time + '&jwt=' + token;
            var file_path_pie = 'http://131.251.176.109:8080/consumer/report?type=historic&graphType=pieChart&time=' + time + '&jwt=' + token;
            var label_graph = name + ' consumption';
            $.ajax({
                url: file_path_bar,
                dataType: 'jsonp',
                jsonp: 'callback',
                timeout: 5000,
                success: function(data_json, status){
                    console.log(data_json);
                    if(data_json.access=='granted') {
                        $('#DivChartBarContainer').empty();
                        $('#DivChartBarContainer').append('<canvas id="barChart" width="600" height="300"></canvas>');

                        if(name=='yearly') {
                            //setButtonHistoric(name);
                            var table_labels_bar = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                            var table_data_bar = [data_json.january, data_json.february, data_json.march, data_json.april, data_json.may, data_json.june, data_json.july, data_json.august, data_json.september, data_json.october, data_json.november, data_json.december];
                        }
                        if(name=='monthly') {
                            //setButtonHistoric(name);
                            var table_labels_bar = ["1", "2", "3", "4", "5", "6", "7", "8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
                            var table_data_bar = [data_json.month1, data_json.month2, data_json.month3, data_json.month4, data_json.month5, data_json.month6, data_json.month7, data_json.month8,data_json.month9,data_json.month10,data_json.month11,data_json.month12,data_json.month13,data_json.month14,data_json.month15,data_json.month16,data_json.month17,data_json.month18,data_json.month19,data_json.month20,data_json.month21,data_json.month22,data_json.month23,data_json.month24,data_json.month25,data_json.month26,data_json.month27,data_json.month28,data_json.month29,data_json.month30,data_json.month31];
                        }
                        if(name=='weekly') {
                            //setButtonHistoric(name);
                            var table_labels_bar = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                            var table_data_bar = [data_json.week1, data_json.week2, data_json.week3, data_json.week4, data_json.week5, data_json.week6, data_json.week7];
                        }
                        if(name=='daily') {
                            //setButtonHistoric(name);
                            var table_labels_bar = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
                            var table_data_bar = [data_json.hour0, data_json.hour1, data_json.hour2, data_json.hour3, data_json.hour4, data_json.hour5, data_json.hour6, data_json.hour7, data_json.hour8, data_json.hour9, data_json.hour10, data_json.hour11, data_json.hour12, data_json.hour13, data_json.hour14, data_json.hour15, data_json.hour16, data_json.hour17, data_json.hour18, data_json.hour19, data_json.hour20, data_json.hour21, data_json.hour22, data_json.hour23];
                        }

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
                    }
                    // errors
                    // wrong signature token detected
                    else if(data_json.exception=='signature') {
                        bootbox.alert("Wrong token signature !");
                        Auth.logout(function() {
                            $state.go('public.login');
                        });
                    }
                    // token expired
                    else if(data_json.exception=='time') {
                        bootbox.alert("Expired token !");
                        Auth.logout(function() {
                            $state.go('public.login');
                        });
                    }
                    // unsupported token
                    else if(data_json.exception=='unsupported') {
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
                    console.error("getJSON failed in bar/line chart generation, in historicCtrl");
                }
            });
            $.ajax({
                url: file_path_pie,
                dataType: 'jsonp',
                jsonp: 'callback',
                timeout: 5000,
                success: function(data_json, status){
                    console.log(data_json);
                    if(data_json.access=='granted') {
                        $('#DivChartPieContainer').empty();
                        $('#DivChartPieContainer').append('<canvas id="pieChart" width="400" height="300"></canvas>');
                        var PieCanvas = document.getElementById("pieChart");
                        var ctx2 = PieCanvas.getContext("2d");
                        var data2 = [
                                {
                                    value: data_json.toilet,
                                    color:"#F7464A",
                                    highlight: "#FF5A5E",
                                    label: "Toilet"
                                },
                                {
                                    value: data_json.dishwasher,
                                    color: "#FDB45C",
                                    highlight: "#FFC870",
                                    label: "Dishwasher",
                                    labelColor : 'white'
                                },
                                {
                                    value: data_json.clotheswasher,
                                    color: "#46BFBD",
                                    highlight: "#5AD3D1",
                                    label: "Clothes Washer"
                                },
                                {
                                    value: data_json.faucet,
                                    color: "#F17CB0",
                                    highlight: "#F7B1D0",
                                    label: "Faucet"
                                },
                                {
                                    value: data_json.shower,
                                    color: "#B2912F",
                                    highlight: "#B2A72F",
                                    label: "Shower"
                                },
                                {
                                    value: data_json.bath,
                                    color: "#B276B2",
                                    highlight: "#CEA8CE",
                                    label: "Bath"
                                },
                                {
                                    value: data_json.leaks,
                                    color: "#5DA5DA",
                                    highlight: "#ADD1EC",
                                    label: "Leaks"
                                },
                                {
                                    value: data_json.others,
                                    color: "#4D4D4D",
                                    highlight: "#888888",
                                    label: "Others"
                                }
                            ]
                        var myPieChart = new Chart(ctx2).Pie(data2, {
                           responsive: true,
                            legendTemplate : "<div class=\"col-md-6\"><ul style=\"list-style-type: none;\" class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length-4; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"> &nbsp; &nbsp; </span>&nbsp;<%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul></div><div class=\"col-md-6\"><ul style=\"list-style-type: none;\" class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=segments.length-4; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"> &nbsp; &nbsp; </span>&nbsp;<%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul></div>"
                        });
                        myPieChart.generateLegend();
                        document.getElementById('pie_legend').innerHTML = myPieChart.generateLegend();
                    }
                    // errors
                    // wrong signature token detected
                    else if(data_json.exception=='signature') {
                        //alert('Wrong token signature !');
                        Auth.logout(function() {
                            $state.go('public.login');
                        });
                    }
                    // token expired
                    else if(data_json.exception=='time') {
                        //alert('Expired token !');
                        Auth.logout(function() {
                            $state.go('public.login');
                        });
                    }
                    // unsupported token
                    else if(data_json.exception=='unsupported') {
                        //alert('Unsupported token !');
                        Auth.logout(function() {
                            $state.go('public.login');
                        });
                    }
                    // unknown error
                    else {
                        //alert('Unknown error !');
                        Auth.logout(function() {
                            $state.go('public.login');
                        });
                    }
                },
                error: function(){
                    console.error("getJSON failed in pie chart generation, in historicCtrl");
                }
            });
    }
    $scope.init = function() {
        var token = store.get('jwt');
        var data_message = {"pageName": "historic", "jwt": token};
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
        // LOAD CHARTS
        $scope.chart('daily');
    }
})