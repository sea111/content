$(function(){
	WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});	
	var listData;
	var cId=getUrlRequest().suspectId;
	var changeCont=0;
	var length;
	//售后申请和售后进度切换
	$(".after-application").click(function(){
		changeCont=0;
		$(this).css({"color":"#fff","background":"#d6a41d","border-bottom":"1px solid #d6a41d"})
		$('.aftermarket-schedule').css({"color":"#343434","background":"#fff","border-bottom":"1px solid #ccc"})
		$("#application-content").show();
		$("#schedule-content").hide();
	})
	$(".aftermarket-schedule").click(function(){
		changeCont=1;
		WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});	
		$(this).css({"color":"#fff","background":"#d6a41d","border-bottom":"1px solid #d6a41d"})
		$(".after-application").css({"color":"#343434","background":"#fff","border-bottom":"1px solid #ccc"})
		$("#schedule-content").show();
		$("#application-content").hide();
		if(!this.flag){
			getData('listprogression');
			this.flag=true;
		}
		wpCommon.viewShow();
	})
	//加密
	function getKey(portUrl){
		$.ajax({
			url:wpCommon.Url+"/wpwl/getKey",
			type:'post',
			success:function(res){
				key=res.data;
				getData(portUrl);
			}
		})
	}
	getKey('listapplication')
	//获取售后进度	
	function getData(portUrl){
		WPBridge.callMethod("JsInvokeNative", "wpEncrypt", {
			key: key,
			params: [cId]
		},function(msg){
			$.ajax({
				url:wpCommon.Url+"/wpwl/afterservice/"+portUrl ,
				data:{
					versionId: "27",
					suspectId: msg.data.result[0]
				},
				type:"post",
				timeout:10000,
				success:function(res){
					if(res.data.list==""){
						$("#application-content").hide();
						$("#schedule-content").hide();
						$(".middle img").attr('src',"images/emptys.png");
						$(".middle p").html("暂无售后消息");		
						$(".loading").show();
						$(".loading").css({"zIndex":"1","height":"93%"})
					}
					if(res.errMsg == "AES加密解密失败"){
						if(!keyFlag) {
							getKey(portUrl,params);
							keyFlag=true;
						}
					}else if(res.success==false){
						$(".application-schedule").hide();
						$("#application-content").hide();
						$("#schedule-content").hide();
						$(".loading").show();
						$(".middle img").attr('src',"images/error_else.png");
						$(".middle p").html("出错了，请稍后再试");
						$(".top div").html("异常页面");	
					}else{
						try{
							if(res.success){
								listData=res.data.list;
								length=listData.length;
								if(!changeCont){
									var parentEle=$("#application-content");
									for(var i=0;i<listData.length;i++){
										var ele=$(".application-list").eq(0).clone();
										ele.find('.icon-url').attr('src',listData[i].iconURL);
										ele.find(".application-right").attr('tel',listData[i].serviceTel);
										ele.find('.title').html(listData[i].name).siblings('.model').html(listData[i].standard)
										ele.show();
										parentEle.append(ele);
									}
								}else{
									var parentEle=$("#schedule-content");
									for(var i=0;i<listData.length;i++){
										var ele=$(".schedule-list").eq(0).clone();
										
										if(listData[i].orderStatus=="2"){
											ele.find(".evaluate").hide();
											ele.find('.finish').html("已评价")
										}else if(listData[i].orderStatus=="1"){	
											ele.find(".evaluate").show();
											ele.find('.finish').html("已完成")
										}
										//判断已读状态
										if(listData[i].readStatus=="0"){
											ele.find(".red").show();
										}else if(listData[i].readStatus=="1"){
											ele.find(".red").hide();
										}
										/*if(listData[i].serviceType=="1"){}else if(listData[i].serviceType=="2"){}*/
										ele.addClass('schedule-item').find('.work').html(listData[i].workOrder);
										ele.find('.time').html(listData[i].gmtCreate);
//										ele.find('.finish').html(listData[i].orderStatus);
										ele.find('img.icon-url').attr('src',listData[i].iconURL);
										ele.find('.schedule-name').html(listData[i].name).siblings('.schedule-model').html(listData[i].standard)
										ele.show();
										parentEle.append(ele);
									}
								}
							}
						}catch(e){
							$(".application-schedule").hide();
							$("#application-content").hide();
							$("#schedule-content").hide();
							$(".loading").show();
							$(".middle img").attr('src',"images/error_else.png");
							$(".middle p").html("出错了，请稍后再试");
							$(".top div").html("异常页面");	
						}
						wpCommon.viewShow();
					}
				},
				error:function(jqXHR, textStatus, errorThrown) {
					if(textStatus=="timeout"){
						$(".application-schedule").hide();
						$("#application-content").hide();
						$("#schedule-content").hide();
						$(".loading").show();
						$(".top div").html("网络异常")
					}
					wpCommon.viewShow();
				}
			})
		})		
	}

	//返回键
	$("#back").click(function(){
		WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
	})
	
	//点击电话
	$(document).on('click','.application-right',function(){
		WPBridge.callMethod("JsInvokeNative", "wpUpCallTel", {
			tel: $(this).attr('tel')
		}, "")
	})
	//点击重新加载
	$("#wpReload").click(function(){
		getData(portUrl);
	})
	//点击进入评价
	$(document).on('touchstart','.evaluate',function(){
		var index=$(this).parent().parent().parent(".schedule-list").index()-1;
		localStorage.setItem('serviceDetail',JSON.stringify(listData[index]));
		WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
	        eventId:"h5_e091",
	        otherId:""
	    },'');
		window.location.href="evaluation.html?pageId=H5_C026&suspectId="+cId
	})
	//点击进入详情
	$(document).on("touchstart",".see-details",function(){
		//var index=$(this).index()-1;
		var index=$(this).parent().parent().parent(".schedule-list").index()-1;
//		$(this).find('.red').hide();
		localStorage.setItem('serviceDetail',JSON.stringify(listData[index]));
		WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
	        eventId:"h5_e092",
	        otherId:""
	    },'');
		window.location.href="afterSaleDetail.html?pageId=H5_C025&suspectId="+cId;
	})
	window.onResume=function(){
		WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},'');	
		changeCont=1;
		$(".schedule-item").remove();
		getData('listprogression');
	}
})
