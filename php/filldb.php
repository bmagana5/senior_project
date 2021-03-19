<?php 

die("delete this message before proceeding in the actual source; will not run script otherwise");

session_start();

set_time_limit(300);
require "credentials.php";
require "../connection.php";

$_SESSION['bar'] = 'BULK';
$_SESSION['INSERTUSERS'] = 'BULK';

$filename = "../mockdata/MOCK_DATA.json";

$file_input = fopen($filename, "r") or die("Unable to open file '${filename}'!");
$user_data = fread($file_input, filesize($filename));
fclose($file_input);

// set data to associative array with second param of json_decode
$data_arr = json_decode($user_data, true);

// echo __DIR__;
// echo Connection::testFunction();

foreach ($data_arr as $item) {
    $_SESSION['username'] = $item['username'];
    $_SESSION['full_name'] = $item['full_name'];
    $_SESSION['email'] = $item['email'];

    $obj = new Connection($dbconn);
    $obj = null;
}

session_destroy();

?>