$(function(){
	WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},'');	
	var aesFail = "";
	var urlRequest=getUrlRequest();
	var crop;
	var base64picUrl = "";
	var base64DataArray=[];
	var serviceDetail=JSON.parse(localStorage.getItem('serviceDetail'));
	var workOrder=serviceDetail.workOrder;	
	var serviceType=serviceDetail.serviceType;
	alert(serviceType)
	var contents='';
	var stars;
	var imgArr;//图片数组
	var key;
	var u = navigator.userAgent;
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
	$(".valuate-name").html(serviceDetail.name).siblings('.schedule-model').html(serviceDetail.standard);
	$(".work").html(serviceDetail.workOrder);
	if(serviceType=="1"){
		$(".type").html("安装");
	}else if(serviceType=="2"){
		$(".type").html("维修");
	}
	
	wpCommon.viewShow();
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
	
	$("#choose-pic").click(function(e){
		if(u.indexOf("Android") > -1 || u.indexOf("Linux") > -1){
			WPBridge.callMethod("JsInvokeNative", "wpGetOSCode", {}, function(msg) {
				osCode = msg.data.result;
				if(osCode<21){
					WPBridge.callMethod("JsInvokeNative", "wpImageSelect", {}, function(msg) {
						alert(msg.data.result)
						var ele="<div><img src="+msg.data.result+"></div>"
				    	$('.photo-item').append(ele);
					})
				}else{
					return false;
				}
			});
		}
	})
	
    $("#choose-pic").on('change',function(){
    	$('.mask').show();
			var files = event.target.files,
		        file;
		    if (files && files.length > 0) {
		        file = files;
		    }
		    if(file.length>=5){
				$(".addPhoto").remove()
		    }
		    for(var i=0;i<file.length;i++){
		    	var fileReader = new FileReader();
		    	fileReader.readAsDataURL(file[i])
				fileReader.onload = function (event) {
					alert(event.target.result)
					var ele="<div><img src="+event.target.result+"></div>"
				    $('.photo-item').append(ele);
				    picTimer=setInterval(function(){
				    	if(event.target.result){
				    		clearInterval(picTimer);
				    		$(canvas).show()
				    		var base64Data=canvas.toDataURL('image/jpeg');
				    		$(canvas).hide();
				    		base64Data=base64Data.split('data:image/jpeg;base64,')[1];
				    		base64DataArray.push(base64Data);
				    		$('.mask').hide();
				    	}
				    },30)
				};
		    }
		    
//			addForm();
//			img++;
    })
	//点击文本域
	var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]");
	$(".feel-inp").blur(function(){
		var feelText=$(".feel-inp").val()
		if(regRule.test(feelText) || pattern.test(feelText)){
	    	WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
				message: "不支持表情及特殊字符，提交失败。"
			}, "")
	    }else{
	    	contents=$(this).val();
	    }
	})
	function upDatas(key){
		WPBridge.callMethod("JsInvokeNative","wpEncrypt",{
				key:key,
				params:[workOrder,contents,stars,]
		},function(msg){
			codeValue=msg.data.result;  
	    	$.ajax({
	    		type:"post",
	    		url:wpCommon.Url+"/wpwl/afterservice/evaluation",
	    		timeout:10000,
	    		data:{
	    			workOrder:codeValue[0],
					contents:codeValue[1],
					stars:codeValue[2]
	    		},
	    		success:function(res){
	    			alert(JSON.stringify(res))
	    			if(res.errMsg == "AES加密解密失败") {
	    				if(!aesFail){		    				
							$.ajax({
								type:"post",
								url:wpCommon.Url+"/wpwl/getKey",
								async:true,
								success:function(datas){
									key=datas.data;
									localStorage.setItem('key',datas.data)
									upDatas(key)
								}
							});
							aesFail=true;
						}
					}else if(res.success==false){
						$("#valuate-content").hide();
						$(".submit").hide();
						$("#myCanvas").hide();
						$(".loading").show();
						$(".middle img").attr('src',"images/error_else.png");
						$(".middle p").html("出错了，请稍后再试");
						$(".top div").html("异常页面");
						wpCommon.viewShow();
					}else{
						window.location.href="afterSaleDetail.html?suspectId="+urlRequest.suspectId;
					}
	    		},
	    		error:function(jqXHR, textStatus, errorThrown){
	    			alert(jqXHR.status)
	    			if(textStatus=="timeout"){
						$("#valuate-content").hide();
						$(".submit").hide();
						$("#myCanvas").hide();
						$(".loading").show();
						$(".top div").html("网络异常")
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
	
	$("#smark").on("touchmove", function() {
		return false
	});
	$("#cancle").on('touchstart',function() {
		toggleObj("#cancle")
	});
	$("#sure").on('touchstart',function() {
		toggleObj("#sure")
	});
    //点击提交
   	$(".submit").click(function(){
   		fix()
   		if($('.satisfaction-level').html()){
   			upDatas(key)
	    	WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
		        eventId:"h5_e094",
		        otherId:""
		   	},
		    function() {});
		   
   		}else{
   			WPBridge.callMethod("JsInvokeNative", "wpShowToast", {message: "请先打分再提交哦"}, "")
   		}
		
    })
   	
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
		upDatas(key);
	})
	//点击图片放大
	function addMaskImg(data,imgIndex){
	 	var html = template("test", data);
		$("#box").append(html);
		var transDis = -document.documentElement.clientWidth * (imgIndex);
		$(".swiper-mask .swiper-wrapper").css("transform", "translate3d(" + transDis + "px, 0px, 0px)");
		refreshMaskBig();
		WPBridge.callMethod("JsInvokeNative", "wpBackListener", {
			back: false
		}, function() {
			$(".swiper-mask").remove()
		})
	}
	$(document).click(function(e){
		if(e.target.tagName=='I'){
			var index=$('.swiper-mask img').attr('index');
			$(".photo-item div").eq(index-1).remove();
		}
	})
   	$(document).on('click','.photo-item img',function(){
   		var data={
   			imgUrl:[this.src]
   		}
	 	addMaskImg(data,0)
	})
   	
   	$('textarea').on('focus',function(){
   		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
			$(".top").css('position','absolute')
		}
		//解决顶部脱离文档流		
   	})
   	
   	$('textarea').on('change',function(){
   		$('.number').html($(this).val().length+'/100');
   	})
   	
   	$('textarea').on('blur',function(){
   		fix();
		//解决顶部脱离文档流		
   	})
   	
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
			onClick: function(e) {
				$(".swiper-mask").remove();
			},
			onSlideChangeEnd: function(swiper) {
				$(".swiper-mask img").each(function() {
					var $t = $(this);
					if($t.css("transform") != "none") {
						$t.css("transition-duration", 0)
					}
				})
			}
		})
	}
	
	function fileCountCheck(objForm){
	 	if (window.File && window.FileList) {
	   		var fileCount = objForm["mulUp[]"].files.length;
		   	if(fileCount > 2){
		    	window.alert('文件数不能超过10个，你选择了' + fileCount + '个');
		   	}
		   	else {
		    	window.alert('符合规定');
		   	}
		}else {
		   window.alert('抱歉，你的浏览器不支持FileAPI，请升级浏览器！');
		 }
	  return false;
	}
	
})
	
