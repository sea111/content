$(function(){
	//WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});	
	//加密getKey(params,sus)params是需要加密的参数
	//var orgId=getUrlRequest().orgId;
/*	function getKey(params){
		$.ajax({
			url:wpCommon.Url+"/wpwl/getKey",
			type:'post',
			success:function(res){
				key=res.data;
				getData(params);
			}
		})
	}
	getKey(orgId);*/
	getData();
	function getData(params){
//		WPBridge.callMethod("JsInvokeNative", "wpEncrypt", {
//			key: key,
//			params: [params]
//		},function(msg){
			$.ajax({
				//url:wpCommon.Url+"/wpwl/product/getAllProduct" ,
//				type:"post",
//				data:{
//					versionId: "27",
//					orgId: msg.data.result[0]
//				},
				url:"JSON/add_product.json",
				type:"get",
				timeout:10000,
				success:function(res){
					if(res.errMsg == "AES加密解密失败"){
//						if(!keyFlag){
//							getKey(params);
//							keyFlag=true;
//						}
					}else if(res.success==false){
						$("#content").hide();
						$(".loading").show();
						$(".middle img").attr('src',"images/error_else.png");
						$(".middle p").html("出错了，请稍后再试");
//						wpCommon.viewShow();
					}else{
						try{
							/*if(res.success){
								addData= res.data;
								for(var i=0;i<addData.length;i++){
									//console.log(addData[i])
									var ele=$(".content-cont").eq(0).clone();
									ele.find(".series").html(addData[i].xilie);
									ele.find(".cont").html(addData[i].cont)
									ele.show()
									$("#content").append(ele);
								}
							}*/
							if(res.success){
								addData= res.data;
								console.log(addData)
								var str="";
								str+='<p class="com series">弓剑系列(ARCSABER)</p>'
								for(var i=0;i<addData.length;i++){
									str+='<ul class="conts">'
									str+='<li class="com cont" productId='+addData[i].id+' productName='+addData[i].cont+'>'+addData[i].cont+'</li>'
									str+='</ul>'
									$(".conts").append(str)
								}
								$(".content-cont").append(str);
							}
						}catch(e){
							$("#content").hide();
							$(".loading").show();
							$(".middle img").attr('src',"images/error_else.png");
							$(".middle p").html("出错了，请稍后再试");
							$(".top div").html("异常页面")
						}
//						wpCommon.viewShow();
					}
				},
				error:function(jqXHR, textStatus, errorThrown){
					if(textStatus=="timeout"){
						$("#content").hide();
						$(".loading").show();
						$(".loading").show();
						$(".top div").html("网络异常")
					}
//					wpCommon.viewShow();
				}
			})
//		})		
	}
	var cont;//获取名字
	var id;//获取ID
/*	$.ajax({
		type:"get",
		url:"JSON/add_product.json",
		async:true,
		success:function(res){
			if(res.success){
				addData= res.data;
				console.log(addData)
				var str="";
				str+='<p class="com series">弓剑系列(ARCSABER)</p>'
				for(var i=0;i<addData.length;i++){
					str+='<ul class="conts">'
					str+='<li class="com cont" productId='+addData[i].id+' productName='+addData[i].cont+'>'+addData[i].cont+'</li>'
					str+='</ul>'
					$(".conts").append(str)
				}
				$(".content-cont").append(str);
			}
		}
	});*/
	//点击li跳转变色
	$("#content").on("click",".cont",function(){	
		/*var index=$(this).parent().index()-2;
		alert(index)*/
		var productId=$(this).attr("productId");
		var productName=$(this).attr("productName");
		localStorage.setItem("productId",productId);
		localStorage.setItem("productName",productName);
		$(this).css("background","#f5f5f5");
		window.location.href="product_item.html"					
	})
	//返回上一页
/*	$("#back").click(function(){
		WPBridge.callMethod('JsInvokeNative','wpH5Back',{},'');
	})
	//点击重新加载
	$("#wpReload").click(function(){
		getData();
		getKey(workOrder,cId);
	})*/
})
