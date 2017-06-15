$(function(){
//	WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});		
//	$(".discountBox").click(function(){
//		WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
//	        eventId:"h5_e079",
//	        otherId:""
//	   	},
//	    function() {});
//		window.location.href="discountDetail.html?discount=true";
//	})
	//点击查看更多
	$(".more").click(function(){
		$("#outDiscountContent").show();
		$("#discountContent").hide();
	})
	//返回上一页
	$(".back").click(function(){
        WPBridge.callMethod("JsInvokeNative", "wpFinishH5", {},
        function() {})
   });
})
