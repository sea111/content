		$(function(){
			var date=new Date();
			initialTime=date.getTime();
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
		 
		 //先设置打点
		$(function(){
			if(!localStorage.getItem('pointDatas')){
				order=0;
				var arr=[];
				localStorage.setItem('pointDatas',JSON.stringify(arr));
			}
		})
		
		 function getKey(userFlag){
		 	$.ajax({
				url:'http://192.168.199.182/wpwl/getKey',
				success:function(res){
					key=res.data;
					WPBridge.callMethod("JsInvokeNative","wpEncrypt",{key:key,params:[prtId]},function(msg){parValue=msg.data.result[0]});
					if(userFlag){
						WPBridge.callMethod('JsInvokeNative','wpGetUserId',{},function(msg){
							if(msg.data.result!=''){
								userId=msg.data.result;
								alert(userId)
								WPBridge.callMethod('JsInvokeNative','wpEncrypt',{key:key,params:[userId]},function(msg){window.aesUserId=msg.data.result[0];})	
							}
						})
					}
					localStorage.setItem('key',res.data)
					wpwlDetails.getData(key);	
				}
			})
		 }
		//判断是否从商品列表中进入详情页
		$(function(){
			if(!getUrlRequest().productId){
				window.productInfo=JSON.parse(localStorage.getItem('productDetails'));
				window.key=localStorage.getItem("key");
				window.prtId=productInfo.productDetails.productId;
				WPBridge.callMethod("JsInvokeNative","wpEncrypt",{key:key,params:[prtId]},function(msg){parValue=msg.data.result[0]});
				wpwlDetails.autoPlay();
				wpwlDetails.paras();
				wpwlDetails.brandShow();
				wpwlDetails.special();
				$(".block").show();
				$("footer").removeClass("hide");
				$(".loading").hide();
				wpwlDetails.scroll();
				wpwlDetails.finish();
			}else {
				window.prtId=getUrlRequest().productId;
				getKey();
			}
		})
		
		//details中的各种方法
		var wpwlDetails={
			getData:function(value){
				var block=$(".block");
				var loading=$(".loading");
				var footer=$("footer");
				window.prtId=getUrlRequest().productId;
//				var keyValue=localStorage.getItem('key');
				WPBridge.callMethod("JsInvokeNative","wpEncrypt",{key:value,params:[prtId]},function(msg){parValue=msg.data.result[0];
					$.ajax({
						url:"http://192.168.199.182/wpwl/product/productInfo",
						type:"post",
						data:{
							productId:parValue
						},
						timeout:4000,
						beforeSend:function(){
							loading.show()
						},
						success:function(res){
//							alert(JSON.stringify(res))
							if(res.errMsg=="AES加密解密失败"){
								getKey();
								wpwlDetails.getData()
							}else {
								block.show();
								footer.removeClass("hide");
								loading.hide();
								window.productInfo=res.data;
								wpwlDetails.autoPlay();
								wpwlDetails.paras();
								wpwlDetails.brandShow();
								wpwlDetails.special();
								wpwlDetails.scroll();
								wpwlDetails.finish();
							}							
						},
						error:function(jqXHR, textStatus, errorThrown){
				            if(textStatus=="timeout"){
				                $("#loading-gif").hide().siblings('.middle').show();
				            }else{
				              	alert(textStatus);
				            }
				        }
					})
				})
			},
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
				var lock=1;
				if(localStorage.getItem("productGoodsInfo")){
					var productGoodsInfo=JSON.parse(localStorage.getItem("productGoodsInfo"));
					if(productGoodsInfo.specialCodeDoc!=""&&productGoodsInfo.customerName!=""){
						$('.product p').show().find('strong').html(productGoodsInfo.specialCodeDoc);
						$("#customerName").html(productGoodsInfo.customerName);
					}else if(productGoodsInfo.customerName==""&&productGoodsInfo.specialCodeDoc!=""){
						$(".product p").eq(0).show().find("strong").html(productGoodsInfo.specialCodeDoc)
						$("#customerName").html(productGoodsInfo.customerName);
					}
				}
				$("#product_name span").html(productInfo.productDetails.productName).parents('#product_name').siblings('#product_des').html(productInfo.productDetails.featureDesc);
				$(".para_result a").eq(0).html(productInfo.productParams.standard).css("color",'#333');
				for(var i=0;i<params.length;i++){
					var ele=$(".para_items").eq(0).clone()
					// ele.css('display','block').children('img').attr('src',productInfo.productDetails.productUrls[i]);
					var ele2=ele.find('.para_name').html(params[i].name).siblings('.para_result');
					
					if(params[i].type==4){
						ele2.find('a').attr("id","outerLink").html(params[i].valueName).attr({
							"href":"javascript:;",
							'link':params[i].value
						});
					}else if(params[i].type==3){
						ele2.find('a').html(params[i].value).attr("href","tel:"+params[i].value)
					}else if(params[i].type==1){
						var dropText='';
						var iconEle="<i class='bg-icon dropText' style='background-position:-1.92rem 0rem;right:0;top:-0.2rem'></i>"
						for(var k=0;k<params[i].value.length;k++){
							dropText+="<p class='noFloat' style='float:none;width:100%'>"+params[i].value[k]+"</p>"
						}
//						alert(dropText)
						ele2.find('div').css({width:"100%"}).html(dropText).append(iconEle);
					}
					else ele2.find('p').html(params[i].value);
	
					if($(".para_result").eq(i).find('div').get(0).offsetHeight>$(".para_result").eq(i).get(0).offsetHeight){
						
						if($(".para_result").eq(i).find('p').attr('class')!='noFloat'){
							alert(8)
							var result=$(".para_result");
							result.eq(i).find("div").css("width","250%").addClass('play');
							var autoP=result.eq(i).find("p").css("whiteSpace","nowrap").clone();
							autoP.appendTo(result.eq(i).find("div"));
						}	
					}	
					$(".parameters").append(ele);
				}
				$(".dropText").click(function(){
					var length=$(this).siblings('p').length;
					if(lock){
						$(this).css('background-position','-2.56rem 0').parents('.para_result').css("height",0.4*length+'rem');
						lock=0;
					}else {
						$(this).css('background-position','-1.92rem 0').parents('.para_result').css("height",'');
						lock=1;
					}
				})
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
				var wholeHei=document.documentElement.clientHeight-document.documentElement.clientWidth /7.5*0.88;
				$("#content").css("height",wholeHei+'px');
				$(".loading").css("height",wholeHei+'px')
//				$("#content").css("height",$('body').height())
				myScroll.refresh();
				 var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
						        + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
						        + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
						        + "|" // 允许IP和DOMAIN（域名）
						        + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
						        + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
						        + "[a-z]{2,6})" // first level domain- .com or .museum
						        + "(:[0-9]{1,4})?" // 端口- :80
						        + "((/?)|" // a slash isn't required if there is no file name
						        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
						        var re=new RegExp(strRegex);
				$("#outerLink").click(function(e){
//					var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
//					if(re.test($(this).html())){
//						localStorage.setItem("link",JSON.stringify(this.innerHTML));	
//						window.location.href="wrapImg.html";
//					}
					if(re.test($(this).attr('link'))){
						localStorage.setItem("link",JSON.stringify(this.innerHTML));
						window.location.href="wrapImg.html"
					}
					
				})
			},
			finish:function(){
				WPBridge.callMethod('JsInvokeNative','wpGetUserId',{},function(msg){
					if(msg.data.result!=""){//已登录
						var userId=msg.data.result;
						WPBridge.callMethod('JsInvokeNative','wpEncrypt',{key:key,params:[userId]},function(msg){window.aesUserId=msg.data.result[0];})	
						WPBridge.callMethod('JsInvokeNative','wpIsLiked',{productId:prtId},function(msg){
							if(msg.data.result!='false'){
								alert(8)
								$(".like").addClass('liked')								
							}

						})
					}
				})
			}
		}
		//点击分享
//		$(function(){
//			$(".share").click(function(){
//				window.location.href="share.html"
//			})
//		})
		
		$(function(){
			$("#wpReload").click(function(){
				alert(8)
				wpwlDetails.getData()
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
			  		if(window.navigator.online){
			  			getData();
			  			flag=0;
			  		}
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
          			url:"http://192.168.199.182/wpwl/product/getPlay",
          			type:"post",
          			data:{
          				id:parValue
//        				securityId:sha256(wpwl/product/getPlay+key)
          			},
//        			beforeSend:function(){
//        				$(".loading").show()
//        			},
          			success:function(res){
          				if(res.errMsg=="AES加密解密失败"){
          					getKey();
          					getData();
          				}else {
	          				$(".loading").hide()
	          				var data=res.data.list[0].detail;
	          				var imgSrc=res.data.list[0];
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
							},400)
							$(".play-swipebox").swipebox();
						}
          			}
          		})
          	}
		})

		//进入公司页面
		$(function(){
			$(".brand").on("click",function(e){
				localStorage.setItem('brand',JSON.stringify(productInfo.brand));
//				point('0','h5_e024','','',"");
//				point('1',"H5_A008/H5_A009",finishTime,finishTime,finishTime-initialTime,"产品")
				window.location.href="company.html";
				e.preventDefault();
	//			pushPoint()
			})

		})
		
		function isNetOn(){
			
		}
		
		//收藏部分
		$(function(){
			$(".like").click(function(){
				if(this.className=="like bg-icon"){
					WPBridge.callMethod('JsInvokeNative','wpGetUserId',{},function(msg){
						if(msg.data.result==""){
							WPBridge.callMethod('JsInvokeNative','wpLogin',{},function(){});
						}else {
							addStore();
							var date=new Date();
							var finishTime=date.getTime();
							point('0','h5_e006',finishTime,finishTime,"","产品");
						}
					})					
				}
				else{
					deleteStore();
					var date=new Date();
					var finishTime=date.getTime();
					point('0','h5_e007',finishTime,finishTime,"","产品");					
//					pushPoint()
				}
			})
		})
		
		function addStore(){
			$.ajax({
				url:"http://192.168.199.182/wpwl/member/addStore",
				data:{
					id:aesUserId,
					productId:parValue,
				},
				type:"post",
				success:function(res){
					if(res.errMsg=="AES加密解密失败"){
						getKey(true);
						addStore();
					}else {
						$(".like").toggleClass('liked');
						WPBridge.callMethod('JsInvokeNative','wpAddLike',{productId:prtId},function(){})
					}					
				}
			})	
		}
		function deleteStore(){
			$.ajax({
				url:"http://192.168.199.182/wpwl/member/deleteStore",
				data:{
					id:aesUserId,
					productId:parValue
				},
				type:"post",
				success:function(res){
					if(res.errMsg=="AES加密解密失败"){
						getKey(true);
						deleteStore();
					}else{
						$(".like").toggleClass('liked');
						WPBridge.callMethod('JsInvokeNative','wpRemoveLike',{productId:prtId},function(){})
					}	
				}
			})
		}
		//咨询部分
		$(function(){
			var flag=1;
			var lock=1;
			$("#consultant").on("click",function(e){
				if(flag){
					WPBridge.callMethod('JsInvokeNative','wpGetUserId',{},function(msg){
						if(msg.data.result==""){
							alert(msg.data.result)
							$(".cst_area").removeClass("myShow")
						}else {
							if(lock){
								userId=msg.data.result;
								WPBridge.callMethod('JsInvokeNative','wpEncrypt',{key:key,params:[userId]},function(msg){window.aesUserId=msg.data.result[0];})	
								consultContent(1,4,true);	
								lock=0;
							}else {
								$(".cst_area").addClass("myShow")
							}
						}
					})
					flag=0;
				}else {	
					$(".cst_area").removeClass("myShow")
					flag=1;
				}
				$("#consultant i").toggleClass("drop");
				$(".cst_item").toggleClass("ani");
			})			
		}) 

		$("#back").click(function(){
			if(!getUrlRequest().productId){
//				localStorage.removeItem('H5');
				window.history.back();	
			}else {
				WPBridge.callMethod('JsInvokeNative','wpFinishH5',{},function(){})
			}		
		})

		//与原生交互部分
		$(function(){
			//分享
			
			$(".share").click(function(){
				//原生分享组件
				var title=productInfo.productDetails.productName;
				var text=productInfo.productDetails.featureDesc;
				var imgUrl=productInfo.brand.brandIcon;
				WPBridge.callMethod('JsInvokeNative','wpShareProduct',{shareTitle:title,shareText:text,shareUrl:"http://192.168.199.182/h5/share.html?productId="+prtId,shareImg:imgUrl},function(){});
//				pushPoint()
			})
			
			$(".nearby_shop").click(function(){
				WPBridge.callMethod('JsInvokeNative','wpNearShop',{productId:prtId},function(){})
			})
			
			$("#cst_btn").click(function(){
				//调用原生方法
				WPBridge.callMethod('JsInvokeNative','wpGetUserId',{},function(msg){
					if(msg.data.result==""){
						WPBridge.callMethod('JsInvokeNative','wpLogin',{},function(){})
					}else {
						var userId=msg.data.result;
						localStorage.setItem('productId',prtId);
						localStorage.setItem('userId',userId);
						localStorage.removeItem('isFromDetails')
						WPBridge.callMethod('JsInvokeNative','wpConsult',{productId:prtId},function(msg){alert(JSON.stringify(msg))})
					}
				})
			})
		})
		
		function consultContent(index,size,flag){
			WPBridge.callMethod('JsInvokeNative','wpEncrypt',{key:key,params:[index]},function(msg){
				var aesIndex=msg.data.result[0];
				WPBridge.callMethod('JsInvokeNative','wpEncrypt',{key:key,params:[size]},function(msg){		
					var aesSize=msg.data.result[0];
						$.ajax({
							url:"http://192.168.199.182/wpwl/message/listConsultByPage",
							type:"post",
							data:{
								"userId":aesUserId,
								"productId":parValue,
								"pageIndex":aesIndex,
								"pageSize":aesSize
							},
							success:function(res){
								if(res.errMsg=='AES加密解密失败'){
									getKey(true);
									consultContent(index,size,flag)
								}else{
									if(res.data.success==false){
										WPBridge.callMethod('JsInvokeNative','wpShowToast',{message:'没有更多'},function(){})
									}else {
										window.consultItem=res.data;
										if(flag){
											var list=consultItem.list;
											var total=consultItem.total
											if(size==5&&total>2){
												localStorage.setItem('consultContent',JSON.stringify(consultItem));
												localStorage.setItem('isFromDetails',true);
//												localStorage.removeItem('productId');
//												localStorage.removeItem('userId');
												localStorage.setItem('productId',prtId);
												localStorage.setItem('userId',userId);
												window.location.href="consult.html";
											}else if(size==5&&total<=2){
												WPBridge.callMethod('JsInvokeNative','wpShowToast',{message:'没有更多'},function(){})
												isMore=false;
											}
											if(total==0){
												$(".cst_area").css({
													height:0,
													overflow:'hidden'
												})
											}else{
												if(total==1){
													$(".account").eq(0).html(list[0].mobile).siblings('.consult_time').html(list[0].consultTime);
													$(".my_consult").eq(0).html(list[0].consult);
													$(".reply").eq(0).html(list[0].message);
													$('.cst_area').find('dt').eq(1).hide();
													$('.cst_area').find('dd').eq(1).hide();
												}else{
													for(var i=0;i<2;i++){
														$(".account").eq(i).html(list[i].mobile).siblings('.consult_time').html(list[i].consultTime);
														$(".my_consult").eq(i).html(list[i].consult);
														$(".reply").eq(i).html(list[i].message);	
	//													if(list[i].userId!=userId){
	//														$('.account').eq(i).siblings('.bg-icon').css('backgroundPosition',"-7.68rem 0")
	//													}
													}
												}
												$(".cst_area").addClass("myShow")
											}
										}									
									}
								}
							}
						})
					});
			});	
		}
		//查看更多
		$(function(){
			var lock=1;
			window.isMore=true;
			$("#watchMore").click(function(){
				if(lock&&isMore){
					consultContent(1,5,true);
					lock=0;
				}else if(lock==0&&isMore==false){
					WPBridge.callMethod('JsInvokeNative','wpShowToast',{message:'没有更多'},function(){})
				}
			})
		})
//			
		function point(type,code,startTime,stayTime,param){
				var date=new Date();
				var finishTime=date.getTime();
				var pointDatas=JSON.parse(localStorage.getItem("pointDatas"));
				order=pointDatas.length;
				alert(order)
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
					    "stayTime": finishTime-firstTime,
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