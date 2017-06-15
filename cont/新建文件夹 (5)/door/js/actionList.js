//	WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});	
	var pageIndex=1;
	var pageSize=4;
	var complete=true;
	var total=0;
	var scrollEndTimer=null
	function actionList(page,flag){
		page=page || 1;
		$.ajax({
			type:"get",
			url:"json/data.json",
			async:true,
			timeout:10000,
			beforeSend:function(){
				//$(".loadEffect").show().siblings(".middle").hide()
			},
			success:function(datas){
				if(datas.errMsg=="AES加密解密失败"){
					if(!flag){
						getData(true);
					}
				}else if(datas.success==false){
					//$(".loadEffect").hide().siblings(".middle").show().find('img').attr('src','images/notFound.png').siblings('p').html("活动异常<br />关联产品或活动已下架")
				}else{
					try{
						var str="";
						var mes=datas.data.list;
						for(var i in mes){
							str+='<div id="listCont" actionId='+mes[i].productId+'>'
							str+='<div class="cont">'
							str+='<div class="title">小钢炮<span class="titleColor">'+mes[i].saleStatus+'</span></div>'
							str+='</div>'
							str+='<dl class="listBox">'
							str+='<dt class="imgLeft"><img src="'+mes[i].iconUrl+'"/></dt>'
							str+='<dd class="character">'
							str+='<p class="actShare">'+mes[i].standard+'</p>'
							str+='<p class="actTime">活动时间：<span class="time">'+mes[i].actTime+'</p>'
							str+='</dd>'
							str+='</dl>'
							str+='</div>'
						};
						$("#listContent").append(str);
						pageIndex++;
						total=Math.ceil(res.total/pageSize);
						complete=true;
					}catch(e){
						//$(".loadEffect").hide().siblings(".middle").show();
						//$(".middle img").attr('src',"images/error_else.png");
						//$(".middle p").html("出错了，请稍后再试");
					}
				}	
			},
			error:function(jqXHR, textStatus, errorThrown){
				//$(".content").hide();
				//$(".loadEffect").hide().siblings(".middle").show()
			}
		});	
	}	
	actionList(pageIndex)
	//重新加载
	$("#wpReload").click(function(){
		actionList();
	})
	//下拉加载
	$(window).on('scroll',function(){
		var scrollTop=$(this).scrollTop();
		clearTimeout(scrollEndTimer);
		scrollEndTimer=setTimeout(function(){
			var scroll=scrollTop+$(window).height();
			var len=Math.ceil($('.listCont').length/2);
			var wh=$('#box').height()+$('.listCont').height()*len;
			if(scroll>(wh-10)){
				if(complete && pageIndex<=total){
					$(".loadEffect").css({
						top:$(".loadEffect").offset().top+scrollTop
					})
					$(".loading").show().siblings(".middle").hide()
					getList(pageIndex)
				}
			}
		},300)
	})
	//跳转到活动详情
//	$("#listCont").click(function(){
//		var actionId=$(this).attr("actionId");
//		localStorage.setItem("actionId",actionId)
//		WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
//	        eventId:"h5_e069",
//	        otherId:actionId
//	   	},
//	    function() {});
//		window.location.href="shareRebate.html?pageId=H5_C013&productId="+actionId;
//	})
	//返回上一页
//	$(".back").click(function(){
//      WPBridge.callMethod("JsInvokeNative", "wpFinishH5", {},
//      function() {})
// 	});
