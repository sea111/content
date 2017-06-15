$(function(){
	WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},'');	
	var aesFail = "";
	var urlRequest=getUrlRequest();//获取url
	var serviceDetail=JSON.parse(localStorage.getItem('serviceDetail'));
	var workOrder=serviceDetail.workOrder;	//工单
	var serviceType=serviceDetail.serviceType;//服务类型
	var contents='';//输入的内容
	var stars;//评价的星星个数
	var imgArr=[];//base64图片数组
	var key;
	var u = navigator.userAgent;//浏览器
	var length;//
	var picArr=[];//上传的arr
	var lock;//判断输入内容是否有误
	var picIndex;//图片顺序
	var paras;//上传的参数
	var isPicUpEnd;
	var errCode='';
	//加密
	function getKey(){
		$.ajax({
			url:wpCommon.Url+"/wpwl/getKey",
			type:'post',
			success:function(res){
				key=res.data;
			}
		})
	}
	getKey();
	$('.valuate-left img').attr('src',serviceDetail.iconURL);
	$(".valuate-name").html(serviceDetail.name).siblings('.valuate-model').html(serviceDetail.standard);
	$(".work").html(serviceDetail.workOrder);
	
//	$("#box").height(wholeHei+'px');
	if(serviceType=="1"){
		$(".type").html("安装");
	}else if(serviceType=="2"){
		$(".type").html("维修");
	}
	
	wpCommon.viewShow();
	//点击星星评价
	$(".gray").click(function(){
		var $ele=$(".gray")
		var num=$(this).attr('index');
		var satisfy=$(".satisfaction-level");
		for(var i=0;i<num;i++){
			$ele.eq(i).attr('src','images/lightStar.png')
		}
		for(var j=num;j<5;j++){
			$ele.eq(j).attr('src','images/grayStar.png')
		}
		stars=Number(num);
		switch(stars){
			case 1:satisfy.html('很不满意');break;
			case 2:satisfy.html('不满意');break;
			case 3:satisfy.html('满意');break;
			case 4:
				satisfy.html('比较满意');
			break;
			case 5:satisfy.html('非常满意');break;
		}
	})
	
	//点击文本域
	//表情正则
	var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
	$(".feel-inp").blur(function(){
		var feelText=$(".feel-inp").val().replace(/<script.*?>.*?<\/script>/ig, '');
		if(regRule.test(feelText)){
	    	WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
				message: "不支持表情及特殊字符，提交失败。"
			}, "");
			lock=1;
	    }else{
	    	lock=0;
	    	contents=$(this).val();
	    }
	})
	
	//上传数据
	function upDatas(){
		WPBridge.callMethod("JsInvokeNative","wpEncrypt",{
			key:key,
			params:paras
		},function(msg){
			codeValue=msg.data.result;  
			if(paras.length>3){
				var picUrl=codeValue.slice(3)
			}else{
				picUrl='';
			}
	    	$.ajax({
	    		type:"post",
	    		url:wpCommon.Url+"/wpwl/afterservice/evaluation",
	    		timeout:10000,
	    		traditional:true,
	    		data:{
	    			workOrder:codeValue[0],
					contents:codeValue[1],
					stars:codeValue[2],
					picUrls:picUrl
	    		},
	    		success:function(res){
	    			if(res.errMsg == "AES加密解密失败") {
	    				if(!aesFail){		    				
							$.ajax({
								type:"post",
								url:wpCommon.Url+"/wpwl/getKey",
								async:true,
								success:function(datas){
									key=datas.data;
									localStorage.setItem('key',datas.data)
									upDatas()
								}
							});
							aesFail=true;
						}
					}else if(res.success==false){
						WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
							message: "提交失败"
						}, "");
						wpCommon.viewShow();

					}else{
						if(!urlRequest.flag){
							WPBridge.callMethod("JsInvokeNative", "wpStartAndFinishPage", {}, function(){
								window.location.href="afterSaleDetail.html?suspectId="+urlRequest.suspectId;
							});
						}else{
							WPBridge.callMethod("JsInvokeNative", "wpFinishH5", {},'');
						}	
					}
	    		},
	    		error:function(jqXHR, textStatus, errorThrown){
//	    			alert(jqXHR.status)
	    			if(textStatus=="timeout"){
						WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
							message: "超时"
						}, "");
					}
					wpCommon.viewShow();
	    		}
	    	});
    	});
	}
	//返回键
	$("#back").click(function(){
		$("#smark").css("display", "block");
		$("#modal").css("display", "block");
	})
	//在遮罩层移动
	$("#smark").on("touchmove", function() {
		return false
	});
	
	//点击取消
	$("#cancle").on('click',function() {
		toggleObj("#cancle")
	});
	
	//点击确定
	$("#sure").on('click',function() {
		toggleObj("#sure")
	});
	
	
    //点击提交
   	$(".submit").click(function(){
   		fix(); 
//		alert(imgArr.length)
   		if($('.satisfaction-level').html()){
   			if(lock){
   				WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
					message: "不支持表情及特殊字符，提交失败。"
				}, "");
   			}else{
   				WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},'');
   				
   				if(imgArr.length){
					upImg(0);
   				}else{
   					setParams();
   					upDatas();	
   				}
		    	WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
			        eventId:"h5_e094",
			        otherId:""
			   	},'');
			   	WPBridge.callMethod("JsInvokeNative", "wpNetwork", {}, function(msg) {			
					if(msg.data.result == "0") {
						WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
							message: "无连接，请检查网络"
						}, "")
					}
				})
   			}
   		}else{  			
   			WPBridge.callMethod("JsInvokeNative", "wpShowToast", {message: "请先打分再提交哦"}, "")
   		}
		
    })
   	//设置参数
   	function setParams(){
   		paras=[workOrder,contents,stars];
   		if(picArr){
   			paras=paras.concat(picArr);
   		}
   	}
   	
   	function toggleObj(clickObj) {
		if(clickObj == "#sure") {
			WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
		} else {
			if(clickObj == "#cancle") {
				$("#modal").hide();
				$("#smark").hide()
			}
		}	
	}
   	
   	//点击重新加载
	$("#wpReload").click(function(){
		upDatas();
	})
	//点击图片放大
	function addMaskImg(data,imgIndex){
	 	var html = template("test", data);
		$("#box").append(html);
		var transDis = -document.documentElement.clientWidth *0;
		picIndex=imgIndex;
		$(".swiper-mask .swiper-wrapper").css("transform", "translate3d(" + transDis + "px, 0px, 0px)");
		refreshMaskBig();
		WPBridge.callMethod("JsInvokeNative", "wpBackListener", {
			back: false
		}, function() {
			$(".swiper-mask").remove()
		})
	}
	
	//删除照片
	$(document).on('click',"#delete",function(){
		$("#delete").remove();
		$("#photo-top").remove();
		$("#choose-pic").show();
		$(".swiper-mask").remove();
		imgArr.splice(picIndex-1,1);
		WPBridge.callMethod("JsInvokeNative", "wpImageSelectDelete", {
			index: picIndex-1
		},'');
		$(".photo-item div").eq(picIndex).remove();
		WPBridge.callMethod("JsInvokeNative", "wpBackListener", {
			back: true
		}, "")
	})
	//预览照片返回
	$(document).on('click',"#pre-back",function(){
		$("#photo-top").remove();
		WPBridge.callMethod("JsInvokeNative", "wpBackListener", {
			back: true
		}, "")
		$(".swiper-mask").remove();
	})
	//点击图片预览
   	$(document).on('click','.photo-item img',function(){
   		var data={
   			imgUrl:[this.src]
   		}  		
	 	addMaskImg(data,$(this).index('img')-6)
	})
   	
   	//文本域聚焦
   	$('textarea').on('focus',function(){
   		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
			$(".top").css('position','absolute')
		}
		//解决顶部脱离文档流		
   	})
   	//文本域改变
   	$('textarea').on('change',function(){
   		$('.number').html($(this).val().length+'/100');
   	})
   	//文本域失焦
   	$('textarea').on('blur',function(){
   		fix();			
   	})
   	//解决顶部脱离文档流	
   	function fix(){
		$(".top").css({
			'position':'fixed'
		})
		setTimeout(function(){
			var scrollTop=$(window).scrollTop();
			$(window).scrollTop(scrollTop)
		},1000/60)
	}
   	
   	function refreshMaskBig() {
		new Swiper(".swiper-mask", {
			zoom: true,
			onSlideChangeEnd: function(swiper) {
				$(".swiper-mask img").each(function() {
					var $t = $(this);
					if($t.css("transform") != "none") {
						$t.css("transition-duration", 0)
					}
				})
			}
		})
//		$(".swiper-mask").height(wholeHei+'px');
	}
	
	//选择图片 ，方案二
	$("#choose-pic").click(function(){
		WPBridge.callMethod("JsInvokeNative", "wpImageSelect", {}, function(msg) {
			picArr.length=0;
			var result=msg.data.result;
//			imgArr=result;
			imgArr.length=0;
			$.each(result,function(inx,item){
				imgArr.push(item)
			})
			length=imgArr.length;
//			alert(length)
//			alert(JSON.stringify(imgArr));
//			alert(length)
//			alert(imgArr.length)
			var str='';
			if(result.length>=5){
				$("#choose-pic").hide();
			}
			$(".photo-div").remove();
			for(var i=0;i<result.length;i++){	
//				str+="<div><img src="+result[i]+"></div>";
				var ele=$(".photo-item div").eq(0).clone();
				ele.addClass('photo-div').find('img').attr('src',result[i])
				ele.show();
				$('.photo-item').append(ele);
			}
			wpCommon.viewShow();
		})
	})
	
	function upImg(num){
		var imgSrc='';
		//将图片的头去掉
		if(imgArr[num].indexOf('data:image/jpeg;base64')!==-1){
			imgSrc=imgArr[num].split('data:image/jpeg;base64,')[1];
		}else if(imgArr[num].indexOf('data:image/png;base64')!==-1){
			imgSrc=imgArr[num].split('data:image/png;base64,')[1];
		}else{
			imgSrc=imgArr[num].split('data:image/jpg;base64,')[1];
		}
		var len=imgArr.length;
		$.ajax({  
		 	url: wpCommon.Url+'/wpwl/afterservice/uploadPic',  
		 	type: 'POST',  
			timeout:10000,
		 	data: {
		 		noEncryptImageBase64:imgSrc
		 	},
		 	success: function (res) {
		 		picArr.push(res.data.picUrl);
		 		if(num<(len-1)){
		 			num++;
		 			upImg(num);
		 		}else{
		 			setParams();
		 			upDatas()
		 			imgArr.length=0;
		 		}
		 		errCode=false;
		 	},
			error:function(jqXHR, textStatus, errorThrown){
				if(textStatus=="timeout"){
					WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
						message: "上传图片超时"
					}, "");
				}
				errCode=true;
				wpCommon.viewShow();
			}
		})
	}

})
	
