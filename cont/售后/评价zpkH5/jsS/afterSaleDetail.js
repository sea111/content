$(function(){
	WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});	
	var serviceDetail=JSON.parse(localStorage.getItem('serviceDetail'));
	var workOrder=serviceDetail.workOrder;
	var gmtCreate=serviceDetail.gmtCreate;
	var iconURL=serviceDetail.iconURL;
	var name=serviceDetail.name;
	var standard=serviceDetail.standard;
	var serviceType=serviceDetail.serviceType;
	var cId=getUrlRequest().suspectId;
	function getKey(params,sus){
		$.ajax({
			url:wpCommon.Url+"/wpwl/getKey",
			type:'post',
			success:function(res){
				key=res.data;
				getData(params,sus);
			}
		})
	}
	getKey(workOrder,cId)
	function getData(params,sus){
		WPBridge.callMethod("JsInvokeNative", "wpEncrypt", {
			key: key,
			params: [params,sus]
		},function(msg){
			$.ajax({
				url: wpCommon.Url+"/wpwl/afterservice/detail" ,
				type: "post",
				data: {
					versionId: "27",
					workOrder: msg.data.result[0],
					suspectId: msg.data.result[1]
				},
				timeout: 10000,
				success: function(res) {
					if(res.errMsg == "AES加密解密失败") {
						if(!keyFlag) {
							getKey(params,sus);
							keyFlag=true;
						}
					}else if(res.success==false){
						$(".service-detail").hide();
						$(".sale-problem").hide();
						$(".service-address").hide();
						$(".my-comment").hide();
						$(".reply").hide();
						$(".comment").hide();
						$(".loading").show();
						$(".middle img").attr('src',"afterSale.png");
						$(".middle p").html("手机号不匹配，无法查看，请用安装/维修登记的手机号登录查看");
						$(".top div").html("售后详情");
						wpCommon.viewShow();
					}else {
						detailData= res.data;
						$("#work-number").html(workOrder).siblings('#work-status').html(detailData.status);
						$("#service-time").html(gmtCreate);
						$(".icon-url").attr("src",iconURL);
						$("#goods-name").html(name).siblings("#goods-standard").html(standard);
						if(serviceType=="1"){
							$("#service-type").html("安装");
						}else if(serviceType=="2"){
							$("#service-type").html("维修");
						}
					//	$("#service-type").html(detailData.serviceType);
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
							$(".my-comment").show();
							$(".reply").show();
							$(".comment").hide();
						}
						$(".star").html(str);
						wpCommon.viewShow();
					}
					
				},
				error: function(jqXHR, textStatus, errorThrown) {
					if(textStatus=="timeout"){
						$(".service-detail").hide();
						$(".sale-problem").hide();
						$(".service-address").hide();
						$(".my-comment").hide();
						$(".reply").hide();
						$(".comment").hide();
						$(".loading").show();
						$(".top div").html("网络异常")
					}
					wpCommon.viewShow();
				}
			})
		})		
	}
	//wpCommon.viewShow();
	//返回键
	$("#back").click(function(){
		WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
	})
	//点击去评价
	$("#go-comment").click(function(){
		localStorage.setItem("serviceType",serviceType);
		WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
	        eventId:"h5_e093",
	        otherId:""
	   	},
	    function() {});
		window.location.href="evaluation.html?pageId=H5_C026";
		
	})	
	//点击重新加载
	$("#wpReload").click(function(){
		getData(params,sus);
	})
})
