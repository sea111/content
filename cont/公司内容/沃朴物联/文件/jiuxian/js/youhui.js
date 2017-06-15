/*---------------------header---------------------*/
$(function(){
	var open=true;
	$(".rig").click(function(){
		if(open){
			$("#nav").show()
		}else{
			$("#nav").hide()
		}
		open=!open
	})
	$(".grzx").click(function(){
		var login = localStorage.getItem("login")
		if(login){
			window.location.href = "html/personcenter.html"
		}else{
			window.location.href = "html/login.html"
		}
	})
	
})