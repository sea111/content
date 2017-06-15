$(function(){
	
	var dataid=localStorage.getItem("dataid");//把这个dataid传给这个接口中需要的参数。
	console.log(dataid);
	iscroll();
	ajax();
	var myscroll;
	function iscroll(){
		myscroll = new IScroll("#content",{
			click:true
		});
	};
	function ajax(){
		$.ajax({
			url:"js/result.json",
			async:true,
			success:function(datas){
				console.log(datas);
				var str="";
				for(var i in datas){
					var mes = datas[i].data.list
					console.log(mes);
					for( var j in mes){
						if(mes[j].saleStatus=='1'){
							str+='<dl><dt><i class="hot"></i><img src="'+mes[j].iconUrl+'" /></dt><dd><p class="p1">'+mes[j].productName+'</p><p class="p2">'+mes[j].standard+'</p></dd></dl>'
						}else{
							str+='<dl><dt><img src="'+mes[j].iconUrl+'" /></dt><dd><p class="p1">'+mes[j].productName+'</p><p class="p2">'+mes[j].standard+'</p></dd></dl>'
						}
						
					}
				}
				$('.con').html(str)
				myscroll.refresh();
				console.log($('#content').height());
				click();
			}
			
		});
		
	}
	function click(){
		$(".picture").on("click","dl",function(){
//			var dataId = $(this).attr("dataid")
//			console.log(dataId);
//			键值是图片的属性dataid;
//			localStorage.setItem("dataid",dataId);
			window.location.href="detail.html"
		});	
	}
	$("form").click(function(){
		window.location.href="search.html";
	})
	$(".more").click(function(){
		console.log(1)
		window.location.href="search.html";
	})
	
})
