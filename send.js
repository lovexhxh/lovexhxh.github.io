$(document).ready(function(){
	$(".js-send-button").click(function(){

//		console.log(isPushEnabled);
		send();
	});
});

function send(){
	
	$("#log p, #log br").remove();
	
	var send_way;				//전송 방법
	var send_result = false;	//전송 결과
	
	send_way = "app";
	var res_app = send_app();
	
	if(res_app){
		send_result = true;
	}else{
		send_way = "web";
		var res_web = send_web();

		if(res_web){
			send_result = true;
		}else{
			send_way = "msg";
			var res_msg = send_msg();

			if(res_msg){
				send_result = true;
			}
		}
	}
	
	
	$("#log").append("<br/>");
	$("#log").append("<br/>");
	$("#log").append("<p>마지막 전송 방법 : " + send_way +"</p>");
	$("#log").append("<p>전송 결과 : " + send_result + "</p>");
	
}

function send_app(){
	var res = false;

	$("#log").append("<p>1.</p>");
	$("#log").append("<p>앱푸시 요청</p>");
	
	var dup = true;
	
	if(dup){
		dup = false;
		$.ajax({
	        url: "http://192.168.219.113:2020/send_app.do",
	        type: 'post',
	        async: false,
			data: {"REGISTRATION_ID" : $("#token_app").val()},
	        success : function(data) {
	        	res = data.result;
	        	dup = true;
	        }
	    });
	}else{
		alert("새로고침 해주세요");
	}

	if(!res){
		$("#log").append("<p>→실패</p>");
	}else{
		$("#log").append("<p>→성공</p>");
	}
	$("#log").append("<br/>");
	
	return res;
}
function send_web(){
	var res = false;

	$("#log").append("2.");
	$("#log").append("<p>웹푸시 요청</p>");
	
	if(isPushEnabled){
		$.ajax({
	        url: "http://192.168.219.113:2020/send_web.do",
	        type: 'post',
	        async: false,
			data: {"REGISTRATION_ID" : $("#token_web").val()},
	        success : function(data) {
	        	res = data.result;
	        }
	    });
	}

	if(!res){
		$("#log").append("<p>→실패</p>");
	}else{
		$("#log").append("<p>→성공</p>");
	}
	$("#log").append("<br/>");
	
	return res;
}



function send_msg(){
	var res = false;

	$("#log").append("3.");
	$("#log").append("<p>문자 요청</p>");

	$.ajax({
        url: "http://192.168.219.113:2020/send_msg.do",
        type: 'post',
        async: false,
		data: {"phone" : $("#token_msg").val()},
        success : function(data) {
        	res = data.result;
        }
    });
	
	if(!res){
		$("#log").append("<p>→실패</p>");
	}else{
		$("#log").append("<p>→성공</p>");
	}
	$("#log").append("<br/>");
	
	return res;
}