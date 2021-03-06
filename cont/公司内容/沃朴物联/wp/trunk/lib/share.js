		$(function(){
			$.ajax({
				url:"JSON/productInfo.json",
				beforeSend:function(){
					$(".top").hide().siblings('#content').hide().siblings('footer').addClass("hide")
					$(".loading").show()
				},
				success:function(res){
					$(".top").show().siblings('#content').show().siblings('footer').removeClass("hide")
					$(".loading").hide()
					window.productInfo=res[0].data;
//					console.log(productInfo)
					wpwlDetails.autoPlay();
					wpwlDetails.special();
					wpwlDetails.scroll();
				}
			})
		})
		
		$("#close").click(function(){
			$("#top").hide();
			$("#content").css("paddingTop","0rem")
		})
		
//	    document.getElementById('download').onclick = function(e){  
//	        // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为  
//	        // 否则打开a标签的href链接  
//	        var ifr = document.createElement('iframe');  
//	        ifr.src = 'com.baidu.tieba://';  
//	        ifr.style.display = 'none';  
//	        document.body.appendChild(ifr);  
//	        window.setTimeout(function(){  
//	            document.body.removeChild(ifr);  
//	        },3000)  
//	    }; 
	    
			function checkIsAppleDevice() {
				var u = navigator.userAgent, app = navigator.appVersion;
		         var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		         var iPad = u.indexOf('iPad') > -1;
		         var iPhone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1;
		         if (ios || iPad || iPhone) {
		             return true;
		         } else {
		             return false;
		         }
		     }
				
				//js判断是否为Android设备
				function checkIsAndroidDevice(){
					var u = navigator.userAgent.toLowerCase();
					if (/android/.test(u)){
						return true;
					}else{
						return false;
					}
				}
				$("#download").click(function(){
					if (checkIsAppleDevice()) {
						alert(6)
						window.location.href = "https://itunes.apple.com/cn/app/id894953874";//跳转到AppStore或者Android应用市场
					} else {
						alert(8)
						window.location.href = "http://android.myapp.com/myapp/detail.htm?apkName=com.sunskyjun.fwproject";//打开apk
					}
				})
				
				


		var wpwlDetails={
			//轮播图部
			autoPlay:function(){
				var bigImgUrl=productInfo.productDetails.productUrls;
				for(var i=0;i<bigImgUrl.length;i++){
					var ele=$(".swiper-slide").eq(0).clone()
					ele.css('display','block').find('img').attr('src',bigImgUrl[i]).parents('a').attr("href",bigImgUrl[i]).addClass('big-swipebox');
					$(".swiper-wrapper").append(ele);
				}
				$(".big-swipebox").swipebox()
				mySwiper = new Swiper ('.swiper-container', {
						autoplay : 2000,
						pagination: '.swiper-pagination',
						autoplayDisableOnInteraction:false,
					})
			},
			special:function(){
				var spec=productInfo.productSpecList[0].detail;
				// console.log(spec[0].detail)
				var length=spec.length;
				$("#product_name span").html(productInfo.productDetails.productName).parents('#product_name').siblings('#product_des').html(productInfo.productDetails.featureDesc);
				$(".bigImg").attr("src",productInfo.productSpecList[0].bigImg).parents('a').attr('href',productInfo.productSpecList[0].bigImg).addClass("spec-swipebox")
				for(var i=0;i<length;i++){
					var ele=$(".features .special_intro").eq(0).clone();
					ele.css("display","block");
					ele.find('h4 span').html(spec[i].title)
					ele.find("p").html(spec[i].intro);
					ele.find('img').attr('src',spec[i].smallImg).parents('a').attr("href",spec[i].smallImg).addClass("spec-swipebox");
					$(".features").append(ele);
				}
				$(".spec-swipebox").swipebox();
			},
			scroll:function(){
				myScroll.refresh();
			},
			dot:function(){
				//打点统计
				$(".spec-swipebox").click(function(){
					
				})
			}

		}
		
		//点击图片放大
		
		
		//流畅滑动

		 $(function(){	
		 	myScroll = new IScroll( "#content",{
		 		click:true,
		 		vScrollbar:false
		 	});
		 	myScroll.on("scrollEnd",function(e){
		 		if(this.y<-200){
		 			$("#backTop").show()
		 		}else{
		 			$("#backTop").hide()
		 		}
		 	})
		 })