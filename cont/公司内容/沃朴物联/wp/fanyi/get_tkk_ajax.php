<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
mb_internal_encoding("UTF-8");
$timeout = 10 ;
$url = "http://translate.google.cn" ;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
$conts = curl_exec($ch);
curl_close($ch);
if(preg_match("#TKK\=eval\('\(\(function\(\)\{var\s+a\\\\x3d(-?\d+);var\s+b\\\\x3d(-?\d+);return\s+(\d+)\+#isU", $conts, $arr)){
    $tkk = $arr[3] .'.'.($arr[1] + $arr[2]) ;
    exit($tkk) ;
    //var_dump($arr);
}else{
    exit("0");
}

?>