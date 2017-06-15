
$(function(){
	$("#main .div1").on("click",".p2",function(){
			window.location.href="address.html"
	})
	$("#main .div2").on("click",".p2",function(){
			window.location.href="send.html"
	})
	$("#main .div3").on("click",".p2",function(){
			window.location.href="ticket.html"
	})
	$("#main .div4").on("click",".p2",function(){
			window.location.href="coupon.html"
	})

})



$(function(){
	if(localStorage["panduan1"]){
			str1=""
		//aaa = eval(localStorage.getItem["xingm"])
		str1 += '<span class="span1">'+localStorage["xingm"]+'</span>'
		str1 += '<span class="span2">'+localStorage["xing"]+'</span>'
		str1 += '<span class="span3">'+localStorage["xin"]+'</span>'
		
		$("#main .div1 .p2").html(str1)

	}

})



$(function(){
	if(localStorage["panduan2"]){
			str2=""
		//aaa = eval(localStorage.getItem["xingm"])
		str2 += '<span class="span1">'+localStorage["send"]+'</span>'	
		$("#main .div2 .p2").html(str2)
	}

})


$(function(){
	if(localStorage["panduan3"]){
		str3=""
		str4 =""
		//aaa = eval(localStorage.getItem["xingm"])
		str3 += '<span class="span1">'+localStorage["head"]+'</span>'	
		str4 += '<span class="span1">'+localStorage["bott"]+'</span>'	
		$("#main .div3 .p2").html(str3)
		$("#main .div3 .p3").html(str4)
	
	}

})

$(function(){
	$("#main .div7 .p1 .span3").html(localStorage["allprice"])
	$("#main .div7 .p2 .span4").html(localStorage["allprice"])
	$("#main .div7 ul li .span5").html(0)
	$("#main .div7 ul li .span6").html(0)
	$("#main .div7 ul li .span7").html(0)
	$("#main .div7 ul li .span8").html(0)
	$("#main .div7 ul li .span9").html(0) 
})





