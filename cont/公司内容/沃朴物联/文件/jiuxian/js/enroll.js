
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
		else if(name.length!=11||isNaN(name)){$(".mess1").css("color","#f00").text("请输入正确的手机号")}
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
			$(".mess3").css("color","#f00").text("短信验证码错误")
		}else{
			$(".mess3").css("color","#00f").text("短信验证码正确")
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
//	$(".xieyi").click(function(){
//		if(this.checked==true){
//			$(".regbtn")[0].disabled=false;
//			$(".regbtn")[0].style.background="#f00"
//		}else{
//			$(".regbtn")[0].disabled=true;
//			$(".regbtn")[0].style.background="#888"
//		}
//	})
	$(".queding").click(function(){
		var name=$(".phonenum").val();
		var pass=$(".pass").val();
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			data:{status:"register",   
                  userID:name,  
                  password:pass
                 },
			//dataType:"json",
			success:function(msg){
				if(msg==0){
					$("#box1").css("display","block")
					$(".qingk1").css("display","block")
					
				}else if(msg==1){
					$("#box2").css("display","block")
					$(".qingk2").css("display","block")
				}else if(msg==2){
					$("#box3").css("display","block")
					$(".qingk3").css("display","block")
					
				}
			}
			//error:function(err){}
		});
	})
/*--------------------------headeascript--------------------------------*/
$("#header .right .right_two .bangzhu").mouseover(function(){
		$(this).css("border","1px solid #ccc")
		$("#header .right .right_two .right_twoxia").css("display","block")
	})
	$("#header .right .right_two .bangzhu").mouseout(function(){
		$(this).css("border","none")
		$("#header .right .right_two .right_twoxia").css("display","none")
	})
	$("#header .right .right_two .right_twoxia").mouseover(function(){
		$("#header .right .right_two .bangzhu").css("border","1px solid #ccc")
		$("#header .right .right_two .right_twoxia").css("display","block")
	})
	$("#header .right .right_two .right_twoxia").mouseout(function(){
		$("#header .right .right_two .bangzhu").css("border","none")
		$("#header .right .right_two .right_twoxia").css("display","none")
	})
	$(".qingk1 #btn1").click(function(){
		window.location.href="enroll.html"
		$("input").val("")
	})
	$(".qingk2 #btn2").click(function(){
		window.location.href="login.html"
		$("input").val("")
	})
	$(".qingk3 #btn3").click(function(){
		window.location.href="enroll.html"
		$("input").val("")
	})
})
