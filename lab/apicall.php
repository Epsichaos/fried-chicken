<?php
// attemps to call the API
// data_to_send : array for the parameters
/*
$data_to_send["type"] = contact, home, comparison, historic
$data_to_send["time"] = year, month, week, day or null (don't exsite) if type is home or contact
$data_to_send["graphType"] = old/current/others if type = comparison, pieChart/barChart if type = historic or null 
(don't exist) otherwise

$url = index.php
$data["param"]=> value 

cURL : index.php?param=value
*/


function callAPI($method, $url, $data_to_send) {
	$curl = curl_init();

	// method choice
	if(strcmp($method, 'GET')==0) {
		curl_setopt($curl, CURLOPT_POSTFIELDS, $data_to_send);
		curl_setopt($curl, CURLOPT_URL, $url);
	}

	$result = curl_exec($curl);
    curl_close($curl);

    return $result;
}

$data = array(
	'type' => 'contact'
);
$result = callAPI('GET', 'http://131.251.176.109:8080/consumer/report', $data);
var_dump($result);
?>