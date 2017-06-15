/*$(function(){	
	//链接
	function getUrlRequest() {
        var url = location.search; //获取url中"?"符后的字串
        console.log(url)
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            if (str.indexOf("&") != -1) {
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            } else {
                theRequest[str.split("=")[0]] = unescape(str.split("=")[1]);
            }
        }
        return theRequest;
    }
	console.log(!getUrlRequest().productId);
	//加密
	 function getKey(userFlag){
	 	$.ajax({
			url:'http://192.168.199.182/wpwl/getKey',
			success:function(res){
				key=res.data;
				WPBridge.callMethod("JsInvokeNative","wpEncrypt",{key:key,params:[prtId]},function(msg){parValue=msg.data.result[0]});
				if(userFlag){
					WPBridge.callMethod('JsInvokeNative','wpGetUserId',{},function(msg){
						if(msg.data.result!=''){
							userId=msg.data.result;
							WPBridge.callMethod('JsInvokeNative','wpEncrypt',{key:key,params:[userId]},function(msg){window.aesUserId=msg.data.result[0];})	
						}
					})
				}
				localStorage.setItem('key',res.data)
				wpwlBrand.getData(key);	//详情页的key值
			}
		})
	 }
	 
	//brand数据
	var wpwlBrand={
		getData:function(value){
			window.prtId=getUrlRequest().productId;
		//				var keyValue=localStorage.getItem('key');
			WPBridge.callMethod("JsInvokeNative","wpEncrypt",{key:value,params:[prtId]},function(msg){parValue=msg.data.result[0];
				$.ajax({
					url:"http://192.168.199.182/wpwl/brand/list",
					type:"post",
					success:function(res){
						if(res.errMsg=="AES加密解密失败"){
							getKey();
							wpwlBrand.getData()
						}else {
							window.productInfo=res.data;
							//wpwlBrand.scroll();
						}		
						var datas=res.data.list;
						console.log(datas)
						var str="";
						for(var i in datas){
							str+="<dl>";
							str+='<dt><img dataid="'+datas[i].id+'" src="'+datas[i].iconUrl+'"/></dt>';
							str+="<dd>";
							str+="<p>"+datas[i].brandName+"</p>";
							str+="<p class='num'>"+datas[i].amount+"个宝贝</p>";
							str+="<p class='starTime'>最近更新："+datas[i].gmtModified.substr(0,10)+"</p>";
							str+="</dd>";
							str+="</dl>";
						}
					}
				})
			})
		}
	
	}
})
*/
/*$(function(){
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
			type:"post",
			url:"http://127.0.0.1/wpwl/brand/list",
			async:true,
			success:function(data){
				var datas=data.data.list;
				var str="";
				for(var i in datas){
					str+="<dl>";
					str+='<dt><img dataid="'+datas[i].id+'" src="'+datas[i].iconUrl+'"/></dt>';
					str+="<dd>";
					str+="<p>"+datas[i].brandName+"</p>";
					str+="<p class='num'>"+datas[i].amount+"个宝贝</p>";
					str+="<p class='starTime'>最近更新："+datas[i].gmtModified.substr(0,10)+"</p>";
					str+="</dd>";
					str+="</dl>";
				}
				$("#content  .list-goods").html(str);
				myscroll.refresh();
				click();
			}
			
		});
		
	}
	function click(){
		$(".list-goods dl").on("click","dt",function(){
			var dataId = $(this).find("img").attr("dataid")
			console.log(dataId);
			//键值是图片的属性dataid;
			localStorage.setItem("dataid",dataId);
			window.location.href="list.html"
		});	
	}
})*/
