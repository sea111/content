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
	function oTime(time1,ele,ele1){
		var timer = null;
		var nowtime = new Date();
		var nowh = nowtime.getHours();
		//var nowm = nowtime.getMinutes();
		//var nows = nowtime.getSeconds();
		if(nowh > time1){	
			var h1 = time1 - nowh;
			console.log(nowh);
			console.log(1111)
			var h = 24 + h1;
			var m = 59;
			var s = 59; 
			ele.find(".start").html("距结束")
			ele1.html('<i class="i1"></i><i class="i2"></i><b class="b1">抢购中</b>')
		}else{
			var h1 = time1 - nowh;
			console.log(222)
			var h = h1;
			var m = 59;
			var s = 59; 
			ele.find(".start").html("距开始")
			ele1.html('<i class="i2"></i><b class="b1">秒拍预告</b>')
		}
		clearInterval(timer);
		
		timer = setInterval(function(){
			//s = m - nows;
			s--;
			if(s < 0){
				s = 59;
				m--;
				if(m < 0){
					m = 59;
					h--;
				}
			}
		
		ele.find(".hour").html(zero(h));
		ele.find(".min").html(zero(m));
		ele.find(".second").html(zero(s));
		
		},1000);			
	};	
	function zero(num){
		if(num > 9){
			return num;
		}else{
			return '0'+num;
		}			
	}
	//选项卡
	miaosha()
	function miaosha(){
		var ind = 0;
		var tabs = $(".tab")
		ajax()
		function ajax(){
			$.ajax({
			url:"../json/miaosha.json",
			success:function(data){
				var msg1 = data.con[ind]
				var str = '';
				for(var j in msg1){
					str +='<dl>'
					str +='<dt class="l"><a href="detail.html"><img dataid="'+msg1[j].id+'" src="'+msg1[j].img+'"/></a></dt>'
					str +='<dd class="l">'
					str +='<h4>'+msg1[j].name+'</h4>'
					str +='<p class="names">'+msg1[j].name1+'</p>'
					str +='<p class="price">秒拍价：￥<span>'+msg1[j].price+'</span></p>'
					str +='<div class="sell">'
					str +='<b>已售60%</b>'
					str +='<div class="big">'			
					str +='<div class="small"></div></div>'
					str +='<div class="btn"><a style="color:#fff;" href="detail.html">去抢购</a></div></div>'
					str +='</dd>'
					str +='</dl>'			
				}
				tabs.eq(ind).append(str)
			}	
		})
		}
		oTime(7,$(".main .times").eq(0),$(".qiang").eq(0));
		oTime(10,$(".main .times").eq(1),$(".qiang").eq(1));
		oTime(15,$(".main .times").eq(2),$(".qiang").eq(2));
		oTime(19,$(".main .times").eq(3),$(".qiang").eq(3));
		$(".clocks").on("click","li",function(){
			ajax();			
			ind = $(this).index()	
			var times = $("span.chang").innerHTML;
			$(this).addClass('cur').siblings().removeClass("cur");
			$(this).parents("#content").find(".main").eq(ind).show().siblings().not("ul").hide()
		})
		tabs.on("click","dt a img",function(){
			var dataid = $(this).attr("dataid");
			localStorage.setItem("dataid",dataid);
		})
	}
	$(".grzx").click(function(){
		var login = localStorage.getItem("login")
		if(login){
			window.location.href = "personcenter.html"
		}else{
			window.location.href = "login.html"
		}
	})
})