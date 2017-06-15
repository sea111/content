/*返回上一页*/
$("#box .list ul li").eq(0).click(function(){
	window.location.href = "../index.html"
})
$("#box .list ul li").eq(1).click(function(){
	window.location.href = "classify.html"
})
$("#box .list ul li").eq(2).click(function(){
	window.location.href = "shopcar.html"
})
$("#box .list ul li").eq(3).click(function(){
	window.location.href = "login.html"
})
/*.chose点击事件*/
var off = true
$("#box .head .chose").click(function(){
	if(off){
		$("#box .list").show()
		off = false
	}else{
		$("#box .list").hide()
		off = true
	}
})
/*广告消失*/
$("#box .ad .dispear").click(function(){
	$("#box .ad").fadeOut()
})
/*swiper*/
var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    pagination: '.swiper-pagination'
})  

/*请求ajax*/
var dataid = localStorage.getItem("dataid")
$.ajax({
	url:"../json/dataz.json",
	dataType:"json",
	success:function(data){
		var mag = data.data
		var str = ""
		var str1 = ""
		var str2 = ""
		for(var i in mag){
			if(dataid == mag[i].id){
				str+='<img src="'+mag[i].img+'"/>'
				str1+=mag[i].name
				str2+='￥'+mag[i].price
			}
		}
		$(".swiper-container .swiper-wrapper .swiper-slide").append(str)
		$("#box .massage .name").html(str1)
		$("#box .massage .price").html(str2)
	}
});
/*数量*/
$("#box .delivery .count .cut").click(function(){
	var num = $("#box .delivery .count").children().eq(2).text()
	//console.log(num)
	if(num <=1){
		num = 1
		$("#box .delivery .count").children().eq(2).text(num)
	}else{
		num--
		$("#box .delivery .count").children().eq(2).text(num)
	}
})
$("#box .delivery .count .add").click(function(){
	var num = $("#box .delivery .count").children().eq(2).text()
	//console.log(num)
	num++
	$("#box .delivery .count").children().eq(2).text(num)
})
$("#box .shop ul li").eq(2).click(function(){
	var oldnum = $("#box .shop .num").text()
	var num = $("#box .delivery .count").children().eq(2).text() 
	$("#box .shop .num").text(parseInt(num) + parseInt(oldnum))
	var dataid = localStorage.getItem("dataid")
	if(localStorage.getItem("n"+dataid)){
		var olnum =  localStorage.getItem("n"+dataid)
		var newnum = parseInt(num) + parseInt(olnum)
		localStorage.setItem("n"+dataid,newnum)
	}else{
		localStorage.setItem("n"+dataid,num)
	}
	localStorage.setItem("dataid",dataid)
	localStorage.setItem(dataid,dataid)
})


/*进入购物车*/
$("#box .shop ul li").eq(1).click(function(){ 
	window.location.href = "shopcar.html"
})

$(".grzx").click(function(){
	var price = $(".price").text().substring(1,$(".price").text().length)
	
	//console.log(price)
		var num = $("#box .delivery .count").children().eq(2).text()
	//console.log(num)
	localStorage.setItem("allprice",price*num)
	var login = localStorage.getItem("login")
	if(login){
		window.location.href = "clearinghouse.html"
	}else{
		window.location.href = "login.html"
	}
})









