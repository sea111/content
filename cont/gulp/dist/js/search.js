$(function(){function e(a){WPBridge.callMethod("JsInvokeNative","wpEncrypt",{key:a,params:[t,1,20]},function(t){codeValue=t.data.result,$.ajax({type:"post",data:{brandId:codeValue[0],pageIndex:codeValue[1],pageSize:codeValue[2]},url:wpCommon.Url+"/wpwl/category/listByPage",async:!0,timeout:2e3,success:function(t){if("AES加密解密失败"==t.errMsg)aseFail||($.ajax({type:"post",url:wpCommon.Url+"/wpwl/getKey",success:function(t){a=t.data,localStorage.setItem("key",t.data),e(a),result(a)}}),aseFail=!0);else{var o=t.data.list,i="";for(var l in o)i+="<ul>",i+="<li resultid='"+o[l].categoryId+"' resultName='"+o[l].categoryName+"' class='l xiLie'>"+o[l].categoryName+"</li>",i+="</ul>";$("#content").append(i),WPBridge.callMethod("JsInvokeNative","wpShowWebView",{},function(){}),WPBridge.callMethod("JsInvokeNative","wpDismissLoadingDialog",{},function(){})}},error:function(){WPBridge.callMethod("JsInvokeNative","wpShowWebView",{},function(){}),WPBridge.callMethod("JsInvokeNative","wpDismissLoadingDialog",{},function(){})},complete:function(e,t){"timeout"==t&&(WPBridge.callMethod("JsInvokeNative","wpShowWebView",{},function(){}),WPBridge.callMethod("JsInvokeNative","wpDismissLoadingDialog",{},function(){}))}})})}WPBridge.callMethod("JsInvokeNative","wpShowLoadingDialog",{},function(){}),window.aseFail="";var t=localStorage.getItem("brandid");localStorage.getItem("searchName"),localStorage.getItem("resultid"),localStorage.getItem("resultName");$.ajax({type:"post",url:wpCommon.Url+"/wpwl/getKey",async:!0,success:function(t){key=t.data,localStorage.setItem("key",t.data),e(key)}}),$("#content").on("click",".xiLie",function(e){e.preventDefault();var t=$(this).attr("resultid"),a=$(this).attr("resultName");localStorage.setItem("resultid",t),localStorage.setItem("resultName",a),WPBridge.callMethod("JsInvokeNative","wpHitDotEvent",{eventId:"h5_e008",otherId:t},function(){}),window.location.href="result.html?pageId=H5_A007"}),$("#inp").focus(),$("#inp").on("keyup",function(e){var t=$("#inp").val();if(localStorage.setItem("searchVal",t),13===e.keyCode)if($(this).val()){WPBridge.callMethod("JsInvokeNative","wpHitDotEvent",{eventId:"h5_e008",otherId:t},function(){});var a=new RegExp("[ /a-zA-Z0-9一-龥-——()（）]");if(a.test($(this).val())){var t=$(this).val().replace(/（/g,"("),t=t.replace(/）/g,")"),t=t.replace(/—/g,"-"),t=t.replace(/　/g," ");localStorage.setItem("searchVal",t),window.location.href="searchResult.html?pageId=H5_A007"}else WPBridge.callMethod("JsInvokeNative","wpShowToast",{message:"字符格式不合法"},function(){})}else WPBridge.callMethod("JsInvokeNative","wpShowToast",{message:"型号和名称不能为空"},function(){})})}),$(function(){$(".cancle").on("touchstart",function(){WPBridge.callMethod("JsInvokeNative","wpFinishH5",{},function(){})})});