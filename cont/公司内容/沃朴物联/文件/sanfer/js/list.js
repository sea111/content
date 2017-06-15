$(function(){
	var cateArr=[];
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
					/*str+="<ul>";
					str+="<li dataid='"+ message[j].categoryId +"' class='l li'>"+message[j].categoryName+"</li>"
					str+="</ul>"*/
					cateArr.push(message[j]);
				}
			}
			}
		})
		//	$("#content).html(str);
//	iscroll();
//	ajax();
//	var myscroll;
//	function iscroll(){
//		myscroll = new IScroll("#content",{
//			click:true
//		});
//	};
//	function ajax(){
		console.log(1)
		console.log(cateArr)
		$.ajax({
			url:"js/list.json",
			async:true,
			success:function(datas){//遍历第一层获取的数据
				console.log(datas);
				var str="";
				for(var i in datas){
					str += '<ul>'
					str+='<li><i class="bgLift">'+cateArr[i].categoryName+'</i><span moreid='+cateArr[i].categoryId+' class="more">更多</span><i class="bgRight"></i></li>'
					str+='<li><i class="lineL"></i><span class="center"></span><i class="lineR"></i></li>'
					str+='<li>'
					var mes = datas[i].data.list;
					console.log(mes);
					if(mes.length>1){
						for( var j in mes){
							mes[j].saleStatus==='1'?str+='<dl><dt><i class="hot"></i><img src="'+mes[j].iconUrl+'" /></dt><dd><p class="p1">'+mes[j].productName+'</p><p class="p2">'+mes[j].standard+'</p></dd></dl>':
							str+='<dl><dt><img src="'+mes[j].iconUrl+'" /></dt><dd><p class="p1">'+mes[j].productName+'</p><p class="p2">'+mes[j].standard+'</p></dd></dl>'
						}
					}else{
						str+='<dl><dt><img src="'+mes[0].iconUrl+'" /></dt><dd><p class="p1">'+mes[0].productName+'</p><p class="p2">'+mes[0].standard+'</p></dd></dl>'
						str+='<dl class="end"></dl>'
					}
					str+='</ul>'			
				}
				$('.con').html(str)
				Iscroll.scroll();
				console.log(Iscroll.scroll())
				//myscroll.refresh();
				console.log($("#content").height())
				click();
			}

			
		});
		
//	}
	
	function click(){
		$("ul li").on("click","dl",function(){
			var dataId = $(this).attr("dataid")
			console.log(dataId);
			//键值是图片的属性dataid;
			localStorage.setItem("dataid",dataId);
			window.location.href="detail.html"
		});	
	}
	$("form").click(function(){
		window.location.href="search.html";
	})
	$(".con").on("click",".more",function(){
		var dataid=$(this).attr("moreid");
		localStorage.setItem("moreid",dataid);
		//console.log(moreId);
		window.location.href="result.html"
	})
	
})


$(function(){	
 	myScroll = new IScroll( "#content",{
 		click:true,
 		fixedScrollbar:true
 	});
 })
var Iscroll={
	scroll:function(){
		var wholeHei=document.documentElement.clientHeight-document.documentElement.clientWidth /7.5*0.88;
		$("#content").css("height",wholeHei+'px');
		//$(".loading").css("height",wholeHei+'px');
		myScroll.refresh();
		console.log(wholeHei)
	}
}
