$(function(){
	//顶部点击事件
	var open1 = true;
	$('.cli').click(function(){
    	if(open1){  			
    		$(".nav").show();
    	}else{
   			$(".nav").hide();			
    	}
    	open1 = !open1;
    })
	$(".grzx").click(function(){
		var login = localStorage.getItem("login")
		if(login){
			window.location.href = "personcenter.html"
		}else{
			window.location.href = "login.html"
		}
	})
})