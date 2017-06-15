$(function(){
	$("#content .invoice i").on("click",function(){
		$(this).css({"background":"url(../img/orderIcon.png) -597px 8px no-repeat"});
		console.log()
		$(this).parent().siblings(".check").children("i").css({"background":"#fff"});
	})
		$("#top").on("click",".i1",function(){
		window.location.href = "clearinghouse.html"
	})

})


$(function(){	
	$("#content .invoice1").on("click","i",function(){
	var head1 = $(this).parents().find("p").html()	
	localStorage["head"] = head1	
		aaa=1
	})
	$("#content .invoice2").on("click","i",function(){
		//alert()
	var bott1 = $(this).parents().find("p").html()	
	localStorage["bott"] = bott1	
	 bbb=1	
	if(aaa==1&&bbb==1){
			$("#content .confirm").on("click",".yes",function(){		
			window.location.href="clearinghouse.html"
			localStorage["panduan3"] = true
		})
	}	
	})	
})










