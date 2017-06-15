$(function(){
//	WPBridge.callMethod("JsInvokeNative", "wpShowLoadingDialog", {},function() {});	
//	window.aesFail = "";
	var crop;
	var base64picUrl = "";
	var canvas=document.getElementById('myCanvas');
	var context=canvas.getContext('2d');
	var base64DataArray=[];
	var serviceDetail=JSON.parse(localStorage.getItem('serviceDetail'));
	var workOrder=localStorage.getItem("workOder");
	var contents=localStorage.getItem("contents");
	var stars=localStorage.getItem("stars")
	
	//加密
//	$.ajax({
//		type:"post",
//		url:wpCommon.Url+"/wpwl/getKey",
//		async:true,
//		success:function(datas){
//			key=datas.data;
//			localStorage.setItem('key',datas.data)
//			actionList(key);
//		}
//	});
	
	
//	$('.valuate-left img').attr('src',serviceDetail.iconURL);
//	$(".valuate-name").html(serviceDetail.name).siblings('.schedule-model').html(serviceDetail.standard);
//	$(".work").html(serviceDetail.workOrder).siblings('.type').html(serviceDetail)
//	var starErr={};
	$(".gray").click(function(){
/*		var err='gray';
		starErr['gray']=err*/
		var $ele=$(".gray")
		var num=$(this).attr('index');
		var satisfy=$(".satisfaction-level");
		for(var i=0;i<num;i++){
			$ele.eq(i).attr('src','images/lightStar.png')
		}
		for(var j=num;j<5;j++){
			$ele.eq(j).attr('src','images/grayStar.png')
		
		}
		switch(Number(num)){
			case 1:satisfy.html('很不满意');break;
			case 2:satisfy.html('不满意');break;
			case 3:satisfy.html('满意');break;
			case 4:
				satisfy.html('比较满意');
			break;
			case 5:satisfy.html('非常满意');break;
		}
	})
	
	$("#choose-pic").one("click", function () {
		var imgEle=document.createElement('img');
//		crop=null;
//      crop = new Crop({ fileId: "fileGet", canvasId: "myCanvas" });
//		imgEle.src=crop.getPicture();
		$(".photo-item").append(imgEle);
		
//      $(".img_tips").append('<canvas id="myCanvas" width="740" height="394" style="border:1px dashed #d3d3d3;display: none"></canvas>')
        //$('#file_get').click();
   	});
   
   	
    $("#choose-pic").on('change',function(){
    	$('.mask').show();
			var files = event.target.files,
		        file;
		        console.log(typeof files)
		    if (files && files.length > 0) {
		        file = files;
		    }
		    if(file.length>5){
		    	alert("2")
		    }
		    for(var i=0;i<file.length;i++){
		    	var fileReader = new FileReader();
		    	fileReader.readAsDataURL(file[i])
				fileReader.onload = function (event) {
					console.log(event.target.result)
					var ele="<div><img src="+event.target.result+"></div>"
				    $('.photo-item').append(ele);
				    picTimer=setInterval(function(){
				    	if(event.target.result){
				    		clearInterval(picTimer);
				    		$(canvas).show()
				    		var base64Data=canvas.toDataURL('image/jpeg');
				    		$(canvas).hide();
				    		base64Data=base64Data.split('data:image/jpeg;base64,')[1];
				    		base64DataArray.push(base64Data);
				    		$('.mask').hide();
				    	}
				    },30)
				};
		    }
		    
//			addForm();
//			img++;
    })
	//点击文本域
	var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]");
	$(".feel-inp").blur(function(){
		var feelText=$(".feel-inp").val()
		console.log(feelText)
		if(regRule.test(feelText) || pattern.test(feelText)){
	    	 alert("不支持表情及特殊字符，提交失败。");
//	    	WPBridge.callMethod("JsInvokeNative", "wpShowToast", {
//				message: "不支持表情及特殊字符，提交失败。"
//			}, "")
	    }
	})
    //点击提交
   	$(".submit").click(function(){
   		if(!$(this).hasClass("disabled")){
	    	/*var err=false;
			for(var name in starErr){
				if(starErr[name]){
					err=true;
				}
			}
			if(err){
				new Toast({context:$('body'),message:'数据有误'}).show(); 
				for(var name in starErr){
					starErr[name]=''
				}
			}else{*/
				var $t=$(this);
				$(this).addClass("disabled");
			/*WPBridge.callMethod("JsInvokeNative","wpEncrypt",{
					key:key,
					params:[workOrder,contents,stars]
			},function(msg){
				codeValue=msg.data.result;    	
		    	$.ajax({
		    		type:"post",
		    		url:"wpwl/asevaluation/evaluation",
		    		async:true,
		    		data:{
		    			workOrder:codeValue[0],
						contents:codeValue[1],
						stars:codeValue[2]
		    		}
		    		success:function(){
		    			$t.removeClass("disabled")
		    		}，
		    		error:function(){
		    			$t.removeClass("disabled")
		    		}
		    	});
	    	});*/
	//		WPBridge.callMethod("JsInvokeNative", "wpHitDotEvent", {
	//	        eventId:"h5_e094",
	//	        otherId:""
	//	   	},
	//	    function() {});
	    	/*}*/
	    	window.location.href="afterSaleDetail.html";
		}
    	
    })
   	
   	function addMaskImg(data,imgIndex){
	 	var html = template("test", data);
		$("#content").append(html);
		var transDis = -document.documentElement.clientWidth * (imgIndex);
		$(".swiper-mask .swiper-wrapper").css("transform", "translate3d(" + transDis + "px, 0px, 0px)");
		refreshMaskBig();
	}

   	$(document).on('click','.photo-item img',function(){
   		console.log(4)
   		var data={
   			imgUrl:[this.src]
   		}
	 	addMaskImg(data,0)
	})
   	function refreshMaskBig() {
		new Swiper(".swiper-mask", {
			zoom: true,
			onClick: function(e) {
				myScroll.scrollTo(0, initY, 0, IScroll.utils.ease.circular);
				if(pageType!=1){
					$("#bottom").show();
					if(pageType==3){
						finishPoint()
					}	
				}
				$(".swiper-mask").remove();
			},
			onSlideChangeEnd: function(swiper) {
				$(".swiper-mask img").each(function() {
					var $t = $(this);
					if($t.css("transform") != "none") {
						$t.css("transition-duration", 0)
					}
				})
			}
		})
	}
})
	 function fileCountCheck(objForm){
	 	if (window.File && window.FileList) {
	   		var fileCount = objForm["mulUp[]"].files.length;
		   	if(fileCount > 2){
		    	window.alert('文件数不能超过10个，你选择了' + fileCount + '个');
		   	}
		   	else {
		    window.alert('符合规定');
		   	}
		}else {
		   window.alert('抱歉，你的浏览器不支持FileAPI，请升级浏览器！');
		 }
	  return false;
	 }
	 
	 
	