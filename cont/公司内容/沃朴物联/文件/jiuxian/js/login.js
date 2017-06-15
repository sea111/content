$(function(){
	//点击事件
	$(".daohang1").on("click",function(){
		$(".nav").toggle()
	})
	
	
//----------------------------------------------------	
	$(".phonenum").focus(function(){
		$(".mess1").css("display","block")
		$(this).val("")
	})
	$(".phonenum").blur(function(){
		var name=$(this).val();
		
		if(name==""){$(".mess1").css("color","#f00").text("用户名不能为空")
			
		}
		else if(name.length!=11||isNaN(name)){$(".mess1").css("color","#f00").text()}
		else{$(".mess1").css("color","#00f").text("输入正确")}
	})
	//验证码生成函数
	function get_yzm(){
		var n=0;
		var num=0;
		var str="";
		do{
			num=Math.round(Math.random()*57+65);
			if(num>=48&&num<=57||num>=65&&num<=90||num>=97&&num<=122){
				str+=String.fromCharCode(num);
				n++;
			}
		}while(n<4);
		$(".yansheng").text(str)
	}
	get_yzm();
	$(".yanbtn").click(function(){
		get_yzm();
	});
	$(".yanshu").focus(function(){
		$(".mess2").css("display","block")
		$(this).val("")
	})
	$(".yanshu").blur(function(){
		if($(this).val==""){
			$(".mess2").css("color","#f00").text("请填写验证码！");
		}
		var re=new RegExp($(".yansheng").text(),"i");
		if(re.test($(this).val())&&$(this).val().length==4){
			$(".mess2").css("color","#00f").text("验证码正确！")
		}else{
			$(".mess2").css("color","#f00").text("验证错误！")
		}
	})
	//短信验证码
	$(".jiaoshu").click(function(){
		$(".mess3").css("display","block")
		$(this).val("")
	})
	$(".jiaoshu").blur(function(){
		if(isNaN($(this).val())||$(this).val().length!=4){
			$(".mess3").css("color","#f00").text("校验码错误")
		}else{
			$(".mess3").css("color","#00f").text("校验码正确")
		}
	})
	//验证码
	//短信验证码
	$(".jiaoshu2").click(function(){
		$(".mess3").css("display","block")
		$(this).val("")
	})
	$(".jiaoshu2").blur(function(){
		if(isNaN($(this).val())||$(this).val().length!=6){
			$(".mess3").css("color","#f00").text("校验码错误")
		}else{
			$(".mess3").css("color","#00f").text("校验码正确")
		}
	})
	//密码
	$(".pass").focus(function(){
		$(this).val("")
		$(".mess4").css("display","block")
	})
	$(".pass").blur(function(){
		
		if($(this).val()==""){
			$(".mess4").css("color","#f00").text("密码不能为空")
		}
		else if($(this).val().length<6||$(this).val().length>16){
			$(".mess4").css("color","#f00").text("密码长度为6—16个字符！");
		}
		else{
			$(".mess4").css("color","#00f").text("密码符合");
		}
	})
	//密码确认
	$(".repass").focus(function(){
		$(this).val("")
		$(".mess5").css("display","block")
	})
	$(".repass").blur(function(){
		
		if($(this).val()==""){
			$(".mess5").css("color","#f00").text("密码不能为空")
		}
		if($(this).val()!=$(".pass").val()){
			$(".mess5").css("color","#f00").text("与原密码不一致")
		}else{
			$(".mess5").css("color","#00f").text("与原密码一致")
		}
		
	})

	$(".queding1").click(function(){
		var name=$(".phonenum1").val();
		var pass=$(".pass1").val();
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{status:"login",   
                  userID:name,  
                  password:pass
                 },
			
			success:function(msg){
				if(msg==0){
					$("#box1").css("display","block")
					$(".qingk1").css("display","block")					
				}else if(msg==2){
					$("#box2").css("display","block")
					$(".qingk2").css("display","block")
					
				}else if($(".yansheng").text()!=$(".yanshu").val()){
					$("#box3").css("display","block")
					$(".qingk3").css("display","block")
				}else{
					$("#box4").css("display","block")
					$(".qingk4").css("display","block")
					
					localStorage.name=name
					localStorage.login=true
				}
			}
			
		});
	})
	$(".queding2").click(function(){
		var name=$(".phonenum2").val();
		var pass=$(".jiaoshu2").val();
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{status:"login",   
                  userID:name,  
                  password:pass
                 },
			
			success:function(msg){
				if(msg==0){
					$("#box1").css("display","block")
					$(".qingk1").css("display","block")
					
				}else if(msg==2){
					$("#box2").css("display","block")
					$(".qingk2").css("display","block")
					
				}else if($(".yansheng").text()!=$(".yanshu").val()){
					$("#box3").css("display","block")
					$(".qingk3").css("display","block")
				}
				
				else{
					$("#box4").css("display","block")
					$(".qingk4").css("display","block")
					
					localStorage.name=name
					localStorage.login=true
				}
			}
			
		});
	})
/*--------------------------headerjs-------------------------------*/

/*----------------------------登陆的script-------------------------------------*/
$("#zhanghao").click(function(){
		$(this).css({'color': '#FF0000','border-bottom': '1px solid #FF0000'})
	    $("#shouji").css({'color':'#5d5d5d','border':'none'})
		$(".form1").show()
		$(".form2").hide()
		
		
	})
	$("#shouji").click(function(){
		$(".form1").hide()
		$(".form2").show()
		$(this).css({'color': '#FF0000','border-bottom': '1px solid #FF0000'})
		$("#zhanghao").css({'color':'#5d5d5d','border':'none'})
	})
$(".grzx").click(function(){
	var login = localStorage.getItem("login")
	if(login){
		window.location.href = "personcenter.html"
	}else{
		window.location.href = "login.html"
	}
	
})

$(".qingk1 #btn1").click(function(){
		window.location.href="login.html"
		$("input").val("")
	})
	$(".qingk2 #btn2").click(function(){
		window.location.href="login.html"
		$("input").val("")
	})
	$(".qingk3 #btn3").click(function(){
		window.location.href="login.html"
		$("input").val("")
	})
	$(".qingk4 #btn4").click(function(){
		window.location.href="../index.html"
		$("input").val("")
	})
})

































