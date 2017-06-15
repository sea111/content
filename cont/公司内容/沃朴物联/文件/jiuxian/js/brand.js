/*---------------------header---------------------*/
$(function(){
	var open=true;
	$(".rig").click(function(){
		if(open){
			$("#nav1").show()
		}else{
			$("#nav1").hide()
		}
		open=!open
	})
	
})
/*-------------------content-----------------------*/
$(function(){
	$.ajax({
		url:"../json/brand.json",
		async:true,
		success:function(data1){
			var data1 = data1.data1
			var str="";
			for(var i in data1){
				str+="<dl>"
				str+="<dt><a class='btn' goodsid='"+data1[i].id+"' href='detail.html'><img src='"+data1[i].img+"'/></a></dt>"
				str+="<dd><p>"+data1[i].name+"</p></dd>"
				str+='<dd class="dd1"><span>'+data1[i].price+'</span><em>'+data1[i].qu+'</em><a class="gou" href="detail.html">'+data1[i].buy+'</a></dd>'
				str+="</dl>"
			}
			$(".more").html(str)
			locals()
		}
	});
})






$(function(){
	$.ajax({
		url:"../json/brand.json",
		async:true,
		success:function(data2){
			var data2 = data2.data2
			var str="";
			for(var i in data2){
				str+="<dl>"
				str+="<dt><a class='btn' goodsid='"+data2[i].id+"' href='detail.html'><img src='"+data2[i].img+"'/></a></dt>"
				str+="<dd><p>"+data2[i].name+"</p></dd>"
				str+='<dd class="dd1"><span>'+data2[i].price+'</span><em>'+data2[i].qu+'</em><a class="gou" href="detail.html">'+data2[i].buy+'</a></dd>'
				str+="</dl>"
			}
	 		$(".hotM").html(str)
	 		locals()
		}
	});
})




$(function(){
	$.ajax({
		url:"../json/brand.json",
		async:true,
		success:function(data3){
			var data3 = data3.data3
			var str="";
			for(var i in data3){
				str+="<dl>"
				str+="<dt><a class='btn' goodsid='"+data3[i].id+"' href='detail.html'><img src='"+data3[i].img+"'/></a></dt>"
				str+="<dd><p>"+data3[i].name+"</p></dd>"
				str+='<dd class="dd1"><span>'+data3[i].price+'</span><em>'+data3[i].qu+'</em><a class="gou" href="detail.html">'+data3[i].buy+'</a></dd>'
				str+="</dl>"
			}
			$(".discontM").html(str)
			locals()
		}
	});
})
function locals(){
	$(".btn").click(function(){
		var dataid = $(this).attr("goodsid")
		localStorage.setItem("dataid",dataid)
	})
}
/*----------------------footer--------------------*/
$(function(){
	$("#footer .he").click(function(){
		$("html,body").animate({
			"scrollTop":0
		})
	})
	$(".grzx").click(function(){
		var login = localStorage.getItem("login")
		if(login){
			window.location.href = "personcenter.html"
		}else{
			window.location.href = "login.html"
		}
	})
})























