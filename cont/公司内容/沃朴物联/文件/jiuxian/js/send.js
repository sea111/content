
$(function(){
	
	$("#box .header").on("click","img",function(){
		window.location.href = "clearinghouse.html"
	})

	
	$("#box .content .payform").on("click","input",function(){
		//alert()
	var send1 = $(this).parents().find("span").html()
	
	localStorage["send"] = send1
	
	localStorage["panduan2"]=true
	$("#box").on("click",".btn",function(){
		
		window.location.href="clearinghouse.html"
		
	})
	

	
	
	
	})
	
	
	
})
