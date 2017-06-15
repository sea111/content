<!DOCTYPE HTML>
<html>
<head>
<title>谷歌翻译</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
</head>

<body>
<div id="cntxt">美丽的中国</div><!--待翻译的中文-->
<div id="tkk">tkk: ......</div>
<div id="tks">tk: ......</div>
<div id="entxt"></div>
<script language="javascript" type="text/javascript" src="common.js"></script>
<script language="javascript" type="text/javascript">
var TKK = 0 ;
var tks = 0 ;
var q = $("cntxt").innerHTML;

window.onload = function(){
    getTKK() ;
    var times ;
    var interval = setInterval(function(){
        times += 1 ;
        if(times > 30){
            clearInterval(interval)
        }else{
            if(TKK != 0){
                clearInterval(interval); //取消循环
                tks = tk(q);
                $("tks").innerHTML = "tk: "+tks ;
                getFanYi() ;
             }
        }
    },1000) ;

}

function getTKK(){
  $("entxt").innerHTML = "<font color=\"blue\">正在努力翻译中......</font>" ;
  var ajax=Ajax();
  ajax.get("./get_tkk_ajax.php", function(data){  
      if(data=='0'){
          $("tkk").innerHTML = "<font color=\"red\">没能获得TKK值</font>" ;
      }else{
          $("tkk").innerHTML = "TKK: "+data ;
          TKK = data ;
      }
      //alert(data); //data为从服务器端读取的数据
  });
}

function getFanYi(){
  $("entxt").innerHTML = "<font color=\"blue\">正在努力翻译中......</font>" ;
  var ajax=Ajax();
  ajax.get("./get_fanyi_ajax.php?tk="+tks+"&q="+q, function(data){  
      if(data=='0'){
          $("entxt").innerHTML = "<font color=\"red\">没能获得翻译</font>" ;
      }else{
          $("entxt").innerHTML = "译文: "+data ;
      }
  });
}


/*
var TKK = ((function() {
  var a = 561666268;
  var b = 1526272306;
  return 406398 + '.' + (a + b);
})());
*/
function b(a, b) {
  for (var d = 0; d < b.length - 2; d += 3) {
      var c = b.charAt(d + 2),
          c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
          c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
      a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
  }
  return a
}

function tk(a) {
    for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
        var c = a.charCodeAt(f);
        128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
    }
    a = h;
    for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
    a = b(a, "+-3^+b+-f");
    a ^= Number(e[1]) || 0;
    0 > a && (a = (a & 2147483647) + 2147483648);
    a %= 1E6;
    return a.toString() + "." + (a ^ h)
}

</script>

</body>
</html>