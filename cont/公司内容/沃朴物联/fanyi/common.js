 var $=function(id){  return document.getElementById(id) ;  }

//Ajax��
function Ajax(recvType){

    var aj=new Object();
    aj.recvType=recvType ? recvType.toUpperCase() : 'HTML';  //���β��д��ݵ��ļ�����
     aj.targetUrl='';
    aj.sendString='';
    aj.resultHandle=null;

    /*����XMLHttpRequest����*/
    aj.createXMLHttpRequest=function(){
        var xmlHttp = false;
        if(window.XMLHttpRequest){ //�ڷ�IE�д���XMLHttpRequest����
            xmlHttp = new XMLHttpRequest();
        }else if(window.ActiveXObject){
            try{
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); //���°�IE����
            }catch(error1){ //����ʧ��
                try{
                    xmlHttp = new ActiveXobject("Microsoft.XMLHttp"); //���ϰ�IE����
                }catch(error2){ //����ʧ��
                    xmlHttp = false;
                }
            }
        }
        return xmlHttp;
    }

    aj.XMLHttpRequest=aj.createXMLHttpRequest();

    /*�������������Ӧ*/
    aj.processHandle=function(){
        if(aj.XMLHttpRequest.readyState == 4){
            if(aj.XMLHttpRequest.status == 200){
                if(aj.recvType=="HTML")
                    aj.resultHandle(aj.XMLHttpRequest.responseText);
                else if(aj.recvType=="XML")
                    aj.resultHandle(aj.XMLHttpRequest.responseXML);
            }
        }
    }

    /*����ʹ��get�������ݵķ���*/
    aj.get=function(targetUrl, resultHandle){
        aj.targetUrl=targetUrl;    
        
        if(resultHandle!=null){
            aj.XMLHttpRequest.onreadystatechange=aj.processHandle;    
            aj.resultHandle=resultHandle;    
        }
        if(window.XMLHttpRequest){
            aj.XMLHttpRequest.open("get", aj.targetUrl);
            aj.XMLHttpRequest.send(null);
        }else{
            aj.XMLHttpRequest.open("get", aj.targetUrl, true);
            aj.XMLHttpRequest.send();
        }
        
    }

    /*����ʹ��post�������ݵķ���*/
    aj.post=function(targetUrl, sendString, resultHandle){
        aj.targetUrl=targetUrl;

        if(typeof(sendString)=="object"){
            var str="";
            for(var pro in sendString){
                str+=pro+"="+sendString[pro]+"&";    
            }
            aj.sendString=str.substr(0, str.length-1);
        }else{
            aj.sendString=sendString;
        }

        if(resultHandle!=null){
            aj.XMLHttpRequest.onreadystatechange=aj.processHandle;    
            aj.resultHandle=resultHandle;    
        }

        aj.XMLHttpRequest.open("post", targetUrl);
        aj.XMLHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        aj.XMLHttpRequest.send(aj.sendString);
        
    }

    return aj;
}
/*ajax��ʹ�÷���
var ajax=Ajax();

    //getʹ�÷�ʽ
    ajax.get("server.php?name=zhangsan&phone=778", function(data){                
                alert(data); //dataΪ�ӷ������˶�ȡ������
            });
    //��һ��postʹ�÷�ʽ
    ajax.post("server.php", "name=ligang&phone=222", function(data){
                alert(data);
                });

    //�ڶ���postʹ�÷�ʽ
    ajax.post("server.php", {name:"tom",phone:"456"},function(data){
        alert(data);
    });

*/