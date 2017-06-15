$(function(){
	var Gid  = document.getElementById ;
	var showArea = function(){
		Gid('show').innerHTML = "<h3>省" + Gid('s_province').value + " - 市" + 	
		Gid('s_city').value + " - 县/区" + 
		Gid('s_county').value + "</h3>"
	}
	
})	



$(function(){
	
	$("#bottom p").on("click","img",function(){
		
		
	var name =$("#main .div1 .name").val()
	var phone = $("#main .div2 input").val()
	var tele = $("#main .div3 input").val()
	var add = $("#main .div5 input").val()
		
	var lo = localStorage["num"]	
	if(typeof(lo) != "string"){
		num = 0
	}else{
		num = localStorage["num"]
	}
	
	if(name!=""&&phone!=""&&add!=""){
		num++
		localStorage["num"] = num	
		var jsons = {"name":name,"phone":phone,"tele":tele,"add":add};				
		//localStorage.setItem("姓名:"+name+"地址:"+add,JSON.stringify(jsons));
		
		localStorage.setItem("num"+num,JSON.stringify(jsons));
			
			
			
		window.location.href="locals.html"
	}else{
		alert("请输入姓名电话和地址")
	}
		
		

		
		
	})
})






$(function(){
	$("#top").on("click",".i1",function(){
		window.location.href = "clearinghouse.html"
	})
})


