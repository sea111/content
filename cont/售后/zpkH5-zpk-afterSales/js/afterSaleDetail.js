$(function(){
//WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});			
//	function getKey(portUrl,params){
//		$.ajax({
//			url:wpCommon.Url+"/wpwl/getKey",
//			type:'post',
//			success:function(res){
//				key=res.data;
//				getData();
//			}
//		})
//	}
	getData()
	function getData(){
//		WPBridge.callMethod("JsInvokeNative", "wpEncrypt", {
//			key: key,
//			params: [params]
//		},function(msg){
			$.ajax({
//				url: wpCommon.Url+"/wpwl/asevaluation/detail" ,
//				type: "post",
//				data: {
//					versionId: "27",
//					consumerId: msg.data.result[0]
//				},
				type: "get",
				url: "JSON/afterSaleDetail.json",
				timeout: 10000,
				beforeSend: function() {
					$(".loadEffect").show().siblings(".middle").hide()
				},
				success: function(res) {
					console.log(res)
					if(res.errMsg == "AES加密解密失败") {
//						if(!keyFlag) {
//							getKey(portUrl,params);
//							keyFlag=true;
//						}
						alert(1)
					}else if(!'d'){
						//alert(2)
					}else {

						var detailData= res.data;
						$("#work-number").html(detailData.workOrder).siblings('#work-status').html(detailData.status);
						$("#service-time").html(detailData.gmtTime);
						$(".icon-url").attr("src",detailData.iconURL);
						$("#goods-name").html(detailData.name).siblings($("#goods-standard").html(detailData.standard));
						$("#service-type").html(detailData.serviceType);
						$("#question").html(detailData.question);
						$("#solution").html(detailData.solution);
						$("#service-add").html(detailData.address);
						$("#reply-content").html(detailData.question);
						if(detailData.stars){
							var str="";
							$("#com-content").html(detailData.contents);
							str+='<div class="click-star">'
							for(var i=0;i<detailData.stars;i++){
								str+="<img class='star-distance' src='images/lightStar.png'>";
							}
							str+='</div>'
						}
						$(".star").html(str)
					}
				},
				error: function(jqXHR) {
					$(".loadEffect").hide().siblings(".middle").show();
				}
			})
		//})		
	}
	//wpCommon.viewShow();
	//返回键
	$("#back").click(function(){
		//WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
	})
	//点击去评价
	$("#go-comment").click(function(){
		window.location.href="evaluation.html"
		
	})
		

	
	
})
