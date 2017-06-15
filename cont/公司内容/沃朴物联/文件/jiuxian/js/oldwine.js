$(function(){
	//顶部点击事件
	var open1 = true;
	 $('.cli').click(function(){
    	if(open1){  			
    		$(".nav").show();
    	}else{
   			$(".nav").hide();			
    	}
    	open1 = !open1;
    })
	 //倒计时
	setInterval(function(){
   		var nowtime = new Date();
		var deadline = new Date(2016,9,1);
		var cha = (deadline - nowtime)/1000;
		var d = zero(Math.floor(cha/86400))
		var h = zero(Math.floor(cha%86400/3600));
		var m = zero(Math.floor(cha%86400%3600/60));
		var s = zero(Math.floor(cha%60));
		$(".day1").html(d)
		$(".hour").html(h)
		$(".min").html(m)
		$(".second").html(s)
   },1000);
	function zero(num){
		if(num > 10){
			return num;
		}else{
			return '0'+num;
		}			
	}		
	//获取商品
	$.ajax({
		url:"../json/oldwine.json",
		success:function(data){
			var flo = $(".floor")
			var msg = data.floorCon
			for(var i = 0;i < flo.length;i++){
				var str = '';
				var msg1 = msg[i].contain;
				for(j = 0;j < msg1.length; j++){
					str +='<a class="'+msg1[j].cla+'" dataid="'+msg1[j].id+'" href="detail.html"><img src="'+msg1[j].images+'"/></a>';
				}
				flo.eq(i).find(".con").append(str)
			}	
			$('.con').on("click","a",function(){
				var dataid = $(this).attr("dataid");
				localStorage.setItem("dataid",dataid);
			})
		}
		
	})
	//回到顶部
	$("#footer .ding").click(function(){
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
