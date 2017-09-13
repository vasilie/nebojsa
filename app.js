var express = require('express'),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server);
    nicknames = [];
	players = [];
server.listen(3000);
app.use(express.static('www'));
app.get("/www/",function(req,res){
  res.sendfile(__dirname +'/index.html');
});
io.sockets.on("connection", function(socket){
	socket.emit("new player", socket.id);
  // socket.on("new user",function(data,callback){
  	players.push({id:socket.id, x:0, y:0, color:"#fff000"});
    if (nicknames.indexOf(socket)!=-1){
    //   callback(false);
    } else {
    //   callback(true);
      socket.nickname = socket.id;
    //   socket.color = data.color;
      nicknames.push({nickname:socket.nickname, ready:false});
      updateNicknames();
	//   console.log("players");
	//   console.log("players");
	//   console.log("players");
	//   console.log(players);
    }
  // });
  function updateNicknames(){
    io.sockets.emit("usernames",players);
  }
  socket.on('send message', function(data){
    io.sockets.emit('new message',{msg:data,nick:socket.nickname,color:socket.color});
  });
  socket.on('typing', function(data){
    io.sockets.emit('newType',data);
  });
  socket.on('playerPosition', function(data){
	  console.log("===================");
	  console.log("===================");
	  console.log(data);
	  console.log("===================");
	  console.log("===================");
	  for (i in players){
		  if (players[i].id == data.id){
			  console.log("wwww");
			  players[i].x = data.x;
			  players[i].y = data.y;
			  players[i].color = data.color;
		  }
	  }
  });
  socket.on("disconnect",function(data){
    if(!socket.nickname){
      return;
    } else {
      nicknames.splice(nicknames.indexOf(socket.nickname),1);
	  for (i in players){
		  if (players[i].id == socket.nickname){
			  players.splice(i,1);
		  }
	  }
      updateNicknames();
    }
  });
});
setInterval(function(){
	io.sockets.emit("beat",players);
},33);
