$(function(){
	//wpCommon.viewShow();
	var productIdArr=[];
	var productNameArr=[];
	//参数对比的数据  判断是从pk获取还是添加产品获取		
//	var paraObj=JSON.parse(localStorage.getItem("paraObj"));//从pk获取		
//	var productId=paraObj.productId;
//	var productName=paraObj.productName;	
//	alert(JSON.stringify(paraObj))
//	var orgId=paraObj.orgId;
   	//从添加获取id和名字
 //  	if(localStorage.getItem("productId")){
// 		var productIds=JSON.parse(localStorage.getItem("productId"))	  
// 		productId=productId.concat(productIds);
// 		var productNames=JSON.parse(localStorage.getItem("productName"))
// 		productName=productName.concat(productNames)
// 		alert(productName.length)

   	//}
 		var productId=JSON.parse(localStorage.getItem("productId"))	  
 		var productName=JSON.parse(localStorage.getItem("productName"))
   	console.log(productName)
	//获取产品名
	/*for(var i=0;i<productName.length;i++){
		var ele=$(".product-item").eq(0).clone();
		ele.attr('proName',productName[i])
		ele.find(".cont").html(productName[i]);
		ele.show();
		$(".cont-list").append(ele);
	}*/
	var itemHtml=$("#itemHtml").html();															
	//模板引擎
	laytpl(itemHtml).render(productName,function(html){
		$(".cont-list").append(html);			
	})	
	var proHtml=$("#proHtml").html();
	laytpl(itemHtml).render(productId,function(html){
		//$(".cont-list").append(html);			
	})	
	//侧滑显示删除按钮
	var expansion = null; //是否存在展开的list
	var container = document.querySelectorAll('.list li');
	for(var i = 0; i < container.length; i++) {
		var x, y, X, Y, swipeX, swipeY;
		container[i].addEventListener('touchstart', function(event) {
			x = event.changedTouches[0].pageX;
			y = event.changedTouches[0].pageY;
			swipeX = true;
			swipeY = true;
//			if(expansion) { //判断是否展开，如果展开则收起
//				expansion.className = "product-item";
//			}
		});
		container[i].addEventListener('touchmove', function(event) {
			X = event.changedTouches[0].pageX;
			Y = event.changedTouches[0].pageY;
			// 左右滑动
			if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
				// 阻止事件冒泡	
				event.stopPropagation();
				if(X - x > 10) { //右滑		
					event.preventDefault();
					this.className = "product-item"; //右滑收起
				}
				if(x - X > 10) { //左滑
					event.preventDefault();
					this.className = "swipeleft"; //左滑展开
					expansion = this;
				}
				swipeY = false;
			
			}
			// 上下滑动
			if(swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
				swipeX = false;
			}
		});
	}
	//返回上一页
//	$("#back").click(function(){
//		WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
//	})
	//点击勾选,判断勾选的长度
	$(".product-item").click(function(){
		$(this).find('i').toggleClass('selected');
		var len=$('.product-item .selected').length;
		if(len>=2 && len<3){
			$(".compare").css("background","#cb9418")
		}else if(len>3){
			alert("对不起，最多只支持3款产品对比");
			$(this).find('i').toggleClass('selected');
//			WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
//                  message: "对不起，最多只支持3款产品对比"
//              },
//          function() {})
		}
	})
	//删除
	$(".list").on("click",".delete-btn",function(){
		$(this).parents("li").remove();
		var delItem = $(this).parents("li").attr('proName')
		var delId=$(this).parents("li").attr('proId')
		console.log(delItem)
		var index = productName.indexOf(delItem)
		var idDex=productId.indexOf(delId)
		productName.splice(index,1)
		productId.splice(index,1)
		console.log(productName)
		console.log(productId)
		localStorage.setItem("productName",JSON.stringify(productName));
		localStorage.setItem("productId",JSON.stringify(productId));
		//localStorage.removeItem("productId")
	})
	//点击开始对比
	$("#begin-compare").click(function(){
		//有没有选中勾选
		for(var i=0;i<$(".selected").length;i++){
			productIdArr.push($('.product-item').eq(i).attr('id'));
			productNameArr.push($('.product-item').eq(i).find('.cont').html());
		}
		//存储产品id和产品名字
		localStorage.setItem("productIdArr",JSON.stringify(productIdArr));
		localStorage.setItem("productIdNameArr",JSON.stringify(productNameArr));
		window.location.href="parameter.html"
	})
	//点击增加
	$("#add").click(function(){					
		window.location.href="add_product.html"
	})
	
})