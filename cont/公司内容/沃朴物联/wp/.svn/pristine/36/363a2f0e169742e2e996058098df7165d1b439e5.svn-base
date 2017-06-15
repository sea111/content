		$(function(){
			$.ajax({
				url:"http://192.168.199.182:8082/share/product/productInfo?productId="+getUrlRequest().productId,
				type:"post",
				beforeSend:function(){
					$(".top").hide().siblings('#content').hide().siblings('footer').addClass("hide")
					$(".loading").show()
				},
				success:function(res){
					$(".top").show().siblings('#content').show().siblings('footer').removeClass("hide")
					$(".loading").hide()
					window.productInfo=res.data;
//					console.log(productInfo)
					wpwlDetails.autoPlay();
					wpwlDetails.special();
					wpwlDetails.scroll();
				}
			})
		})
		
		//先设置打点
		$(function(){
			if(!localStorage.getItem('pointDatas')){
				order=0;
				var arr=[];
				localStorage.setItem('pointDatas',JSON.stringify(arr));
			}
		})
		
		function getUrlRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                if (str.indexOf("&") != -1) {
                    strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                } else {
                    theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
                }
            }
            return theRequest;
        }
		
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
						window.location.href = "https://itunes.apple.com/cn/app/id894953874";//跳转到AppStore或者Android应用市场
					} else {
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
				});
				$(".big-swipebox").click(function(){
					
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
					point('0','h5_e011','','',"");
				})
			}

		}
		
		//回到顶部
		$(function(){
			$("#backTop").on("touchend",function(e){
				point('0','h5_e011','','',"");
				myScroll.scrollTo(0,0,2000, IScroll.utils.ease.circular);
			})
		})
		
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
		 
		function point(type,code,startTime,stayTime,param){
			var date=new Date();
			var pointDatas=JSON.parse(localStorage.getItem("pointDatas"));
			order=pointDatas.length;
			if(order==10){
				$.ajax({
					url:"http:192.168.182/wpwl/acPointLog/savePointLog",
					type:"post",
					data:{
						pointDatas:pointDatas
					},
					success:function(){
						pointDatas.splice(0,pointDatas.length)
					}
				})
			}else{
				var	data={
					"acPointLog": {
				    "pointType": type,
				    "pointCode": code,
				    "pointStartTime": startTime,
				    "pointTime": date.getTime(),
				    "stayTime": stayTime,
				    "pointParam": param,
				    "pointOrder": order
				     },
				    "acDevicePositionInfo": {
				        "districtCode": "xxx",
				        "longitude": "xxx",
				        "latitude": "xxx"
				    },
					"deviceUUID": 'deviceArr[2]',
					"sessionId": "xxx"
				}
				pointDatas.push(data)
				localStorage.setItem("pointDatas",JSON.stringify(pointDatas))
			}
		}