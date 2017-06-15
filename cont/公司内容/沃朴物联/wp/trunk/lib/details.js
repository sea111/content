//		var items=JSON.parse(localStorage.getItem("data"));
		//ajax请求
		$(function(){
			var block=$(".block");
			var loading=$(".loading");
			var footer=$("footer");
			$.ajax({
				url:"JSON/productInfo.json",
				timeout:2000,
				beforeSend:function(){
					block.hide();
					footer.addClass("hide")
					loading.show()
				},
				success:function(res){
					block.show();
					footer.removeClass("hide");
					loading.hide();
					window.productInfo=res[0].data;
					wpwlDetails.autoPlay();
					wpwlDetails.paras();
					wpwlDetails.brandShow();
					wpwlDetails.special();
					wpwlDetails.scroll();
					$("#outerLink").click(function(e){
						console.log(this)
						localStorage.setItem("link",JSON.stringify(this.innerHTML));	
						window.location.href="wrapImg.html";
					})
				},
				error:function(jqXHR, textStatus, errorThrown){
		            if(textStatus=="timeout"){
		                alert("加载超时，请重试");
		            }else{
		              	alert(textStatus);
		            }
		        }
			})
		})

		//details中的各种方法
		var wpwlDetails={
			//轮播图部分
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
			paras:function(){
				var params=productInfo.productParams.paramList;
				$("#product_name span").html(productInfo.productDetails.productName).parents('#product_name').siblings('#product_des').html(productInfo.productDetails.featureDesc);
				$(".para_result a").html(productInfo.productParams.standard);
				for(var i=0;i<params.length;i++){
					var ele=$(".para_items").eq(0).clone()
					// ele.css('display','block').children('img').attr('src',productInfo.productDetails.productUrls[i]);
					var ele2=ele.find('.para_name').html(params[i].name).siblings('.para_result');
					
					if(params[i].type==4){
						ele2.find('a').attr("id","outerLink").html(params[i].value).attr("href","javascript:;");
					}else if(params[i].type==3){
						ele2.find('a').html(params[i].value).attr("href","tel:"+params[i].value)
					}
					else ele.find('.para_name').html(params[i].name).siblings('.para_result').find('p').html(params[i].value);
	
					if($(".para_result").eq(i).find('div').get(0).offsetHeight>$(".para_result").eq(i).get(0).offsetHeight){
						var result=$(".para_result");
						result.eq(i).find("div").css("width","250%").addClass('play');
						var autoP=result.eq(i).find("p").css("whiteSpace","nowrap").clone();
						autoP.appendTo(result.eq(i).find("div"));
					}	
					$(".parameters").append(ele);
				}

			},
			brandShow:function(){
				var brandInfo=productInfo.brand;
				$("#brand_img").attr('src',brandInfo.brandIcon);
				$("#brand_name").html(brandInfo.brandName);
			},
			special:function(){
				var spec=productInfo.productSpecList[0].detail;
				var length=spec.length;
				$(".bigImg").attr("src",productInfo.productSpecList[0].bigImg).parents('a').attr('href',productInfo.productSpecList[0].bigImg).addClass("spec-swipebox")
				for(var i=0;i<length;i++){
					var ele=$(".features .special_intro").eq(0).clone();
					ele.find('h4 span').html(spec[i].title)
					ele.find("p").html(spec[i].intro);
					ele.find('img').attr('src',spec[i].smallImg).parents('a').attr("href",spec[i].smallImg).addClass("spec-swipebox");
					ele.css("display","block");
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
			},
			interact:function(data){
				localStorage.setItem("transmitData",JSON.stringify(data))
			}
		}
		
		//点击分享
//		$(function(){
//			$(".share").click(function(){
//				window.location.href="share.html"
//			})
//		})
		
		
		//流畅滑动

		 $(function(){	
		 	myScroll = new IScroll( "#content",{
		 		click:true,
		 		fixedScrollbar:true
		 	});
		 	myScroll.on("scrollEnd",function(e){
		 		if(this.y<-200){
		 			$("#backTop").show()
		 		}else{
		 			$("#backTop").hide()
		 		}
		 		if((this.y <=this.maxScrollY) && (this.pointY <14)){
		 			this.scrollTo(0, this.maxScrollY, 400)
		 		}
		 	})
		 })

		//产品参数部分
		$(function(){
			for(var i=0;i<4;i++){
				var ele=$(".para_name").eq(0).clone()
				ele.css('display','block').children('.para_name').html('');
				$(".parameters").append()
			}
		})

		$(function(){
			$("#backTop").on("touchend",function(e){
				myScroll.scrollTo(0,0,2000, IScroll.utils.ease.circular);
				e.preventDefault()
			})
		})

		//切换玩转和详情
		$(function(){
			var flag=1;
			var detailY=0,playY=0;
			$("#detail_btn").click(function(){
				showDetail()
			})
			$("#play_btn").click(function(){
				showPlay()
			})
			function GetSlideAngle(dx, dy) {  
            	return Math.atan2(dy, dx) * 180 / Math.PI;  
          }  
          //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动  
         	function GetSlideDirection(startX, startY, endX, endY) {  
		        var dy = startY - endY;  
		        var dx = endX - startX;  
		        var result = 0;  
              //如果滑动距离太短  
	            if(Math.abs(dx) < 50 && Math.abs(dy) < 50) {  
	                return result;  
	            }  
            	var angle = GetSlideAngle(dx, dy);  
            	if(angle >= -45 && angle < 45) {  
              		result = 1;  
          		}else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {  
              		result = 2;  
          		}  
             	return result;  
          	}    
   
	          //滑动处理  
          	var startX, startY;  
          	// var oMove=document.getElementsByClassName('move')[0];
          	// console.log(oMove)
         	document.addEventListener('touchstart',function (ev) {  
         		if(ev.target.className=="goods_pic"){
         			return false
         		}
              	startX = ev.touches[0].pageX;  
             	startY = ev.touches[0].pageY;    
         	}, false);  

          	document.addEventListener('touchend',function (ev) {  
              	var endX, endY;  
              	if(ev.target.className=="goods_pic"||ev.target.className=="top"){
         			return false
         		}
              	endX = ev.changedTouches[0].pageX;  
              	endY = ev.changedTouches[0].pageY;  
              	var direction = GetSlideDirection(startX, startY, endX, endY);  
              	switch(direction) {  
                  	case 2:  //左滑
						if($('footer').get(0).className=="hide"){
//							return;
							alert(2)
						}
						else showPlay();
                      	break;  
                  	case 1:  //右滑
						if($('footer').get(0).className==""){
							return;
						}
						else showDetail();
                      break;        
              	}  
          	}, false);
          	function showPlay(){
          		detailY=myScroll.y;
          		$("#play_btn").addClass('selected').siblings('.switch').removeClass('selected');
			  	$(".play_area").show().siblings('.area').hide();
			  	$('footer').removeClass().addClass("hide");
			  	myScroll.refresh();
			  	if(flag){
			  		getData();
			  		flag=0;
			  	}
			  	setTimeout(function(){
			  		myScroll.scrollTo(0,playY,100,IScroll.utils.ease.circular)
			  	},0);
          	}
          	function showDetail(){
          		playY=myScroll.y;	
          		$("#detail_btn").addClass('selected').siblings('.switch').removeClass('selected')
			  	$(".detail_area").show().siblings('.area').hide();
			  	$('footer').removeClass();
			  	myScroll.refresh();
			  	setTimeout(function(){
			  		myScroll.scrollTo(0,detailY,100,IScroll.utils.ease.circular)
			  	},0);
          	}
          	function getData(){
          		$.ajax({
          			url:"JSON/play.json",
          			success:function(res){
          				var data=JSON.parse(res)[4].data.list[0].detail;
          				var imgSrc=JSON.parse(res)[4].data.list[0];
						var length=data.length;
						$(".big_area img").attr("src",imgSrc.bigImg).parents("a").attr("href",imgSrc.bigImg)
						$(".big_title").html(imgSrc.title)
						for(var i=0;i<length;i++){
							var ele=$(".big_area .special_intro").eq(0).clone();
							
							ele.find('h4 span').html(data[i].title);
							ele.find('p').html(data[i].intro);
							ele.find('img').attr('src',data[i].smallImg).parents('a').attr("href",data[i].smallImg).addClass("play-swipebox");
							ele.css("display","block");
							$(".big_area").append(ele);
						}
						setTimeout(function(){
							myScroll.refresh();
						},100)
						$(".play-swipebox").swipebox();
          			}
          		})
          	}
		})

		//进入公司页面
		$(function(){
			$(".brand").on("click",function(e){
				localStorage.setItem('brand',JSON.stringify(productInfo.brand));
				window.location.href="company.html";
				e.preventDefault();
	//			pushPoint()
			})

		})
		
		//收藏部分
		$(function(){
			$(".like").click(function(){
				console.log(this.className)
				if(this.className=="like bg-icon"){
//					$.ajax({
//						url:"http://192.168.199.182:9992/wpwl/member/addStore",
//						data:{
//							id:"",
//							productId:"",
//						},
//						dataType:"jsonp",
//						success:function(){
//							$(".like").toggleClass('liked')
//						}
//					})
					$(".like").toggleClass('liked');
//					pushPoint()
				}
				else{
//					$.ajax({
//						url:"http://192.168.199.182:9992/wpwl/member/deleteStore",
//						data:{
//							id:"",
//							productId:""
//						},
//						dataType:"jsonp",
//						success:function(){
//							$(".like").toggleClass('liked')
//						}
//					})
//					pushPoint()
					$(".like").toggleClass('liked')
				}
			})
		})
		// $.ajax({
		// 	url:"http://192.168.199.182:9992/wpwl/product/getPlay",
		// 	type:"POST",
		// 	data:{
		// 		versionId:"26",
		// 		id:2
		// 	},
		// 	dataType:"json",
		// 	success:function(res){
		// 		console.log(1)
		// 		console.log(res.data);
		// 	},
		// 	error:function(res){
		// 		console.log(2);
		// 		console.log(res);

		// 	}
		// })
		
		//咨询部分
		$(function(){
			$("#consultant").on("click",function(e){
				$(".cst_item").toggleClass("ani");	
				$("#consultant i").toggleClass("drop");
				$(".cst_area").toggleClass("myShow")
				e.preventDefault()
			})			
		}) 

		$("#back").click(function(){
			window.location.href="index.html";
		})

		//与原生交互部分
		$(function(){
			//分享
			var islogin=0;
			$(".share").click(function(){
				//原生分享组件
				//WPBridge.callMethod('JsInvokeJavaScope','',{},)
				window.location.href="share.html";
//				pushPoint()
			})
			
			$(".nearby_shop").click(function(){
				//WPBridge.callMethod('JsInvokeJavaScope','',{},)
			})
			
			$("#cst_btn").click(function(){
				//调用原生方法
				if(islogin){
					//咨询页面
					//WPBridge.callMethod('JsInvokeJavaScope','',{},)
				}else{
					//显示未登录,跳转到登陆界面
					//WPBridge.callMethod('JsInvokeJavaScope','',{},function(){})
					alert("未登录");
				}
			})
		})
		
		//查看更多
		$(function(){
			$("#watchMore").click(function(){
				$.ajax({
					url:"http://192.168.199.182:9992/wpwl/message/listConsultByPage",
					data:{
						"userId":"",
						"productId":"",
						"pageIndex":"",
						"pageSize":""
					},
					success:function(res){
						
					}
				})
				window.location.href="consult.html"
			})
		})
			
		function pushPoint(type,name,code,startTime,pointTime,stayTime,param){
			var datas={
						"acPointLog": {
					    "pointType": "0",
					    "pointName": "xxx",
					    "pointCode": "xxx",
					    "pointStartTime": "xxx",
					    "pointTime": "",
					    "stayTime": "xxx",
					    "pointParam": "xxx",
					    "pointOrder": "xxx"
					     },
					    "acDevicePositionInfo": {
					        "districtCode": "xxx",
					        "longitude": "xxx",
					        "latitude": "xxx"
					    },
						"deviceUUID": "xxx",
						"sessionId": "xxx"
				}
			var pointDatas=JSON.parse(localStorage.getItem("pointDatas"));
			pointDatas.push(datas)
			localStorage.setItem("pointDatas",JSON.stringify(pointDatas))
			
		}