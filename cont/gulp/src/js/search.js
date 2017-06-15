$(function(){
	//品牌id
	WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});
	window.aseFail = "";
	var brandId=localStorage.getItem("brandid");
	//搜索keyword
	var searchname=localStorage.getItem("searchName");
	var resultId=localStorage.getItem("resultid");
	var ResultName=localStorage.getItem("resultName");
	//加密时获取key值。
	$.ajax({
		type:"post",
		url:wpCommon.Url+'/wpwl/getKey',
		async:true,
		success:function(res){
			key = res.data;
			localStorage.setItem('key',res.data)
			search(key);
		}
	})
	//点击搜索进入的页面搜索发现下面展示的内容。
	function search(key){
		WPBridge.callMethod("JsInvokeNative","wpEncrypt",{key:key,params:[brandId,1,20]},function(msg){codeValue=msg.data.result;
			$.ajax({
				type:"post",
				data:{
					"brandId":codeValue[0],
					"pageIndex":codeValue[1],
					"pageSize":codeValue[2]
				},
				url:wpCommon.Url+"/wpwl/category/listByPage",
				async:true,
				timeout:2000,
				success:function(datas){
					if(datas.errMsg == "AES加密解密失败"){
						if(!aseFail){
							$.ajax({
								type:"post",
								url:wpCommon.Url+'/wpwl/getKey',
								success:function(res){
									key = res.data;
									localStorage.setItem('key',res.data)
									search(key);
									result(key)
								}
							})
							aseFail=true;
						}
					}else{
						var message=datas.data.list;		
						var str="";
						for(var i in message){
							str+="<ul>";
							str+="<li resultid='"+ message[i].categoryId +"' resultName='"+message[i].categoryName+"' class='l xiLie'>"+message[i].categoryName+"</li>"
							str+="</ul>"
						}
						$("#content").append(str);
						WPBridge.callMethod("JsInvokeNative", "wpShowWebView", {},
					    function() {});
					    WPBridge.callMethod("JsInvokeNative", "wpDismissLoadingDialog", {},
					    function() {});
					}
				},
				error:function(){
					WPBridge.callMethod("JsInvokeNative", "wpShowWebView", {},
		            function() {});
		            WPBridge.callMethod("JsInvokeNative", "wpDismissLoadingDialog", {},
		            function() {});
				},
				complete:function(xml,status){
					if(status=='timeout'){
						WPBridge.callMethod("JsInvokeNative", "wpShowWebView", {},
			            function() {});
			            WPBridge.callMethod("JsInvokeNative", "wpDismissLoadingDialog", {},
			            function() {});
					}	
				}
			})
		});
	}
	$("#content").on('click','.xiLie',function(event){	
		event.preventDefault();
		var resultId = $(this).attr("resultid")
		var resultName = $(this).attr("resultName")
		//键值是图片的属性dataid;
		localStorage.setItem("resultid",resultId);
		localStorage.setItem("resultName",resultName)
		WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
            eventId:"h5_e008",
            otherId:resultId
       	},
        function() {});
		window.location.href="result.html?pageId=H5_A007";	
	})
	$("#inp").focus()
	$("#inp").on("keyup",function(e){
		var inpt=$("#inp").val();
		localStorage.setItem("searchVal",inpt);
		if(e.keyCode===13){
			if($(this).val()){
				WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
	                eventId:"h5_e008",
	                otherId:inpt
	           	},
	            function() {});
				var pat=new RegExp("[ /a-zA-Z0-9\u4e00-\u9fa5-——()（）]")
				if(pat.test($(this).val())){
					var inpt=$(this).val().replace(/（/g,'(');
					var inpt=inpt.replace(/）/g,')');
					var inpt=inpt.replace(/—/g,'-');
					var inpt=inpt.replace(/　/g,' ');
					localStorage.setItem("searchVal",inpt);
					window.location.href="searchResult.html?pageId=H5_A007";
				}else{				
					WPBridge.callMethod('JsInvokeNative','wpShowToast',{message:'字符格式不合法'},function(){});
				}
			}else{
				//框中为空时，搜索的页面。
				WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
                    message: "型号和名称不能为空"
                },
                function() {})
			}
		}
	});
})
$(function(){
	$(".cancle").on("touchstart",function(){
	      WPBridge.callMethod("JsInvokeNative", "wpFinishH5", {},
	      function() {})
	})	
})
