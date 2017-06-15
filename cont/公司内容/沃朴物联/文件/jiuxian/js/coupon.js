
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
	$("#head .lef").on("click","img",function(){
		window.location.href="clearinghouse.html"
	})
	
})

