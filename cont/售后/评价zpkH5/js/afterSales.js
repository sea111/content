$(function(){
	//WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});	
	var listData;
	var urlRequest=getUrlRequest();
	var changeCont=0;
	//售后申请和售后进度切换
	$(".after-application").click(function(){
		changeCont=0;
		$(this).css({"color":"#fff","background":"#d6a41d","border-bottom":"1px solid #d6a41d"})
		$('.aftermarket-schedule').css({"color":"#343434","background":"#fff","border-bottom":"1px solid #ccc"})
		$("#application-content").show();
		$("#schedule-content").hide();
		getData('afterSales.json')
		//getData('afterSales.json',consumerId)
	})
	$(".aftermarket-schedule").click(function(){
		changeCont=1;
		$(this).css({"color":"#fff","background":"#d6a41d","border-bottom":"1px solid #d6a41d"})
		$(".after-application").css({"color":"#343434","background":"#fff","border-bottom":"1px solid #ccc"})
		$("#schedule-content").show();
		$("#application-content").hide();
		getData('schedule.json')
		//getData('schedule.json',consumerId)
	})
	//加密
//	function getKey(portUrl,params){
//		$.ajax({
//			url:wpCommon.Url+"/wpwl/getKey",
//			type:'post',
//			success:function(res){
//				key=res.data;
//				getData(portUrl,params);
//			}
//		})
//	}
	getData("afterSales.json");
	//获取售后进度	
	function getData(portUrl,params){
//		var consumerId=urlRequest.consumerId;
//		WPBridge.callMethod("JsInvokeNative", "wpEncrypt", {
//			key: key,
//			params: [params]
//		},function(msg){
			$.ajax({
//				url: wpCommon.Url+"/wpwl/asevaluation/"+portUrl ,
//				data: {
//					versionId: "27",
//					consumerId: msg.data.result[0]
//				},
//				type:"post",
				url:"JSON/"+portUrl,
				type:"get",
				timeout:10000,
				success:function(res) {
					if(res.errMsg == "AES加密解密失败") {
//						if(!keyFlag) {
//							getKey(portUrl,params);
//							keyFlag=true;
//						}
					}else if(res.success==false){
						$(".application-schedule").hide();
						$("#application-content").hide();
						$("#schedule-content").hide();
						$(".loading").show();
						$(".middle img").attr('src',"images/error_else.png");
						$(".middle p").html("出错了，请稍后再试");
						$(".top div").html("异常页面");
						//wpCommon.viewShow();
					}else {
						listData=res.data.list;
						if(changeCont==0){
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
								if(listData[i].status=="已评价"){
									console.log(1)
									ele.find(".evaluate").hide();
									console.log($(".evaluate").hide())
								}else if(listData[i].status=="已完成"){
									console.log(2)
									ele.find(".evaluate").show();
								}
								var ele=$(".schedule-list").eq(0).clone();
								ele.find('.work').html(listData[i].workOrder);
								ele.find('.time').html(listData[i].gmtTime);
								ele.find('.finish').html(listData[i].status);
								ele.find('img.icon-url').attr('src',listData[i].iconURL);
								ele.find('.schedule-name').html(listData[i].name).siblings('.schedule-model').html(listData[i].standard)
								ele.show();
								parentEle.append(ele);
							}
						}
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					if(textStatus=="timeout"){
						$(".application-schedule").hide();
						$("#application-content").hide();
						$("#schedule-content").hide();
						$(".loading").show();
						$(".top div").html("网络异常")
					}
					//wpCommon.viewShow();
				}
			})
		//})		
	}

//	wpCommon.viewShow();
	//返回键
	$("#back").click(function(){
		//WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
	})
	//点击电话
	$(document).on('click','.application-right',function(){
		console.log(11)
//		WPBridge.callMethod("JsInvokeNative", "wpUpCallTel", {
//			tel: $(this).attr('tel')
//		}, "")
	})
	//点击重新加载
	$("#wpReload").click(function(){
		getData(portUrl,params);
	})
	//点击进入评价
	$(document).on('click','.evaluate',function(){
		var index=$(this).index();
		localStorage.setItem('serviceDetail',JSON.stringify(listData[index]));
//		WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
//	        eventId:"h5_e091",
//	        otherId:""
//	   	},
//	    function() {});
		window.location.href="evaluation.html?pageId=H5_C024"
	})
	//点击进入详情
	$(document).on("click",".see-details",function(){
		var index=$(this).index();
//		localStorage.setItem('serviceDetail',JSON.stringify(listData[index]));
//		WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
//	        eventId:"h5_e092",
//	        otherId:""
//	   	},
//	    function() {});
		window.location.href="afterSaleDetail.html?pageId=H5_C025"
	})
	
})
