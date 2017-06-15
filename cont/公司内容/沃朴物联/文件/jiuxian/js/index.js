$(function(){
	swiper()
	function swiper(){
		var mySwiper = new Swiper ('.swiper-container', {
			autoplay : 1000,
			autoplayDisableOnInteraction: false,
			pagination: '.swiper-pagination'
		})
	}
	timer()
	function timer(){
		setInterval(function(){
	   		var nowtime = new Date();
			var deadline = new Date(2016,8,25);
			var cha = (deadline - nowtime)/1000;
			var h = zero(Math.floor(cha/3600));
			var m = zero(Math.floor(cha%86400%3600/60));
			var s = zero(Math.floor(cha%60));
			$(".timer").html('<span>距结束 </span> <i>'+h+'</i>:<i>'+m+'</i>:<i>'+s+'</i>')
	   	},1000);
	   	function zero(num){
			if(num > 9){
				return num;
			}else{
				return '0'+num;
			}			
		}
	}
	var myscroll = new IScroll(".shop",{
			scrollX:true,	
		})

	var boxscroll;
	var num = 0;
	ajax()
	function isco(){
		boxscroll = new IScroll("#box",{
			scrollY:true,
			click:true
		})
	}
	isco()
	function ajax(){
		$.ajax({
			url:"json/index.json",
			success:function(data){
				var mag = data.data[num]
				$.each(mag, function(index) {
					var oLi = $("<li class='l'></li>")
					var oA = $('<a class="btn" goodsid="'+mag[index].id+'" href="javascript:;"></a>')
					var odivpic = $("<div>图片加载中</div>")
					var pic = $("<img class='pic' src='"+mag[index].img+"'/>")
					var name = $("<div class='name'>"+mag[index].name+"</div>")
					var price = $("<div class='price'>"+mag[index].price+"</div>")
					oLi.append(oA)
					oLi.append(odivpic)
					oLi.append(name)
					oLi.append(price)
					pic.on("load",function(){
						boxscroll.refresh()
						odivpic.html(pic)
					})
					$(".goodlist").append(oLi)
				});	
				locals()
			}
		});
	}
	$("#box").on("touchend",function(){
		if(boxscroll.y < -700){
			$("#gotop").show()
		}else{
			$("#gotop").hide()
		}
		if(boxscroll.y > 50){
			boxscroll.refresh()
		}
		if(boxscroll.y < boxscroll.maxScrollY-50){
			num++;
			if(num >= 5){
				num = 0;
			}
			ajax()
		}
	})
	$("#gotop").on("click",function(){
		$("#box").css("transform","translate(0 , 0)")
		$(this).hide()
		window.location.reload()
	})
	function locals(){
		$(".goodlist").on("click",".btn",function(){
			var dataid = $(this).attr("goodsid")
			localStorage.setItem("dataid",dataid)
			window.location.href = "html/detail.html"
		})
	}
	$(".grzx").click(function(){
		var login = localStorage.getItem("login")
		if(login){
			window.location.href = "html/personcenter.html"
		}else{
			window.location.href = "html/login.html"
		}
	})
})






















