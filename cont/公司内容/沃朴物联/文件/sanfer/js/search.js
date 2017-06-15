$(function(){
	$.ajax({
		url:"js/search.json",
		async:true,
		success:function(datas){
			console.log(datas);
			var str="";
			for(var i in datas){
				var message=datas[i].data.list;
				console.log(datas[i].data);
				console.log(message)
				for(var j in message){
					str+="<ul>";
					str+="<li dataid='"+ message[j].categoryId +"' class='l li'>"+message[j].categoryName+"</li>"
					str+="</ul>"
				}
			}
			$("#content").append(str);
		}
	});
	$("#content").on('click','.li',function(){
		var dataId = $(this).attr("dataid")
			console.log(dataId);
			//键值是图片的属性dataid;
		localStorage.setItem("dataid",dataId);
		window.location.href="result.html";
	})
})
