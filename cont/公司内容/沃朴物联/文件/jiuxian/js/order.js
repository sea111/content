$(function(){
	$("#header .menus").on("click",function(){
		$(".list-menu").toggle();
	});
})
$(function(){
	var data = new Date()
	$(".time").html("下单时间:"+data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate()+" "+data.getHours()+":"+data.getMinutes()+":"+data.getSeconds())
})
$(function(){
//	var str = '0123456789';
	var list = "";
	for(var i = 0; i < 14; i++){
		j = Math.floor(Math.random()*10);//随机数
		list += j;
	}
	$(".ding").html("订单号: 1"+list); 
})
$(function(){
	$(".ding1").append("￥"+localStorage.getItem("allprice")+".00")
})
