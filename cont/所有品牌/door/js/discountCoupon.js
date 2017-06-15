function resetCss(){
	var count=Math.ceil($('.discountBox').width()/19);
	$('.discountBox').each(function(){
		if(!$(this).hasClass('complete')){
			$(this).width(19*count);
			/*$(this).find('.intro').dotdotdot();*/
			$(this).addClass('complete');
		}
	})
}
$(function(){
//	function getKey(flag){
//		$.ajax({
//			type:"post",
//			url:wpCommon.Url+"/wpwl/getKey",
//			async:true,
//			success:function(datas){
//				key=datas.data;
//				localStorage.setItem('key',datas.data)
//				getData(type)
//			}
//		});
//	}		
	var scrollEndTimer=null;
	var page={
		disCountContent:1,
		undisCountContent:1
	}
	var pageSize=6;
	var complete=true;
	//获取数据
	function getData(type){
		var url='';
		var obj='';
		var layHTML='';
		switch(type){
			case 'disCountContent':
				url='JSON/CountContent.json';
				obj=$('#discountContent');
				layHTML=$('#rebate_vouchers').html();
				break;
			case 'undisCountContent':
				url='JSON/undisCountContent.json';
				obj=$('#undiscountContent');
				layHTML=$('#rebate_vouchers').html();
				break;
		}
		if(complete){
			complete=false;
//		WPBridge.callMethod("JsInvokeNative","wpEncrypt",{
//				key:key,
//				params:["zh"]
//		},function(msg){
//			codeValue=msg.data.result;			
				$.ajax({
					url:url,
					type:'get',
					data:{
						page:page[type],
						pageSize:pageSize
					},
					timeout:10000,
					success:function(res){	
						if(res.errMsg == "AES加密解密失败"){
							if(!flag) {
								getKey(true);
							}
						}else if(res.success==false){
							$("#box").hide();
							$(".loading").show();
							$(".middle img").attr('src',"images/error_else.png");
							$(".middle p").html("出错了，请稍后再试");
							$(".top div").html("异常页面");
						}else{
							try{
								if(res.success){
									$(".loading").hide();
									if(page[type]==Math.ceil(res.total/pageSize)){
										obj.addClass('complete');
									}
									page[type]+=1;
									complete=true;
									laytpl(layHTML).render(res.data,function(html){
										obj.append(html);
										resetCss()
										$('img').on('error',function(){
											var $t=$(this);
											$t.attr('src','images/'+$t.attr('errType')+'_error.png');
										})
									})
								}
							}catch(e){
								$(".loadEffect").hide().siblings(".middle").show();
								$(".middle img").attr('src',"images/error_else.png");
								$(".middle p").html("出错了，请稍后再试");
								$(".top div").html("异常页面");
							}
//						WPBridge.callMethod("JsInvokeNative", "wpShowWebView", {},
//					    function() {});
//					    WPBridge.callMethod("JsInvokeNative", "wpDismissLoadingDialog", {},
//					    function() {});							
						}
					},
					error:function(jqXHR, textStatus, errorThrown){
	//				WPBridge.callMethod("JsInvokeNative", "wpShowWebView", {},
	//	            function() {});
	//	            WPBridge.callMethod("JsInvokeNative", "wpDismissLoadingDialog", {},
	//	            function() {});
	//	            WPBridge.callMethod("JsInvokeNative", "wpNetError", {url:wpCommon.Url+"/h5/brand.html"},
	//	            function() {});						
						if(textStatus=="timeout"){
							$("#box").hide();
							$(".loading").show();
							$(".top div").html("网络异常")
						}
					}
				})
//			})
		}
	}
	//获取类型
	function getType(name){
		var type='';
		switch(name){
			case 'discountContent':
				type='disCountContent';
				break;
			case 'undiscountContent':
				type='undisCountContent';
				break;
		}
		return type;
	}
	getData('disCountContent');
	$(window).on('scroll',function(){
		var scrollTop=$(this).scrollTop();
		clearTimeout(scrollEndTimer);
		scrollEndTimer=setTimeout(function(){
			var scroll=scrollTop+$(window).height();
			var wh=$('.dis_content.current').height()+$('.dis_content.current').offset().top
			console.log(wh);
			if(scroll>(wh-10)){
				$('.dis_content').each(function(){
					var $t=$(this);
					if($t.hasClass('current')){
						if(!$t.hasClass('complete')){
							$(".loadEffect").css({
								top:$(".loadEffect").offset().top+scrollTop
							})
							$(".loading").show().siblings(".middle").hide();
							var id=$t.attr('id');
							var type=getType(id);
							getData(type);
						}
						return false; 
					}
				})
			}
		},300)
	})
	function changeContent($t){
		var obj=$t.attr('content');
		var $obj=$('#'+obj);
		$('.dis_content.current').removeClass('current');
		$obj.addClass('current');	
		if(!$obj.html().trim()){
			var type=getType(obj);
			getData(type);
		}
		$('.look .more').attr('content','undiscountContent');
		$(window).scrollTop(0);
	}
	//查看更多
	$('.look .more').on('click',function(){
		var $t=$(this);
		$('.look').hide();
		changeContent($t);
	})
	//后退
	$('#back').on('click',function(){
		if($('.look:visible').length){
			//调用app  WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
		}else{
			$("#discountContent").addClass('current');
			$("#undiscountContent").removeClass('current');
			$(".look").show();
			$(window).scrollTop(0);
		}
	})
	//进入优惠详情页
	$("#discountContent").on("click",".discountBox",function(){
//		WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
//	        eventId:"h5_e079",
//	        otherId:""
//	   	},
//	    function() {});
		window.location.href="discountDetail.html?discount=true";
		//window.location.href="discountDetail.html";
	})
})
