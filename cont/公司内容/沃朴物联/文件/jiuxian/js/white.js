$(function(){
	iscroll();
	ajaxs();
	$("#header .menus").on("click",function(){
		$(".list-menu").toggle();
	});
	var myscroll;
	function iscroll(){
		myscroll = new IScroll("#content",{
			click:true
		});
	};
	
	function ajaxs(){
		$.ajax({
			url:"../json/white.json",
			async:false,
			success:function(data){
				var data = data.data
				var str = "";
				for(var i in data){
					str += "<li class='" + data[i].id + "'>";
					str += "<img src='" + data[i].img + "'/>";
					str += "<section class='introduce'>";
					str += '<p class="wine-name">' + data[i].name + '</p>';
					str += '<p class="wine-intro">' + data[i].intro + '</p>';
					str += '<p class="price">￥' + data[i].price + '</p>';
					str += '</section>';
					str += '</li>';				
				}
				$("#content .list-goods .mylist").append(str);
				myscroll.refresh();				
			}			
		});
		
	};
	$("#content .list-goods .mylist li").on("click",function(){
		window.location.href = "detail.html";
		var dataid = $(this).attr("class");
		localStorage.setItem("dataid",dataid);
	});
	/*$("#content").on("touchend",function(){
		if(myscroll.y > 50){
			myscroll.refresh()
		}
		if(myscroll.y < myscroll.maxScrollY - 50){
			console.log(myscroll.y +":"+myscroll.maxScrollY )
			ajaxs();
			myscroll.refresh()
		}
	});*/
	$(".grzx").click(function(){
		var login = localStorage.getItem("login")
		if(login){
			window.location.href = "personcenter.html"
		}else{
			window.location.href = "login.html"
		}
	})
})