<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);
mb_internal_encoding("UTF-8");
$timeout = 10 ;

$tk = isset($_GET['tk']) ? $_GET['tk'] : 0 ;
$q = isset($_GET['q']) ? $_GET['q'] : '' ;
if($tk == 0 || $q == ''){
    exit("0");
}

$url="http://translate.google.cn/translate_a/single?client=t&sl=zh-CN&tl=en&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&source=btn&ssel=0&tsel=0&kc=1&tk={$tk}&q={$q}" ;
$url = "http://translate.google.cn/translate_a/t?client=webapp&sl=zh-CN&tl=en&hl=zh-CN&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&ie=UTF-8&oe=UTF-8&otf=2&ssel=0&tsel=0&kc=1&tk=". $tk ."&q=" . $q ;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25');
curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
$conts = curl_exec($ch);
curl_close($ch);

if(!empty($conts)){
    exit($conts);
}else{
    exit("0");
}

?>