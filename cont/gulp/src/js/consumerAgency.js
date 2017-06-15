$(function(){
	var orginUrl = "https://h5.wpwl.org";//线上域名
	//var orginUrl = "https://prea.wpwl.org";
	var baseKeyStr = null;
	var urlRequest=getUrlRequest();//获取url中的信息
	var install=0;//没有选择是否安装点击提交,不能提交
	var installs=0;
	//获取链接中的数据
	function getUrlRequest() {
	    var url = location.search; //获取url中"?"符后的字串
	    var theRequest = new Object();
	    if (url.indexOf("?") != -1) {
	        var str = url.substr(1);
	        var regUrl = /^(\d+)/;
	        theRequest = regUrl.exec(str)[1];
	    }
	    return theRequest;
	}
	//获取企业服务中的key
	function getKeyStr(fn){	
	    $.ajax({
	        url: orginUrl+"/wpservice/getKey?clientType=5",
	        type:"POST",
	        success: function (res) {
//	            baseKeyStr = res.data;
	            fn && fn(res.data)
	            console.log(res.data)
	        }
	    });
	}
	//获取正品控中的key
	function getZPKKeyStr(fn){
		$.ajax({
	        url: orginUrl+"/wpwl/getKey?clientType=5",
	        type:"POST",
	        success: function (res) {
				fn && fn(res.data)
				console.log(res)
	        }
	    });
	}
	getZPKKeyStr(function(keyCode){
		commodityData(keyCode)
	})
//	getKeyStr()	
	//加密函数
    function doEncrypt(plaintText,baseKeyStr){
        var keyStr = base64decode(baseKeyStr);
        var key = CryptoJS.enc.Utf8.parse(keyStr);
        var encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        var encryptedBase64Str = encryptedData.toString();
        return encryptedBase64Str;
    } 
	//展示图片，产品名，品牌名，
	function commodityData(keyCode){
		window.labelCode=urlRequest.toString();//labelCode是标签编号
		$.ajax({
			type:"POST",
			url:orginUrl+'/wpwl/saleRecord/getById',
			timeout:10000,
			data:{
				serialNo:doEncrypt(labelCode,keyCode),
				"versionId":27
			},
			success:function(datas){
//				console.log(datas)
				if(datas.success==false){
//					alert(1)
					$(".picture").hide();
					$(".background").hide();
					$("#consumer-content").hide();
					$(".footer").hide();
					$("body").css("background","#F8F8F8");
					$(".loadEffect").hide().siblings(".middle").show();
					$(".middle img").attr('src',"images/vrf_wrong.png");
					$(".middle p").html("请先扫描商品上的防伪标签再进行相应的登记操作哟!");
					$(".loading").show();
				}else{
					try{
						if(datas.success){
							var dt=datas.data;
							window.isSold=dt.isSold;//判断是售出(yes)还是安装(no)
							var img=dt.productUrl;
							var brandName=dt.brandName;
							var standard=dt.standard;
							var productName=dt.productName;		
							window.orgId=dt.orgId;//orgId为公司id
							if(orgId==84){//orgId==84是菲斯格乐的公司
								//$(".commodity-status").hide();
								if(isSold=="yes"){
									$(".picture").hide();
									$(".consumer-agency").hide();
									$(".background").hide();
									$("#consumer-content").hide();
									$(".commodity-status").hide();
									$(".footer").hide();
									$("body").css("background","#F8F8F8")
									$(".loadEffect").hide().siblings(".middle").show();
									$(".middle img").attr('src',"images/commodityRepetition.png");
									$(".middle p").html("该商品已登记，请勿重复操作");		
									$(".loading").show();
								}else{
									$(".commodity-status").hide();
								}
							}else{
								if(isSold=="yes"){
									//出售
	//								consumer=1;
									install=3;
	//								agency=2;
	//								installs=5;
									$(".commodity-status").hide();
								}else if(isSold=="no"){
									//未出售
	//								consumer=1;
									install=0;
	//								agency=2;
	//								installs=5;
	//								installs=0;
									$(".commodity-status").show();
	//								$(".agency-identity").show()
								}
							}

							$(".brand-picture img").attr("src",img);
							$(".brand-name").html(brandName+"."+productName+" "+standard)
							/*$(".loading").hide();*/
						}
					}catch(e){
//						alert(2)
						$(".picture").hide();
						$(".consumer-agency").hide();
						$(".background").hide();
						$("#consumer-content").hide();
						$(".footer").hide();
						$("body").css("background","#F8F8F8");
						$(".loadEffect").hide().siblings(".middle").show();
						$(".middle img").attr('src',"images/vrf_wrong.png");
						$(".middle p").html("请先扫描商品上的防伪标签再进行相应的登记操作哟!");
						$(".loading").show();						
					}
				}
			},
			error:function(jqXHR, textStatus, errorThrown){
//				alert(2)
				if(textStatus=="timeout"){
					$(".picture").hide();
					$(".consumer-agency").hide();
					$(".background").hide();
					$("#consumer-content").hide();
					$(".footer").hide();
					$(".loadEffect").hide().siblings(".middle").show();
					$(".loading").show();					
				}
			}
		});
	}
//	commodityData()	
	//重新加载
	$("#wpReload").click(function(){
		commodityData(keyCode)
		window.location.reload()
	})	
	//商品状态及你的身份
	$(".finish-install").click(function(){
		install=3;
		$(this).css({"background":"#4e9cfc","color":"#fff"});
		$(".no-install-require").css({"background":"#f2f2f2","color":"#bdbdbd"})
	})
	$(".no-install-require").click(function(){
		install=4;
		$(this).css({"background":"#4e9cfc","color":"#fff"});
		$(".finish-install").css({"background":"#f2f2f2","color":"#bdbdbd"})
	})
/*	$(".install-master").click(function(){
		installs=5;
		$(this).css({"background":"#4e9cfc","color":"#fff"});
		$(".salesman").css({"background":"#f2f2f2","color":"#bdbdbd"})
	})
	$(".salesman").click(function(){
		installs=6;
		$(this).css({"background":"#4e9cfc","color":"#fff"});
		$(".install-master").css({"background":"#f2f2f2","color":"#bdbdbd"})
	})*/
	//错误时显示的颜色以及修改正确的颜色
	function correctColor(leftCorrect,rightCorrect){
		$(leftCorrect).css({"color":"#404040","background":"#fff"});
		$(rightCorrect).css({"border-top":"none","background":"#fff"})
	}
	function wrongColor(leftWrong,rightWrong){
		$(leftWrong).css({"color":"red","background":"#fee1e5"});
		$(rightWrong).css({"border-top":"2px solid #fee1e5","background":"#fee1e5"})
	}	
	//键盘弹起头部在中间在iOS中
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
		$(".commodity-list").on("focus","input",function(){
			$(".top").css({
				'position':'absolute'
			})
		})
	}
	//解决顶部脱离文档流
	function fix(){
		$(".top").css({
			'position':'fixed'
		})
		setTimeout(function(){
			var scrollTop=$(window).scrollTop();
			$(window).scrollTop(scrollTop)
		},1000/60)
	}
	//Toast提示
	var Toast = function(config){  
	    this.context = config.context==null?$('body'):config.context;//上下文  
	    this.message = config.message;//显示内容  
	    this.time = config.time==null?3000:config.time;//持续时间  
	    this.left = config.left;//距容器左边的距离  
	    this.top = config.top;//距容器上方的距离  
	    this.init();  
	}  
	var msgEntity;  
	Toast.prototype = {  
	    //初始化显示的位置内容等  
	    init : function(){  
	        $("#toastMessage").remove();  
	        //设置消息体  
	        var msgDIV = new Array();  
	        msgDIV.push('<div id="toastMessage">');  
	        msgDIV.push('<span>'+this.message+'</span>');  
	        msgDIV.push('</div>');  
	        msgEntity = $(msgDIV.join('')).appendTo(this.context);  
	        //设置消息样式  
	        var left = this.left == null ? this.context.width()/2-msgEntity.find('span').width()/2-20 : this.left;  
	        var bottom = this.bottom == null ? '20px' : this.bottom;  
	        msgEntity.css({position:'absolute',bottom:bottom,'z-index':'99',left:left,'background-color':'black',color:'white','font-size':'12px',padding:'10px',margin:'10px'});  
//		        msgEntity.hide();  
	    },  
	    //显示动画  
	    show :function(){  
	        msgEntity.fadeIn(this.time/2);  
	        msgEntity.fadeOut(this.time/2);  
	    }  	          
	}
	//验证码
	$("#get").click(function(){	
		if($("#writeNumber").val()!="" && reg.test($("#writeNumber").val())){
			if(!this.flag){	
				_t=this;
				getKeyStr(function(baseKeyStr){
					$.ajax({
						url:orginUrl+"/wpservice/device/getDeviceCaptcha",
						type:"POST",
						data:{
							mobile:doEncrypt($("#writeNumber").val(),baseKeyStr)
						},
						success:function(datas){
	
						}
					})
					_t.flag=true;		
					var timeSec=60;
					_t.innerHTML="60秒";
					var timer=setInterval(function(){
						_t.innerHTML=--timeSec+"秒";	
						if(timeSec==0){
							clearInterval(timer)
							_t.innerHTML="获取验证码";
							_t.flag=false;	
							$("#get").css({"color":"#ff7a11"})
						}
					},1000)		
				})
				$("#get").css({"color":"#404040"})	
			}			
		}
		fix();		
	})
	/*--------------------我是消费者的内容--------------------*/		
	//姓名
	window.pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）|{}【】‘；：”“'。，、？]");//特殊字符的正则表达式
	window.nameReg = /[\u4e00-\u9fa5a-zA-Z0-9]+$/	;//姓名的正则表达式
	window.numReg = /\d+$/;//数字的正则表达式
	window.numberReg = /^\d+$/;
	window.reg = /^1[3|4|5|7|8][0-9]{9}$/;//手机号的正则表达式	
	window.userErr={};//消费者的错误信息
	window.agencyErr={};//商家的错误信息
	$("#writeName").on("blur",function(e){	
		var writeName=$("#writeName").val();
		$("#writeName").attr('realVal',writeName);//填写有误时不清空,在基础上修改
		var err='writeName';//错误的信息
		if(writeName.length>0 && writeName.length<=5 && (!numReg.test(writeName)) && nameReg.test(writeName) && (!pattern.test(writeName))){			
			correctColor("#writeName",".name")	
			err=''
		}else if(writeName==""){	
			$("#writeName").val("姓名不能为空");		
            wrongColor("#writeName",".name")   
		}else if(pattern.test(writeName)){
			new Toast({context:$('body'),message:'含有非法字符或长度大于5'}).show(); 
			wrongColor("#writeName",".name")

		}else if(numReg.test(writeName)){
			new Toast({context:$('body'),message:'含有数字或长度大于5'}).show(); 
			wrongColor("#writeName",".name")

		}else{
			new Toast({context:$('body'),message:'姓名至多5个字'}).show(); 
			wrongColor("#writeName",".name")

		}	
		userErr['writeName']=err
		fix();
	})		
	$("#writeName").focus(function(){
		correctColor("#writeName",".name")
		$("#writeName").val($("#writeName").attr('realVal'))
		if($("#writeName").val()=="姓名不能为空"){
			$("#writeName").val("")
		}
	})
	//手机号
	$("#writeNumber").on("blur",function(e){	
		var writeNumber=$("#writeNumber").val();
		$("#writeNumber").attr('realVal',writeNumber);
		var err='writeNumber';
		if(reg.test(writeNumber)){
			correctColor("#writeNumber",".phonenumber")
			err=''
		}else if(writeNumber==""){
			$("#writeNumber").val("手机号不能为空")
            wrongColor("#writeNumber",".phonenumber")
		}else{
			new Toast({context:$('body'),message:'请填写正确的手机号'}).show(); 
			wrongColor("#writeNumber",".phonenumber")
		}	
		userErr['writeNumber']=err
		fix();
	})
	$("#writeNumber").focus(function(){
		correctColor("#writeNumber",".phonenumber")
		$("#writeNumber").val($("#writeNumber").attr('realVal'))
		if($("#writeNumber").val()=="手机号不能为空"){
			$("#writeNumber").val("")
		}
	})
	//验证码
	$("#writeCode").blur(function(){
		var err='writeCode';
		if($("#writeCode").val().length>6){
			new Toast({context:$('body'),message:'长度大于6'}).show(); 
		}else{
			err=''
		}
		userErr['writeCode']=err
	})
	//住址
	$("#writeAddress").on("blur",function(e){
		var writeAddress=$("#writeAddress").val();
		$("#writeAddress").attr('realVal',writeAddress);
		var err='writeAddress';
		if(writeAddress.length>0 && writeAddress.length<=30 && (!pattern.test(writeAddress))){			
			correctColor("#writeAddress",".address");
			err=''
		}else if(writeAddress==""){
			$("#writeAddress").val('');
			correctColor("#writeAddress",".address");
			err=''
		}else if(pattern.test(writeAddress)){
			new Toast({context:$('body'),message:'含有非法字符或长度大于5'}).show(); 
			wrongColor("#writeAddress",".address");

		}else{
			new Toast({context:$('body'),message:'住址至多30个字'}).show(); 
			wrongColor("#writeAddress",".address");

		}	
		userErr['writeAddress']=err
		fix();
	})
	$("#writeAddress").focus(function(){
		correctColor("#writeAddress",".address")
		$("#writeAddress").val($("#writeAddress").attr('realVal'))
	})
	//产品型号
	$("#writeProduct").on("blur",function(e){
		var writeProduct=$("#writeProduct").val();
		$("#writeProduct").attr('realVal',writeProduct);
		var err='writeProduct';
		if(writeProduct.length>0 && writeProduct.length<=50 && (!pattern.test(writeProduct))){
			correctColor("#writeProduct",".product-model")
			err=''
		}else if(writeProduct==""){
            $("#writeProduct").val("")
            correctColor("#writeProduct",".product-model")
            err=''
		}else if(pattern.test(writeProduct)){
			new Toast({context:$('body'),message:'含有非法字符'}).show(); 
			wrongColor("#writeProduct",".product-model")
		}else{
			new Toast({context:$('body'),message:'产品型号至多50个字'}).show(); 
			wrongColor("#writeProduct",".product-model")
			 
		}	
		userErr['writeProduct']=err
		fix();
	})
	$("#writeProduct").focus(function(){
		correctColor("#writeProduct",".product-model")
		$("#writeProduct").val($("#writeProduct").attr('realVal'))
	})
	//购买数量
	$("#writeNum").on("blur",function(e){
		var writeNum=$("#writeNum").val();
		$("#writeNum").attr('realVal',writeNum);
		var err='writeNum';
		if(writeNum.length>0 && writeNum.length<=4 && numberReg.test(writeNum)){
			correctColor("#writeNum",".number")
			err=''
		}else if(writeNum==""){
			$("#writeNum").val("")
			correctColor("#writeNum",".number")	
			err=''
		}else{
			new Toast({context:$('body'),message:'购买数量至多4个或只能输入数字'}).show(); 
			wrongColor("#writeNum",".number");
		}	
		userErr['writeNum']=err
		fix();
	})
	$("#writeNum").focus(function(){
		correctColor("#writeNum",".number")
		$("#writeNum").val($("#writeNum").attr('realVal'))
	})
	//备注
	$("#writeMore").on("blur",function(e){
		var writeMore=$("#writeMore").val();
		$("#writeMore").attr('realVal',writeMore);
		var err='writeMore';
		if(writeMore.length>0 && writeMore.length<=200 && (!pattern.test(writeMore))){
			correctColor("#writeMore",".remark")
			err=''
		}else if(writeMore==""){
			$("#writeMore").val("")
			correctColor("#writeMore",".remark")
			err=''
		}else if(pattern.test(writeMore)){
			new Toast({context:$('body'),message:'含有非法字符或长度大于200'}).show(); 
			wrongColor("#writeMore",".remark")
		}else{
			new Toast({context:$('body'),message:'备注至多200个字'}).show(); 
			wrongColor("#writeMore",".remark")
		}	
		userErr['writeMore']=err
		fix();
	})
	$("#writeMore").focus(function(){
		correctColor("#writeMore",".remark")
		$("#writeMore").val($("#writeMore").attr('realVal'))
	})
	//点击提交
	$(".submit").click(function(){
			//判断商品状态以及是否为菲斯格乐公司
			if(install!==3 && install!==4&&orgId!=84){
				new Toast({context:$('body'),message:'商品状态不能为空'}).show();
			}else{
				if(!$(this).hasClass("disabled")){//点击提交的次数
					$("#writeName").blur();
					$("#writeNumber").blur();
					$("#writeAddress").blur();
					$("#writeProduct").blur();
					$("#writeNum").blur();
					$("#writeMore").blur();
					$("#writeCode").blur();
					var err=false;
					for(var name in userErr){
						if(userErr[name]){
							err=true;
						}
					}
					if(err){
						new Toast({context:$('body'),message:'数据有误'}).show(); 
						for(var name in userErr){
							userErr[name]=''
						}
					}else{
						var $t=$(this);
						$(this).addClass("disabled");
						var dts={};
				  		window.type="";
						if(orgId==84){//公司是否是菲斯格乐
							if(isSold=="no"){
								type="1";
							}
							
						}else{
							if(isSold=="yes"){
								type="0"
							}else if(isSold=="no"){
								if(install==4){
					  				//install=3代表安装=4代表不安装0-安装//1-售出//2-both
					  				type="1";
						  		}else if(install==3){
						  			type="2";
						  		}
							}
						}
				  		getKeyStr(function(baseKeyStr){
				  			if($("#consumer-content:visible").length){
					  			dts={
					  				"labelCode":doEncrypt(labelCode,baseKeyStr),
									"consumerName":doEncrypt($("#writeName").val(),baseKeyStr),
									"consumerMobile":doEncrypt($("#writeNumber").val(),baseKeyStr),
									"consumerAddress":doEncrypt($("#writeAddress").val(),baseKeyStr),
									"captcha":doEncrypt($("#writeCode").val(),baseKeyStr),
									"standard":doEncrypt($("#writeProduct").val(),baseKeyStr),
									"quantity":doEncrypt($("#writeNum").val(),baseKeyStr),
									"remark":doEncrypt($("#writeMore").val(),baseKeyStr),
									"type":doEncrypt(type,baseKeyStr)
								}
					  		}
					  		$.ajax({
								type:"POST",
								url:orginUrl+"/wpservice/device/install29",
								async:true,
								data:dts,
								timeout:10000,
								success:function(datas){
									$t.removeClass("disabled")
									if(datas.success){
										if(orgId==84){		
											if(isSold=="yes"){
									  			$(".picture").hide();
												$(".consumer-agency").hide();
												$(".background").hide();
												$("#consumer-content").hide();
												$(".commodity-status").hide();
												$(".footer").hide();
												$("body").css("background","#F8F8F8")
												$(".loadEffect").hide().siblings(".middle").show();
												$(".middle img").attr('src',"images/commodityRepetition.png");
												$(".middle p").html("该商品已登记，请勿重复操作");
												$(".loading").show();												
											}else{
//												$(".picture").show();
//												$(".consumer-agency").hide();
//												$(".background").show();
//												$("#consumer-content").show();
//												$(".commodity-status").hide()
//												$(".footer").show();
//												$(".loading").hide();
												$(".picture").hide();
												$(".consumer-agency").hide();
												$(".background").hide();
												$("#consumer-content").hide();
												$(".commodity-status").hide();
												$(".footer").hide();
												$("body").css("background","#F8F8F8")
												$(".loadEffect").hide().siblings(".middle").show();
												$(".middle img").attr('src',"images/enterSuccess.png");
												$(".middle p").html("登记成功");
												$(".loading").show();												
											}
								  		}else if(orgId!==84){
								  			$(".picture").hide();
											$(".consumer-agency").hide();
											$(".background").hide();
											$("#consumer-content").hide();
											$(".commodity-status").hide();
											$(".footer").hide();
											$("body").css("background","#F8F8F8")
											$(".loadEffect").hide().siblings(".middle").show();
											$(".middle img").attr('src',"images/enterSuccess.png");
											$(".middle p").html("登记成功");
											$(".loading").show();											
								  		}
									}else{
										var mes=datas.errMsg;
										new Toast({context:$('body'),message:mes}).show();
									}
								},
								error:function(jqXHR, textStatus, errorThrown){
									if(textStatus=="timeout"){
										new Toast({context:$('body'),message:'网络超时'}).show();				
									} 
									$t.removeClass("disabled");
									
								}
							});
					  	})
						fix();
					}	
				}			
			}
					

	})
	/*--------------------我是商家的内容--------------------*/

})
    