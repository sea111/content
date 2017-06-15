/*返回首页*/

/*筛选*/
$("#box .head .chose").on("click",function(){
	$("#box .more").show()
	$("body,html").css("overflow","hidden")
})
$("#box .left_side .more_hide").on("click",function(){
	$("#box .more").hide()
	$(".sort").hide()
	$("body,html").css("overflow","visible")
})
$(".variety>a").click(function(){
	$("body,html").css("overflow","visible")
})
$(".variety .chose_f1").on("click","li",function(){
	//console.log($(this).index())
	$(".sort").show().find(".sort_top").show().siblings("ul").eq($(this).index()).show().siblings("ul").hide()
	//console.log($(this).find("p").html())
	$(".sort .sort_top").find("p").html($(this).find("p").html())
})
$(".sort .sort_top a").click(function(){
	$(".sort").hide()
})


$(".sort .sort_ul1 li").on("click",function(){
	$(".variety .chose_f1 li").eq(0).find("span").html($(this).html())
	$(".sort").hide()
})

$(".sort .sort_ul2 li").on("click",function(){
	$(".variety .chose_f1 li").eq(1).find("span").html($(this).html())
	$(".sort").hide()
})

$(".sort .sort_ul3 li").on("click",function(){
	$(".variety .chose_f1 li").eq(2).find("span").html($(this).html())
	$(".sort").hide()
})

$(".sort .sort_ul4 li").on("click",function(){
	$(".variety .chose_f1 li").eq(3).find("span").html($(this).html())
	$(".sort").hide()
})

$(".sort .sort_ul5 li").on("click",function(){
	$(".variety .chose_f1 li").eq(4).find("span").html($(this).html())
	$(".sort").hide()
})

$(".sort .sort_ul6 li").on("click",function(){
	$(".variety .chose_f1 li").eq(5).find("span").html($(this).html())
	$(".sort").hide()
})

$(".sort .sort_ul7 li").on("click",function(){
	$(".variety .chose_f1 li").eq(6).find("span").html($(this).html())
	$(".sort").hide()
})

var on = true
$(".list li").eq(3).click(function(){
	if(on){
		$(this).find("span").css("background-position","-45px 0")
		on = false
	}else{
		$(this).find("span").css("background-position","-70px 0")
		on = true
	}
})

$(".list").on("click","li",function(){
	$(this).css({"color":"red","background":"#fff"}).siblings().css({"color":"#000","background":"#ccc"})
})

var off = true
$(".list li").eq(1).click(function(){
		$(this).find("span").css("display","block")
	if(off){
		$(this).find("span").css("background-position","0 0")
		off = false
	}else{
		$(this).find("span").css("background-position","-23px 0")
		off = true
	}
})
$(".list li").not($(".list li").eq(1)).click(function(){
	$(".list li").eq(1).find("span").css({"display":"none","background-position":"0 0"})
	off = true
})



$.ajax({
	url:"../json/data.json",
	success:function(data){
		var mag = data.data
		var str = ""
		for(var i in mag){
			str+='<li>'
			str+='<dl>'
			str+='<dt><img dataid="'+mag[i].id+'" src="'+mag[i].img+'"/></dt>'
			str+='<dd class="one">'+mag[i].name+'</dd>'
			str+='<dd class="two">￥'+mag[i].price+'元</dd>'
			str+='<dd class="three">'+mag[i].appraise+'分</dd>'
			str+='<dd class="four">'+mag[i].person+'人评论</dd>'
			str+='</dl>'
			str+='</li>'
		}
		$(".goods .products").append(str)
		$(".goods .products").on("click","li",function(){
			var dataid = $(this).find("img").attr("dataid")
			localStorage.setItem("dataid",dataid)
			window.location.href = "detail.html"
		})
	}
});






































