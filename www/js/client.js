$(function(){
  var socket = io.connect();
  // var $messageForm = $("#send-message");
  // var $nickForm = $("#setNick");
  // var $nickBox = $("#nickname");
  // var $users = $("#users");
  // var $nickError = $("#nickError");
  // var $messageBox = $("#message");
  // var $chat = $("#chat");
  var myNickname, myColor;
  // $nickForm.submit(function(e) {
  // .preventDefault();
  // yNickname = $nickBox.val();
  // yColor = getColor();
  // ocket.emit("new user",{nick:$nickBox.val(),color:myColor},function(data){
  //  if (data){
  // $("#nickWrap").hide();
  // $(".contentWrap").show();
  //  } else {
  // $nickError.html("That username is already taken");
  //  }
  // );
  // nickBox.val("");
  // });
  // $messageForm.submit(function(e){
  // .preventDefault();
  // ocket.emit('send message', $messageBox.val());
  // messageBox.val('');
  // });
  socket.on("usernames",function(data){
	var html = '';
	pera = data;
	console.log(data[0].nickname);
	for (i=0;i<data.length;i++){
	  console.log(i);
	  html+="<p style='background:"+data[i].color+"'>"+data[i].nickname+"</p>";
	}
	// $users.html(html);
	if (data.length > 1){
		multiplayer = true;
	} else {
		multiplayer = false;
	}
  });
  socket.on('new message', function(data){
	$chat.append("<p class='message'><span style='color:"+data.color+"'>"+data.nick+"</span>: "+data.msg+"</p>");
  });
  var html;
  socket.on("newType",function(data){
	html = "<p>"+data.nickname+":"+data.msg+"</p>";
	console.log(data);
	$(".typeAct").css({"background":data.color});
	startTyping();
	$(".typeAct").html(html);
  });
  // $messageBox.on("keyup",function(e){
  // ocket.emit('typing', {color:myColor,nickname:myNickname,msg:$messageBox.val()});
  // });

});
