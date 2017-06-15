$(function(){
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
