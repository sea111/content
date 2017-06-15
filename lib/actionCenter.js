$(function(){
	$(".myActivities").click(function(){
		$(this).css("background","#999");
		$(".myRebate").css("background","white");
		$("#actionContent").show();
		$("#rebateContent").hide();
	})
	$(".myRebate").click(function(){
		$(this).css("background","#999");
		$(".myActivities").css("background","white");
		$("#rebateContent").show();
		$("#actionContent").hide();
	})
//	var intro=$(".intro").html().substr(0,20);
//	$(".intro").html(intro);
	//电话号码
	var Tel=$(".tel").text();
	var newTel="";
	if(Tel.length>0){
		for(var i=0;i<Tel.length;i++){
			if(i<3 || i>=Tel.length-4){
				newTel+=Tel[i];
			}else{
				newTel+='*'
			}
		}
	}
	$(".tel").text(newTel);
	
})
