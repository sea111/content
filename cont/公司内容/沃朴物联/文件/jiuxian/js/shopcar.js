$(function(){
	var locals = window.localStorage
//	var goodsnum = localStorage.getItem("num");
//	var arr = [];
//	var arr0 = [];
//	console.log(localStorage);
//	for(var i = 0; i < localStorage.length; i++){
////	console.log(localStorage.key(i));
//		arr0.push(localStorage.key(i));
//		if(!isNaN(arr0[i])){
//			arr.push(Number(arr0[i]));
//		}	
//	}
//	console.log(arr);
	$.ajax({
		url:"../json/dataz.json",
		success:function(data){
//	console.log(data);
			var datas = data.data;
			var str = "";
//	console.log(datas);
			for(var i = 0; i < locals.length; i++){
				for(var j in datas){
					if(locals.key(i) == datas[j].id){
						str += '<div class="goods">';
						str += '<span class="select"></span>';
						str += '<dl>';
						str += '<dt><img src="../img/'+ datas[j].img +'"/></dt>';
						str += '<dd>'
						str += '<p>'+ datas[j].name +'</p>';
						str += '<p class="price">'+ datas[j].price +'</p>';
						str += '<input dataid="'+ datas[j].id +'" class="reduce" type="button" value="-"/>';
						str += '<input  class="num" type="text" value="'+ localStorage.getItem("n"+datas[j].id) +'"/>';
						str += '<input dataid="'+ datas[j].id +'" class="add" type="button" value="+"/>';
						str += '</dd>';
						str += '</dl>';
						str += '<i class="delet" dataid="'+ datas[j].id +'"></i>';
						str += '<div class="addprice"></div>';
						str += '</div>';
//console.log(datas[j].id)
					}
				}
			}
			$(".content").append(str);
//全选按钮
			$(".footer").on("click",".select",function(){
				var num = 0;
				var price = 0;
				if($(this).hasClass("active")){
					$(this).removeClass("active");
					$(".content .select").removeClass("active");
					$(".paynum").html(num);
					$(".sum span").html(price);
				}else{
					$(this).addClass("active");
					$(".content .select").addClass("active");
					for(var i = 0; i < $(".content .select").size(); i++){
						num += parseInt($(".content .select").eq(i).next().find(".num").val());
						price += ($(".content .select").eq(i).next().find(".num").val())*($(".content .select").eq(i).next().find(".price").html())
					}
					$(".paynum").html(num);
					$(".sum span").html(price);
				}
			})
//单选按钮	
			$(".content").on("click",".select",function(){
				var num = 0;
				var price = 0;
				var numSum = parseInt($(".paynum").html());
				var priceSum = parseInt($(".sum span").html());
				if($(this).hasClass("active")){
					$(this).removeClass("active");
					$(".footer .select").removeClass("active");
					num = numSum - parseInt($(this).next().find(".num").val());
					$(".paynum").html(num);
					price = priceSum - $(this).next().find(".num").val() * $(this).next().find(".price").html();
					console.log(price);
					$(".sum span").html(price);
				}else{
					$(this).addClass("active");
					$(".footer .select").removeClass("active");
					num = numSum + parseInt($(this).next().find(".num").val());
					$(".paynum").html(num);
					price = priceSum + parseInt($(this).next().find(".num").val() * $(this).next().find(".price").html());
//console.log(price);
					$(".sum span").html(price);
					for(var i = 0; i < $(".content .select").size(); i++){
						if(!($(".content .select").eq(i).hasClass("active"))){
							return;
						}
					}
					$(".footer .select").addClass("active");
				}
			})
//商品数量增删
			$(".goods .add").click(function(){
				var goodsNum = $(this).prev().val();
				var str1 = $(".paynum").html()
				var str2 = parseInt($(".sum span").html());
				goodsNum++;
				$(this).prev().val(goodsNum);
				if($(this).parent().parent().prev().hasClass("active")){
					str1++;
					$(".paynum").html(str1);
					str2 = str2 + parseFloat($(this).parent().find(".price").html());
					$(".sum span").html(str2);
				}	
				var dataid = $(this).attr("dataid");
				//console.log(addnum);
				localStorage.setItem("n" + dataid,goodsNum)
			})
			$(".goods .reduce").click(function(){
				var goodsNum = $(this).next().val();
				var str1 = $(".paynum").html()
				var str2 = parseFloat($(".sum span").html());
				goodsNum--;
				if(goodsNum < 1){
					goodsNum = 1;
				}else{
					str1--;
					if($(this).parent().parent().prev().hasClass("active")){
						str2 = str2 - parseFloat($(this).parent().find(".price").html());
						$(".sum span").html(str2);
						$(".paynum").html(str1);
					}	
				}
				$(this).next().val(goodsNum);
				var reducenum = $(this).attr("dataid");
				//console.log(addnum);
				localStorage.setItem("n" + reducenum,goodsNum)
			})

//删除商品
			$(".goods").on("click",".delet",function(){
				$(this).parents(".goods").remove();
				var dataid = $(this).attr("dataid");
 				localStorage.removeItem(dataid);
 				localStorage.removeItem("n"+dataid)
//价格数量删除
				var num = 0;
				var price = 0;
				var numSum = parseInt($(".paynum").html());
				var priceSum = parseInt($(".sum span").html());
				num = numSum - parseInt($(this).parent().find(".num").val());
				price = priceSum - $(this).parent().find(".num").val() * $(this).parent().find(".price").html();
				if($(this).parent().find(".select").hasClass("active")){
 					$(".paynum").html(num);
 					$(".sum span").html(price);
 				}
			})
			$(".grzx").click(function(){
				var login = localStorage.getItem("login")
				if(login){
					window.location.href = "clearinghouse.html"
				}else{
					window.location.href = "login.html"
				}
			})
//返回详情页
			$(".header").on("click",".back",function(){
				window.location.href = "detail.html";
			})
//顶部菜单
			var onoff = false;
			$(".header").on("click",".menu",function(){
				if(onoff){
					$(".list").hide();
					onoff = false;
				}else{
					$(".list").show();
					onoff = true;
				}
			})
//跳转
			$(".toindex").click(function(){
				window.location.href = "../index.html";
			})
			$(".tosearch").click(function(){
				window.location.href = "classify.html";
			})
			$(".toshopcar").click(function(){
				window.location.href = "shopcar.html";
			})
		}
	})
})
$(function(){
	$("#all .footer").on("click",".goto",function(){
		//alert($("#all .footer .sum span").html())
		var allprice=$("#all .footer .sum span").html()
		localStorage["allprice"] = allprice
	})
	
})

