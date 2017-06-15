$(function(){
	$("#header .menus").on("click",function(){
		$(".list-menu").toggle();
	});
	$("#text").on("focus",function(){
		$(".list-intro").hide();
		$(".search-focus").show();
		$("body").css({"background":"#616161"});
		$("#content").css({"background":"#616161"});		
	});
	$("#content").on("click",function(){
		$(".list-intro").show();
		$(".search-focus").hide();
		$("body").css({"background":"#fff"});
		$("#content").css({"background":"#fff"});
	})
})
