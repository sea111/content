$(function(){
	var listData;
	//WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});	
	//售后申请和售后进度切换
	$(".after-application").click(function(){
		$(this).css({"color":"#fff","background":"#d6a41d","border-bottom":"1px solid #d6a41d"})
		$('.aftermarket-schedule').css({"color":"#343434","background":"#fff","border-bottom":"1px solid #ccc"})
		$("#application-content").show();
		$("#schedule-content").hide();	
		getData('afterSales.json')
	})
	$(".aftermarket-schedule").click(function(){
		$(this).css({"color":"#fff","background":"#d6a41d","border-bottom":"1px solid #d6a41d"})
		$(".after-application").css({"color":"#343434","background":"#fff","border-bottom":"1px solid #ccc"})
		$("#schedule-content").show();
		$("#application-content").hide();
		getData('schedule.json')
	})
	
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
	getData('schedule.json');
	//获取售后进度	
	function getData(portUrl,params){
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
				beforeSend:function() {
					$(".loadEffect").show().siblings(".middle").hide()
				},
				success:function(res) {
					if(res.errMsg == "AES加密解密失败") {
//						if(!keyFlag) {
//							getKey(portUrl,params);
//							keyFlag=true;
//						}
					}else if(!'d'){

					}else {
						listData=res.data.list;
						console.log(listData)
//								var str=""
//								if(listData.status=="已评价"){
//									str+='<span class="public evaluate"></span>'
//								}else if(listData.status=="已完成"){
//									str+='<span class="public evaluate">去评价</span>'
//								}
//								$("schedule-bottom-right").append(str)
						if(!getUrlRequest().couponId){
							var parentEle=$("#application-content");
							for(var i=0;i<listData.length;i++){
							console.log(listData[i].serviceTel)
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
				error: function(jqXHR) {
					$(".loadEffect").hide().siblings(".middle").show();
				}
			})
		//})		
	}

//	wpCommon.viewShow();
	//返回键
	$("#back").click(function(){
		//WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
	})
	$(document).on('click','.application-right',function(){
//		WPBridge.callMethod("JsInvokeNative", "wpUpCallTel", {
//			tel: $(this).attr('tel')
//		}, "")
	})
	//点击进入评价
	$(document).on('click','.evaluate',function(){
		var index=$(this).index();
		localStorage.setItem('serviceDetail',JSON.stringify(listData[index]));
		window.location.href="evaluation.html"
	})
	//点击进入详情
	$(document).on("click",".see-details",function(){
		var index=$(this).index();
		window.location.href="afterSaleDetail.html"
	})
	//点击电话
	$(".telephone").click(function(){
		
	})
})
